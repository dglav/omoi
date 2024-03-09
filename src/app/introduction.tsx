import { useRouter } from "expo-router";
import { ArrowRightIcon } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { View, useWindowDimensions, Animated } from "react-native";
import { Button } from "react-native-paper";

import { useAppTheme } from "../hooks/useAppTheme";
import Pager from "../screens/introduction/pager";

const IntroductionScreen = () => {
  const theme = useAppTheme();
  const { height } = useWindowDimensions();
  const [pagerIndex, setPagerIndex] = useState(0);
  const { width } = useWindowDimensions();
  const router = useRouter();

  const flatListRef = useRef(null);

  useEffect(() => {
    if (!!pagerIndex && pagerIndex >= 0 && flatListRef.current) {
      (flatListRef.current as any).scrollToIndex({ index: pagerIndex });
    }
  }, [flatListRef, pagerIndex]);

  const scrollX = useRef(new Animated.Value(0)).current;

  scrollX.addListener(({ value }) => {
    const aaa = [0, width, width * 2];
    if (aaa.includes(value)) {
      setPagerIndex(value / width);
    }
  });

  return (
    <View
      style={{
        display: "flex",
        height,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Pager flatListRef={flatListRef} scrollX={scrollX} />
      </View>
      <View
        style={{
          backgroundColor: theme.colors.white,
          width: "100%",
          paddingVertical: 24,
          paddingHorizontal: 16,
          gap: 16,
          height: 172,
        }}
      >
        {pagerIndex === 2 ? (
          <Button
            mode="contained"
            labelStyle={{
              marginVertical: 16,
              fontSize: theme.fontStyle.lg[1].size,
              fontWeight: theme.fontStyle.lg[1].weight,
            }}
            onPress={() => router.push("/")}
          >
            Omoiを始める
          </Button>
        ) : (
          <Button
            mode="contained"
            labelStyle={{
              marginVertical: 16,
              fontSize: theme.fontStyle.lg[1].size,
              fontWeight: theme.fontStyle.lg[1].weight,
            }}
            onPress={() => setPagerIndex((currentIndex) => currentIndex + 1)}
          >
            次へ <ArrowRightIcon color={theme.colors.white} />
          </Button>
        )}
        {pagerIndex < 2 && (
          <Button
            mode="text"
            labelStyle={{
              marginVertical: 16,
              fontSize: theme.fontStyle.lg[1].size,
              fontWeight: theme.fontStyle.lg[1].weight,
              color: theme.colors.text,
            }}
            onPress={() => router.push("/")}
          >
            スキップして始める
          </Button>
        )}
      </View>
    </View>
  );
};

export default IntroductionScreen;
