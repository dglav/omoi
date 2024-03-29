import { View, SafeAreaView } from "react-native";

import { useAppTheme } from "../hooks/useAppTheme";

type Props = React.PropsWithChildren;

export const ScreenContainer = ({ children }: Props) => {
  const theme = useAppTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        backgroundColor: theme.colors.background,
      }}
    >
      <SafeAreaView>{children}</SafeAreaView>
    </View>
  );
};
