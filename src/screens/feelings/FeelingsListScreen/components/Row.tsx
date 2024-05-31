import { useRouter } from "expo-router";
import { Pencil, Trash2 } from "lucide-react-native";
import { Alert, TouchableOpacity, View } from "react-native";

import { Text } from "../../../../components/text";
import { useDeleteCustomFeeling } from "../../../../hooks/customFeelingHooks/useDeleteCustomFeeling";
import { useAppTheme } from "../../../../hooks/useAppTheme";
import { EmotionLevel } from "../../../../services/supabase/database/custom_feelings/converter";
import { useStore } from "../../store/FeelingStore";

type Props = {
  name: string;
  emotionLevel: EmotionLevel;
  id: string;
};

export const Row = ({ name, emotionLevel, id }: Props) => {
  const theme = useAppTheme();
  const router = useRouter();

  const { setName, setEmotionLevel } = useStore((state) => ({
    setName: state.setName,
    setEmotionLevel: state.setEmotionLevel,
  }));

  const mutation = useDeleteCustomFeeling();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text>{name}</Text>

      <View style={{ flexDirection: "row", gap: 24 }}>
        <TouchableOpacity
          onPress={() => {
            setName(name);
            setEmotionLevel(emotionLevel);
            console.log(`/feelings/${id}`);
            router.push(`/feelings/${id}`);
          }}
        >
          <Pencil color={theme.colors.text} height={20} width={20} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "感情の削除",
              "選択した感情を削除します。よろしいですか？",
              [
                { text: "キャンセル", style: "cancel" },
                {
                  text: "削除",
                  onPress: () => mutation.mutate({ id }),
                  style: "destructive",
                },
              ],
            );
          }}
        >
          <Trash2 color={theme.colors.text} height={20} width={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
