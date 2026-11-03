import type { FunctionComponent } from "react";

declare global {
  type SVGComponent = FunctionComponent<{
    stroke?: string;
    strokeWidth?: number;
    width?: number | string;
    height?: number | string;
    className?: string;
    fill?: string;
  }>;
}

export {};
