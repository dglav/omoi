import { parse, dayStart, dayEnd } from "@formkit/tempo";
import { useRouter } from "expo-router";
import { SquarePen } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { FAB } from "react-native-paper";

import { Container } from "../../components/Feed/Container";
import { Header } from "../../components/Feed/Header";
import { JournalEntriesCardPast } from "../../components/JournalEntriesCard/JournalEntriesCardPast";
import { JournalEntriesCardToday } from "../../components/JournalEntriesCard/JournalEntriesCardToday";
import { useGetPostGroups } from "../../hooks/postGroupHooks/useGetPostGroups";
import { useAppTheme } from "../../hooks/useAppTheme";

const now = new Date();

export default function LogScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"me" | "partner">("me");
  const { data: postGroups } = useGetPostGroups({ who: activeTab });

  return (
    <Container activeTab={activeTab}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <ScrollView style={{ width: "100%" }}>
        <View style={{ height: 40 }} />

        <View
          style={{
            paddingHorizontal: 16,
            width: "100%",
            gap: 60,
          }}
        >
          {postGroups.map((postGroup) => {
            const postGroupDate = parse(postGroup.postGroupDate, "YYYY-MM-DD");

            const startOfToday = dayStart(now);
            const endOfToday = dayEnd(now);

            const isToday =
              postGroupDate >= startOfToday && postGroupDate < endOfToday;

            return (
              <View key={postGroup.id}>
                {isToday ? (
                  <JournalEntriesCardToday postGroup={postGroup} />
                ) : (
                  <JournalEntriesCardPast postGroup={postGroup} />
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
    </Container>
  );
}
