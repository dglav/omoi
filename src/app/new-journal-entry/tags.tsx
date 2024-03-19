import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { Button } from "../../components/button";
import { useAppTheme } from "../../hooks/useAppTheme";
import { TagSection } from "../../screens/new-journal-entry/tags/TagSection";

const tags = {
  personal: ["体調", "健康", "悩み", "趣味", "アイデンティティ"],
  relationship: ["友人", "仕事仲間", "家族", "パートナー"],
  happenings: ["仕事", "学校", "バイト", "お金"],
  other: ["将来", "思い出", "その他"],
};

const JournalTags = () => {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const onPressTag = (feeling: string) => {
    if (selectedTags.includes(feeling)) {
      return setSelectedTags(
        selectedTags.filter((_feeling) => _feeling !== feeling),
      );
    }

    if (selectedTags.length >= 3) {
      Alert.alert("最大３つまで選んでください");
      return;
    }

    setSelectedTags(selectedTags.concat([feeling]));
  };

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
              width,
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <View
              style={{ gap: 8, paddingHorizontal: 28, paddingVertical: 16 }}
            >
              <Text
                style={{
                  fontSize: theme.fontStyle.xl[1].size,
                  fontWeight: theme.fontStyle.xl[1].weight,
                }}
              >
                関係していることは？
              </Text>
              <Text
                style={{
                  fontSize: theme.fontStyle.md[3].size,
                  fontWeight: theme.fontStyle.md[3].weight,
                }}
              >
                関連タグを設定することで、分析に役立ちます。
              </Text>
            </View>

            <TagSection
              title="自分自身"
              tags={tags.personal}
              selectedTags={selectedTags}
              onPressTag={onPressTag}
            />

            <TagSection
              title="関係性"
              tags={tags.relationship}
              selectedTags={selectedTags}
              onPressTag={onPressTag}
            />

            <TagSection
              title="出来事"
              tags={tags.happenings}
              selectedTags={selectedTags}
              onPressTag={onPressTag}
            />

            <TagSection
              title="その他"
              tags={tags.other}
              selectedTags={selectedTags}
              onPressTag={onPressTag}
            />
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
      </SafeAreaView>
    </View>
  );
};

export default JournalTags;
