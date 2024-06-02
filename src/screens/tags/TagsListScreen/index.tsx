import { SafeAreaView, ScrollView, View } from "react-native";

import { Row } from "./components/Row";
import { Card } from "../../../components/Card";
import { Text } from "../../../components/text";
import { useGetCustomTags } from "../../../hooks/customTagHooks/useGetCustomTags";
import { useAppTheme } from "../../../hooks/useAppTheme";

export const TagsListScreen = () => {
  const theme = useAppTheme();
  const { data: customTags, isLoading } = useGetCustomTags();

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
          追加したタグ
        </Text>

        {!isLoading && customTags?.length && (
          <Card>
            <ScrollView>
              <View style={{ gap: 32 }}>
                {customTags.map((tag) => (
                  <Row key={tag.id} id={tag.id} name={tag.name} />
                ))}
              </View>
            </ScrollView>
          </Card>
        )}
      </View>
    </SafeAreaView>
  );
};
