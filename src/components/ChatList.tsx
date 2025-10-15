import React from "react";

import MessageIcon from "../icons/MessageIcon";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";

import TextArea from "./TextArea";
import ChatMessage from "./ChatMessage";
import LoadingWrap from "./LoadingWrap";
import FileMessage from "./FileMessage";

import { useMessages, useSendMessage } from "../utils/hooks/useMessageApi";
import { useChat } from "../utils/hooks/useChatApi";
import { useChatSocket } from "../utils/hooks/useChatSocket";
import { getUserIdFromToken } from "../utils/helpers/decoder";

interface Props {
  chatId: string;
  onBack: () => void;
  token: string;
}

const ChatList: React.FC<Props> = ({ onBack, chatId, token }) => {
  useChatSocket(chatId, token);
  const { data: messages, isLoading } = useMessages(chatId);
  const { mutate: sendMessage } = useSendMessage(chatId);
  const { data: chat } = useChat(chatId);
  const [newMessage, setNewMessage] = React.useState("");
  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  const currentUserId = getUserIdFromToken() || "";

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleNewMessageChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setNewMessage(e.target.value);
  };
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (newMessage.trim() === "") return;

    sendMessage({ content: newMessage });
    setNewMessage("");
  };

  if (!chat) return null;

  const nickName = chat.users.find(
    (user) => user.id !== currentUserId,
  )?.nickname;

  return (
    <div className="bg-gray-100 flex flex-col justify-between max-h-[500px] md:max-h-[640px] h-full">
      <div className="flex md:block justify-between bg-white border-b border-gray-200 p-2">
        <button
          className="flex items-center gap-0.5 md:hidden text-primary-blue"
          type="button"
          onClick={onBack}
        >
          <ChevronLeftIcon className="w-5 h-5" />{" "}
          <span className="text-xs font-medium uppercase">chats</span>
        </button>

        <p className="flex items-center justify-center gap-1 text-xs text-gray-400">
          Messaging with:
          <span className="text-primary-blue font-medium">{nickName}</span>
        </p>
      </div>

      <div className="relative flex-1 overflow-y-auto">
        {isLoading && <LoadingWrap isLoading={isLoading} />}

        {messages && messages.length > 0 ? (
          <div className="flex flex-col gap-4 p-2 md:p-3 flex-1 overflow-y-auto">
            {messages.map((msg, index) => {
              const currentDate = new Date(msg.createdAt).toDateString();
              const prevDate =
                index > 0
                  ? new Date(messages[index - 1].createdAt).toDateString()
                  : null;
              const showDateSeparator = currentDate !== prevDate;

              return (
                <React.Fragment key={msg.id}>
                  {showDateSeparator && (
                    <div className="text-center text-xs text-gray-400 my-2">
                      {currentDate}
                    </div>
                  )}
                  <ChatMessage message={msg} chatId={chatId} />
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          <p className="mt-30 text-center text-gray-400">No messages yet.</p>
        )}

        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        className="flex justify-between gap-6 bg-white border-t border-gray-200 p-2 md:p-3"
      >
        <TextArea
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Write your message here..."
        />

        <div className="flex items-center gap-2">
          <FileMessage chatId={chatId} />

          <button
            type="submit"
            className="flex justify-center items-center px-2 py-1 rounded-sm bg-primary-blue text-white"
          >
            <MessageIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatList;
