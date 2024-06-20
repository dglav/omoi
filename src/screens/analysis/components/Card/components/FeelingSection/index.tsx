import { View } from "react-native";

import { Text } from "../../../../../../components/text";
import { useAppTheme } from "../../../../../../hooks/useAppTheme";
import { CategoryStats } from "./CategoryStats";
import { FeelingDot } from "./FeelingDot";

export const FeelingSection = () => {
  const theme = useAppTheme();

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
        <View
          style={{
            height: "100%",
            width: "36%",
            backgroundColor: "#6D9CF8",
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          }}
        />
        <View
          style={{ height: "100%", width: "24%", backgroundColor: "#7CD185" }}
        />
        <View
          style={{
            height: "100%",
            width: "40%",
            backgroundColor: "#F89F6D",
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
          }}
        />
      </View>

      <View style={{ height: 28 }} />

      <View style={{
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <CategoryStats title="不快感情" currentWeekPercentage={36} lastWeekPercentage={48} />
        <CategoryStats title="ニュートラル" currentWeekPercentage={24} lastWeekPercentage={12} />
        <CategoryStats title="快感情" currentWeekPercentage={40} lastWeekPercentage={40} />
      </View>

      <View style={{
        paddingHorizontal: 60,
        paddingTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        columnGap: 50,
        rowGap: 12
      }}>
        <FeelingDot />
        <FeelingDot />
        <FeelingDot />
        <FeelingDot />
        <FeelingDot />
        <FeelingDot />
      </View>
    </View>
  );
};
