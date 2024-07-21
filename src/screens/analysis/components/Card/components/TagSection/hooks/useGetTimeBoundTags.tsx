import type { Post } from "../../../../../../../services/supabase/database/posts/converter";

type ReturnType = {
  isLoading: boolean;
  topTags: string[];
};

type Props = {
  currentWeekPosts: Post[];
  isLoading: boolean;
};

export const useGetTimeBoundTags = ({
  currentWeekPosts,
  isLoading,
}: Props): ReturnType => {
  if (isLoading || !currentWeekPosts) {
    return {
      isLoading,
      topTags: [],
    };
  }

  const allTags = currentWeekPosts.map((post) => post.tags).flat();
  const tagCountMap = allTags.reduce<Map<string, number>>(
    (accumulator, currentTag) => {
      const currentAccumulatorValue = accumulator.get(currentTag);

      if (!currentAccumulatorValue) {
        return accumulator.set(currentTag, 1);
      }

      return accumulator.set(currentTag, currentAccumulatorValue + 1);
    },
    new Map(),
  );

  const topTags = Array.from(tagCountMap)
    .sort((a, b) => b[1] - a[1])
    .map((tag) => tag[0]);

  return { topTags, isLoading };
};
