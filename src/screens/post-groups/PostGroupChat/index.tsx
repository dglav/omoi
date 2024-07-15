import { useLocalSearchParams } from "expo-router";
import { Chat } from "../../../components/Chat";
import { useGetPostGroupMessages } from "../../../hooks/postGroupMessageHooks/useGetPostGroupMessages";
import { useCreatePostGroupMessage } from "../../../hooks/postGroupMessageHooks/useCreatePostGroupMessage";

type Messages = Parameters<typeof Chat>[0]["messages"];

export const PostGroupChat = () => {
  const { postGroupId: rawPostGroupId } = useLocalSearchParams();
  const postGroupId = typeof rawPostGroupId === "string" ? rawPostGroupId : "";

  const { data } = useGetPostGroupMessages({
    postGroupId,
  });
  const { mutate } = useCreatePostGroupMessage({ postGroupId });

  return (
    <Chat messages={data?.messages ?? [] as Messages} sendNewMessage={mutate} />
  );
};
