import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="questions-and-answers"
        options={{ headerShown: false }}
      />
      <Tabs.Screen name="mood-flow" options={{ headerShown: false }} />
      <Tabs.Screen name="value-lists" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default TabsLayout;
