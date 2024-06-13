import { useRouter } from "expo-router";

import { ColorSettingsScreen } from "../../screens/settings/ColorSettings";

export default function SetupRoute() {
  const router = useRouter();

  return <ColorSettingsScreen onPress={() => router.push("/tutorial")} />;
}
