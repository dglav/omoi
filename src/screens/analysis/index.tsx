import React, { useState } from "react";
import { ScrollView, View } from "react-native";

import { Card } from "./components/Card";
import { Container } from "../../components/FeedAndAnalysisHeader/Container";
import { Header } from "../../components/FeedAndAnalysisHeader/Header";

export const AnalysisScreen = () => {
  const [activeTab, setActiveTab] = useState<"me" | "partner">("me");

  return (
    <Container activeTab={activeTab}>
      <Header title="分析" activeTab={activeTab} setActiveTab={setActiveTab} />

      <ScrollView style={{ width: "100%" }}>
        <View style={{ height: 32 }} />

        <Card />

        <View style={{ height: 32 }} />
      </ScrollView>
    </Container>
  );
};
