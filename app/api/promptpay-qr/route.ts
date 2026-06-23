import QRCode from "qrcode";
import { NextResponse } from "next/server";
import { generatePromptPayPayload, getPaymentSettings } from "@/lib/promptpay";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const settings = getPaymentSettings();
  const amount = Number(searchParams.get("amount") || settings.price);

  try {
    const payload = generatePromptPayPayload(settings.promptpayId, amount);
    const png = await QRCode.toBuffer(payload, {
      color: {
        dark: "#182033",
        light: "#ffffff"
      },
      margin: 2,
      width: 420
    });

    return new NextResponse(new Uint8Array(png), {
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "image/png"
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Cannot generate PromptPay QR code"
      },
      { status: 400 }
    );
  }
}
