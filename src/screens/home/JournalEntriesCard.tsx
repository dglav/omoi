import { View, Text } from "react-native";

import { JournalEntryRow } from "./JournalEntryRow";
import type { useGetPostGroups } from "../../hooks/postGroupHooks/useGetPostGroups";
import { useAppTheme } from "../../hooks/useAppTheme";

type Props = {
  postGroup: ReturnType<typeof useGetPostGroups>["data"][0];
};

export const JournalEntriesCard = ({ postGroup }: Props) => {
  const theme = useAppTheme();
  const isToday =
    new Date().getDay() === Number(postGroup.postGroupDate?.split("-").at(-1));

  return (
    <View>
      {!isToday && <Text>{postGroup.postGroupDate}</Text>}

      <View
        style={{
          backgroundColor: theme.colors.white,
          width: "100%",
          borderRadius: 16,
          paddingVertical: 24,
        }}
      >
        {postGroup.posts.map((post) => {
          return <JournalEntryRow key={post.id} post={post} />;
        })}
      </View>
    </View>
  );
};
