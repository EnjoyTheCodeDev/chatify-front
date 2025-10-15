import React from "react";
import clsx from "clsx";

import { useUserChats } from "../utils/hooks/useChatApi";

import ChatIcon from "../icons/ChatIcon";

import ChatList from "../components/ChatList";
import ChatItem from "../components/ChatItem";
import UserLabel from "../components/UserLabel";
import LoadingWrap from "../components/LoadingWrap";
import AddChat from "../components/AddChat";

const ChatPage = () => {
  const { data: chats, isLoading } = useUserChats();

  const [selectedChatId, setSelectedChatId] = React.useState<string | null>(
    null,
  );

  const handleSetSelectedChatId = (chatId: string) => setSelectedChatId(chatId);
  const handleClearSelectedChatId = () => setSelectedChatId(null);
  const token = localStorage.getItem("accessToken") || "";

  return (
    <>
      <header className="flex justify-between items-center bg-white h-20 mb-3 rounded-sm shadow-xs p-2 md:p-3">
        <UserLabel />

        <h1 className="flex items-center gap-1 text-2xl font-medium text-primary-blue pr-2">
          <ChatIcon />
          Chatify
        </h1>
      </header>

      <div className="grid md:grid-cols-[2fr_4fr] gap-3 min-h-[30rem] md:min-h-[40rem] h-full">
        <aside
          className={clsx(
            "hidden md:block bg-white w-full rounded-sm shadow-xs overflow-hidden",
            !selectedChatId && "!block",
          )}
        >
          <div className="flex justify-between items-center p-2 md:p-3 border-b border-gray-200">
            <h3 className="text-lg font-medium text-primary-blue">Chats</h3>

            <AddChat />
          </div>

          <ul className="relative bg-gray-100 h-full">
            <LoadingWrap isLoading={isLoading} />

            {chats ? (
              chats.map((chat) => (
                <li key={chat.id}>
                  <ChatItem chat={chat} onSelect={handleSetSelectedChatId} />
                </li>
              ))
            ) : (
              <p>You have no chats yet.</p>
            )}
          </ul>
        </aside>

        <main
          className={clsx(
            "bg-gray-100 w-full rounded-sm shadow-xs overflow-hidden",
            !selectedChatId && "hidden md:block",
          )}
        >
          {selectedChatId ? (
            <ChatList
              chatId={selectedChatId}
              onBack={handleClearSelectedChatId}
              token={token}
            />
          ) : (
            <div className="h-full flex flex-col justify-center items-center gap-3 text-center p-6">
              <ChatIcon className="w-16 h-16 text-gray-300" />

              <p className="text-gray-400">
                Select a chat to start messaging or create a new chat.
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default ChatPage;
