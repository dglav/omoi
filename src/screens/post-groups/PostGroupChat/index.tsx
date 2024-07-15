import { useLocalSearchParams } from "expo-router";
import { Chat } from "../../../components/Chat";
import { useGetPostGroupMessages } from "../../../hooks/postGroupMessageHooks/useGetPostGroupMessages";
import { useCreatePostGroupMessage } from "../../../hooks/postGroupMessageHooks/useCreatePostGroupMessage";

export const PostGroupChat = () => {
  const { postGroupId: rawPostGroupId } = useLocalSearchParams();
  const postGroupId = typeof rawPostGroupId === "string" ? rawPostGroupId : "";

  const { messages } = useGetPostGroupMessages({
    postGroupId,
  });
  const { mutate } = useCreatePostGroupMessage({ postGroupId });

  return <Chat messages={messages} sendNewMessage={mutate} />;
};
