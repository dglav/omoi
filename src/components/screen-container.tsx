import { View, SafeAreaView, useWindowDimensions } from "react-native";

import { useAppTheme } from "../hooks/useAppTheme";

type Props = React.PropsWithChildren;

export const ScreenContainer = ({ children }: Props) => {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        backgroundColor: theme.colors.background,
      }}
    >
      <SafeAreaView>
        <View style={{ width }}>{children}</View>
      </SafeAreaView>
    </View>
  );
};
