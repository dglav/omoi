import { dayEnd, dayStart, parse } from "@formkit/tempo";
import { FlatList, View } from "react-native";

import { PartnerJournalEntriesCardPast } from "../../components/JournalEntriesCard/PartnerJournalEntriesCardPast";
import { PartnerJournalEntriesCardToday } from "../../components/JournalEntriesCard/PartnerJournalEntriesCardToday";
import { useGetPostGroups } from "../../hooks/postGroupHooks/useGetPostGroups";

const now = new Date();
const startOfToday = dayStart(now);
const endOfToday = dayEnd(now);

export default function PartnerLogScreen() {
  const { data: postGroups } = useGetPostGroups({ who: "partner" });

  return (
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
            {isToday && <PartnerJournalEntriesCardToday postGroup={item} />}
            {!isToday && <PartnerJournalEntriesCardPast postGroup={item} />}

            {index === postGroups.length - 1 && <View style={{ height: 80 }} />}
          </>
        );
      }}
    />
  );
}
