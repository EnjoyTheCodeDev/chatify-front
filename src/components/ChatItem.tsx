import UserIcon from "../icons/UserIcon";
import type { ChatRead } from "../utils/types/chat";

import { getUserIdFromToken } from "../utils/helpers/decoder";

type Props = {
  chat: ChatRead;
  onSelect: (chatId: string) => void;
};

const ChatItem: React.FC<Props> = ({ chat, onSelect }) => {
  const currentUserId = getUserIdFromToken() || "";

  const nickName = chat.users.find(
    (user) => user.id !== currentUserId,
  )?.nickname;

  return (
    <div
      onClick={() => onSelect(chat.id)}
      className="flex items-center gap-2 px-3 py-3 border-b border-gray-200 hover:bg-gray-200 cursor-pointer"
    >
      <div className="p-2 rounded-md bg-white text-primary-blue shadow h-fit">
        <UserIcon />
      </div>

      <div className="flex flex-col justify-between">
        <span className="text-sm font-medium text-primary-blue">
          {nickName}
        </span>

        <span className="text-xs text-gray-400">{chat.lastMessage || "Not message yet"}</span>
      </div>
    </div>
  );
};

export default ChatItem;
