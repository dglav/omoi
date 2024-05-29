import { SafeAreaView, ScrollView, View } from "react-native";

import { Row } from "./components/Row";
import { Card } from "../../../components/Card";
import { Text } from "../../../components/text";
import { useGetCustomFeelings } from "../../../hooks/customFeelingHooks/useGetCustomFeelings";
import { useAppTheme } from "../../../hooks/useAppTheme";

export const FeelingsListScreen = () => {
  const theme = useAppTheme();
  const { data: customFeelings, isLoading } = useGetCustomFeelings();

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.background,
        display: "flex",
        flex: 1,
      }}
    >
      <View
        style={{
          paddingTop: 24,
          paddingBottom: 48,
          paddingHorizontal: 16,
          gap: 16,
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: theme.fontStyle.xl[1].size,
            fontWeight: theme.fontStyle.xl[1].weight,
          }}
        >
          追加した感情
        </Text>

        {!isLoading && customFeelings?.length && (
          <Card>
            <ScrollView>
              <View style={{ gap: 32 }}>
                {customFeelings.map((feeling) => (
                  <Row
                    key={feeling.id}
                    id={feeling.id}
                    name={feeling.name}
                    emotionLevel={feeling.emotionLevel}
                  />
                ))}
              </View>
            </ScrollView>
          </Card>
        )}
      </View>
    </SafeAreaView>
  );
};
