type Values = { text: string; stroke: string };

export const conditionMap: {
  reallyBad: Values;
  bad: Values;
  average: Values;
  good: Values;
  reallyGood: Values;
} = {
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
