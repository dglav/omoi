import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="questions-and-answers"
        options={{
          headerShown: false,
          title: "Q&A",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="question-answer" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mood-flow"
        options={{
          headerShown: false,
          title: "Moodflow",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="monitor-heart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="value-lists"
        options={{
          headerShown: false,
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
