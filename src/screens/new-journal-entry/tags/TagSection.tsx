import { View } from "react-native";
import { Chip, Text } from "react-native-paper";

import { theme } from "../../../theme";

type TagSectionProps = {
  title: string;
  tags: string[];
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
          fontSize: theme.fontStyle.md[3].size,
          fontWeight: theme.fontStyle.md[3].weight,
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
          const isSelected = selectedTags.includes(tag);

          return (
            <Chip
              key={tag}
              mode={isSelected ? "flat" : "outlined"}
              style={{
                borderWidth: 0,
              }}
              onPress={() => onPressTag(tag)}
            >
              {tag}
            </Chip>
          );
        })}
      </View>
    </View>
  );
};

export { TagSection };
