import { addDay } from "@formkit/tempo";
import { useGetPosts } from "../../../../../../hooks/postHooks/useGetPosts";
import { useAnalysisScreenStore } from "../../../../hooks/useAnalysisScreenStore";

type Props = {
  user: "me" | "partner";
};

export const useGetPostsForAnalysis = ({ user }: Props) => {
  const { startDate, endDate } = useAnalysisScreenStore();

  const currentWeekPosts = useGetPosts({
    who: user,
    where: { startDate, endDate },
  });

  const lastWeekPosts = useGetPosts({
    who: user,
    where: { startDate: addDay(startDate, -7), endDate: addDay(endDate, -7) },
  });

  return {
    currentWeekPosts: currentWeekPosts.data ?? [],
    lastWeekPosts: lastWeekPosts.data ?? [],
    isLoading: currentWeekPosts.isLoading || lastWeekPosts.isLoading,
  };
};
