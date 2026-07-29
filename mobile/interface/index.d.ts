import { FunctionComponent } from "react";

declare global {
  type SVGComponent = FunctionComponent<{
    stroke: string;
  }>;
}
