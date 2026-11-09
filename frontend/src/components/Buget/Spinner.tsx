import clsx from "clsx";

export default function Spinner({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(
        "flex flex-1 items-center justify-center py-10 text-sky-600",
        className,
      )}
    >
      <div
        className="block size-10 animate-spin rounded-full border-4"
        style={{
          borderColor: "color-mix(in srgb, currentColor 20%, transparent)",
          borderTopColor: "currentColor",
        }}
      />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
