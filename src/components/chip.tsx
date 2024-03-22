import {
  type ChipProps as RNPChipProps,
  Chip as RNPChip,
} from "react-native-paper";

type CustomProps = {
  isSelected?: boolean;
};

export const Chip = ({
  children,
  style,
  isSelected,
  ...props
}: RNPChipProps & CustomProps) => {
  return (
    <RNPChip
      {...props}
      mode={isSelected ? "flat" : "outlined"}
      style={{
        borderWidth: 0,
        ...(typeof style === "object" ? style : {}),
      }}
    >
      {children}
    </RNPChip>
  );
};
