import { LucideUnlockKeyhole } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

import { useAppTheme } from "../../../hooks/useAppTheme";

type Props = {
  isPrivate: boolean;
  onPress: () => void;
};

export const PrivacyButton = ({ isPrivate, onPress }: Props) => {
  const theme = useAppTheme();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: isPrivate
          ? theme.colors.primaryHeavy
          : theme.colors.white,
        paddingHorizontal: 18,
        paddingVertical: 6,
        borderRadius: 32,
      }}
      onPress={onPress}
    >
      <LucideUnlockKeyhole
        size={20}
        color={isPrivate ? theme.colors.white : theme.colors.text}
      />
    </TouchableOpacity>
  );
};
