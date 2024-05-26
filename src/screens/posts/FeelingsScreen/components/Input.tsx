import { TextInput } from "react-native";

import { useAppTheme } from "../../../../hooks/useAppTheme";

type Props = {
  value: string;
  updateValue: (newValue: string) => void;
};

export const Input = ({ value, updateValue }: Props) => {
  const theme = useAppTheme();

  return (
    <TextInput
      value={value}
      onChangeText={updateValue}
      placeholder="感情を追加（４文字"
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
