import React from "react";
import clsx from "clsx";

import { getUserIdFromToken } from "../utils/helpers/decoder";
import { formatIsoDate } from "../utils/helpers/dateFormatter";
import type { MessageRead } from "../utils/types/message";

import ExtendMessage from "./ExtendMessage";

type Props = {
  message: MessageRead;
  chatId: string;
};

const ChatMessage: React.FC<Props> = ({
  message: { id, author, createdAt: timestamp, content: text, files },
  chatId,
}) => {
  const [isSelected, setIsSelected] = React.useState(false);

  const userId = getUserIdFromToken() || "";
  const userStatus = author.id === userId ? "internal" : "external";

  const handleSelect = () => {
    if (userStatus === "internal") {
      setIsSelected(true);
    }
  };
  const handleClose = () => setIsSelected(false);

  return (
    <div
      className={clsx(
        "flex w-full",
        userStatus === "internal" ? "justify-end" : "justify-start",
      )}
    >
      {isSelected && (
        <ExtendMessage
          text={text}
          msgId={id}
          chatId={chatId}
          onClose={handleClose}
        />
      )}

      <div
        className={clsx(
          "flex gap-2",
          userStatus === "internal" ? "flex-row-reverse" : "flex-row",
        )}
      >
        <div
          className={clsx(
            "flex flex-col",
            userStatus === "internal" ? "items-end" : "items-start",
          )}
        >
          <div
            className={clsx(
              "w-fit max-w-xs p-2 rounded-sm shadow-sm",
              userStatus === "internal"
                ? "rounded-br-none bg-primary-blue/20 hover:cursor-pointer hover:outline outline-gray-300"
                : "rounded-bl-none bg-white",
            )}
            onClick={handleSelect}
          >
            {files && files.length > 0 && (
              <div className="mb-4 flex flex-col gap-2">
                {files.map((file) => (
                  <img key={file.id} src={file.path} alt={file.filename} />
                ))}
              </div>
            )}

            <p
              className={clsx(
                "text-sm text-primary-black/80",
                userStatus === "internal" ? "text-right" : "text-left",
              )}
            >
              {text}
            </p>
          </div>

          <div
            className={clsx(
              "flex items-end",
              userStatus === "internal" ? "flex-row-reverse" : "flex-row",
            )}
          >
            <span className="text-xs text-primary-black/40 mt-1 block">
              {formatIsoDate(new Date(timestamp).toUTCString(), "time")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
