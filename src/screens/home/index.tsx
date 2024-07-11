import { useCallback, useMemo, useRef, useState } from "react";
import { Animated, View } from "react-native";

import type {
  PagerViewOnPageScrollEventData,
  PagerViewOnPageSelectedEventData,
  PageScrollStateChangedNativeEvent,
} from "react-native-pager-view";
import PagerView from "react-native-pager-view";
import { Container } from "../../components/FeedAndAnalysisHeader/Container";
import { Header } from "../../components/FeedAndAnalysisHeader/Header";
import { MyHome } from "./MyHome";
import { PartnerHome } from "./PartnerHome";

export type UseNavigationPanelProps = ReturnType<typeof useNavigationPanel>;

export interface EventLog {
  event: "scroll" | "select" | "statusChanged";
  text: string;
  timestamp: Date;
}

export function useNavigationPanel(
  onPageSelectedCallback: (position: number) => void = () => { },
) {
  const ref = useRef<PagerView>(null);
  const [activePage, setActivePage] = useState(0);
  const [isAnimated, setIsAnimated] = useState(true);
  const [overdragEnabled, setOverdragEnabled] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [scrollState, setScrollState] = useState("idle");
  const [logs, setLogs] = useState<EventLog[]>([]);
  const [progress, setProgress] = useState({ position: 0, offset: 0 });
  const onPageScrollOffset = useRef(new Animated.Value(0)).current;
  const onPageScrollPosition = useRef(new Animated.Value(0)).current;
  const onPageSelectedPosition = useRef(new Animated.Value(0)).current;

  const setPage = useCallback(
    (page: number) =>
      isAnimated
        ? ref.current?.setPage(page)
        : ref.current?.setPageWithoutAnimation(page),
    [isAnimated],
  );

  const addLog = useCallback((log: EventLog) => {
    setLogs((text) => [log, ...text].slice(0, 100));
  }, []);

  const toggleAnimation = useCallback(
    () => setIsAnimated((animated) => !animated),
    [],
  );
  const toggleScroll = useCallback(
    () => setScrollEnabled((enabled) => !enabled),
    [],
  );
  const toggleOverdrag = useCallback(
    () => setOverdragEnabled((enabled) => !enabled),
    [],
  );

  const onPageScroll = useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: onPageScrollOffset,
              position: onPageScrollPosition,
            },
          },
        ],
        {
          listener: ({ nativeEvent: { offset, position } }) => {
            addLog({
              event: "scroll",
              text: `Position: ${position} Offset: ${offset}`,
              timestamp: new Date(),
            });
            setProgress({
              position,
              offset,
            });
          },
          useNativeDriver: true,
        },
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const onPageSelected = useMemo(
    () =>
      Animated.event<PagerViewOnPageSelectedEventData>(
        [{ nativeEvent: { position: onPageSelectedPosition } }],
        {
          listener: ({ nativeEvent: { position } }) => {
            addLog({
              event: "select",
              text: `Page: ${position}`,
              timestamp: new Date(),
            });
            setActivePage(position);
            onPageSelectedCallback(position);
          },
          useNativeDriver: true,
        },
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const onPageScrollStateChanged = useCallback(
    (e: PageScrollStateChangedNativeEvent) => {
      addLog({
        event: "statusChanged",
        text: `State: ${e.nativeEvent.pageScrollState}`,
        timestamp: new Date(),
      });
      setScrollState(e.nativeEvent.pageScrollState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    ref,
    activePage,
    isAnimated,
    scrollState,
    scrollEnabled,
    progress,
    overdragEnabled,
    setPage,
    toggleScroll,
    toggleAnimation,
    setProgress,
    onPageScroll,
    onPageSelected,
    onPageScrollStateChanged,
    toggleOverdrag,
    logs,
  };
}

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export default function HomeScreen() {
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
          <MyHome />
        </View>
        <View
          key="2"
          style={{ flex: 1 }}
          collapsable={false}
        >
          <PartnerHome />
        </View>
      </AnimatedPagerView>
    </Container>
  );
}
