import { Ref } from "react";
import {
  FlatList,
  Image,
  View,
  useWindowDimensions,
  Text,
  Animated,
  SafeAreaView,
} from "react-native";

import { useAppTheme } from "../../hooks/useAppTheme";

const data = [
  {
    id: "1",
    image: require("../../../assets/undraw_joyride_re_968t 1.png"),
    headerText: "日々の感情を記録しましょう",
  },
  {
    id: "2",
    image: require("../../../assets/undraw_online_dating_re_hu03 1.png"),
    headerText: "感情と共に日常を分かち合おう",
    subText:
      "投稿に対してリアクションやコメントが可能です。日常的な話題にもどうぞ。",
  },
  {
    id: "3",
    image: require("../../../assets/Group 66.png"),
    headerText: "日々の記録からお互いを再発見しよう",
    subText: "お互いの感情のリズムや傾向から、相互理解を深めていきましょう",
  },
];

type PagerProps = {
  scrollX: Animated.Value;
  flatListRef?: Ref<FlatList> | null;
};

function Pager({ flatListRef, scrollX }: PagerProps) {
  const { width } = useWindowDimensions();
  const theme = useAppTheme();

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <FlatList
        ref={flatListRef}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        data={data}
        renderItem={({ item }) => (
          <SafeAreaView>
            <View
              style={{
                width,
                paddingHorizontal: 28,
                marginTop: 56,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Image source={item.image} />
              <Text
                style={{
                  fontSize: theme.fontStyle.xxl[1].size,
                  fontWeight: theme.fontStyle.xxl[1].weight,
                  textAlign: "center",
                  marginTop: 40,
                }}
              >
                {item.headerText}
              </Text>
              {item.subText && (
                <Text
                  style={{
                    fontSize: theme.fontStyle.md[1].size,
                    fontWeight: theme.fontStyle.md[1].weight,
                    textAlign: "center",
                    marginTop: 24,
                  }}
                >
                  {item.subText}
                </Text>
              )}
            </View>
          </SafeAreaView>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={32}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          marginBottom: 10,
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 50,
          backgroundColor: "#BFBFBF44",
        }}
      >
        {data.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

          const dotColor = scrollX.interpolate({
            inputRange,
            outputRange: ["#00000030", "#000000", "#00000030"],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={i}
              style={{
                width: 8,
                height: 8,
                backgroundColor: dotColor,
                borderRadius: 50,
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

export default Pager;
