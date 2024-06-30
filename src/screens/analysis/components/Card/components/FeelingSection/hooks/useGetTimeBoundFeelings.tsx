import { useGetCustomFeelings } from "../../../../../../../hooks/customFeelingHooks/useGetCustomFeelings";
import { useGetPostsForAnalysis } from "../../hooks/useGetPostsForAnalysis";

const approximateFeelingLevelMap = new Map<string, "bad" | "average" | "good">([
  ["very negative", "bad"],
  ["negative", "bad"],
  ["average", "average"],
  ["positive", "good"],
  ["very positive", "good"],
]);

export const useGetTimeBoundFeelings = (): {
  currentWeek: {
    topEmotions: [string, { count: number; color: string }][];
    goodEmotionCount?: number;
    averageEmotionCount?: number;
    badEmotionCount?: number;
    totalEmotionCount?: number;
  };
} => {
  const { data: posts, isLoading: isLoadingPosts } = useGetPostsForAnalysis();

  const { data: customFeelings, isLoading: isLoadingFeelings } =
    useGetCustomFeelings();

  if (isLoadingPosts || isLoadingFeelings || !posts || !customFeelings) {
    return {
      currentWeek: {
        topEmotions: [],
      },
    };
  }

  const feelings = posts.map((post) => post.feelings).flat();

  const totalEmotionCount = feelings.length;
  const {
    goodEmotionCount,
    averageEmotionCount,
    badEmotionCount,
    emotionCountMap,
  } = feelings.reduce((accumulator: {
    emotionCountMap: Map<string, { count: number; color: string }>;
    goodEmotionCount: number;
    averageEmotionCount: number;
    badEmotionCount: number;
  }, currentFeeling) => {
    const currentEmotionCountValue = accumulator.emotionCountMap.get(
      currentFeeling.name,
    )?.count;

    if (!currentEmotionCountValue) {
      accumulator.emotionCountMap.set(currentFeeling.name, {
        count: 1,
        color: currentFeeling.color,
      });
    } else {
      accumulator.emotionCountMap.set(
        currentFeeling.name,
        { count: currentEmotionCountValue + 1, color: currentFeeling.color },
      );
    }

    const approximateFeelingLevel = approximateFeelingLevelMap.get(
      currentFeeling.emotionLevel,
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
    emotionCountMap: Map<string, { count: number; color: string }>;
    goodEmotionCount: number;
    averageEmotionCount: number;
    badEmotionCount: number;
  });

  const topEmotions = Array.from(emotionCountMap.entries()).sort(
    ([_, value1], [__, value2]) => {
      return value2.count - value1.count;
    },
  ).slice(0, 6);

  return {
    currentWeek: {
      topEmotions,
      goodEmotionCount,
      averageEmotionCount,
      badEmotionCount,
      totalEmotionCount,
    },
  };
};
