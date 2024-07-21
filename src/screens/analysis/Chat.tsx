import { useLocalSearchParams } from "expo-router";

import { Chat } from "../../components/Chat";
import { useCreateAnalysisResultsMessage } from "../../hooks/analysisResultsMessageHooks/useCreateAnalysisResultsMessage";
import { useGetAnalysisResultsMessages } from "../../hooks/analysisResultsMessageHooks/useGetAnalysisResultsMessages";

export const AnalysisResultsChat = () => {
  const {
    startDate: rawStartDateISOString,
    endDate: rawEndDateISOString,
    analyzedUserId: rawAnalyzedUserId,
  } = useLocalSearchParams();

  const startDateISOString =
    typeof rawStartDateISOString === "string" ? rawStartDateISOString : "";
  const endDateISOString =
    typeof rawEndDateISOString === "string" ? rawEndDateISOString : "";
  const analyzedUserId =
    typeof rawAnalyzedUserId === "string" ? rawAnalyzedUserId : "";

  const startDate = new Date(startDateISOString);
  const endDate = new Date(endDateISOString);

  const { messages } = useGetAnalysisResultsMessages({
    startDate,
    endDate,
    analyzedUserId,
  });

  const { mutate } = useCreateAnalysisResultsMessage({
    analyzedUserId,
    startDate,
    endDate,
  });

  return <Chat messages={messages} sendNewMessage={mutate} />;
};
