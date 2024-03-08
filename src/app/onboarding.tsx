import { ArrowRightIcon } from "lucide-react-native";
import { useState } from "react";
import { View, Alert, useWindowDimensions } from "react-native";
import { Button } from "react-native-paper";

import { useAppTheme } from "../hooks/useAppTheme";
import Pager from "../screens/onboarding/pager";

const OnboardingScreen = () => {
  const theme = useAppTheme();
  const { height } = useWindowDimensions();
  const [pagerIndex, setPagerIndex] = useState(0);

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
        <Pager index={pagerIndex} />
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
            onPress={() => Alert.alert("go to next section")}
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
            onPress={() => Alert.alert("go to next section")}
          >
            スキップして始める
          </Button>
        )}
      </View>
    </View>
  );
};

export default OnboardingScreen;
