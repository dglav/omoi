import { addDay, parse } from "@formkit/tempo";
import { View, Text } from "react-native";

import { JournalEntryRow } from "./JournalEntryRow";
import type { useGetPostGroups } from "../../hooks/postGroupHooks/useGetPostGroups";
import { useAppTheme } from "../../hooks/useAppTheme";

type Props = {
  postGroup: ReturnType<typeof useGetPostGroups>["data"][0];
};

export const JournalEntriesCard = ({ postGroup }: Props) => {
  const theme = useAppTheme();

  const now = new Date();
  const postGroupDate = parse(postGroup.postGroupDate, "YYYY-MM-DD");
  const isToday = now.getDay() === postGroupDate.getDay();
  const isYesterday = now.getDay() === addDay(postGroupDate, 1).getDay();

  return (
    <View>
      {!isToday && isYesterday ? (
        <>
          <Text
            style={{
              fontSize: theme.fontStyle.xl[3].size,
              fontWeight: theme.fontStyle.xl[3].weight,
            }}
          >
            昨日
          </Text>
          <View style={{ height: 16 }} />
        </>
      ) : (
        <Text>{postGroup.postGroupDate}</Text>
      )}

      <View
        style={{
          backgroundColor: theme.colors.white,
          width: "100%",
          borderRadius: 16,
          paddingVertical: 24,
        }}
      >
        {postGroup.posts.map((post, index) => {
          return <JournalEntryRow key={post.id} post={post} />;
        })}
      </View>
    </View>
  );
};
