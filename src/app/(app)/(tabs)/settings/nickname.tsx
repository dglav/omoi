import { useState } from "react";
import { TextInput, View } from "react-native";

import { TitleSubtitleLayout } from "../../../../components/title-subtitle-layout";
import { theme } from "../../../../theme";

export default function Nickname() {
  const [nickname, setNickname] = useState<string>("");

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
    </TitleSubtitleLayout>
  );
}
