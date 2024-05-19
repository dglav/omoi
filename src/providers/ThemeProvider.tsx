import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";

import {
  theme as defaultTheme,
  redTheme,
  blueTheme,
  yellowTheme,
  pinkTheme,
  brownTheme,
  greyTheme,
} from "../theme";

type ThemeSetting =
  | "green"
  | "red"
  | "blue"
  | "yellow"
  | "pink"
  | "brown"
  | "grey";

export const ThemeContext = createContext<{
  themeSetting: ThemeSetting;
  updateTheme?: (themeSetting: ThemeSetting) => Promise<void>;
}>({
  themeSetting: "green",
});

const themeMap = {
  green: defaultTheme,
  red: redTheme,
  blue: blueTheme,
  yellow: yellowTheme,
  pink: pinkTheme,
  brown: brownTheme,
  grey: greyTheme,
};

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const getTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        if (savedTheme && savedTheme in Object.keys(themeMap)) {
          setTheme(themeMap[savedTheme as keyof typeof themeMap]);
        }
      } catch (error) {
        console.log("Error loading theme:", error);
      }
    };
    getTheme();
  });

  const updateTheme = async (themeSetting: keyof typeof themeMap) => {
    await AsyncStorage.setItem("theme", themeSetting);
    setTheme(themeMap[themeSetting]);
  };

  return (
    <ThemeContext.Provider value={{ themeSetting: "red", updateTheme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};
