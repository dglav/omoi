import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  View,
  useWindowDimensions,
  SafeAreaView,
  Image,
  Text,
} from "react-native";

import { FIRST_SIGN_IN } from "../../../asyncStorageConstants";
import { Button } from "../../../components/button";
import { useAppTheme } from "../../../hooks/useAppTheme";

const TutorialScreen = () => {
  const theme = useAppTheme();
  const { height, width } = useWindowDimensions();
  const router = useRouter();

  const onCompleteTutorial = () => AsyncStorage.setItem(FIRST_SIGN_IN, "true");

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
            <Image
              source={require("../../../../assets/undraw_joyride_re_968t 1.png")}
            />
            <Text
              style={{
                fontSize: theme.fontStyle.xxl[1].size,
                fontWeight: theme.fontStyle.xxl[1].weight,
                textAlign: "center",
                marginTop: 40,
              }}
            >
              今の感情を入力してみよう！
            </Text>
            <Text
              style={{
                fontSize: theme.fontStyle.md[1].size,
                fontWeight: theme.fontStyle.md[1].weight,
                textAlign: "center",
                marginTop: 24,
              }}
            >
              日々の感情を記録しましょう
            </Text>
          </View>
        </SafeAreaView>
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
        <Button
          onPress={async () => {
            await onCompleteTutorial();
            router.push("/new-journal-entry/condition");
          }}
        >
          感情ジャーナルをスタート
        </Button>
        <Button
          variant="secondary"
          onPress={async () => {
            await onCompleteTutorial();
            router.push("/(tabs)/home");
          }}
        >
          スキップ
        </Button>
      </View>
    </View>
  );
};

export default TutorialScreen;
