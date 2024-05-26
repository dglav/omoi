import { usePathname, useRouter } from "expo-router";
import {
  View,
  useWindowDimensions,
  SafeAreaView,
  Text,
  FlatList,
  Alert,
  Pressable,
} from "react-native";

import { Button } from "../../../components/button";
import { FeelingIcon } from "../../../components/feeling-icon";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { feelingMap } from "./feelingMap";
import { useStore } from "../store/useStore";

const JournalFeeling = () => {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedFeelings, addFeeling, removeFeeling] = useStore((state) => [
    state.feelings,
    state.addFeeling,
    state.removeFeeling,
  ]);

  const onPressFeeling = (feeling: string) => {
    if (selectedFeelings.includes(feeling)) {
      return removeFeeling(feeling);
    }

    if (selectedFeelings.length >= 3) {
      Alert.alert("最大３つまで選んでください");
      return;
    }

    addFeeling(feeling);
  };

  const itemWidth = (width - 44) / 5;

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
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <View style={{ gap: 8, paddingHorizontal: 28 }}>
                <Text
                  style={{
                    fontSize: theme.fontStyle.xl[1].size,
                    fontWeight: theme.fontStyle.xl[1].weight,
                  }}
                >
                  どんな感情がある？
                </Text>
                <Text
                  style={{
                    fontSize: theme.fontStyle.md[3].size,
                    fontWeight: theme.fontStyle.md[3].weight,
                    color: theme.colors.textLight,
                  }}
                >
                  3つまで
                </Text>
              </View>

              <View style={{ paddingHorizontal: 22 }}>
                <FlatList
                  data={Object.entries(feelingMap)}
                  renderItem={({ item: [key, value] }) => {
                    const isSelected = selectedFeelings.includes(key);

                    return (
                      <Pressable
                        key={value.text}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: itemWidth,
                          height: 62,
                          marginVertical: 16,
                          gap: 4,
                        }}
                        onPress={() => onPressFeeling(key)}
                      >
                        <FeelingIcon fill={value.fillColor} />
                        <Text
                          style={{
                            fontSize: isSelected
                              ? theme.fontStyle.sm[1].size
                              : theme.fontStyle.xs[3].size,
                            fontWeight: isSelected
                              ? theme.fontStyle.sm[1].weight
                              : theme.fontStyle.xs[3].weight,
                            textDecorationLine: isSelected
                              ? "underline"
                              : "none",
                          }}
                        >
                          {value.text}
                        </Text>
                      </Pressable>
                    );
                  }}
                  horizontal={false}
                  numColumns={5}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              paddingHorizontal: 16,
            }}
          >
            <Button
              onPress={() =>
                router.push(pathname.replace("/feelings", "/tags"))
              }
            >
              次へ
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default JournalFeeling;
