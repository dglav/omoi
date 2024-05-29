import { useGlobalSearchParams, useRouter } from "expo-router";
import { SafeAreaView, View } from "react-native";

import { OptionsList } from "../../../components/OptionsList";
import { Button } from "../../../components/button";
import { Text } from "../../../components/text";
import { useUpdateCustomFeeling } from "../../../hooks/customFeelingHooks/useUpdateCustomFeeling";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { EmotionLevel } from "../../../services/supabase/database/custom_feelings/converter";
import { emotionLevelOptions } from "../../../utils/emotionLevelOptions";
import { useStore } from "../store/FeelingStore";

export const EditFeelingsScreenLevelScreen = () => {
  const theme = useAppTheme();
  const router = useRouter();
  const { id } = useGlobalSearchParams();

  const { name, emotionLevel, setEmotionLevel } = useStore(
    ({ name, emotionLevel, setEmotionLevel }) => ({
      name,
      emotionLevel,
      setEmotionLevel,
    }),
  );

  const mutation = useUpdateCustomFeeling();

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.background,
        display: "flex",
        flex: 1,
      }}
    >
      <View
        style={{
          paddingTop: 56,
          paddingHorizontal: 16,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View style={{ gap: 16 }}>
          <Text
            style={{
              fontSize: theme.fontStyle.xl[1].size,
              fontWeight: theme.fontStyle.xl[1].weight,
            }}
          >
            どの感情に登録しますか？
          </Text>

          <OptionsList
            options={emotionLevelOptions}
            handleSelectOption={(value) =>
              setEmotionLevel(value as EmotionLevel)
            }
            selectedOption={emotionLevelOptions.find(
              (_emotionLevelOption) =>
                _emotionLevelOption.value === emotionLevel,
            )}
          />
        </View>

        <Button
          onPress={() => {
            if (typeof id === "string" && name && emotionLevel) {
              mutation.mutate({ id, name, emotionLevel });
              router.navigate("/posts/new");
            }
          }}
        >
          保存
        </Button>
      </View>
    </SafeAreaView>
  );
};
