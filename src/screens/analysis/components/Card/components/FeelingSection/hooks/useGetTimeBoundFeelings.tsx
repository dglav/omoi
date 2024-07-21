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

type Props = {
  currentWeekPosts: Post[];
  lastWeekPosts: Post[];
  isLoading: boolean;
};

export const useGetTimeBoundFeelings = ({
  currentWeekPosts,
  lastWeekPosts,
  isLoading: isLoadingPosts,
}: Props): {
  currentWeek: {
    topEmotions: [string, { count: number; color: string }][];
    goodEmotionCount?: number;
    averageEmotionCount?: number;
    badEmotionCount?: number;
    totalEmotionCount?: number;
  };
  lastWeek?: {
    percentChangeGood: number;
    percentChangeAverage: number;
    percentChangeBad: number;
  };
} => {
  const { data: customFeelings, isLoading: isLoadingFeelings } =
    useGetCustomFeelings();

  if (
    isLoadingPosts ||
    isLoadingFeelings ||
    !currentWeekPosts?.length ||
    !customFeelings
  ) {
    return {
      currentWeek: {
        topEmotions: [],
      },
    };
  }

  const currentWeek = getWeekData({ posts: currentWeekPosts });

  if (!lastWeekPosts?.length) {
    return {
      currentWeek,
    };
  }

  const lastWeek = getWeekData({ posts: lastWeekPosts });

  const currentWeekPercentGood =
    (100 * currentWeek.goodEmotionCount) / currentWeek.totalEmotionCount;
  const currentWeekPercentAverage =
    (100 * currentWeek.averageEmotionCount) / currentWeek.totalEmotionCount;
  const currentWeekPercentBad =
    (100 * currentWeek.badEmotionCount) / currentWeek.totalEmotionCount;
  const lastWeekPercentGood =
    (100 * lastWeek.goodEmotionCount) / lastWeek.totalEmotionCount;
  const lastWeekPercentAverage =
    (100 * lastWeek.averageEmotionCount) / lastWeek.totalEmotionCount;
  const lastWeekPercentBad =
    (100 * lastWeek.badEmotionCount) / lastWeek.totalEmotionCount;

  return {
    currentWeek,
    lastWeek: {
      percentChangeGood: Math.round(
        currentWeekPercentGood - lastWeekPercentGood,
      ),
      percentChangeAverage: Math.round(
        currentWeekPercentAverage - lastWeekPercentAverage,
      ),
      percentChangeBad: Math.round(currentWeekPercentBad - lastWeekPercentBad),
    },
  };
};

const getWeekData = ({ posts }: { posts: Post[] }) => {
  const feelings = posts.map((post) => post.feelings).flat();

  const {
    goodEmotionCount,
    averageEmotionCount,
    badEmotionCount,
    totalEmotionCount,
    emotionCountMap,
  } = getEmotionCategoryCount(feelings);

  const topEmotions = Array.from(emotionCountMap.entries())
    .sort(([_, value1], [__, value2]) => {
      return value2.count - value1.count;
    })
    .slice(0, 6);

  return {
    goodEmotionCount,
    averageEmotionCount,
    badEmotionCount,
    totalEmotionCount,
    topEmotions,
  };
};

const getEmotionCategoryCount = (
  feelings: Feeling[],
): {
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
  } = feelings.reduce(
    (
      accumulator: {
        emotionCountMap: Map<string, { count: number; color: string }>;
        goodEmotionCount: number;
        averageEmotionCount: number;
        badEmotionCount: number;
      },
      currentFeeling,
    ) => {
      const currentEmotionCountValue = accumulator.emotionCountMap.get(
        currentFeeling.name,
      )?.count;

      if (!currentEmotionCountValue) {
        accumulator.emotionCountMap.set(currentFeeling.name, {
          count: 1,
          color: currentFeeling.color,
        });
      } else {
        accumulator.emotionCountMap.set(currentFeeling.name, {
          count: currentEmotionCountValue + 1,
          color: currentFeeling.color,
        });
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
    },
    {
      emotionCountMap: new Map(),
      goodEmotionCount: 0,
      averageEmotionCount: 0,
      badEmotionCount: 0,
    } as {
      emotionCountMap: Map<string, { count: number; color: string }>;
      goodEmotionCount: number;
      averageEmotionCount: number;
      badEmotionCount: number;
    },
  );

  return {
    totalEmotionCount,
    goodEmotionCount,
    averageEmotionCount,
    badEmotionCount,
    emotionCountMap,
  };
};
