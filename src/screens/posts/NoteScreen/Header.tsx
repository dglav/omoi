import { useWindowDimensions, View } from "react-native";

import { MiniFeeling } from "../../../components/mini-feeling";
import { TagPill } from "../../../components/tag-pill";
import { Feeling } from "../../../services/supabase/database/custom_feelings/converter";

type Props = {
  feelings: Feeling[];
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
            <MiniFeeling key={feeling.id} feeling={feeling} />
          ))}
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
          }}
        >
          {tags.map((tag) => <TagPill key={tag} tag={tag} />)}
        </View>
      </View>
    </View>
  );
};
