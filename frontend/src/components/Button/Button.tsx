import { createElement } from "react";
import clsx from "clsx";

type Props = {
  className?: string;
  SVG: SVGComponent;
  text: string;
  disabled: boolean;
  onClik: () => void;
};

export default function Button({
  text,
  onClik,
  className,
  disabled,
  SVG,
}: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClik}
      className={clsx(
        "flex flex-row items-center gap-1 px-3 py-2 md:gap-1.5 md:px-6 md:py-4 rounded-lg bg-sky-600 disabled:opacity-60",
        className,
      )}
    >
      <span className="block size-8 md:size-12 ">
        {createElement(SVG, { stroke: "white" })}
      </span>
      <span className="font-bold text-white text-base md:text-xl">{text}</span>
    </button>
  );
}
