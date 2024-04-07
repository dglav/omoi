import { addDay, parse } from "@formkit/tempo";
import { View, Text } from "react-native";

import { JournalEntryRow } from "./JournalEntryRow";
import type { useGetPostGroups } from "../../hooks/postGroupHooks/useGetPostGroups";
import { useAppTheme } from "../../hooks/useAppTheme";
import { JournalEntryHeader } from "./JournalEntryHeader";

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

      {!isToday && !isYesterday && <Text>{postGroup.postGroupDate}</Text>}

      <View
        style={{
          backgroundColor: theme.colors.white,
          width: "100%",
          borderRadius: 16,
          paddingVertical: 24,
        }}
      >
        {postGroup.posts.map((post, index) => {
          if (isToday && index === 0) {
            return <JournalEntryHeader key={post.id} post={post} />;
          }
          return (
            <>
              {isToday && index === 1 && (
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      height: 1,
                      width: "92%",
                      backgroundColor: theme.colors.textLight,
                    }}
                  />
                </View>
              )}
              <JournalEntryRow key={post.id} post={post} />
            </>
          );
        })}
      </View>
    </View>
  );
};
