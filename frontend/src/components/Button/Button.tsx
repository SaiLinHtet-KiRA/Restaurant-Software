import { createElement } from "react";
import clsx from "clsx";

type Props = {
  className?: string;
  SVG: SVGComponent;
  text: string;
  disabled: boolean;
  onClik: () => void;
  size?: "sm" | "md";
};

export default function Button({
  text,
  onClik,
  className,
  disabled,
  SVG,
  size = "md",
}: Props) {
  const small = size === "sm";
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClik}
      className={clsx(
        "press inline-flex shrink-0 flex-row items-center bg-sky-600 shadow-soft hover:bg-sky-700 hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 disabled:opacity-60 disabled:hover:bg-sky-600",
        small
          ? "h-8 gap-1 rounded-lg px-2.5"
          : "h-10 gap-2 rounded-xl px-4",
        className,
      )}
    >
      <span className={small ? "block size-4" : "block size-5"}>
        {createElement(SVG, { stroke: "white" })}
      </span>
      <span
        className={clsx(
          "font-semibold text-white",
          small ? "text-xs" : "text-sm",
        )}
      >
        {text}
      </span>
    </button>
  );
}
