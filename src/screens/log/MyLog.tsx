import { dayEnd, dayStart, parse } from "@formkit/tempo";
import { useRouter } from "expo-router";
import { SquarePen } from "lucide-react-native";
import { FlatList, View } from "react-native";
import { FAB } from "react-native-paper";

import { MyJournalEntriesCardPast } from "../../components/JournalEntriesCard/MyJournalEntriesCardPast";
import { MyJournalEntriesCardToday } from "../../components/JournalEntriesCard/MyJournalEntriesCardToday";
import { useGetPostGroups } from "../../hooks/postGroupHooks/useGetPostGroups";
import { useAppTheme } from "../../hooks/useAppTheme";

const now = new Date();
const startOfToday = dayStart(now);
const endOfToday = dayEnd(now);

export default function MyLogScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const { data: postGroups } = useGetPostGroups({ who: "me" });

  return (
    <>
      <FlatList
        style={{
          paddingVertical: 40,
          paddingHorizontal: 16,
          width: "100%",
          gap: 60,
        }}
        data={postGroups}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 40 }} />}
        renderItem={({ item, index }) => {
          const postGroupDate = parse(item.postGroupDate, "YYYY-MM-DD");

          const isToday = postGroupDate >= startOfToday &&
            postGroupDate < endOfToday;

          return (
            <>
              {isToday && <MyJournalEntriesCardToday postGroup={item} />}
              {!isToday && <MyJournalEntriesCardPast postGroup={item} />}

              {index === postGroups.length - 1 && (
                <View style={{ height: 80 }} />
              )}
            </>
          );
        }}
      />
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
}
