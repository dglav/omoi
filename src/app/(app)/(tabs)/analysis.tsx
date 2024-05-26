import { Circle } from "@shopify/react-native-skia";
import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { SharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Area, CartesianChart, useChartPressState } from "victory-native";

const DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  lowTmp: 20 + 10 * Math.random(),
  highTmp: 40 + 30 * Math.random(),
}));

const INIT_STATE = { x: 0, y: { highTmp: 0, lowTmp: 0 } } as const;

const AnalysisRoute = () => {
  const theme = useTheme();

  const { state, isActive } = useChartPressState(INIT_STATE);

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: theme.colors.background,
      }}
    >
      <Text>Analysis</Text>

      <GestureHandlerRootView style={{ width: "100%" }}>
        <View style={{ height: 500 }}>
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
                    <ToolTip
                      x={state.x.position}
                      y={state.y.highTmp.position}
                    />
                  ) : null}
                </>
              );
            }}
          </CartesianChart>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color="black" />;
}

export default AnalysisRoute;
