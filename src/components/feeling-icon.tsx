import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function FeelingIcon({ fill }: { fill: string }) {
  return (
    <Svg width="61" height="40" viewBox="0 0 61 40" fill="none">
      <Path
        d="M31.934 4.95234C36.2921 4.7404 40.9645 5.3846 43.8007 8.79262C46.7302 12.3126 46.9659 17.2959 45.9657 21.8127C44.9646 26.3333 42.5277 30.4537 38.5291 32.5984C34.3725 34.8278 29.5075 34.7864 25.1651 32.9691C20.4189 30.9827 15.4538 27.7814 14.6057 22.5862C13.7872 17.5727 17.8818 13.4586 21.3963 9.88213C24.2818 6.94577 27.8783 5.14957 31.934 4.95234Z"
        fill={fill}
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </Svg>
  );
}
