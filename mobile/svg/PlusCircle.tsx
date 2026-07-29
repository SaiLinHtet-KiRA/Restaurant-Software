import * as React from "react";
import Svg, { Path } from "react-native-svg";
const PlusCirlce: SVGComponent = (props) => (
  <Svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} {...props}>
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </Svg>
);
export default PlusCirlce;
