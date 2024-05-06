import { useLocalSearchParams } from "expo-router";
import { View, Alert } from "react-native";

import { Button } from "../../../../components/button";
import { ScreenContainer } from "../../../../components/screen-container";
import { Text } from "../../../../components/text";
import { useGetPostGroup } from "../../../../hooks/postGroupHooks/useGetPostGroup";
import { useAppTheme } from "../../../../hooks/useAppTheme";

function SelectPost() {
  const style = useAppTheme();
  const { date } = useLocalSearchParams<{ date: string }>();
  const { data } = useGetPostGroup(date!);

  const posts = data?.posts ?? [];

  return (
    <ScreenContainer>
      <View
        style={{
          gap: 24,
          marginTop: 40,
          paddingHorizontal: 16,
        }}
      >
        <Text
          style={{
            fontSize: style.fontStyle.xl[1].size,
            fontWeight: style.fontStyle.xl[1].weight,
          }}
        >
          どの投稿を編集しますか？
        </Text>

        {posts.map((post) => {
          const hours = String(post.date.getHours()).padStart(2, "0");
          const minutes = String(post.date.getMinutes()).padStart(2, "0");
          return (
            <Button
              key={post.id}
              variant="secondary"
              onPress={() => Alert.alert("aaa")}
              labelStyle={{
                width: "100%",
                paddingHorizontal: 40,
                textAlign: "left",
              }}
            >{`${hours}：${minutes}の投稿`}</Button>
          );
        })}
      </View>
    </ScreenContainer>
  );
}

export default SelectPost;
