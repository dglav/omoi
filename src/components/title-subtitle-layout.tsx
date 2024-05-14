import { View, Text, useWindowDimensions } from "react-native";

import { ScreenContainer } from "./screen-container";
import { useAppTheme } from "../hooks/useAppTheme";

type Props = React.PropsWithChildren & {
  title: string;
  subtitle?: string;
};

export const TitleSubtitleLayout = ({ title, subtitle, children }: Props) => {
  const { width } = useWindowDimensions();
  const theme = useAppTheme();

  return (
    <ScreenContainer>
      <View style={{ paddingHorizontal: 16, paddingTop: 48 }}>
        <View
          style={{
            width,
            paddingVertical: 16,
            display: "flex",
            justifyContent: "flex-start",
            gap: 16,
          }}
        >
          <Text
            style={{
              fontSize: theme.fontStyle.xxl[1].size,
              fontWeight: theme.fontStyle.xxl[1].weight,
            }}
          >
            {title}
          </Text>

          {subtitle && (
            <Text
              style={{
                fontSize: theme.fontStyle.md[1].size,
                fontWeight: theme.fontStyle.md[1].weight,
              }}
            >
              {subtitle}
            </Text>
          )}
        </View>
        {children}
      </View>
    </ScreenContainer>
  );
};
