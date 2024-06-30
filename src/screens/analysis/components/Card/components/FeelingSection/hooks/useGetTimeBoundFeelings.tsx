import { useGetCustomFeelings } from "../../../../../../../hooks/customFeelingHooks/useGetCustomFeelings";
import { Feeling } from "../../../../../../../services/supabase/database/custom_feelings/converter";
import { Post } from "../../../../../../../services/supabase/database/posts/converter";
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
  const { currentWeekPosts, isLoading: isLoadingPosts } =
    useGetPostsForAnalysis();

  const { data: customFeelings, isLoading: isLoadingFeelings } =
    useGetCustomFeelings();

  if (
    isLoadingPosts || isLoadingFeelings || !currentWeekPosts || !customFeelings
  ) {
    return {
      currentWeek: {
        topEmotions: [],
      },
    };
  }

  const currentWeek = getCurrentWeekData({ posts: currentWeekPosts });

  return {
    currentWeek,
  };
};

const getCurrentWeekData = ({ posts }: { posts: Post[] }) => {
  const feelings = posts.map((post) => post.feelings).flat();

  const {
    goodEmotionCount,
    averageEmotionCount,
    badEmotionCount,
    totalEmotionCount,
    emotionCountMap,
  } = getEmotionCategoryCount(feelings);

  const topEmotions = Array.from(emotionCountMap.entries()).sort(
    ([_, value1], [__, value2]) => {
      return value2.count - value1.count;
    },
  ).slice(0, 6);

  return {
    goodEmotionCount,
    averageEmotionCount,
    badEmotionCount,
    totalEmotionCount,
    topEmotions,
  };
};

const getEmotionCategoryCount = (feelings: Feeling[]): {
  goodEmotionCount: number;
  averageEmotionCount: number;
  badEmotionCount: number;
  totalEmotionCount: number;
  emotionCountMap: Map<string, { count: number; color: string }>;
} => {
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

  return {
    totalEmotionCount,
    goodEmotionCount,
    averageEmotionCount,
    badEmotionCount,
    emotionCountMap,
  };
};
