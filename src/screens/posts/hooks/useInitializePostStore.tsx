import { useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import { getPost } from "../../../services/supabase/database/posts/getPost";
import { useStore } from "../store/useStore";

export const useInitializePostStore = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = useGlobalSearchParams<{ postId: string }>();

  const { resetTo } = useStore(({ resetTo }) => ({
    resetTo,
  }));

  useEffect(() => {
    const fetchPost = async (postId: string) => {
      const post = await getPost({ id: postId });
      resetTo(post);
      setIsLoading(false);
    };

    if (postId) {
      fetchPost(postId);
    }
  }, []);

  return { isLoading };
};
