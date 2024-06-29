import { useGetPosts } from "../../../../../../../hooks/postHooks/useGetPosts";

type Props = {
  startDate: Date;
  endDate: Date;
};

type ReturnType = {
  isLoading: boolean;
  topTags: string[];
};

export const useGetTimeBoundTags = (
  { startDate, endDate }: Props,
): ReturnType => {
  const { data: posts, isLoading } = useGetPosts({
    who: "me",
    where: { startDate, endDate },
  });

  if (isLoading || !posts) {
    return {
      isLoading,
      topTags: [],
    };
  }

  const allTags = posts.map((post) => post.tags).flat();
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

  const topTags = Array.from(tagCountMap).sort((a, b) => b[1] - a[1]).map((
    tag,
  ) => tag[0]);

  return { topTags, isLoading };
};
