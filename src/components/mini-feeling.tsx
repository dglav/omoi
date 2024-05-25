import { View, Text } from "react-native";

import { FeelingIcon_16 } from "./feeling-icon-16";
import { useAppTheme } from "../hooks/useAppTheme";
import { feelingMap } from "../utils/feelingMap";

type Props = React.PropsWithChildren & {
  feeling: string;
};

export const MiniFeeling = ({ feeling }: Props) => {
  const theme = useAppTheme();
  const feelingValue = feelingMap[feeling];

  if (!feelingValue) {
    return undefined;
  }

  const { fillColor, text } = feelingValue;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 4,
      }}
    >
      <FeelingIcon_16 fill={fillColor} />
      <Text
        style={{
          fontSize: theme.fontStyle.sm[3].size,
          fontWeight: theme.fontStyle.sm[3].weight,
        }}
      >
        {text}
      </Text>
    </View>
  );
};
