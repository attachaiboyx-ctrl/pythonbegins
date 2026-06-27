import "server-only";

const OMISE_API_BASE_URL = "https://api.omise.co";
const OMISE_REQUEST_TIMEOUT_MS = 15_000;

type OmiseKeyType = "public" | "secret";

export type OmiseSource = {
  id: string;
  livemode: boolean;
  object: "source";
  type: string;
};

export type OmiseCharge = {
  id: string;
  object: "charge";
  livemode: boolean;
  amount: number;
  currency: string;
  status: string;
  paid: boolean;
  paid_at?: string | null;
  failure_code?: string | null;
  failure_message?: string | null;
  metadata?: Record<string, unknown> | null;
  source?: {
    type?: string;
    scannable_code?: {
      image?: {
        download_uri?: string;
      };
    } | null;
  } | null;
};

export type OmiseEvent = {
  id: string;
  object: "event";
  key: string;
  livemode: boolean;
  data?: {
    id?: string;
    object?: string;
  } | null;
};

export type GatewayTransactionStatus =
  | "pending"
  | "successful"
  | "failed"
  | "cancelled";

function getTestApiKey(type: OmiseKeyType) {
  const variableName = type === "public" ? "OMISE_PUBLIC_KEY" : "OMISE_SECRET_KEY";
  const expectedPrefix = type === "public" ? "pkey_test_" : "skey_test_";
  const value = process.env[variableName]?.trim();

  if (!value) {
    throw new Error(`${variableName} is not configured.`);
  }

  if (!value.startsWith(expectedPrefix)) {
    throw new Error(`${variableName} must be a test mode key for this release.`);
  }

  return value;
}

async function omiseRequest<T>(
  path: string,
  keyType: OmiseKeyType,
  options: RequestInit = {}
) {
  const apiKey = getTestApiKey(keyType);
  const response = await fetch(`${OMISE_API_BASE_URL}${path}`, {
    ...options,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
      ...options.headers
    },
    signal: AbortSignal.timeout(OMISE_REQUEST_TIMEOUT_MS)
  });

  if (!response.ok) {
    let providerMessage = `HTTP ${response.status}`;

    try {
      const errorBody = (await response.json()) as { message?: string };
      providerMessage = errorBody.message || providerMessage;
    } catch {
      // Keep the HTTP status when Opn does not return a JSON error body.
    }

    throw new Error(`Opn API request failed: ${providerMessage}`);
  }

  return (await response.json()) as T;
}

export async function createOmisePromptPaySource({
  amount,
  currency
}: {
  amount: number;
  currency: string;
}) {
  const body = new URLSearchParams({
    amount: String(amount),
    currency,
    type: "promptpay"
  });

  return omiseRequest<OmiseSource>("/sources", "public", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });
}

export async function createOmiseCharge({
  amount,
  currency,
  sourceId,
  transactionId,
  userId
}: {
  amount: number;
  currency: string;
  sourceId: string;
  transactionId: string;
  userId: string;
}) {
  const body = new URLSearchParams({
    amount: String(amount),
    currency,
    source: sourceId,
    description: "Python Begins Premium",
    "metadata[transaction_id]": transactionId,
    "metadata[user_id]": userId
  });

  return omiseRequest<OmiseCharge>("/charges", "secret", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });
}

export function retrieveOmiseCharge(chargeId: string) {
  return omiseRequest<OmiseCharge>(
    `/charges/${encodeURIComponent(chargeId)}`,
    "secret"
  );
}

export function retrieveOmiseEvent(eventId: string) {
  return omiseRequest<OmiseEvent>(
    `/events/${encodeURIComponent(eventId)}`,
    "secret"
  );
}

export function getOmiseChargeQrCodeUrl(charge: OmiseCharge) {
  return charge.source?.scannable_code?.image?.download_uri || null;
}

export function getOmiseChargeStatus(
  charge: OmiseCharge
): GatewayTransactionStatus {
  if (charge.status === "successful" && charge.paid) {
    return "successful";
  }

  if (charge.status === "failed") {
    return "failed";
  }

  if (["expired", "reversed"].includes(charge.status)) {
    return "cancelled";
  }

  return "pending";
}

export function readOmiseMetadata(charge: OmiseCharge, key: string) {
  const value = charge.metadata?.[key];
  return typeof value === "string" ? value : null;
}
