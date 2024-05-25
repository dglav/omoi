import { dayStart, dayEnd, parse, addDay, format } from "@formkit/tempo";
import { useRouter } from "expo-router";
import { SquarePen } from "lucide-react-native";
import { ScrollView, View, Text } from "react-native";
import { FAB } from "react-native-paper";

import { CreateNewJournalEntryCard } from "./CreateNewJournalEntryCard";
import { MyJournalEntriesCardPast } from "../../components/JournalEntriesCard/MyJournalEntriesCardPast";
import { MyJournalEntriesCardToday } from "../../components/JournalEntriesCard/MyJournalEntriesCardToday";
import { Push } from "../../components/Push";
import { useGetPostGroups } from "../../hooks/postGroupHooks/useGetPostGroups";
import { useAppTheme } from "../../hooks/useAppTheme";

export const MyHome = () => {
  const theme = useAppTheme();
  const router = useRouter();
  const { data: postGroups } = useGetPostGroups({
    who: "me",
    options: {
      laterThan: dayStart(addDay(new Date(), -2)),
    },
  });
  const hasWrittenJournalEntryToday =
    postGroups[0]?.postGroupDate === format(new Date(), "YYYY-MM-DD");

  const now = new Date();
  const hour = new Date().getHours();
  const isMorning = hour > 6 && hour < 12;

  return (
    <>
      <ScrollView style={{ width: "100%" }}>
        <View style={{ height: 40 }} />

        <View
          style={{
            gap: 16,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%",
            paddingHorizontal: 16,
          }}
        >
          <Text
            style={{
              fontSize: theme.fontStyle.xl[1].size,
              fontWeight: theme.fontStyle.xl[1].weight,
            }}
          >
            {isMorning ? "おはようございます" : "おつかれさま"}
          </Text>
          <Text>
            {isMorning
              ? "今日の気分を記録して2人の連続投稿を継続しよう🤝"
              : "休憩がてら感情を記入しませんか？"}
          </Text>
        </View>

        <View style={{ height: 40 }} />

        <View
          style={{
            paddingHorizontal: 16,
            width: "100%",
            gap: 60,
          }}
        >
          {!hasWrittenJournalEntryToday && <CreateNewJournalEntryCard />}

          <Push />

          {postGroups.map((postGroup) => {
            const postGroupDate = parse(postGroup.postGroupDate, "YYYY-MM-DD");

            const startOfToday = dayStart(now);
            const endOfToday = dayEnd(now);

            const isToday =
              postGroupDate >= startOfToday && postGroupDate < endOfToday;

            return (
              <View key={postGroup.id}>
                {isToday ? (
                  <MyJournalEntriesCardToday postGroup={postGroup} />
                ) : (
                  <MyJournalEntriesCardPast postGroup={postGroup} />
                )}
              </View>
            );
          })}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      <FAB
        icon={() => <SquarePen color={theme.colors.white} />}
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: theme.colors.primary,
        }}
        onPress={() => {
          router.push("/(app)/posts/new");
        }}
      />
    </>
  );
};
