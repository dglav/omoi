import { FlatList, ListRenderItemInfo } from "react-native";

import { MyMessage } from "./components/MyMessage";
import { PartnerMessage } from "./components/PartnerMessage";
import { ChatMessage } from "../../../../domain/ChatMessage";
import { useGetUser } from "../../../../hooks/userHooks/useGetUser";

type Props = {
  messages: ChatMessage[];
};

export const MessageWindow = ({ messages }: Props) => {
  const { user } = useGetUser();

  const renderItem = (info: ListRenderItemInfo<ChatMessage>) =>
    info.item.authorId === user?.id ? (
      <MyMessage
        key={info.item.id}
        messageText={info.item.message}
        messageDate={info.item.createdAt}
      />
    ) : (
      <PartnerMessage
        key={info.item.id}
        messageText={info.item.message}
        messageDate={info.item.createdAt}
      />
    );

  return (
    <FlatList
      data={messages}
      renderItem={(info) => renderItem(info)}
      keyExtractor={(item) => item.id}
      inverted
      extraData={user?.id}
    />
  );
};
