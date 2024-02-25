import { Link } from "expo-router";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export function YourMood() {
  return (
    <View>
      <Text>You</Text>
      <Link href="/mood-share">
        <Button>
          <Text>Share your Mood!</Text>
        </Button>
      </Link>
    </View>
  );
}
