type Values = {
  text: string;
  category: string;
};

type TagMap = {
  [key: string]: Values;
};

export const tagMap: TagMap = {
  physicalCondition: {
    text: "体調",
    category: "personal",
  },
  health: {
    text: "健康",
    category: "personal",
  },
  worry: {
    text: "悩み",
    category: "personal",
  },
  hobby: {
    text: "趣味",
    category: "personal",
  },
  identity: {
    text: "アイデンティティ",
    category: "personal",
  },
  friend: {
    text: "友人",
    category: "relationship",
  },
  coworker: {
    text: "仕事仲間",
    category: "relationship",
  },
  family: {
    text: "家族",
    category: "relationship",
  },
  partner: {
    text: "パートナー",
    category: "relationship",
  },
  work: {
    text: "仕事",
    category: "happenings",
  },
  school: {
    text: "学校",
    category: "happenings",
  },
  partTimeJob: {
    text: "バイト",
    category: "happenings",
  },
  money: {
    text: "お金",
    category: "happenings",
  },
  future: {
    text: "将来",
    category: "other",
  },
  memories: {
    text: "思い出",
    category: "other",
  },
  other: {
    text: "その他",
    category: "other",
  },
};
