import { View } from "react-native";

import { OptionButton } from "./OptionButton";

type Option = {
  text: string;
  value: string;
};

type Props = {
  options: Option[];
  handleSelectOption: (value: string) => void;
};

export const OptionsList = ({ options, handleSelectOption }: Props) => {
  return (
    <View
      style={{
        paddingVertical: 16,
        gap: 24,
      }}
    >
      {options.map((option) => (
        <OptionButton
          key={option.text}
          onPress={() => handleSelectOption(option.value)}
        >
          {option.text}
        </OptionButton>
      ))}
    </View>
  );
};
