import { View } from "react-native";

import { Text } from "../../../../../../components/text";
import { useAppTheme } from "../../../../../../hooks/useAppTheme";
import { CategoryStats } from "./components/CategoryStats";
import { FeelingDot } from "./components/FeelingDot";
import { useGetTimeBoundFeelings } from "./hooks/useGetTimeBoundFeelings";

export const FeelingSection = () => {
  const theme = useAppTheme();
  const {
    currentWeek: {
      topEmotions: currentWeekTopEmotions,
      goodEmotionCount: currentWeekGoodEmotionCount,
      averageEmotionCount: currentWeekAverageEmotionCount,
      badEmotionCount: currentWeekBadEmotionCount,
      totalEmotionCount: currentWeekTotalEmotionCount,
    },
  } = useGetTimeBoundFeelings();

  const shouldDisplayFeelingStatusBar =
    typeof currentWeekGoodEmotionCount === "number" &&
    typeof currentWeekAverageEmotionCount === "number" &&
    typeof currentWeekBadEmotionCount === "number" &&
    typeof currentWeekTotalEmotionCount === "number";

  if (!shouldDisplayFeelingStatusBar) {
    return <View style={{ width: "100%" }} />;
  }

  const goodFeelingPercentage = 100 * currentWeekGoodEmotionCount /
    currentWeekTotalEmotionCount;
  const averageFeelingPercentage = 100 * currentWeekAverageEmotionCount /
    currentWeekTotalEmotionCount;
  const badFeelingPercentage = 100 * currentWeekBadEmotionCount /
    currentWeekTotalEmotionCount;

  return (
    <View style={{ width: "100%" }}>
      <View style={{ gap: 4, alignItems: "center" }}>
        <Text
          style={{
            fontSize: theme.fontStyle.md[1].size,
            fontWeight: theme.fontStyle.md[1].weight,
          }}
        >
          感情比率
        </Text>
        <Text
          style={{
            fontSize: theme.fontStyle.xs[3].size,
            fontWeight: theme.fontStyle.xs[3].weight,
          }}
        >
          (先週比)
        </Text>
      </View>

      <View style={{ height: 16 }} />

      <View
        style={{
          height: 20,
          width: "100%",
          flexDirection: "row",
          paddingHorizontal: 20,
        }}
      >
        {goodFeelingPercentage === 0 && averageFeelingPercentage === 0 &&
          badFeelingPercentage === 0
          ? (
            <Text
              style={{
                width: "100%",
                fontSize: theme.fontStyle.xs[3].size,
                fontWeight: theme.fontStyle.xs[3].weight,
                textAlign: "center",
              }}
            >
              感情データはありません！
            </Text>
          )
          : (
            <>
              <View
                style={{
                  height: "100%",
                  width: `${badFeelingPercentage}%`,
                  backgroundColor: "#6D9CF8",
                  borderTopLeftRadius: 16,
                  borderBottomLeftRadius: 16,
                  borderTopRightRadius: averageFeelingPercentage === 0 &&
                    goodFeelingPercentage === 0
                    ? 16
                    : 0,
                  borderBottomRightRadius: averageFeelingPercentage === 0 &&
                    goodFeelingPercentage === 0
                    ? 16
                    : 0,
                }}
              />
              <View
                style={{
                  height: "100%",
                  width: `${averageFeelingPercentage}%`,
                  backgroundColor: "#7CD185",
                  borderTopLeftRadius: badFeelingPercentage === 0 ? 16 : 0,
                  borderBottomLeftRadius: badFeelingPercentage === 0 ? 16 : 0,
                  borderTopRightRadius: goodFeelingPercentage === 0 ? 16 : 0,
                  borderBottomRightRadius: goodFeelingPercentage === 0 ? 16 : 0,
                }}
              />
              <View
                style={{
                  height: "100%",
                  width: `${goodFeelingPercentage}%`,
                  backgroundColor: "#F89F6D",
                  borderTopLeftRadius:
                    badFeelingPercentage === 0 && averageFeelingPercentage === 0
                      ? 16
                      : 0,
                  borderBottomLeftRadius:
                    badFeelingPercentage === 0 && averageFeelingPercentage === 0
                      ? 16
                      : 0,
                  borderTopRightRadius: 16,
                  borderBottomRightRadius: 16,
                }}
              />
            </>
          )}
      </View>

      <View style={{ height: 28 }} />

      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
        }}
      >
        <CategoryStats
          title="不快感情"
          currentWeekPercentage={Math.round(badFeelingPercentage)}
        // lastWeekPercentage={48}
        />
        <CategoryStats
          title="ニュートラル"
          currentWeekPercentage={Math.round(averageFeelingPercentage)}
        // lastWeekPercentage={12}
        />
        <CategoryStats
          title="快感情"
          currentWeekPercentage={Math.round(goodFeelingPercentage)}
        // lastWeekPercentage={40}
        />
      </View>

      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 16,
          flexDirection: "row",
          flexWrap: "wrap",
          rowGap: 12,
        }}
      >
        {currentWeekTopEmotions.map((emotion) => {
          const text = emotion[0];
          const color = emotion[1].color;
          return <FeelingDot key={emotion[0]} text={text} color={color} />;
        })}
      </View>
    </View>
  );
};
