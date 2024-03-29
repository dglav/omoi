import { View, Text } from "react-native";

import { useAppTheme } from "../../hooks/useAppTheme";

type Props = { title: string } & React.PropsWithChildren;

export const SettingsCard = ({ title, children }: Props) => {
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
      <Text
        style={{
          fontSize: theme.fontStyle.md[1].size,
          fontWeight: theme.fontStyle.md[1].weight,
        }}
      >
        {title}
      </Text>

      <View
        style={{
          width: "100%",
          display: "flex",
          gap: 16,
        }}
      >
        {children}
      </View>
    </View>
  );
};
