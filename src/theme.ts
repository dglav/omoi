import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primaryLight: "#B9D4C9",
    primary: "#18B66A",
    primaryHeavy: "#329068",
    textLight: "#B9B9B9",
    text: "#062316",
    textColor: "#21B979",
    background: "#EAF3D3",
    white: "#FAFAFA",
    scrim: "#000000", // @fixme: #000000 24% (opacity?)
    dangerLight: "#E9AFAF",
    danger: "#D75555",
    dangerHeavy: "#AE3838",
    secondaryContainer: "#18B66A",
    onSecondaryContainer: "#FAFAFA",
  },
  fontStyle: {
    xxl: {
      1: {
        size: 32,
        weight: "bold" as const,
      },
      3: {
        size: 32,
        weight: "normal" as const,
      },
    },
    xl: {
      1: {
        size: 24,
        weight: "bold" as const,
      },
      3: {
        size: 24,
        weight: "normal" as const,
      },
    },
    lg: {
      1: {
        size: 18,
        weight: "bold" as const,
      },
    },
    md: {
      1: {
        size: 16,
        weight: "bold" as const,
      },
      3: {
        size: 16,
        weight: "normal" as const,
      },
    },
    sm: {
      1: {
        size: 14,
        weight: "bold" as const,
      },
      3: {
        size: 14,
        weight: "normal" as const,
      },
    },
    xs: {
      1: {
        size: 12,
        weight: "bold" as const,
      },
      3: {
        size: 12,
        weight: "normal" as const,
      },
    },
  },
};

export const redTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: "#F4C8C8",
  },
};

export const blueTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: "#D3E0F3",
  },
};

export const yellowTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: "#F2F0BC",
  },
};

export const pinkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: "#F6D2E1",
  },
};

export const brownTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: "#F0D3C2",
  },
};

export const greyTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: "#DDDDDD",
  },
};
