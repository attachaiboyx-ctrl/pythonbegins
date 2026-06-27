import { NextResponse } from "next/server";
import {
  getOmiseChargeStatus,
  readOmiseMetadata,
  retrieveOmiseCharge,
  retrieveOmiseEvent
} from "@/lib/omise";
import { PAYMENT_PROVIDER } from "@/lib/payment-config";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_WEBHOOK_BODY_BYTES = 1024 * 1024;
const TEST_EVENT_ID_PATTERN = /^evnt_test_[0-9a-z]+$/;
const TEST_CHARGE_ID_PATTERN = /^chrg_test_[0-9a-z]+$/;

type IncomingOmiseEvent = {
  id?: unknown;
  key?: unknown;
  object?: unknown;
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" }
  });
}

function parsePaidAt(value?: string | null) {
  if (!value) {
    return new Date();
  }

  const paidAt = new Date(value);
  return Number.isNaN(paidAt.getTime()) ? new Date() : paidAt;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || "0");

  if (contentLength > MAX_WEBHOOK_BODY_BYTES) {
    return jsonResponse({ received: false }, 413);
  }

  let incomingEvent: IncomingOmiseEvent;

  try {
    incomingEvent = (await request.json()) as IncomingOmiseEvent;
  } catch {
    return jsonResponse({ received: false }, 400);
  }

  const eventId = typeof incomingEvent.id === "string" ? incomingEvent.id : "";
  const eventKey = typeof incomingEvent.key === "string" ? incomingEvent.key : "";

  if (!TEST_EVENT_ID_PATTERN.test(eventId)) {
    return jsonResponse({ received: false }, 400);
  }

  if (eventKey !== "charge.complete") {
    return jsonResponse({ received: true, ignored: true });
  }

  try {
    // Opn recommends retrieving provider data independently before trusting a webhook.
    const verifiedEvent = await retrieveOmiseEvent(eventId);
    const chargeId = verifiedEvent.data?.id || "";

    if (
      verifiedEvent.object !== "event" ||
      verifiedEvent.id !== eventId ||
      verifiedEvent.key !== "charge.complete" ||
      verifiedEvent.livemode ||
      !TEST_CHARGE_ID_PATTERN.test(chargeId)
    ) {
      return jsonResponse({ received: false }, 400);
    }

    const charge = await retrieveOmiseCharge(chargeId);
    const transactionId = readOmiseMetadata(charge, "transaction_id");
    const metadataUserId = readOmiseMetadata(charge, "user_id");

    if (
      charge.object !== "charge" ||
      charge.id !== chargeId ||
      charge.livemode ||
      charge.source?.type !== "promptpay" ||
      !transactionId ||
      !metadataUserId
    ) {
      return jsonResponse({ received: false }, 400);
    }

    const transaction = await prisma.paymentTransaction.findUnique({
      where: { id: transactionId },
      select: {
        id: true,
        userId: true,
        provider: true,
        providerChargeId: true,
        providerEventId: true,
        amount: true,
        currency: true,
        status: true
      }
    });

    if (
      !transaction ||
      transaction.provider !== PAYMENT_PROVIDER ||
      transaction.userId !== metadataUserId ||
      (transaction.providerChargeId && transaction.providerChargeId !== charge.id) ||
      transaction.amount !== charge.amount ||
      transaction.currency !== charge.currency.toUpperCase()
    ) {
      return jsonResponse({ received: false }, 400);
    }

    if (
      transaction.providerEventId === verifiedEvent.id &&
      transaction.status === "successful"
    ) {
      return jsonResponse({ received: true, duplicate: true });
    }

    const status = getOmiseChargeStatus(charge);

    if (status === "pending") {
      return jsonResponse({ received: false, retry: true }, 409);
    }

    if (status === "successful") {
      await prisma.$transaction([
        prisma.paymentTransaction.update({
          where: { id: transaction.id },
          data: {
            providerChargeId: charge.id,
            providerEventId: verifiedEvent.id,
            status: "successful",
            failureCode: null,
            paidAt: parsePaidAt(charge.paid_at)
          }
        }),
        prisma.user.update({
          where: { id: transaction.userId },
          data: { membership: "paid" }
        })
      ]);
    } else if (transaction.status !== "successful") {
      await prisma.paymentTransaction.update({
        where: { id: transaction.id },
        data: {
          providerChargeId: charge.id,
          providerEventId: verifiedEvent.id,
          status,
          failureCode: charge.failure_code?.slice(0, 120) || null
        }
      });
    }

    return jsonResponse({ received: true });
  } catch (error) {
    console.error(
      "Opn webhook verification failed:",
      error instanceof Error ? error.message : "Unknown webhook error"
    );
    return jsonResponse({ received: false }, 500);
  }
}
