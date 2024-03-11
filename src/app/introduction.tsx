import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { ArrowRightIcon } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { View, useWindowDimensions, Animated } from "react-native";

import { HAS_VIEWED_INTRODUCTION } from "../asyncStorageConstants";
import { Button } from "../components/button";
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

  const handleViewedIntroduction = async () => {
    try {
      await AsyncStorage.setItem(HAS_VIEWED_INTRODUCTION, "true");
      router.push("/");
    } catch (e) {
      console.error("setting to async store failed", e);
    }
  };

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
          <Button onPress={handleViewedIntroduction}>Omoiを始める</Button>
        ) : (
          <Button
            onPress={() => setPagerIndex((currentIndex) => currentIndex + 1)}
          >
            次へ <ArrowRightIcon color={theme.colors.white} />
          </Button>
        )}
        {pagerIndex < 2 && (
          <Button variant="secondary" onPress={() => router.push("/")}>
            スキップして始める
          </Button>
        )}
      </View>
    </View>
  );
};

export default IntroductionScreen;
