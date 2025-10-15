import React from "react";

import {
  useUpdateMessage,
  useDeleteMessage,
} from "../utils/hooks/useMessageApi";

import TrashIcon from "../icons/TrashIcon";
import OkIcon from "../icons/OkIcon";
import CloseIcon from "../icons/CloseIcon";

import ModalWrap from "./ModalWrap";
import TextArea from "./TextArea";

type Props = {
  msgId: string;
  chatId: string;
  text: string;
  onClose: () => void;
};

const ExtendMessage: React.FC<Props> = ({ chatId, text, msgId, onClose }) => {
  const { mutate: updateMessage } = useUpdateMessage(chatId);
  const { mutate: deleteMessage } = useDeleteMessage(chatId);
  const [messageText, setMessageText] = React.useState(text);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageText(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (messageText.trim() === "") return;

    updateMessage({ messageId: msgId, content: messageText });
    onClose();
  };
  const handleDelete = () => {
    deleteMessage(msgId);
    onClose();
  };
  const handleClose = () => onClose();

  return (
    <ModalWrap>
      <form
        onSubmit={handleSubmit}
        className="flex gap-4 bg-white w-xs p-2 rounded-sm"
      >
        <TextArea value={messageText} onChange={handleChange} />

        <div className="flex flex-col gap-2">
          <button
            className="flex items-center gap-1 border border-gray-200 text-primary-blue rounded-sm p-1"
            type="button"
            onClick={handleClose}
          >
            <CloseIcon className="w-5 h-5" />
            Close
          </button>

          <button
            className="flex items-center gap-1 border border-gray-200 text-primary-blue rounded-sm p-1"
            type="button"
            onClick={handleDelete}
          >
            <TrashIcon className="w-5 h-5" />
            Delete
          </button>

          <button
            className="flex items-center gap-1 border border-gray-200 text-primary-blue rounded-sm p-1"
            type="submit"
          >
            <OkIcon className="w-5 h-5" />
            Save
          </button>
        </div>
      </form>
    </ModalWrap>
  );
};

export default ExtendMessage;
