import { Pressable, View } from "react-native";

import { Text } from "../text";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useGetPartner } from "../../hooks/userHooks/useGetPartner";
import { useGetUser } from "../../hooks/userHooks/useGetUser";

type Props = {
  title: string;
  activeTab: "me" | "partner";
  setActiveTab: (tab: "me" | "partner") => void;
};

export const Header = ({ title, activeTab, setActiveTab }: Props) => {
  const theme = useAppTheme();
  const { user: me } = useGetUser();
  const { user: partner } = useGetPartner();

  const myNickname = me?.nickname;
  const partnerNickname = partner?.nickname;

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
          {title}
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
          <Text>{myNickname ? myNickname : "あなた"}</Text>
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
          <Text>{partnerNickname ? partnerNickname : "パートナー"}</Text>
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
