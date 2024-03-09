import { Button as RNButton } from "react-native-paper";

import { useAppTheme } from "../hooks/useAppTheme";

type RNButtonPropType = React.ComponentProps<typeof RNButton>;

type ButtonProps = RNButtonPropType & {
  size?: "lg";
  variant?: "primary" | "secondary";
};

export const Button = ({
  size = "lg",
  variant = "primary",
  ...props
}: ButtonProps) => {
  const theme = useAppTheme();

  let mode: RNButtonPropType["mode"] = "contained";
  let labelStyle: RNButtonPropType["labelStyle"] = {};
  let style: RNButtonPropType["style"] = {};

  if (size === "lg") {
    labelStyle = {
      marginVertical: 16,
      fontSize: theme.fontStyle.lg[1].size,
      fontWeight: theme.fontStyle.lg[1].weight,
    };
  }

  if (variant === "primary") {
    mode = "contained";
  } else if (variant === "secondary") {
    mode = "text";
    labelStyle = { ...labelStyle, color: theme.colors.text };
    style = { ...style, backgroundColor: theme.colors.white };
  }

  return (
    <RNButton mode={mode} labelStyle={labelStyle} style={style} {...props}>
      {props.children}
    </RNButton>
  );
};
