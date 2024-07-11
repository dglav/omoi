import { addDay, dayEnd, dayStart, parse } from "@formkit/tempo";
import { ScrollView, View } from "react-native";

import { PartnerJournalEntriesCardPast } from "../../components/JournalEntriesCard/PartnerJournalEntriesCardPast";
import { PartnerJournalEntriesCardToday } from "../../components/JournalEntriesCard/PartnerJournalEntriesCardToday";
import { useGetPostGroups } from "../../hooks/postGroupHooks/useGetPostGroups";

export const PartnerHome = () => {
  const { data: postGroups } = useGetPostGroups({
    who: "partner",
    options: {
      laterThan: dayStart(addDay(new Date(), -2)),
    },
  });

  const now = new Date();

  return (
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

          const isToday = postGroupDate >= startOfToday &&
            postGroupDate < endOfToday;

          return (
            <View key={postGroup.id}>
              {isToday
                ? <PartnerJournalEntriesCardToday postGroup={postGroup} />
                : <PartnerJournalEntriesCardPast postGroup={postGroup} />}
            </View>
          );
        })}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};
