import { View } from "react-native";

import { useAppTheme } from "../hooks/useAppTheme";

type Props = React.PropsWithChildren;

export const Card = ({ children }: Props) => {
  const theme = useAppTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.white,
        paddingVertical: 29,
        paddingHorizontal: 16,
        borderRadius: 16,
        gap: 16,
      }}
    >
      {children}
    </View>
  );
};
