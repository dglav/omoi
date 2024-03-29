import { ChevronRight } from "lucide-react-native";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

import { useAppTheme } from "../../hooks/useAppTheme";

type Props = {
  icon: React.JSX.Element;
  text: string;
  onPress: () => void;
};

export const SettingsCardButton = ({ icon, text, onPress }: Props) => {
  const theme = useAppTheme();

  return (
    <Button
      onPress={onPress}
      contentStyle={{
        height: 36,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 12,
          }}
        >
          <View style={{ position: "relative", top: 2 }}>{icon}</View>
          <Text
            style={{
              position: "relative",
              top: 4,
              fontSize: theme.fontStyle.sm["3"].size,
              fontWeight: theme.fontStyle.sm["3"].weight,
            }}
          >
            {text}
          </Text>
        </View>

        <ChevronRight
          size="20"
          color={theme.colors.text}
          style={{ position: "relative", top: 2 }}
        />
      </View>
    </Button>
  );
};
