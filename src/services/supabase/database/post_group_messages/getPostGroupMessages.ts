import { parse } from "@formkit/tempo";

import { supabase } from "../..";
import { SupabaseDatabaseError } from "../../error";

export type Message = {
  id: string;
  message: string;
  postGroupId: string;
  userId: string;
  createdAt: Date;
};

type Props = {
  postGroupId: string;
};

export const getPostGroupMessages = async ({
  postGroupId,
}: Props): Promise<{ messages: Message[] }> => {
  const { data: messages, error } = await supabase
    .from("post_group_messages")
    .select("*")
    .match({ post_group_id: postGroupId });

  if (error) {
    throw new SupabaseDatabaseError(error);
  }

  const convertedMessages: Message[] = messages.map((message) => ({
    id: message.id,
    message: message.message,
    postGroupId: message.post_group_id,
    userId: message.user_id,
    createdAt: parse(message.created_at),
  }));

  return { messages: convertedMessages };
};
