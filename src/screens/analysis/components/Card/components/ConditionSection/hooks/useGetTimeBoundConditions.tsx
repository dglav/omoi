import { diffDays } from "@formkit/tempo";
import { useAnalysisScreenStore } from "../../../../../hooks/useAnalysisScreenStore";
import type { Post } from "../../../../../../../services/supabase/database/posts/converter";

const conditionLevelMap = {
  "reallyBad": 0,
  "bad": 1,
  "average": 2,
  "good": 3,
  "reallyGood": 4,
} as const;

type TimeBoundConditions = {
  dayDiff: number;
  conditionLevel: number;
}[];

type Props = {
  currentWeekPosts: Post[];
  isLoading: boolean;
};

export const useGetTimeBoundConditions = (
  { currentWeekPosts, isLoading }: Props,
): {
  timeBoundConditions: TimeBoundConditions;
  isLoading: boolean;
} => {
  const { startDate } = useAnalysisScreenStore();

  if (isLoading || !currentWeekPosts) {
    const timeBoundConditions: TimeBoundConditions = [];
    return {
      timeBoundConditions,
      isLoading,
    };
  }

  const timeBoundConditions = currentWeekPosts.reduce((postGroups, post) => {
    const postDayDiff = diffDays(post.date, startDate, "floor");

    if (!postGroups[postDayDiff]) {
      postGroups[postDayDiff] = [conditionLevelMap[post.condition]];
    } else {
      postGroups[postDayDiff].push(conditionLevelMap[post.condition]);
    }

    return postGroups;
  }, [] as number[][]).map((levelsGroup, index) => {
    const averageLevel = levelsGroup.reduce((sum, level) => {
      return sum + level;
    }, 0) / levelsGroup.length;
    return { dayDiff: index, conditionLevel: averageLevel };
  }).filter((dataPoint) => !Number.isNaN(dataPoint.conditionLevel));

  return { timeBoundConditions, isLoading };
};
