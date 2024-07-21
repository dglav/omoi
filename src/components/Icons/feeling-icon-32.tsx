import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function FeelingIcon_32({ fill }: { fill: string }) {
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <Path
        d="M17.434 0.952337C21.7921 0.740404 26.4645 1.3846 29.3007 4.79262C32.2302 8.31263 32.4659 13.2959 31.4657 17.8127C30.4646 22.3333 28.0277 26.4537 24.0291 28.5984C19.8725 30.8278 15.0075 30.7864 10.6651 28.9691C5.91886 26.9827 0.95376 23.7814 0.105671 18.5862C-0.712754 13.5727 3.38184 9.45856 6.8963 5.88213C9.78179 2.94577 13.3783 1.14957 17.434 0.952337Z"
        fill={fill}
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </Svg>
  );
}
