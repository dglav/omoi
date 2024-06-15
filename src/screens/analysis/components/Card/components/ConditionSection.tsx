import { Circle } from "@shopify/react-native-skia";
import React from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SharedValue } from "react-native-reanimated";
import { Area, CartesianChart, useChartPressState } from "victory-native";

import { useAppTheme } from "../../../../../hooks/useAppTheme";

const DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  lowTmp: 20 + 10 * Math.random(),
  highTmp: 40 + 30 * Math.random(),
}));

const INIT_STATE = { x: 0, y: { highTmp: 0, lowTmp: 0 } } as const;

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
          yKeys={["lowTmp", "highTmp"]} // 👈 specify data keys used for y-axis
          axisOptions={{ tickCount: 5 }}
          chartPressState={state}
        >
          {({ points, chartBounds }) => {
            return (
              <>
                <Area
                  points={points.highTmp}
                  y0={chartBounds.bottom}
                  color="red"
                  animate={{ type: "timing", duration: 300 }}
                  curveType="natural"
                />
                <Area
                  points={points.lowTmp}
                  y0={chartBounds.bottom}
                  color="blue"
                  animate={{ type: "timing", duration: 300 }}
                  curveType="natural"
                />
                {isActive ? (
                  <ToolTip x={state.x.position} y={state.y.highTmp.position} />
                ) : null}
              </>
            );
          }}
        </CartesianChart>
      </GestureHandlerRootView>
    </View>
  );
};

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color="black" />;
}
