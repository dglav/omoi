import { View } from "react-native";

import { TagSection } from "./components/TagSection";
import { tagMap } from "./tagMap";
import { useStore } from "../../../store/useStore";

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

export const TagList = () => {
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
  );
};
