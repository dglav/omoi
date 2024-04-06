type Values = {
  text: string;
  fillColor: string;
};

type FeelingMap = {
  [key: string]: Values;
};

export const feelingMap: FeelingMap = {
  excitement: {
    text: "興奮",
    fillColor: "#F55634",
  },
  interest: {
    text: "面白い",
    fillColor: "#F88D5F",
  },
  happy: {
    text: "嬉しい",
    fillColor: "#FFBA69",
  },
  achievement: {
    text: "達成感",
    fillColor: "#F0B966",
  },
  fun: {
    text: "楽しい",
    fillColor: "#F2B339",
  },
  appreciation: {
    text: "感謝",
    fillColor: "#E8D849",
  },
  like: {
    text: "好き",
    fillColor: "#EC9A88",
  },
};
