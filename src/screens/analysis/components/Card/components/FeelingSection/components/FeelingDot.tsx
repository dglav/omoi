import { View } from "react-native";

import { FeelingIcon_32 } from "../../../../../../../components/Icons/feeling-icon-32";
import { Text } from "../../../../../../../components/text";
import { useAppTheme } from "../../../../../../../hooks/useAppTheme";

type Props = {
  text: string;
  color: string;
};

export const FeelingDot = ({ text, color }: Props) => {
  const theme = useAppTheme();

  return (
    <View
      style={{
        width: 104,
        gap: 6,
        alignItems: "center",
      }}
    >
      <FeelingIcon_32 fill={color} />
      <Text
        style={{
          fontSize: theme.fontStyle.xs[3].size,
          fontWeight: theme.fontStyle.xs[3].weight,
        }}
      >
        {text}
      </Text>
    </View>
  );
};
