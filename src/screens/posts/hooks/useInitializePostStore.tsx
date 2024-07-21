import { useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import { useGetUser } from "../../../hooks/userHooks/useGetUser";
import { getPost } from "../../../services/supabase/database/posts/getPost";
import { useStore } from "../store/useStore";

export const useInitializePostStore = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = useGlobalSearchParams<{ postId: string }>();

  const { resetTo } = useStore(({ resetTo }) => ({
    resetTo,
  }));
  const { user } = useGetUser();

  useEffect(() => {
    const fetchPost = async (postId: string) => {
      if (!user) {
        console.error("ユーザーがないため投稿を取得できません。");
        return;
      }

      const post = await getPost({ id: postId, userId: user.id });

      resetTo(post);
      setIsLoading(false);
    };

    if (postId) {
      fetchPost(postId);
    }
  }, []);

  return { isLoading };
};
