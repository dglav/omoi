import { Button } from "../NewButton";

export const OptionButton = ({
  onPress,
  isSelected,
  children,
}: React.ComponentProps<typeof Button>) => {
  return (
    <Button
      variant="secondary"
      isSelected={isSelected}
      onPress={onPress}
      textStyleOverrides={{
        width: "100%",
        paddingHorizontal: 40,
        textAlign: "left",
      }}
    >
      {children}
    </Button>
  );
};
