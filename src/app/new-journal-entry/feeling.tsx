import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  useWindowDimensions,
  SafeAreaView,
  Text,
  FlatList,
  Alert,
  Pressable,
} from "react-native";

import { Button } from "../../components/button";
import { FeelingIcon } from "../../components/feeling-icon";
import { useAppTheme } from "../../hooks/useAppTheme";

const emotionMap = {
  興奮: {
    text: "興奮",
  },
  面白い: {
    text: "面白い",
  },
  嬉しい: {
    text: "嬉しい",
  },
  達成感: {
    text: "達成感",
  },
  楽しい: {
    text: "楽しい",
  },
  感謝: {
    text: "感謝",
  },
  好き: {
    text: "好き",
  },
};

const feelings = [
  {
    text: "興奮",
    fillColor: "#F55634",
  },
  {
    text: "面白い",
    fillColor: "#F88D5F",
  },
  {
    text: "嬉しい",
    fillColor: "#FFBA69",
  },
  {
    text: "達成感",
    fillColor: "#F0B966",
  },
  {
    text: "楽しい",
    fillColor: "#F2B339",
  },
  {
    text: "感謝",
    fillColor: "#E8D849",
  },
  {
    text: "好き",
    fillColor: "#EC9A88",
  },
];

const JournalFeeling = () => {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);

  const onPressFeeling = (feeling: string) => {
    if (selectedFeelings.includes(feeling)) {
      return setSelectedFeelings(
        selectedFeelings.filter((_feeling) => _feeling !== feeling)
      );
    }

    if (selectedFeelings.length >= 3) {
      Alert.alert("最大３つまで選んでください");
      return;
    }

    setSelectedFeelings(selectedFeelings.concat([feeling]));
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
                  data={feelings}
                  renderItem={({ item }) => {
                    const isSelected = selectedFeelings.includes(item.text);

                    return (
                      <Pressable
                        key={item.text}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: itemWidth,
                          height: 62,
                          marginVertical: 16,
                          gap: 4,
                        }}
                        onPress={() => onPressFeeling(item.text)}
                      >
                        <FeelingIcon fill={item.fillColor} />
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
                          {item.text}
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
            <Button onPress={() => Alert.alert("Go to next scrreen")}>
              次へ
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default JournalFeeling;
