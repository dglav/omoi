import { Button as RNButton } from "react-native-paper";

import { useAppTheme } from "../hooks/useAppTheme";

type RNButtonPropType = React.ComponentProps<typeof RNButton>;

type ButtonProps = RNButtonPropType & {
  size?: "lg" | "sm";
  variant?: "primary" | "secondary";
};

export const Button = ({
  size = "lg",
  variant = "primary",
  disabled,
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

  if (size === "sm") {
    labelStyle = {
      marginVertical: 11.5,
      fontSize: theme.fontStyle.sm[1].size,
      fontWeight: theme.fontStyle.sm[1].weight,
    };
  }

  if (variant === "primary" && !disabled) {
    mode = "contained";
  } else if (variant === "primary" && disabled) {
    labelStyle = { ...labelStyle, color: theme.colors.white };
    style = { ...style, backgroundColor: theme.colors.primaryLight };
  } else if (variant === "secondary") {
    mode = "text";
    labelStyle = { ...labelStyle, color: theme.colors.text };
    style = { ...style, backgroundColor: theme.colors.white };
  }

  return (
    <RNButton
      {...props}
      disabled={disabled}
      mode={mode}
      labelStyle={[labelStyle, props.labelStyle]}
      style={style}
    >
      {props.children}
    </RNButton>
  );
};
