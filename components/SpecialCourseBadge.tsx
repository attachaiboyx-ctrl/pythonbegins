export function SpecialCourseBadge({
  label = "Landing",
  tone = "cyan"
}: {
  label?: string;
  tone?: "cyan" | "blue";
}) {
  const toneClass =
    tone === "blue"
      ? "border-blue-300 bg-blue-50 text-blue-800 shadow-blue-300/30"
      : "border-cyan-300 bg-cyan-50 text-cyan-800 shadow-cyan-300/30";

  return (
    <span className={`special-course-badge inline-flex items-center rounded-full border px-3 py-1 text-xs font-black shadow-sm ${toneClass}`}>
      {label}
    </span>
  );
}
