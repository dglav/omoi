import { useState } from "react";
import { Alert, View } from "react-native";
import { HelperText } from "react-native-paper";

import { TextInput } from "../../../../components/TextInput";
import { Button } from "../../../../components/button";
import { useCreateCustomFeeling } from "../../../../hooks/customFeelingHooks/useCreateCustomFeeling";
import { useAppTheme } from "../../../../hooks/useAppTheme";

const maxTagLength = 8;

export const AddTag = () => {
  const [tagName, setTagName] = useState("");
  const theme = useAppTheme();

  const mutation = useCreateCustomFeeling();

  const handleRegister = () => {
    if (!tagName.length) {
      Alert.alert("入力エラー");
      return;
    }

    // mutation.mutate({ name: tagName });
    setTagName("");
  };

  return (
    <View
      style={{
        paddingLeft: 28,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          alignItems: "center",
        }}
      >
        <View style={{ width: 200 }}>
          <TextInput
            placeholder="タグを追加(8文字)"
            value={tagName}
            updateValue={setTagName}
          />
        </View>
        <Button
          size="sm"
          disabled={tagName.length === 0 || tagName.length > maxTagLength}
          onPress={() => handleRegister()}
        >
          追加
        </Button>
      </View>

      {tagName.length > 0 && tagName.length > maxTagLength && (
        <HelperText type="error">最大８文字の感情を入力してください</HelperText>
      )}
    </View>
  );
};
