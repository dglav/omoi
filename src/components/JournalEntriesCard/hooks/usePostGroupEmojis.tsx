import { useDeletePostGroupEmoji } from "../../../hooks/postGroupEmojiHooks/useDeletePostGroupEmoji";
import { useGetPostGroupEmojis } from "../../../hooks/postGroupEmojiHooks/useGetPostGroupEmojis";
import { useUpsertGroupPostEmoji } from "../../../hooks/postGroupEmojiHooks/useUpsertPostGroupEmoji";

type Props = {
  postGroupId: string;
};

export const usePostGroupEmojis = ({ postGroupId }: Props) => {
  const { data } = useGetPostGroupEmojis(postGroupId);

  const { mutate: postEmoji } = useUpsertGroupPostEmoji();
  const postGroupEmojis = data?.postGroupEmojis;

  const handlePostEmoji = ({
    postGroupId,
    emoji,
  }: {
    postGroupId: string;
    emoji: string;
  }) => {
    postEmoji({ postGroupId, emoji });
  };

  const { mutate: deleteEmoji } = useDeletePostGroupEmoji();

  const handleDeleteEmoji = (postGroupId: string) => {
    deleteEmoji({ postGroupId });
  };

  return { postGroupEmojis, handlePostEmoji, handleDeleteEmoji };
};
