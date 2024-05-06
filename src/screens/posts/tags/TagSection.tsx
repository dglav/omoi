import { View } from "react-native";

import { Chip } from "../../../components/chip";
import { Text } from "../../../components/text";
import { theme } from "../../../theme";

type TagSectionProps = {
  title: string;
  tags: { value: string; text: string }[];
  selectedTags: string[];
  onPressTag: (tag: string) => void;
};

const TagSection = ({
  title,
  tags,
  selectedTags,
  onPressTag,
}: TagSectionProps) => {
  return (
    <View
      style={{
        paddingHorizontal: 28,
        paddingVertical: 16,
        display: "flex",
        gap: 12,
      }}
    >
      <Text
        style={{
          color: theme.colors.textLight,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag.value);

          return (
            <Chip
              key={tag.value}
              isSelected={isSelected}
              onPress={() => onPressTag(tag.value)}
            >
              {tag.text}
            </Chip>
          );
        })}
      </View>
    </View>
  );
};

export { TagSection };