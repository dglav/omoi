import { useRouter } from "expo-router";
import { Pencil, Trash2 } from "lucide-react-native";
import { Alert, TouchableOpacity, View } from "react-native";

import { Text } from "../../../../components/text";
import { useAppTheme } from "../../../../hooks/useAppTheme";

type Props = {
  name: string;
  id: string;
};

export const Row = ({ name, id }: Props) => {
  const theme = useAppTheme();
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text>{name}</Text>

      <View style={{ flexDirection: "row", gap: 24 }}>
        <TouchableOpacity onPress={() => router.push(`/feelings/${id}`)}>
          <Pencil color={theme.colors.text} height={20} width={20} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Alert.alert("delete");
          }}
        >
          <Trash2 color={theme.colors.text} height={20} width={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
