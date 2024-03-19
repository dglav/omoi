import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, useWindowDimensions, SafeAreaView, Text } from "react-native";

import { Button } from "../../components/button";
import { ConditionIcon } from "../../components/condition-icon-200";
import { useAppTheme } from "../../hooks/useAppTheme";

const conditionMap = {
  reallyBad: {
    text: "とても不調",
    stroke: "#A26DF8",
  },
  bad: {
    text: "不調",
    stroke: "#6D9CF8",
  },
  average: {
    text: "ふつう",
    stroke: "#7CD185",
  },
  good: {
    text: "好調",
    stroke: "#F89F6D",
  },
  reallyGood: {
    text: "とても好調",
    stroke: "#F86D6D",
  },
};

const JournalCondition = () => {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [value, setValue] = useState(50);
  const [thumbImage, setThumbImage] = useState();
  const [trackImage, setTrackImage] = useState();
  const [condition, setCondition] = useState(conditionMap.average);

  useEffect(() => {
    setThumbImage(require("../../../assets/Knob (3).png"));
    setTrackImage(require("../../../assets/track.png"));
  }, []);

  useEffect(() => {
    if (value < 20) {
      setCondition(conditionMap.reallyBad);
    } else if (value < 40) {
      setCondition(conditionMap.bad);
    } else if (value < 60) {
      setCondition(conditionMap.average);
    } else if (value < 80) {
      setCondition(conditionMap.good);
    } else {
      setCondition(conditionMap.reallyGood);
    }
  }, [value]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        backgroundColor: theme.colors.background,
      }}
    >
      <SafeAreaView>
        <View
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.colors.background,
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
                <ConditionIcon stroke={condition.stroke} />
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
                {condition.text}
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
                lowerLimit={2}
                upperLimit={98}
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
            <Button onPress={() => router.push("/new-journal-entry/feelings")}>
              次へ
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default JournalCondition;
