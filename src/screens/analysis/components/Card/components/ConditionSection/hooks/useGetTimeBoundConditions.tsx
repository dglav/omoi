import { diffDays } from "@formkit/tempo";
import { useGetPosts } from "../../../../../../../hooks/postHooks/useGetPosts"
import { Post } from "../../../../../../../services/supabase/database/posts/converter";

const conditionLevelMap = {
  'reallyBad': 1,
  'bad': 2,
  'average': 3,
  'good': 4,
  'reallyGood': 5
} as const;

type Props = {
  startDate: Date,
  endDate: Date,
}

type TimeBoundConditions = {
  dayDiff: number;
  conditionLevel: number;
}[];

export const useGetTimeBoundConditions = ({ startDate, endDate }: Props): {
  timeBoundConditions: TimeBoundConditions; isLoading: boolean;
} => {
  const { data, isLoading } = useGetPosts({ where: { startDate, endDate } })

  if (isLoading || !data) {
    const timeBoundConditions: TimeBoundConditions = [];
    return {
      timeBoundConditions,
      isLoading
    }
  }

  const timeBoundConditions = data.reduce((postGroups, post) => {
    const postDayDiff = diffDays(post.date, startDate, 'floor');

    if (!postGroups[postDayDiff]) {
      postGroups[postDayDiff] = [conditionLevelMap[post.condition]];
    } else {
      postGroups[postDayDiff].push(conditionLevelMap[post.condition])
    }

    return postGroups;
  }, [] as number[][]).map((levelsGroup, index) => {
    const averageLevel = levelsGroup.reduce((sum, level) => {
      return sum + level;
    }, 0) / levelsGroup.length;
    return { dayDiff: index, conditionLevel: averageLevel };
  }).filter(dataPoint => !Number.isNaN(dataPoint.conditionLevel));

  return { timeBoundConditions, isLoading }
}
