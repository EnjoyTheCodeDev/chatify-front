import React from "react";

import { useUsers } from "../utils/hooks/useUserApi";
import { useUserChats } from "../utils/hooks/useChatApi";

import AddChatIcon from "../icons/AddChatIcon";
import CloseIcon from "../icons/CloseIcon";

import ModalWrap from "./ModalWrap";
import LoadingWrap from "./LoadingWrap";
import UserItem from "./UserItem";

const AddChat = () => {
  const { data: users, isLoading } = useUsers();
  const { data: userChats } = useUserChats();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleModal = () => setIsOpen((prevState) => !prevState);
  const handleCloseModal = () => setIsOpen(false);

  const chatUserIds = React.useMemo(() => {
    if (!userChats) return new Set<string>();

    const ids = userChats.flatMap((chat) => chat.users.map((u) => u.id));

    return new Set(ids);
  }, [userChats]);

  const usersList = React.useMemo(() => {
    if (!users) return [];

    return users.filter((user) => !chatUserIds.has(user.id));
  }, [users, chatUserIds]);

  return (
    <div>
      <button
        onClick={toggleModal}
        className="flex justify-center items-center p-1"
        type="button"
      >
        <AddChatIcon className="text-primary-blue md:opacity-80 hover:opacity-100" />
      </button>

      {isOpen && (
        <ModalWrap>
          <div className="rounded-sm overflow-hidden w-xs">
            <div className="flex justify-between items-center bg-white p-2 border-b border-gray-200">
              <h3 className="text-lg font-medium text-primary-blue">
                Choose a user to chat with
              </h3>

              <button
                className="flex justify-center items-center p-1"
                type="button"
                onClick={handleCloseModal}
              >
                <CloseIcon className="text-primary-blue" />
              </button>
            </div>

            <ul className="relative h-[20rem] bg-gray-100 overflow-y-auto">
              <LoadingWrap isLoading={isLoading} />

              {usersList.map((user) => {
                return (
                  <li key={user.id}>
                    <UserItem userId={user.id} nickname={user.nickname} />
                  </li>
                );
              })}
            </ul>
          </div>
        </ModalWrap>
      )}
    </div>
  );
};

export default AddChat;
