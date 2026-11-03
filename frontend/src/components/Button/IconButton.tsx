import { createElement } from "react";
import clsx from "clsx";

type props = {
  svg: SVGComponent;
  className?: string;
};

export default function IconButton({ svg, className }: props) {
  return (
    <span className={clsx(className, "block size-8")}>
      {createElement(svg, { stroke: "white" })}
    </span>
  );
}
