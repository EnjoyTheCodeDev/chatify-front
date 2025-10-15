import clsx from "clsx";

import { useCreateChat } from "../utils/hooks/useChatApi";

type Props = {
  userId: string;
  nickname: string;
};

const UserItem: React.FC<Props> = ({ userId, nickname }) => {
  const { mutate: createChat } = useCreateChat();

  return (
    <button
      type="button"
      onClick={() => createChat(userId)}
      className={clsx(
        "text-primary-blue p-2 hover:bg-gray-200 hover:cursor-pointer w-full text-left",
        "border-b border-gray-200 last:border-0",
      )}
    >
      {nickname}
    </button>
  );
};

export default UserItem;
