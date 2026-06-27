"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  COURSE_PRICE_SUBUNITS,
  GATEWAY_PAYMENT_METHOD,
  PAYMENT_CURRENCY,
  PAYMENT_PROVIDER
} from "@/lib/payment-config";
import {
  createOmiseCharge,
  createOmisePromptPaySource,
  getOmiseChargeQrCodeUrl,
  getOmiseChargeStatus,
  readOmiseMetadata
} from "@/lib/omise";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

const PENDING_REUSE_WINDOW_MS = 30 * 60 * 1000;

function paymentRedirect(type: "gatewayMessage" | "gatewayError", message: string): never {
  const params = new URLSearchParams({ [type]: message });
  redirect(`/payment?${params.toString()}`);
}

function paymentTransactionRedirect(transactionId: string): never {
  const params = new URLSearchParams({ gateway: transactionId });
  redirect(`/payment?${params.toString()}`);
}

export async function createGatewayPaymentAction(_formData: FormData) {
  const user = await requireUser();

  if (user.membership === "paid" || user.role === "admin") {
    paymentRedirect("gatewayMessage", "บัญชีนี้เป็น Premium แล้ว ไม่ต้องชำระเงินซ้ำ");
  }

  const reusableTransaction = await prisma.paymentTransaction.findFirst({
    where: {
      userId: user.id,
      provider: PAYMENT_PROVIDER,
      status: "pending",
      qrCodeUrl: { not: null },
      createdAt: {
        gte: new Date(Date.now() - PENDING_REUSE_WINDOW_MS)
      }
    },
    orderBy: { createdAt: "desc" }
  });

  if (reusableTransaction) {
    paymentTransactionRedirect(reusableTransaction.id);
  }

  const transaction = await prisma.paymentTransaction.create({
    data: {
      userId: user.id,
      provider: PAYMENT_PROVIDER,
      amount: COURSE_PRICE_SUBUNITS,
      currency: PAYMENT_CURRENCY,
      status: "pending",
      paymentMethod: GATEWAY_PAYMENT_METHOD
    }
  });

  let creationFailed = false;

  try {
    const source = await createOmisePromptPaySource({
      amount: transaction.amount,
      currency: transaction.currency
    });

    if (source.livemode || !source.id.startsWith("src_test_")) {
      throw new Error("Opn returned a non-test PromptPay source.");
    }

    const charge = await createOmiseCharge({
      amount: transaction.amount,
      currency: transaction.currency,
      sourceId: source.id,
      transactionId: transaction.id,
      userId: user.id
    });
    const status = getOmiseChargeStatus(charge);
    const qrCodeUrl = getOmiseChargeQrCodeUrl(charge);

    if (
      charge.livemode ||
      !charge.id.startsWith("chrg_test_") ||
      charge.amount !== transaction.amount ||
      charge.currency.toUpperCase() !== transaction.currency ||
      readOmiseMetadata(charge, "transaction_id") !== transaction.id ||
      readOmiseMetadata(charge, "user_id") !== user.id
    ) {
      throw new Error("Opn charge verification failed during creation.");
    }

    if (!qrCodeUrl || status !== "pending") {
      throw new Error("Opn did not return a pending PromptPay QR charge.");
    }

    await prisma.paymentTransaction.update({
      where: { id: transaction.id },
      data: {
        providerChargeId: charge.id,
        qrCodeUrl,
        status,
        paymentMethod: charge.source?.type
          ? `${charge.source.type}_gateway`
          : GATEWAY_PAYMENT_METHOD
      }
    });
  } catch (error) {
    creationFailed = true;
    console.error(
      "Opn payment creation failed:",
      error instanceof Error ? error.message : "Unknown provider error"
    );

    await prisma.paymentTransaction.update({
      where: { id: transaction.id },
      data: {
        status: "failed",
        failureCode: "gateway_creation_failed"
      }
    });
  }

  revalidatePath("/payment");
  revalidatePath("/admin");

  if (creationFailed) {
    paymentRedirect(
      "gatewayError",
      "สร้างรายการชำระเงินอัตโนมัติไม่สำเร็จ กรุณาลองใหม่หรือใช้การอัปโหลดสลิป"
    );
  }

  paymentTransactionRedirect(transaction.id);
}
