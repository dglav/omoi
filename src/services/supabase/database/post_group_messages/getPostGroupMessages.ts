import { parse } from "@formkit/tempo";

import { supabase } from "../..";
import { SupabaseDatabaseError } from "../../error";
import { ChatMessage } from "../../../../domain/ChatMessage";

type Props = {
  postGroupId: string;
};

export const getPostGroupMessages = async ({
  postGroupId,
}: Props): Promise<{ messages: ChatMessage[] }> => {
  const { data: messages, error } = await supabase
    .from("post_group_messages")
    .select("*")
    .match({ post_group_id: postGroupId });

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  const convertedMessages: ChatMessage[] = messages.map((message) => ({
    id: message.id,
    message: message.message,
    authorId: message.user_id,
    createdAt: parse(message.created_at),
  }));

  return { messages: convertedMessages };
};
