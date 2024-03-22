import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useTheme } from "react-native-paper";

const TabsLayout = () => {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="questions-and-answers"
        options={{
          title: "Q&A",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="question-answer" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mood-flow"
        options={{
          title: "Moodflow",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="monitor-heart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="value-lists"
        options={{
          title: "Value lists",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="list-alt" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
