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
      <View
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: theme.colors.background,
        }}
      >
        <View
          style={{
            width,
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingHorizontal: 16,
            gap: 46,
          }}
        >
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
                fontSize: theme.fontStyle.xl[1].size,
                fontWeight: theme.fontStyle.xl[1].weight,
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
      </View>
    </ScreenContainer>
  );
};
