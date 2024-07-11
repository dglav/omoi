import { LinearGradient, vec } from "@shopify/react-native-skia";
import React from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Area, CartesianChart } from "victory-native";

import { useAppTheme } from "../../../../../../hooks/useAppTheme";
import { useGetTimeBoundConditions } from "./hooks/useGetTimeBoundConditions";
import { addDay } from "@formkit/tempo";
import { useAnalysisScreenStore } from "../../../../hooks/useAnalysisScreenStore";
import type { Post } from "../../../../../../services/supabase/database/posts/converter";

const h = 400;
const w = 0;

type Props = {
  currentWeekPosts: Post[];
  isLoading: boolean;
};

export const ConditionSection = ({ currentWeekPosts, isLoading }: Props) => {
  const theme = useAppTheme();
  const { startDate } = useAnalysisScreenStore();
  const {
    timeBoundConditions,
  } = useGetTimeBoundConditions({ currentWeekPosts, isLoading });

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
        {!isLoading && (
          <CartesianChart
            data={timeBoundConditions} // 👈 specify your data
            xKey="dayDiff" // 👈 specify data key for x-axis
            yKeys={["conditionLevel"]} // 👈 specify data keys used for y-axis
            domain={{ x: [0, 6], y: [0, 4] }}
            axisOptions={{
              tickCount: {
                x: 7,
                y: 0,
              },
            }}
          >
            {({ points, chartBounds }) => {
              return (
                <Area
                  points={points.conditionLevel}
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
              );
            }}
          </CartesianChart>
        )}

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6].map((dayDiff) => {
            const currentDate = addDay(startDate, dayDiff);
            const month = currentDate.getMonth() + 1;
            const day = currentDate.getDate();
            const weekday = currentDate.toLocaleString("ja-JP", {
              weekday: "short",
            });

            return (
              <View
                key={`${month}/${day}`}
                style={{
                  alignItems: "center",
                }}
              >
                <Text>{`${month}/${day}`}</Text>
                <Text>{weekday}</Text>
              </View>
            );
          })}
        </View>
      </GestureHandlerRootView>
    </View>
  );
};
