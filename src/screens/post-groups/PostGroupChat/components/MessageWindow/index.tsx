import { View } from "react-native";

import { MyMessage } from "./components/MyMessage";
import { PartnerMessage } from "./components/PartnerMessage";
import { useGetPostGroupMessages } from "../../../../../hooks/postGroupMessageHooks/useGetPostGroupMessages";
import { useGetUser } from "../../../../../hooks/userHooks/useGetUser";

export const MessageWindow = ({ postGroupId }: { postGroupId: string }) => {
  const { data } = useGetPostGroupMessages({ postGroupId });
  const { user } = useGetUser();

  const messages = data?.messages;

  return (
    <View
      style={{
        paddingVertical: 28,
        paddingHorizontal: 16,
        gap: 28,
      }}
    >
      {!!messages &&
        user?.id &&
        messages.map((message) =>
          message.userId === user?.id ? (
            <MyMessage
              key={message.id}
              messageText={message.message}
              messageDate={message.createdAt}
            />
          ) : (
            <PartnerMessage
              key={message.id}
              messageText={message.message}
              messageDate={message.createdAt}
            />
          ),
        )}
    </View>
  );
};
