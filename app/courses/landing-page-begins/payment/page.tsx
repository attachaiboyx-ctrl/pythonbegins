import { redirect } from "next/navigation";

export default function LegacyLandingPagePaymentPage() {
  redirect("/payment?product=landing-page-begins");
}
