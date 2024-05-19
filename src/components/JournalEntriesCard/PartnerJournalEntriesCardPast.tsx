import { format, parse, dayStart, dayEnd, addDay } from "@formkit/tempo";
import { View, Text } from "react-native";

import { Footer } from "./Footer";
import { JournalEntryRow } from "./JournalEntryRow";
import type { useGetPostGroups } from "../../hooks/postGroupHooks/useGetPostGroups";
import { useAppTheme } from "../../hooks/useAppTheme";

type Props = {
  postGroup: ReturnType<typeof useGetPostGroups>["data"][0];
};

export const PartnerJournalEntriesCardPast = ({ postGroup }: Props) => {
  const theme = useAppTheme();

  const now = new Date();
  const postGroupDate = parse(postGroup.postGroupDate, "YYYY-MM-DD");
  const dayOfTheWeek = new Intl.DateTimeFormat("ja-JP", {
    weekday: "short",
  }).format(postGroupDate);

  const startOfToday = dayStart(now);
  const endOfToday = dayEnd(now);
  const startOfYesterday = addDay(startOfToday, -1);
  const endOfYesterday = addDay(endOfToday, -1);

  const isYesterday =
    postGroupDate >= startOfYesterday && postGroupDate < endOfYesterday;
  const isBeforeYesterday = postGroupDate < startOfYesterday;

  return (
    <View key={postGroup.id}>
      {isYesterday && (
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
      )}

      {isBeforeYesterday && (
        <>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text
              style={{
                fontSize: theme.fontStyle.xxl[3].size,
                fontWeight: theme.fontStyle.xxl[3].weight,
              }}
            >
              {format(postGroupDate, "DD")}
            </Text>
            <Text
              style={{
                fontSize: theme.fontStyle.md[3].size,
                fontWeight: theme.fontStyle.md[3].weight,
              }}
            >
              ({dayOfTheWeek})
            </Text>
          </View>

          <View style={{ height: 16 }} />
        </>
      )}

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

        <Footer postGroupId={postGroup.id} />
      </View>
    </View>
  );
};
