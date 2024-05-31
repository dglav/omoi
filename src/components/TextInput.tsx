import { TextInput as RNTextInput } from "react-native";

import { useAppTheme } from "../hooks/useAppTheme";

type Props = {
  value: string;
  placeholder?: string;
  updateValue: (newValue: string) => void;
};

export const TextInput = ({ value, placeholder, updateValue }: Props) => {
  const theme = useAppTheme();

  return (
    <RNTextInput
      value={value}
      onChangeText={updateValue}
      placeholder={placeholder}
      style={{
        paddingVertical: 10.5,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: theme.colors.textLight,
        borderRadius: 8,
        color: theme.colors.text,
        backgroundColor: theme.colors.white,
        fontSize: theme.fontStyle.md[3].size,
        fontWeight: theme.fontStyle.md[3].weight,
      }}
    />
  );
};
