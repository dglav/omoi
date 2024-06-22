import React, { useState } from "react";
import { View } from "react-native";

import { ConditionSection } from "./components/ConditionSection";
import { FeelingSection } from "./components/FeelingSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { TagSection } from "./components/TagSection";
import { useAppTheme } from "../../../../hooks/useAppTheme";
import { weekEnd, weekStart } from "@formkit/tempo";

export const Card = () => {
  const theme = useAppTheme();

  const [date, setDate] = useState(new Date())

  const startDate = weekStart(date, 1);
  const endDate = weekEnd(date, 1);

  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <View
        style={{
          marginHorizontal: 16,
          backgroundColor: theme.colors.white,
          borderRadius: 16,
          alignItems: "center",
        }}
      >
        <Header timePeriod={{ start: startDate, end: endDate }} />
        <ConditionSection startDate={startDate} endDate={endDate} />
        <View style={{ height: 60 }} />
        <FeelingSection />
        <View style={{ height: 60 }} />
        <TagSection />
        <View style={{ height: 24 }} />

        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: theme.colors.textLight,
          }}
        />

        <Footer />
      </View>
    </View>
  );
};
