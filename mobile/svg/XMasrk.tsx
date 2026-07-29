import * as React from "react";
import Svg, { Path } from "react-native-svg";
const XMasrk: SVGComponent = (props) => (
  <Svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} {...props}>
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </Svg>
);
export default XMasrk;
