import { View } from "react-native";

import { OptionButton } from "./OptionButton";

type Option = {
  text: string;
  value: string;
  icon?: React.ReactNode;
};

type Props = {
  options: Option[];
  selectedOption?: Option;
  handleSelectOption: (value: string) => void;
};

export const OptionsList = ({
  options,
  selectedOption,
  handleSelectOption,
}: Props) => {
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
          isSelected={option.text === selectedOption?.text}
          onPress={() => handleSelectOption(option.value)}
          icon={option.icon}
        >
          {option.text}
        </OptionButton>
      ))}
    </View>
  );
};
