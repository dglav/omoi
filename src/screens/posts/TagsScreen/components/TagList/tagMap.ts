const rawValues: string[][] = [
  ["physicalCondition", "体調", "personal"],
  ["health", "健康", "personal"],
  ["worry", "悩み", "personal"],
  ["hobby", "趣味", "personal"],
  ["identity", "アイデンティティ", "personal"],
  ["sickness", "病気", "personal"],
  ["friend", "友人", "relationship"],
  ["coworker", "仕事仲間", "relationship"],
  ["family", "家族", "relationship"],
  ["partner", "パートナー", "relationship"],
  ["community", "コミュニティ", "relationship"],
  ["pet", "ペット", "relationship"],
  ["work", "仕事", "happenings"],
  ["school", "学校", "happenings"],
  ["partTimeJob", "バイト", "happenings"],
  ["money", "お金", "happenings"],
  ["task", "タスク", "happenings"],
  ["hobby", "趣味", "happenings"],
  ["dailyLife", "生活", "happenings"],
  ["play", "遊び", "happenings"],
  ["future", "将来", "other"],
  ["memories", "思い出", "other"],
  ["other", "その他", "other"],
];

type Values = {
  text: string;
  category: string;
};

type TagMap = {
  [key: string]: Values;
};

export const tagMap: TagMap = rawValues.reduce(
  (previousValue, currentValue) => {
    previousValue[currentValue[0]] = {
      text: currentValue[1],
      category: currentValue[2],
    };
    return previousValue;
  },
  {} as TagMap,
);
