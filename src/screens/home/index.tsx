import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MyHome } from "./MyHome";
import { PartnerHome } from "./PartnerHome";
import { Text } from "../../components/text";
import { useAppTheme } from "../../hooks/useAppTheme";

export default function HomeScreen() {
  const theme = useAppTheme();
  const [activeTab, setActiveTab] = useState<"me" | "partner">("me");

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
      edges={{
        top: "additive",
        bottom: "off",
      }}
    >
      <View style={{ height: 12 }} />

      <View>
        <Text
          style={{
            fontSize: theme.fontStyle.lg[1].size,
            fontWeight: theme.fontStyle.lg[1].weight,
            letterSpacing: 2,
          }}
        >
          Omoi
        </Text>
      </View>

      <View style={{ height: 12 }} />

      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Pressable
          style={{
            paddingVertical: 10,
            paddingHorizontal: 16,
            backgroundColor:
              activeTab === "me" ? "white" : theme.colors.background,
            borderRadius: 50,
          }}
          onPress={() => setActiveTab("me")}
        >
          <Text>あなた</Text>
        </Pressable>

        <Pressable
          style={{
            paddingVertical: 10,
            paddingHorizontal: 16,
            backgroundColor:
              activeTab === "partner" ? "white" : theme.colors.background,
            borderRadius: 50,
          }}
          onPress={() => setActiveTab("partner")}
        >
          <Text>パートナー</Text>
        </Pressable>
      </View>

      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: theme.colors.textLight,
          marginTop: 8,
        }}
      />

      {activeTab === "me" && <MyHome />}
      {activeTab === "partner" && <PartnerHome />}

      <StatusBar />
    </SafeAreaView>
  );
}
