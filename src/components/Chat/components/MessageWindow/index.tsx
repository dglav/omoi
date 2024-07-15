import { View } from "react-native";

import { MyMessage } from "./components/MyMessage";
import { PartnerMessage } from "./components/PartnerMessage";
import { useGetUser } from "../../../../hooks/userHooks/useGetUser";

type Props = {
  messages: any[];
};

export const MessageWindow = ({ messages }: Props) => {
  const { user } = useGetUser();

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
          message.userId === user?.id
            ? (
              <MyMessage
                key={message.id}
                messageText={message.message}
                messageDate={message.createdAt}
              />
            )
            : (
              <PartnerMessage
                key={message.id}
                messageText={message.message}
                messageDate={message.createdAt}
              />
            )
        )}
    </View>
  );
};
