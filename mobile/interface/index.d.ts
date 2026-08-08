import { FunctionComponent } from "react";

declare global {
  type SVGComponent = FunctionComponent<{
    stroke: string;
    strokeWidth?: number;
    width?: number;
    height?: number;
  }>;
}
