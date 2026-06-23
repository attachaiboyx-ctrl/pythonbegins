export type PaymentSettings = {
  promptpayId: string;
  price: number;
  merchantName: string;
};

function tlv(id: string, value: string) {
  return `${id}${value.length.toString().padStart(2, "0")}${value}`;
}

function normalizePromptPayId(promptpayId: string) {
  const digits = promptpayId.replace(/\D/g, "");

  if (digits.length === 10 && digits.startsWith("0")) {
    return { tag: "01", value: `0066${digits.slice(1)}` };
  }

  if (digits.length === 13) {
    return { tag: "02", value: digits };
  }

  if (digits.length === 15) {
    return { tag: "03", value: digits };
  }

  throw new Error("PROMPTPAY_ID must be a phone number, national ID, or e-wallet ID.");
}

function crc16CcittFalse(payload: string) {
  let crc = 0xffff;

  for (let index = 0; index < payload.length; index += 1) {
    crc ^= payload.charCodeAt(index) << 8;

    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function getPaymentSettings(): PaymentSettings {
  return {
    promptpayId: process.env.PROMPTPAY_ID || "0812345678",
    price: Number(process.env.COURSE_PRICE || "399"),
    merchantName: process.env.MERCHANT_NAME || "Python Beginner Academy"
  };
}

export function generatePromptPayPayload(promptpayId: string, amount?: number) {
  const account = normalizePromptPayId(promptpayId);
  const merchantAccount = tlv("00", "A000000677010111") + tlv(account.tag, account.value);
  const amountField = amount && amount > 0 ? tlv("54", amount.toFixed(2)) : "";
  const payload =
    tlv("00", "01") +
    tlv("01", amountField ? "12" : "11") +
    tlv("29", merchantAccount) +
    tlv("52", "0000") +
    tlv("53", "764") +
    amountField +
    tlv("58", "TH") +
    "6304";

  return `${payload}${crc16CcittFalse(payload)}`;
}
