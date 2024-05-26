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
  size?: "lg";
  variant?: "primary" | "secondary";
  isSelected?: boolean;
  textStyleOverrides?: TextStyle;
  onPress?: () => void;
  icon?: React.ReactNode;
  iconStyleOverrides?: ViewStyle;
  contentStyleOverrides?: ViewStyle;
};

export const Button = ({
  size = "lg",
  variant = "primary",
  isSelected = false,
  textStyleOverrides = {},
  icon = null,
  iconStyleOverrides = {},
  contentStyleOverrides = {},
  ...props
}: Props) => {
  const theme = useAppTheme();

  let textStyle: TextStyle = {};
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
      marginVertical: 16,
      fontSize: theme.fontStyle.lg[1].size,
      fontWeight: theme.fontStyle.lg[1].weight,
    };
  }

  if (variant === "primary") {
    // mode = "contained";
  } else if (variant === "secondary") {
    // mode = "text";
    textStyle = {
      ...textStyle,
      color: theme.colors.text,
    };
    style = {
      ...style,
      backgroundColor: isSelected ? theme.colors.textLight : theme.colors.white,
    };
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
    <TouchableOpacity style={style} activeOpacity={0.5} {...props}>
      <View style={contentStyle}>
        <View style={iconStyle}>{icon}</View>
        <Text style={textStyle}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};
