// Manual PromptPay pricing is intentionally separate from the inactive gateway config.
export const MANUAL_PREMIUM_PRICE_THB = 219;
export const WEB_APP_BEGINS_PRICE_THB = 299;
export const LANDING_PAGE_BEGINS_PRICE_THB = 200;

export const WEB_APP_BEGINS_PRODUCT_TYPE = "web-app-begins" as const;
export const PREMIUM_PRODUCT_TYPE = "premium" as const;
export const LANDING_PAGE_BEGINS_PRODUCT_TYPE =
  "landing-page-begins" as const;

export type ManualPaymentProductType =
  | typeof WEB_APP_BEGINS_PRODUCT_TYPE
  | typeof PREMIUM_PRODUCT_TYPE
  | typeof LANDING_PAGE_BEGINS_PRODUCT_TYPE;

export const manualPaymentProducts = {
  [WEB_APP_BEGINS_PRODUCT_TYPE]: {
    title: "Web App Begins",
    price: WEB_APP_BEGINS_PRICE_THB
  },
  [PREMIUM_PRODUCT_TYPE]: {
    title: "Premium",
    price: MANUAL_PREMIUM_PRICE_THB
  },
  [LANDING_PAGE_BEGINS_PRODUCT_TYPE]: {
    title: "Landing Page Begins",
    price: LANDING_PAGE_BEGINS_PRICE_THB
  }
} as const;

export function isManualPaymentProductType(
  value: string
): value is ManualPaymentProductType {
  return Object.prototype.hasOwnProperty.call(manualPaymentProducts, value);
}
