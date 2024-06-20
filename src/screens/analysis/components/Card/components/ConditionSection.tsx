import {
  Circle,
  LinearGradient,
  listFontFamilies,
  matchFont,
  useFont,
  vec,
} from "@shopify/react-native-skia";
import React from "react";
import { Platform, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SharedValue } from "react-native-reanimated";
import { Area, CartesianChart, useChartPressState } from "victory-native";

import { useAppTheme } from "../../../../../hooks/useAppTheme";

const DATA = Array.from({ length: 7 }, (_, i) => ({
  day: i,
  lowTmp: 20 + 10 * Math.random(),
  highTmp: 40 + 30 * Math.random(),
}));

const INIT_STATE = { x: 0, y: { highTmp: 0, lowTmp: 0 } } as const;

const h = 400;
const w = 0;

const fontFamlies = listFontFamilies();
console.log({ fontFamlies });
const fontFamily = Platform.select({
  ios: "Hiragino Maru Gothic ProN",
  default: "serif",
});
const fontStyle = {
  fontFamily,
  fontSize: 14,
  fontStyle: "italic" as const,
  fontWeight: "bold" as const,
};
const font = matchFont(fontStyle);

export const ConditionSection = () => {
  const theme = useAppTheme();

  const { state, isActive } = useChartPressState(INIT_STATE);

  return (
    <View style={{ width: "100%" }}>
      <Text
        style={{
          fontSize: theme.fontStyle.md[1].size,
          fontWeight: theme.fontStyle.md[1].weight,
          marginVertical: 24,
          textAlign: "center",
        }}
      >
        調子
      </Text>

      <GestureHandlerRootView
        style={{ height: 300, width: "100%", paddingHorizontal: 32 }}
      >
        <CartesianChart
          data={DATA} // 👈 specify your data
          xKey="day" // 👈 specify data key for x-axis

          yKeys={["highTmp"]} // 👈 specify data keys used for y-axis
          domain={{ y: [0, 100] }}
          // padding={{ left: 4, right: 10 }}
          // domainPadding={{
          //   left: 10, right: 20
          // }}
          axisOptions={{
            tickCount: {
              x: 7,
              y: 0,
            },
            // font,
            // tickValues: {
            //   x: [0, 1, 2, 3, 4, 5, 6],
            //   y: [],
            // },
          }}
        >
          {({ points, chartBounds }) => {
            return (
              <>
                <Area
                  points={points.highTmp}
                  y0={chartBounds.bottom}
                  animate={{ type: "timing", duration: 300 }}
                  curveType="natural"
                >
                  <LinearGradient
                    start={vec(w / 2, 50)}
                    end={vec(w / 2, h)}
                    colors={["#F17129", "#FDDECD"]}
                  />
                </Area>
                {isActive ? (
                  <ToolTip x={state.x.position} y={state.y.highTmp.position} />
                ) : null}
              </>
            );
          }}
        </CartesianChart>

        <View style={{
          flexDirection: 'row',
          width: "100%",
          justifyContent: 'space-between'
        }}>
          {DATA.map((value) => {
            const date = new Date();
            return (
              <View style={{
                alignItems: 'center'
              }}>
                <Text>{`${date.getMonth() + 1}/${date.getDay()}`}</Text>
                <Text>{date.toLocaleString('ja-JP', { weekday: 'short' })}</Text>
              </View>)
          })}
        </View>
      </GestureHandlerRootView>

    </View >
  );
};

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color="black" />;
}
