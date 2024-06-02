import { LucideUnlockKeyhole } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

import { useAppTheme } from "../../../hooks/useAppTheme";

export const PrivacyButton = () => {
  const theme = useAppTheme();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.colors.white,
        paddingHorizontal: 18,
        paddingVertical: 6,
        borderRadius: 32,
      }}
    >
      <LucideUnlockKeyhole size={20} color={theme.colors.text} />
    </TouchableOpacity>
  );
};
