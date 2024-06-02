import { View } from "react-native";

import { TagSection } from "./components/TagSection";
import { useGetTags } from "./hooks/useGetTags";
import { useStore } from "../../../store/useStore";

export const TagList = () => {
  const [selectedTags, addTag, removeTag] = useStore((state) => [
    state.tags,
    state.addTag,
    state.removeTag,
  ]);

  const tags = useGetTags();

  const onPressTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      return removeTag(tag);
    }

    addTag(tag);
  };

  return (
    <View>
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
