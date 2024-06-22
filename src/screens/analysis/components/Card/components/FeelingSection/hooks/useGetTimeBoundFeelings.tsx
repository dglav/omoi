import { useGetCustomFeelings } from "../../../../../../../hooks/customFeelingHooks/useGetCustomFeelings";
import { useGetPosts } from "../../../../../../../hooks/postHooks/useGetPosts";
import {
  emotionLevelColorMap,
  feelingMap,
} from "../../../../../../../utils/feelingMap";

const approximateFeelingLevelMap = new Map<string, "bad" | "average" | "good">([
  ["very negative", "bad"],
  ["negative", "bad"],
  ["average", "average"],
  ["positive", "good"],
  ["very positive", "good"],
]);

type Props = {
  startDate: Date;
  endDate: Date;
};

export const useGetTimeBoundFeelings = ({ startDate, endDate }: Props): {
  topEmotions: any;
  goodEmotionCount?: number;
  averageEmotionCount?: number;
  badEmotionCount?: number;
  totalEmotionCount?: number;
} => {
  const { data: posts, isLoading: isLoadingPosts } = useGetPosts({
    who: "me",
    where: { startDate, endDate },
  });
  const { data: customFeelings, isLoading: isLoadingFeelings } =
    useGetCustomFeelings();

  if (isLoadingPosts || isLoadingFeelings || !posts || !customFeelings) {
    return {
      topEmotions: [],
    };
  }

  const feelings = posts.map((post) => post.feelings).flat();
  const customFeelingsMap = customFeelings.reduce(
    (map, customFeeling) => {
      map[customFeeling.id] = {
        name: customFeeling.name,
        emotionLevel: customFeeling.emotionLevel,
      };
      return map;
    },
    {} as {
      [id: string]: {
        name: string;
        emotionLevel:
        | "very positive"
        | "positive"
        | "average"
        | "negative"
        | "very negative";
      };
    },
  );

  const totalEmotionCount = feelings.length;
  const {
    goodEmotionCount,
    averageEmotionCount,
    badEmotionCount,
    emotionCountMap,
  } = feelings.reduce((accumulator: {
    emotionCountMap: Map<string, number>;
    goodEmotionCount: number;
    averageEmotionCount: number;
    badEmotionCount: number;
  }, currentFeeling) => {
    let result = feelingMap[currentFeeling];

    if (!result) {
      const customFeeling = customFeelingsMap[currentFeeling];

      if (!customFeeling) {
        console.error("Feeling not found: ", currentFeeling);

        return accumulator;
      }

      const fillColor = emotionLevelColorMap[customFeeling.emotionLevel];

      if (!fillColor) {
        console.error("Feel color not found: ", currentFeeling);

        return accumulator;
      }

      result = {
        text: customFeeling.name,
        emotionLevel: customFeeling.emotionLevel,
        fillColor,
      };
    }

    const currentEmotionCountValue = accumulator.emotionCountMap.get(
      result.text,
    );

    if (!currentEmotionCountValue) {
      accumulator.emotionCountMap.set(result.text, 1);
    } else {
      accumulator.emotionCountMap.set(
        result.text,
        currentEmotionCountValue + 1,
      );
    }

    const approximateFeelingLevel = approximateFeelingLevelMap.get(
      result.emotionLevel,
    );

    if (approximateFeelingLevel === "good") {
      accumulator.goodEmotionCount++;
    } else if (approximateFeelingLevel === "average") {
      accumulator.averageEmotionCount++;
    } else if (approximateFeelingLevel === "bad") {
      accumulator.badEmotionCount++;
    }

    return accumulator;
  }, {
    emotionCountMap: new Map(),
    goodEmotionCount: 0,
    averageEmotionCount: 0,
    badEmotionCount: 0,
  } as {
    emotionCountMap: Map<string, number>;
    goodEmotionCount: number;
    averageEmotionCount: number;
    badEmotionCount: number;
  });

  const topEmotions = Array.from(emotionCountMap.entries()).sort(
    ([_, value1], [__, value2]) => {
      return value2 - value1;
    },
  ).slice(0, 6);

  return {
    topEmotions,
    goodEmotionCount,
    averageEmotionCount,
    badEmotionCount,
    totalEmotionCount,
  };
};
