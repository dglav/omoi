import React, { useState } from "react";
import { View } from "react-native";

import { Card } from "./components/Card";
import { Container } from "../../components/FeedAndAnalysisHeader/Container";
import { Header } from "../../components/FeedAndAnalysisHeader/Header";

export const AnalysisScreen = () => {
  const [activeTab, setActiveTab] = useState<"me" | "partner">("me");

  return (
    <Container activeTab={activeTab}>
      <Header title="分析" activeTab={activeTab} setActiveTab={setActiveTab} />

      <View style={{ height: 32 }} />

      <Card />
    </Container>
  );
};
