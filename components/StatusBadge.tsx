export function StatusBadge({
  membership,
  role,
  compact = false
}: {
  membership: string;
  role?: string;
  compact?: boolean;
}) {
  const isAdmin = role === "admin";
  const isPremium = membership === "paid";
  const showPremiumSpark = isPremium && !isAdmin;
  const label = isAdmin ? "admin" : isPremium ? "premium" : "free";
  const variantClass = isAdmin
    ? "status-badge-admin"
    : isPremium
      ? "status-badge-premium"
      : "status-badge-free";

  return (
    <span
      className={`status-badge ${variantClass} ${
        compact ? "status-badge-compact" : "status-badge-regular"
      }`}
    >
      {showPremiumSpark ? <span aria-hidden="true" className="status-badge-spark" /> : null}
      <span className="status-badge-content">{label}</span>
    </span>
  );
}
