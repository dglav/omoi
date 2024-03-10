import { useRouter } from "expo-router";
import { View, useWindowDimensions, SafeAreaView, Text } from "react-native";

import { Button } from "../../components/button";
import { ConditionIcon } from "../../components/condition-icon-200";
import { useAppTheme } from "../../hooks/useAppTheme";

const JournalCondition = () => {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        backgroundColor: theme.colors.background,
      }}
    >
      <SafeAreaView>
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
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <View
              style={{
                width,
                paddingVertical: 16,
                paddingHorizontal: 28,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: theme.fontStyle.xl[1].size,
                  fontWeight: theme.fontStyle.xl[1].weight,
                }}
              >
                今、どんな調子？
              </Text>
              <View style={{ marginTop: 108, alignSelf: "center" }}>
                <ConditionIcon stroke="#F86D6D" />
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              paddingHorizontal: 16,
            }}
          >
            <Button>次へ</Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default JournalCondition;
