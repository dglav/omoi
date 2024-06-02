import Slider from "@react-native-community/slider";
import { useGlobalSearchParams, useRouter, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { View, useWindowDimensions, SafeAreaView, Text } from "react-native";

import { Button } from "../../../components/button";
import { ConditionIcon } from "../../../components/condition-icon-200";
import { useGetPost } from "../../../hooks/postHooks/useGetPost";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { conditionMap } from "../../../utils/conditionMap";
import { useStore } from "../store/useStore";

const MIN_SLIDER_VALUE = 2;
const MAX_SLIDER_VALUE = 98;

const JournalCondition = () => {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();

  const router = useRouter();
  const pathname = usePathname();
  const params = useGlobalSearchParams<{ postId: string }>();

  const [value, setValue] = useState(50);
  const [thumbImage, setThumbImage] = useState();
  const [trackImage, setTrackImage] = useState();
  const [condition, setCondition] = useStore((state) => [
    state.condition,
    state.setCondition,
  ]);
  const [strokeColor, setStrokeColor] = useState(conditionMap.average.stroke);
  const [backgroundColor, setBackgroundColor] = useState(
    conditionMap.average.background,
  );

  const { data: post, isLoading } = useGetPost(params.postId);

  useEffect(() => {
    if (!isLoading && post) {
      if (post.condition === "reallyBad") {
        setValue(MIN_SLIDER_VALUE);
        setStrokeColor(conditionMap.reallyBad.stroke);
        setBackgroundColor(conditionMap.reallyBad.background);
      }
      if (post.condition === "bad") {
        setValue(25);
        setStrokeColor(conditionMap.bad.stroke);
        setBackgroundColor(conditionMap.bad.background);
      }
      if (post.condition === "average") {
        setValue(50);
        setStrokeColor(conditionMap.average.stroke);
        setBackgroundColor(conditionMap.average.background);
      }
      if (post.condition === "good") {
        setValue(75);
        setStrokeColor(conditionMap.good.stroke);
        setBackgroundColor(conditionMap.good.background);
      }
      if (post.condition === "reallyGood") {
        setValue(MAX_SLIDER_VALUE);
        setStrokeColor(conditionMap.reallyGood.stroke);
        setBackgroundColor(conditionMap.reallyGood.background);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    setThumbImage(require("../../../../assets/Knob (3).png"));
    setTrackImage(require("../../../../assets/track.png"));
  }, []);

  useEffect(() => {
    if (value < 20) {
      setCondition("reallyBad");
      setStrokeColor(conditionMap.reallyBad.stroke);
      setBackgroundColor(conditionMap.reallyBad.background);
    } else if (value < 40) {
      setCondition("bad");
      setStrokeColor(conditionMap.bad.stroke);
      setBackgroundColor(conditionMap.bad.background);
    } else if (value < 60) {
      setCondition("average");
      setStrokeColor(conditionMap.average.stroke);
      setBackgroundColor(conditionMap.average.background);
    } else if (value < 80) {
      setCondition("good");
      setStrokeColor(conditionMap.good.stroke);
      setBackgroundColor(conditionMap.good.background);
    } else {
      setCondition("reallyGood");
      setStrokeColor(conditionMap.reallyGood.stroke);
      setBackgroundColor(conditionMap.reallyGood.background);
    }
  }, [value]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        backgroundColor,
      }}
    >
      <SafeAreaView>
        <View
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <View
              style={{
                width,
                paddingVertical: 16,
                paddingHorizontal: 28,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: theme.fontStyle.xl[1].size,
                  fontWeight: theme.fontStyle.xl[1].weight,
                }}
              >
                今、どんな調子？
              </Text>

              <View style={{ marginTop: 108, alignSelf: "center" }}>
                <ConditionIcon stroke={strokeColor} />
              </View>

              <Text
                style={{
                  fontSize: theme.fontStyle.xxl[1].size,
                  fontWeight: theme.fontStyle.xxl[1].weight,
                  alignSelf: "center",
                  marginTop: 20,
                  marginBottom: 92,
                }}
              >
                {conditionMap[condition]?.text}
              </Text>

              <Slider
                style={{
                  width: "100%",
                }}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor={theme.colors.primary}
                maximumTrackTintColor={theme.colors.primary}
                trackImage={trackImage}
                thumbImage={thumbImage}
                value={value}
                lowerLimit={MIN_SLIDER_VALUE}
                upperLimit={MAX_SLIDER_VALUE}
                onValueChange={(_value) => setValue(_value)}
              />

              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  flexDirection: "row",
                  marginTop: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: theme.fontStyle.md[1].size,
                    fontWeight: theme.fontStyle.md[1].weight,
                  }}
                >
                  不調
                </Text>

                <Text
                  style={{
                    fontSize: theme.fontStyle.md[1].size,
                    fontWeight: theme.fontStyle.md[1].weight,
                  }}
                >
                  好調
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              paddingHorizontal: 16,
            }}
          >
            <Button
              onPress={() =>
                router.push(pathname.replace("/condition", "/feelings"))
              }
            >
              次へ
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default JournalCondition;
