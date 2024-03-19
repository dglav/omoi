import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

import { Button } from "../../components/button";
import { useAppTheme } from "../../hooks/useAppTheme";

const JournalNote = () => {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [note, setNote] = useState("");

  return (
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        backgroundColor: theme.colors.background,
      }}
    >
      <SafeAreaView>
        <View
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.colors.background,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <View
              style={{
                width,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <View style={{ gap: 8, padding: 16 }}>
                <Text>Feelings Placeholder</Text>
                <Text>Tags Placeholder</Text>
              </View>

              <View style={{ padding: 16 }}>
                <TextInput
                  editable
                  multiline
                  value={note}
                  onChangeText={(text) => setNote(text)}
                  placeholder="詳しく書いてみてください"
                  maxLength={2000}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              paddingHorizontal: 16,
            }}
          >
            <Button onPress={() => Alert.alert("post")}>投稿する</Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default JournalNote;
