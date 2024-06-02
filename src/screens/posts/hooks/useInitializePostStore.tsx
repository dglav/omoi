import { useGlobalSearchParams } from "expo-router";

import { useGetPost } from "../../../hooks/postHooks/useGetPost";
import { useStore } from "../store/useStore";

export const useInitializePostStore = () => {
  const { postId } = useGlobalSearchParams<{ postId: string }>();

  const { data: post, isLoading } = useGetPost(postId);

  const { resetTo } = useStore(({ resetTo }) => ({
    resetTo,
  }));

  const handleInitializePostStore = () => {
    if (!isLoading && post) {
      resetTo(post);
    }
  };

  return { initializePostStore: handleInitializePostStore };
};
