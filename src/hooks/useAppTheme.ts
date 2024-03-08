import { useTheme } from "react-native-paper";

import { theme } from "../theme";

export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();
