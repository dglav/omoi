type Values = { text: string; stroke: string; background: string };

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
    background: "#EEDFF0",
  },
  bad: {
    text: "不調",
    stroke: "#6D9CF8",
    background: "#DBF3F8",
  },
  average: {
    text: "ふつう",
    stroke: "#7CD185",
    background: "#EAF3D3",
  },
  good: {
    text: "好調",
    stroke: "#F89F6D",

    background: "#FFE7DA",
  },
  reallyGood: {
    text: "とても好調",
    stroke: "#F86D6D",

    background: "#FFDEDE",
  },
};
