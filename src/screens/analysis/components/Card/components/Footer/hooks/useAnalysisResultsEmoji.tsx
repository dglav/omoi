import { useDeleteAnalysisResultsEmoji } from "../../../../../../../hooks/analysisResultsEmojiHooks/useDeleteAnalysisResultsEmoji";
import { useGetAnalysisResultsEmojis } from "../../../../../../../hooks/analysisResultsEmojiHooks/useGetAnalysisResultsEmojis";
import { useUpsertAnalysisResultsEmoji } from "../../../../../../../hooks/analysisResultsEmojiHooks/useUpsertAnalysisResultsEmoji";

type Props = {
  user: "me" | "partner";
  startDate: Date;
  endDate: Date;
};

export const useAnalysisResultsEmojis = ({
  user,
  startDate,
  endDate,
}: Props) => {
  const { analysisResultsEmojis: emojis, isLoading } =
    useGetAnalysisResultsEmojis({
      user,
      startDate,
      endDate,
    });

  const { mutate: postAnalysisResultsEmoji } = useUpsertAnalysisResultsEmoji({
    user,
  });

  const handlePostEmoji = ({ emoji }: { emoji: string }) => {
    postAnalysisResultsEmoji({ startDate, endDate, emoji });
  };

  const { mutate: deleteEmoji } = useDeleteAnalysisResultsEmoji();

  const handleDeleteEmoji = (id: string) => {
    deleteEmoji({ id });
  };

  return {
    emojis,
    isLoadingEmojis: isLoading,
    handlePostEmoji,
    handleDeleteEmoji,
  };
};
