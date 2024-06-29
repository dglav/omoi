import React from "react";
import { ScrollView, View } from "react-native";

import { Card } from "./components/Card";
import { Container } from "../../components/FeedAndAnalysisHeader/Container";
import { Header } from "../../components/FeedAndAnalysisHeader/Header";
import { useAnalysisScreenStore } from "./components/useAnalysisScreenStore";

export const AnalysisScreen = () => {
  const { user, setUser } = useAnalysisScreenStore();

  return (
    <Container activeTab={user}>
      <Header title="分析" activeTab={user} setActiveTab={setUser} />

      <ScrollView style={{ width: "100%" }}>
        <View style={{ height: 32 }} />

        <Card />

        <View style={{ height: 32 }} />
      </ScrollView>
    </Container>
  );
};
