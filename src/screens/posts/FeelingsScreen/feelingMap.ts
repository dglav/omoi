const rawValues = [
  ["excited", "興奮", "#F55634"],
  ["interested", "面白い", "#F88D5F"],
  ["happy", "嬉しい", "#FFBA69"],
  ["sense of achievement", "達成感", "#F0B966"],
  ["fun", "楽しい", "#F2B339"],
  ["appreciative", "感謝", "#E8D849"],
  ["like", "好き", "#EC9A88"],
  ["relieved", "安心", "#DCE84E"],
  ["peaceful", "穏やか", "#9BDE58"],
  ["calm", "落ち着き", "#6EDA79"],
  ["carefree", "気楽", "#94E59C"],
  ["neutral", "平常", "#8AC890"],
  ["unsettled", "モヤモヤ", "#7ED1B8"],
  ["bored", "退屈", "#6AB49E"],
  ["anxious", "不安", "#7EB8D1"],
  ["nervous", "緊張", "#7EDAE0"],
  ["stressed", "ストレス", "#8CA4D1"],
  ["tired", "だるい", "#7F899D"],
  ["exhausted", "疲れた", "#496186"],
  ["sad", "悲しい", "#4B70B5"],
  ["pained", "辛い", "#6867A1"],
  ["scared", "怖い", "#50949D"],
  ["irritated", "イライラ", "#CD7777"],
  ["angry", "怒り", "#A84545"],
];

type Values = {
  text: string;
  fillColor: string;
};

type FeelingMap = {
  [key: string]: Values;
};

export const feelingMap: FeelingMap = rawValues.reduce(
  (accumulator, [key, text, fillColor]) => {
    accumulator[key] = { text, fillColor };

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
