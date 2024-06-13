import React from "react";
import {
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";

import { Text } from "./text";
import { useAppTheme } from "../hooks/useAppTheme";

type Props = React.PropsWithChildren & {
  size?: "lg" | "sm";
  variant?: "primary" | "secondary" | "text";
  isSelected?: boolean;
  textStyleOverrides?: TextStyle;
  onPress?: () => void;
  icon?: React.ReactNode;
  iconStyleOverrides?: ViewStyle;
  contentStyleOverrides?: ViewStyle;
  isDisabled?: boolean;
};

export const Button = ({
  size = "lg",
  variant = "primary",
  isSelected = false,
  textStyleOverrides = {},
  icon = null,
  iconStyleOverrides = {},
  contentStyleOverrides = {},
  isDisabled = false,
  ...props
}: Props) => {
  const theme = useAppTheme();

  let textStyle: TextStyle = {
    width: "100%",
  };
  let iconStyle: ViewStyle = {};
  let contentStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  };
  let style: TouchableOpacityProps["style"] = {
    borderRadius: 48,
  };

  if (size === "lg") {
    textStyle = {
      ...textStyle,
      marginVertical: 16,
      marginHorizontal: 24,
      fontSize: theme.fontStyle.lg[1].size,
      fontWeight: theme.fontStyle.lg[1].weight,
    };
  } else if (size === "sm") {
    textStyle = {
      ...textStyle,
      marginVertical: 12,
      marginHorizontal: 24,
      fontSize: theme.fontStyle.sm[1].size,
      fontWeight: theme.fontStyle.sm[1].weight,
    };
  }

  if (variant === "primary") {
  } else if (variant === "secondary") {
    textStyle = {
      ...textStyle,
      color: theme.colors.text,
    };
    style = {
      ...style,
      backgroundColor: isSelected ? theme.colors.textLight : theme.colors.white,
      borderColor: theme.colors.textLight,
      borderWidth: 1,
    };
  } else if (variant === "text" && isDisabled) {
    textStyle = { ...textStyle, color: theme.colors.textLight };
  } else if (variant === "text") {
    textStyle = { ...textStyle, color: theme.colors.text };
  }

  if (textStyleOverrides || textStyleOverrides !== false) {
    textStyle = { ...textStyle, ...textStyleOverrides };
  }

  if (iconStyleOverrides || iconStyleOverrides !== false) {
    iconStyle = { ...iconStyle, ...iconStyleOverrides };
  }

  if (contentStyleOverrides || contentStyleOverrides !== false) {
    contentStyle = { ...contentStyle, ...contentStyleOverrides };
  }

  return (
    <TouchableOpacity
      style={style}
      activeOpacity={0.5}
      disabled={isDisabled}
      {...props}
    >
      <View style={contentStyle}>
        <View style={iconStyle}>{icon}</View>
        <Text style={textStyle}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};
