import { Text, View } from "react-native";

import { FeelingIcon_16 } from "./feeling-icon-16";
import { useAppTheme } from "../hooks/useAppTheme";
import { Feeling } from "../services/supabase/database/custom_feelings/converter";

type Props = React.PropsWithChildren & {
  feeling: Feeling;
};

export const MiniFeeling = ({ feeling }: Props) => {
  const theme = useAppTheme();

  const { name, color } = feeling;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 4,
      }}
    >
      <FeelingIcon_16 fill={color} />
      <Text
        style={{
          fontSize: theme.fontStyle.sm[3].size,
          fontWeight: theme.fontStyle.sm[3].weight,
        }}
      >
        {name}
      </Text>
    </View>
  );
};
