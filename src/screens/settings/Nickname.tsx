import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TextInput, View } from "react-native";

import { Button } from "../../components/button";
import { TitleSubtitleLayout } from "../../components/title-subtitle-layout";
import { useGetUser } from "../../hooks/userHooks/useGetUser";
import { useUpdateUser } from "../../hooks/userHooks/useUpdateUser";
import { theme } from "../../theme";

export default function NicknameScreen() {
  const router = useRouter();
  const { user } = useGetUser();
  const [nickname, setNickname] = useState<string>("");

  useEffect(() => {
    if (user) {
      setNickname(user.nickname ?? "");
    }
  }, [user]);

  const { mutate } = useUpdateUser({
    onSuccess: () => router.navigate("/settings"),
  });

  return (
    <TitleSubtitleLayout
      title="ニックネーム"
      subtitle="アプリ内で使うニックネームを入力してください"
    >
      <View style={{ height: 56 }} />

      <TextInput
        value={nickname}
        onChangeText={(text) => setNickname(text)}
        placeholder="ニックネーム(6文字まで)"
        autoCapitalize="none"
        textContentType="name"
        autoCorrect={false}
        autoFocus
        inputMode="text"
        style={{
          backgroundColor: theme.colors.white,
          fontSize: theme.fontStyle.md[3].size,
          fontWeight: theme.fontStyle.md[3].weight,
          paddingHorizontal: 16,
          paddingVertical: 17.5,
          borderRadius: 8,
        }}
      />

      <View style={{ height: 124 }} />

      <Button
        onPress={
          user ? () => mutate({ updatedUser: { nickname } }) : () => null
        }
      >
        保存
      </Button>
    </TitleSubtitleLayout>
  );
}
