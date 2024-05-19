import { View } from "react-native";

import { Footer } from "./Footer";
import { JournalEntryHeader } from "./JournalEntryHeader";
import { JournalEntryRow } from "./JournalEntryRow";
import type { useGetPostGroups } from "../../hooks/postGroupHooks/useGetPostGroups";
import { useAppTheme } from "../../hooks/useAppTheme";

type Props = {
  postGroup: ReturnType<typeof useGetPostGroups>["data"][0];
};

export const PartnerJournalEntriesCardToday = ({ postGroup }: Props) => {
  const theme = useAppTheme();

  return (
    <View key={postGroup.id}>
      <View
        style={{
          backgroundColor: theme.colors.white,
          width: "100%",
          borderRadius: 16,
          paddingVertical: 24,
        }}
      >
        {postGroup.posts.map((post, index) => {
          return (
            <>
              {index === 0 && <JournalEntryHeader key={post.id} post={post} />}

              {index !== 0 && (
                <View key={post.id}>
                  {index === 1 && (
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
                </View>
              )}
            </>
          );
        })}

        <Footer postGroupId={postGroup.id} />
      </View>
    </View>
  );
};
