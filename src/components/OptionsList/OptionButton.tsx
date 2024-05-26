import React from "react";

import { Button } from "../NewButton";

export const OptionButton = ({
  onPress,
  isSelected,
  children,
  icon,
}: React.ComponentProps<typeof Button> & { icon?: React.ReactNode }) => {
  return (
    <Button
      variant="secondary"
      isSelected={isSelected}
      onPress={onPress}
      contentStyleOverrides={{ width: "100%", paddingHorizontal: 40 }}
      textStyleOverrides={{
        textAlign: "left",
      }}
      icon={icon}
    >
      {children}
    </Button>
  );
};
