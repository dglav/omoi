import { useGetPosts } from "../../../../../../hooks/postHooks/useGetPosts";
import { useAnalysisScreenStore } from "../../../useAnalysisScreenStore";

export const useGetPostsForAnalysis = () => {
  const { user, startDate, endDate } = useAnalysisScreenStore();
  console.log({ user, startDate, endDate });
  return useGetPosts({
    who: user,
    where: { startDate, endDate },
  });
};
