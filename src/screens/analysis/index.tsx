import React, { useState } from "react";
import { Animated, ScrollView, View } from "react-native";
import PagerView from "react-native-pager-view";

import { Card } from "./components/Card";
import { Container } from "../../components/FeedAndAnalysisHeader/Container";
import { Header } from "../../components/FeedAndAnalysisHeader/Header";
import { useNavigationPanel } from "../../hooks/useNavigationPanel";

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export const AnalysisScreen = () => {
  const [user, setUser] = useState<"me" | "partner">("me");
  const { ref, ...navigationPanel } = useNavigationPanel((page) =>
    setUser(page === 0 ? "me" : "partner"),
  );

  const handleSetActiveTab = (tab: "me" | "partner") => {
    setUser(tab);
    navigationPanel.setPage(tab === "me" ? 0 : 1);
  };

  return (
    <Container activeTab={user}>
      <Header title="分析" activeTab={user} setActiveTab={handleSetActiveTab} />

      <AnimatedPagerView
        ref={ref}
        style={{ flex: 1 }}
        initialPage={0}
        layoutDirection="ltr"
        overdrag={navigationPanel.overdragEnabled}
        scrollEnabled={navigationPanel.scrollEnabled}
        onPageScroll={navigationPanel.onPageScroll}
        onPageSelected={navigationPanel.onPageSelected}
        onPageScrollStateChanged={navigationPanel.onPageScrollStateChanged}
        orientation="horizontal"
      >
        <View key="1" style={{ flex: 1 }} collapsable={false}>
          <ScrollView style={{ width: "100%" }}>
            <View style={{ height: 32 }} />

            <Card user="me" />

            <View style={{ height: 32 }} />
          </ScrollView>
        </View>
        <View key="2" style={{ flex: 1 }} collapsable={false}>
          <ScrollView style={{ width: "100%" }}>
            <View style={{ height: 32 }} />

            <Card user="partner" />

            <View style={{ height: 32 }} />
          </ScrollView>
        </View>
      </AnimatedPagerView>
    </Container>
  );
};
