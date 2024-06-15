import { Tabs } from "expo-router";
import { Home, PieChart, NotebookText, User } from "lucide-react-native";
import React from "react";

import { useAppTheme } from "../../../hooks/useAppTheme";

const TabsLayout = () => {
  const theme = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "ホーム",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="analysis"
        options={{
          title: "分析",
          tabBarIcon: ({ color }) => <PieChart size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="log"
        options={{
          title: "ログ",
          tabBarIcon: ({ color }) => <NotebookText size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "マイページ",
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
