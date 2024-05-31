import { usePathname, useRouter } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";

import { AddTag } from "./components/AddTag";
import { TagSection } from "./components/TagSection";
import { tagMap } from "./tagMap";
import { Button } from "../../../components/button";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { useStore } from "../store/useStore";

const tags = Object.entries(tagMap).reduce(
  (
    tagLists: {
      personal: { value: string; text: string }[];
      relationship: { value: string; text: string }[];
      happenings: { value: string; text: string }[];
      other: { value: string; text: string }[];
    },
    [key, value],
  ) => {
    if (value.category === "personal") {
      tagLists.personal = tagLists.personal.concat([
        { value: key, text: value.text },
      ]);
    }
    if (value.category === "relationship") {
      tagLists.relationship = tagLists.relationship.concat([
        { value: key, text: value.text },
      ]);
    }
    if (value.category === "happenings") {
      tagLists.happenings = tagLists.happenings.concat([
        { value: key, text: value.text },
      ]);
    }
    if (value.category === "other") {
      tagLists.other = tagLists.other.concat([
        { value: key, text: value.text },
      ]);
    }
    return tagLists;
  },
  {
    personal: [],
    relationship: [],
    happenings: [],
    other: [],
  },
);

const JournalTags = () => {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedTags, addTag, removeTag] = useStore((state) => [
    state.tags,
    state.addTag,
    state.removeTag,
  ]);

  const onPressTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      return removeTag(tag);
    }

    addTag(tag);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <KeyboardAvoidingView
        contentContainerStyle={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "position" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: theme.colors.background,
              paddingVertical: 16,
            }}
          >
            <View
              style={{
                width,
                gap: 8,
                paddingHorizontal: 28,
                paddingVertical: 16,
              }}
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

            <ScrollView
              contentContainerStyle={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
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

              <View style={{ height: 24 }} />

              <AddTag />
            </ScrollView>
            <View
              style={{
                width: "100%",
                paddingHorizontal: 16,
              }}
            >
              <Button
                onPress={() => router.push(pathname.replace("/tags", "/note"))}
              >
                次へ
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default JournalTags;
