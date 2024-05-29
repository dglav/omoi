import { emotionLevelColorMap } from "./feelingMap";
import { FeelingIcon_20 } from "../components/feeling-icon-20";

export const emotionLevelOptions = [
  {
    text: "とてもポジティブ",
    value: "very positive",
    icon: <FeelingIcon_20 fill={emotionLevelColorMap["very positive"]} />,
  },
  {
    text: "ポジティブ",
    value: "positive",
    icon: <FeelingIcon_20 fill={emotionLevelColorMap["positive"]} />,
  },
  {
    text: "ふつう",
    value: "average",
    icon: <FeelingIcon_20 fill={emotionLevelColorMap["average"]} />,
  },
  {
    text: "ネガティブ",
    value: "negative",
    icon: <FeelingIcon_20 fill={emotionLevelColorMap["negative"]} />,
  },
  {
    text: "とてもネガティブ",
    value: "very negative",
    icon: <FeelingIcon_20 fill={emotionLevelColorMap["very negative"]} />,
  },
];
