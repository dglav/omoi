import { SafeAreaView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Footer } from "./components/Footer";
import { MyMessage } from "./components/MyMessage";
import { PartnerMessage } from "./components/PartnerMessage";
import { useAppTheme } from "../../../hooks/useAppTheme";

export const PostGroupChat = () => {
  const insets = useSafeAreaInsets();
  const theme = useAppTheme();

  return (
    <View style={{ backgroundColor: "white" }}>
      <SafeAreaView
        style={{
          marginBottom: insets.bottom,
          backgroundColor: theme.colors.background,
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <View style={{ paddingTop: 32, paddingHorizontal: 16, gap: 28 }}>
            <MyMessage />
            <PartnerMessage />
          </View>

          <Footer />
        </View>
      </SafeAreaView>
    </View>
  );
};
