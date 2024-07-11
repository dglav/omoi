import { useState } from "react";
import PagerView from "react-native-pager-view";

import { Container } from "../../components/FeedAndAnalysisHeader/Container";
import { Header } from "../../components/FeedAndAnalysisHeader/Header";
import MyLogScreen from "./MyLog";
import PartnerLogScreen from "./PartnerLog";
import { Animated, View } from "react-native";
import { useNavigationPanel } from "../../hooks/useNavigationPanel";

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export default function LogScreen() {
  const [activeTab, setActiveTab] = useState<"me" | "partner">("me");
  const { ref, ...navigationPanel } = useNavigationPanel((page) =>
    setActiveTab(page === 0 ? "me" : "partner")
  );

  const handleSetActiveTab = (tab: "me" | "partner") => {
    setActiveTab(tab);
    navigationPanel.setPage(tab === "me" ? 0 : 1);
  };

  return (
    <Container activeTab={activeTab}>
      <Header
        title="Omoi"
        activeTab={activeTab}
        setActiveTab={handleSetActiveTab}
      />

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
        <View
          key="1"
          style={{ flex: 1 }}
          collapsable={false}
        >
          <MyLogScreen />
        </View>
        <View
          key="2"
          style={{ flex: 1 }}
          collapsable={false}
        >
          <PartnerLogScreen />
        </View>
      </AnimatedPagerView>
    </Container>
  );
}
