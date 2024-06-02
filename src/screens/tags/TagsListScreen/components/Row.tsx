import { useRouter } from "expo-router";
import { Pencil, Trash2 } from "lucide-react-native";
import { Alert, TouchableOpacity, View } from "react-native";

import { Text } from "../../../../components/text";
import { useDeleteCustomTag } from "../../../../hooks/customTagHooks/useDeleteCustomTag";
import { useAppTheme } from "../../../../hooks/useAppTheme";
import { useStore } from "../../store/TagStore";

type Props = {
  id: string;
  name: string;
};

export const Row = ({ name, id }: Props) => {
  const theme = useAppTheme();
  const router = useRouter();

  const { setName } = useStore((state) => ({
    setName: state.setName,
  }));

  const mutation = useDeleteCustomTag();

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
            console.log(`/tags/${id}`);
            router.push(`/tags/${id}`);
          }}
        >
          <Pencil color={theme.colors.text} height={20} width={20} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "タグの削除",
              "選択したタグを削除します。よろしいですか？",
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
