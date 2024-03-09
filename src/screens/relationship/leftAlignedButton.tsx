import { Button } from "../../components/button";

export const LeftAlignedButton = ({
  onPress,
  children,
}: React.ComponentProps<typeof Button>) => {
  return (
    <Button
      variant="secondary"
      onPress={onPress}
      labelStyle={{
        width: "100%",
        paddingHorizontal: 40,
        textAlign: "left",
      }}
    >
      {children}
    </Button>
  );
};
