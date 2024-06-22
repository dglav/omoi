const POSITIVE = "positive" as const;
const AVERAGE = "average" as const;
const NEGATIVE = "negative" as const;

const rawValues = [
  ["excited", "興奮", "#F55634", POSITIVE],
  ["interested", "面白い", "#F88D5F", POSITIVE],
  ["happy", "嬉しい", "#FFBA69", POSITIVE],
  ["sense of achievement", "達成感", "#F0B966", POSITIVE],
  ["fun", "楽しい", "#F2B339", POSITIVE],
  ["appreciative", "感謝", "#E8D849", POSITIVE],
  ["like", "好き", "#EC9A88", POSITIVE],
  ["relieved", "安心", "#DCE84E", AVERAGE],
  ["peaceful", "穏やか", "#9BDE58", AVERAGE],
  ["calm", "落ち着き", "#6EDA79", AVERAGE],
  ["carefree", "気楽", "#94E59C", AVERAGE],
  ["neutral", "平常", "#8AC890", AVERAGE],
  ["unsettled", "モヤモヤ", "#7ED1B8", NEGATIVE],
  ["bored", "退屈", "#6AB49E", NEGATIVE],
  ["anxious", "不安", "#7EB8D1", NEGATIVE],
  ["nervous", "緊張", "#7EDAE0", NEGATIVE],
  ["stressed", "ストレス", "#8CA4D1", NEGATIVE],
  ["tired", "だるい", "#7F899D", NEGATIVE],
  ["exhausted", "疲れた", "#496186", NEGATIVE],
  ["sad", "悲しい", "#4B70B5", NEGATIVE],
  ["pained", "辛い", "#6867A1", NEGATIVE],
  ["scared", "怖い", "#50949D", NEGATIVE],
  ["irritated", "イライラ", "#CD7777", NEGATIVE],
  ["angry", "怒り", "#A84545", NEGATIVE],
];

type Values = {
  text: string;
  fillColor: string;
  emotionLevel: string;
};

type FeelingMap = {
  [key: string]: Values;
};

export const feelingMap: FeelingMap = rawValues.reduce(
  (accumulator, [key, text, fillColor, emotionLevel]) => {
    accumulator[key] = { text, fillColor, emotionLevel };

    return accumulator;
  },
  {} as FeelingMap,
);

export const emotionLevelColorMap = {
  "very positive": "#F86D6D",
  positive: "#F89F6D",
  average: "#7CD185",
  negative: "#6D9CF8",
  "very negative": "#A26DF8",
};
