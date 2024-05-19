import { Pressable, View } from "react-native";

import { Text } from "../../components/text";
import { useAppTheme } from "../../hooks/useAppTheme";

type Props = {
  activeTab: "me" | "partner";
  setActiveTab: (tab: "me" | "partner") => void;
};

export const Header = ({ activeTab, setActiveTab }: Props) => {
  const theme = useAppTheme();

  return (
    <>
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
            backgroundColor: activeTab === "me" ? "white" : "#F3D9D3",
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
    </>
  );
};
