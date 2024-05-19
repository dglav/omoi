import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppTheme } from "../../hooks/useAppTheme";

type Props = React.PropsWithChildren & { activeTab: "me" | "partner" };

export const Container = ({ activeTab, children }: Props) => {
  const theme = useAppTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor:
          activeTab === "me" ? theme.colors.background : "#F3D9D3",
      }}
      edges={{
        top: "additive",
        bottom: "off",
      }}
    >
      {children}
      <StatusBar />
    </SafeAreaView>
  );
};
