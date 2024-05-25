import { View, useWindowDimensions } from "react-native";

import { MiniFeeling } from "../../../components/mini-feeling";
import { TagPill } from "../../../components/tag-pill";

type Props = {
  feelings: string[];
  tags: string[];
};

export const Header = ({ feelings, tags }: Props) => {
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        width,
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <View style={{ gap: 8, padding: 16 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
          }}
        >
          {feelings.map((feeling) => (
            <MiniFeeling key={feeling} feeling={feeling} />
          ))}
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
          }}
        >
          {tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </View>
      </View>
    </View>
  );
};
