import { parse, dayStart, dayEnd } from "@formkit/tempo";
import { useRouter } from "expo-router";
import { SquarePen } from "lucide-react-native";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { FAB } from "react-native-paper";

import { Container } from "../../components/FeedAndAnalysisHeader/Container";
import { Header } from "../../components/FeedAndAnalysisHeader/Header";
import { MyJournalEntriesCardPast } from "../../components/JournalEntriesCard/MyJournalEntriesCardPast";
import { MyJournalEntriesCardToday } from "../../components/JournalEntriesCard/MyJournalEntriesCardToday";
import { PartnerJournalEntriesCardPast } from "../../components/JournalEntriesCard/PartnerJournalEntriesCardPast";
import { PartnerJournalEntriesCardToday } from "../../components/JournalEntriesCard/PartnerJournalEntriesCardToday";
import { useGetPostGroups } from "../../hooks/postGroupHooks/useGetPostGroups";
import { useAppTheme } from "../../hooks/useAppTheme";

const now = new Date();
const startOfToday = dayStart(now);
const endOfToday = dayEnd(now);

export default function LogScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"me" | "partner">("me");
  const { data: postGroups } = useGetPostGroups({ who: activeTab });

  return (
    <Container activeTab={activeTab}>
      <Header title="Omoi" activeTab={activeTab} setActiveTab={setActiveTab} />

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

          const isToday =
            postGroupDate >= startOfToday && postGroupDate < endOfToday;

          return (
            <>
              {isToday && activeTab === "me" && (
                <MyJournalEntriesCardToday postGroup={item} />
              )}
              {isToday && activeTab === "partner" && (
                <PartnerJournalEntriesCardToday postGroup={item} />
              )}
              {!isToday && activeTab === "me" && (
                <MyJournalEntriesCardPast postGroup={item} />
              )}
              {!isToday && activeTab === "partner" && (
                <PartnerJournalEntriesCardPast postGroup={item} />
              )}

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
    </Container>
  );
}
