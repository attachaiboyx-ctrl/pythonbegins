export function StatusBadge({
  membership,
  role,
  compact = false
}: {
  membership: string;
  role?: string;
  compact?: boolean;
}) {
  const isPaid = membership === "paid" || role === "admin";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-bold ${
        compact ? "text-xs" : "text-sm"
      } ${
        isPaid
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-blue-200 bg-brand-50 text-brand-700"
      }`}
    >
      {role === "admin" ? "admin" : isPaid ? "premium" : "free"}
    </span>
  );
}
