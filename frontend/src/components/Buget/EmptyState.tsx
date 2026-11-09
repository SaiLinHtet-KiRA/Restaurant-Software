import { createElement } from "react";
import type { ReactNode } from "react";

type Props = {
  text: string;
  subtitle?: string;
  SVG?: SVGComponent;
  className?: string;
  children?: ReactNode;
};

export default function EmptyState({
  text,
  subtitle,
  SVG,
  className,
  children,
}: Props) {
  return (
    <div
      className={`flex flex-1 flex-col items-center justify-center gap-3 py-16 text-center ${className ?? ""}`}
    >
      {SVG ? (
        <span className="flex size-16 items-center justify-center rounded-full bg-black/5 p-4 opacity-60">
          {createElement(SVG, { stroke: "currentColor" })}
        </span>
      ) : null}
      <div className="flex flex-col gap-1">
        <span className="text-lg font-bold">{text}</span>
        {subtitle ? (
          <span className="max-w-[42ch] text-sm opacity-60">{subtitle}</span>
        ) : null}
      </div>
      {children}
    </div>
  );
}
