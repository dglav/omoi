import { useGlobalSearchParams } from "expo-router";
import { useEffect } from "react";

import { useGetPost } from "../../../hooks/postHooks/useGetPost";
import { useStore } from "../store/useStore";

export const useInitializePostStore = () => {
  const { postId } = useGlobalSearchParams<{ postId: string }>();

  const { data: post, isLoading } = useGetPost(postId);

  const { resetTo } = useStore(({ resetTo }) => ({
    resetTo,
  }));

  useEffect(() => {
    if (!isLoading && post) {
      resetTo(post);
    }
  }, [isLoading, post]);
};
