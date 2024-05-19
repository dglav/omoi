import { Image, View } from "react-native";
import { Text } from "react-native-paper";

import { Button } from "../../../components/button";
import { Modal } from "../../../components/modal";
import { useAppTheme } from "../../../hooks/useAppTheme";

type Props = {
  visible: boolean;
  onConfirm: () => void;
};

export const PostSuccessModal = ({ visible, onConfirm }: Props) => {
  const theme = useAppTheme();
  return (
    <Modal visible={visible}>
      <View style={{ alignSelf: "center", position: "relative" }}>
        <Image
          source={require("../../../../assets/undraw_checklist__re_2w7v 2.png")}
          style={{}}
        />

        <Text
          style={{
            position: "absolute",
            bottom: 16,
            left: 102,
            color: theme.colors.primary,
            fontSize: theme.fontStyle.xl[1].size,
            fontWeight: theme.fontStyle.xl[1].weight,
          }}
        >
          投稿完了！
        </Text>
      </View>

      <View style={{ height: 26 }} />

      <Text style={{ textAlign: "center" }}>
        感情ジャーナルが投稿されました！
      </Text>
      <Text style={{ textAlign: "center" }}>記録を継続していきましょう！</Text>

      <View style={{ height: 26 }} />

      <Button style={{ marginTop: 30 }} onPress={onConfirm}>
        OK
      </Button>
    </Modal>
  );
};
