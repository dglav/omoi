import { parse, dayStart, dayEnd } from "@formkit/tempo";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SquarePen } from "lucide-react-native";
import { Pressable, ScrollView, View } from "react-native";
import { FAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { JournalEntriesCardPast } from "../../../../components/JournalEntriesCard/JournalEntriesCardPast";
import { JournalEntriesCardToday } from "../../../../components/JournalEntriesCard/JournalEntriesCardToday";
import { Text } from "../../../../components/text";
import { useGetPostGroups } from "../../../../hooks/postGroupHooks/useGetPostGroups";
import { useAppTheme } from "../../../../hooks/useAppTheme";

const now = new Date();

export default function LogScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const { data: postGroups } = useGetPostGroups();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
      edges={{
        top: "additive",
        bottom: "off",
      }}
    >
      <View style={{ height: 12 }} />

      <View>
        <Text
          style={{
            fontSize: theme.fontStyle.lg[1].size,
            fontWeight: theme.fontStyle.lg[1].weight,
            letterSpacing: 2,
          }}
        >
          Omoi
        </Text>
      </View>

      <View style={{ height: 12 }} />

      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Pressable
          style={{
            paddingVertical: 10,
            paddingHorizontal: 16,
            backgroundColor: "white",
            borderRadius: 50,
          }}
        >
          <Text>あなた</Text>
        </Pressable>

        <Pressable
          style={{
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 50,
          }}
        >
          <Text>パートナー</Text>
        </Pressable>
      </View>

      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: theme.colors.textLight,
          marginTop: 8,
        }}
      />

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

      <StatusBar />
    </SafeAreaView>
  );
}
