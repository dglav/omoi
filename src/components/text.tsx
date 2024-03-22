import { Text as RNText, type TextProps as RNTextProps } from "react-native";

import { useAppTheme } from "../hooks/useAppTheme";

export const Text = ({ children, style, ...props }: RNTextProps) => {
  const theme = useAppTheme();
  return (
    <RNText
      {...props}
      style={{
        color: theme.colors.text,
        fontSize: theme.fontStyle.md[3].size,
        fontWeight: theme.fontStyle.md[3].weight,
        ...(typeof style === "object" ? style : {}),
      }}
    >
      {children}
    </RNText>
  );
};
