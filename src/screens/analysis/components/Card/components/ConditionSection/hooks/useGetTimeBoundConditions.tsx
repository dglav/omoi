import { diffDays } from "@formkit/tempo";
import { useGetPostsForAnalysis } from "../../hooks/useGetPostsForAnalysis";
import { useAnalysisScreenStore } from "../../../../useAnalysisScreenStore";

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

export const useGetTimeBoundConditions = (): {
  timeBoundConditions: TimeBoundConditions;
  isLoading: boolean;
} => {
  const { startDate } = useAnalysisScreenStore();
  const { currentWeekPosts, isLoading } = useGetPostsForAnalysis();

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
