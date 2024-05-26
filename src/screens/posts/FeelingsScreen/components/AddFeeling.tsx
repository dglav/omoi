import { useState } from "react";
import { Alert, View } from "react-native";
import { HelperText } from "react-native-paper";

import { Input } from "./Input";
import { FullScreenModal } from "../../../../components/FullScreenModal";
import { OptionsList } from "../../../../components/OptionsList";
import { Button } from "../../../../components/button";
import { FeelingIcon_20 } from "../../../../components/feeling-icon-20";
import { Text } from "../../../../components/text";
import { useCreateCustomFeeling } from "../../../../hooks/customFeelingHooks/useCreateCustomFeeling";
import { useAppTheme } from "../../../../hooks/useAppTheme";
import { EmotionLevel } from "../../../../services/supabase/database/custom_feelings/converter";
import { emotionLevelColorMap } from "../feelingMap";

const maxFeelingLength = 4;

const emotionLevels = [
  {
    text: "とてもポジティブ",
    value: "very positive",
    icon: <FeelingIcon_20 fill={emotionLevelColorMap["very positive"]} />,
  },
  {
    text: "ポジティブ",
    value: "positive",
    icon: <FeelingIcon_20 fill={emotionLevelColorMap["positive"]} />,
  },
  {
    text: "ふつう",
    value: "average",
    icon: <FeelingIcon_20 fill={emotionLevelColorMap["average"]} />,
  },
  {
    text: "ネガティブ",
    value: "negative",
    icon: <FeelingIcon_20 fill={emotionLevelColorMap["negative"]} />,
  },
  {
    text: "とてもネガティブ",
    value: "very negative",
    icon: <FeelingIcon_20 fill={emotionLevelColorMap["very negative"]} />,
  },
];

export const AddFeeling = () => {
  const [name, setName] = useState("");
  const [emotionLevel, setEmotionLevel] = useState<EmotionLevel | "">("");
  const [isEmotionLevelModalShown, setIsEmotionLevelModalShown] =
    useState(false);
  const theme = useAppTheme();

  const mutation = useCreateCustomFeeling();

  const handleRegister = () => {
    if (!name.length || emotionLevel === "") {
      Alert.alert("入力エラー");
      setIsEmotionLevelModalShown(false);
      return;
    }

    mutation.mutate({ name, emotionLevel });
    setIsEmotionLevelModalShown(false);
    setName("");
  };

  return (
    <>
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
            <Input value={name} updateValue={setName} />
          </View>
          <Button
            size="sm"
            disabled={name.length === 0 || name.length > maxFeelingLength}
            onPress={() => setIsEmotionLevelModalShown(true)}
          >
            追加
          </Button>
        </View>

        {name.length > 0 && name.length > maxFeelingLength && (
          <HelperText type="error">
            最大４文字の感情を入力してください
          </HelperText>
        )}
      </View>

      <FullScreenModal
        visible={isEmotionLevelModalShown}
        onDismiss={() => {
          setName("");
          setEmotionLevel("");
          setIsEmotionLevelModalShown(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            paddingHorizontal: 24,
          }}
        >
          <View>
            <View style={{ height: 82 }} />

            <Text
              style={{
                fontSize: theme.fontStyle.xl[1].size,
                fontWeight: theme.fontStyle.xl[1].weight,
              }}
            >{`「${name}」をどの感情に登録しますか？`}</Text>

            <View style={{ height: 24 }} />

            <OptionsList
              options={emotionLevels}
              handleSelectOption={(value) =>
                setEmotionLevel(value as EmotionLevel)
              }
              selectedOption={emotionLevels.find(
                (_emotionLevel) => _emotionLevel.value === emotionLevel,
              )}
            />
          </View>

          <Button
            onPress={() => {
              handleRegister();
            }}
          >
            感情を登録
          </Button>
        </View>
      </FullScreenModal>
    </>
  );
};
