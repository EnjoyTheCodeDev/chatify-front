import React from "react";
import clsx from "clsx";

import CloseIcon from "../icons/CloseIcon";
import PaperclipIcon from "../icons/PaperclipIcon";
import AddImageIcon from "../icons/AddImageIcon";
import MessageIcon from "../icons/MessageIcon";

import ModalWrap from "./ModalWrap";
import LoadingWrap from "./LoadingWrap";
import TextArea from "./TextArea";

import { useSendMessage } from "../utils/hooks/useMessageApi";

type Props = {
  chatId: string;
};

const FileMessage: React.FC<Props> = ({ chatId }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);
  const [newMessage, setNewMessage] = React.useState("");
  const { mutate: sendMessage } = useSendMessage(chatId);

  const toggleModal = () => setIsOpen((prevState) => !prevState);
  const handleCloseModal = () => setIsOpen(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };
  const handleNewMessageChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setNewMessage(e.target.value);
  };

  const handleRemoveFile = (name: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0 && newMessage.trim() === "") return;

    sendMessage({ content: newMessage, files });
    setFiles([]);
    setNewMessage("");
    handleCloseModal();
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className="flex justify-center items-center p-1 rounded-sm text-gray-400"
        type="button"
      >
        <PaperclipIcon />
      </button>

      {isOpen && (
        <ModalWrap>
          <div className="rounded-sm overflow-hidden w-xs bg-white">
            <div className="flex justify-between items-center p-2 border-b border-gray-200">
              <h3 className="text-lg font-medium text-primary-blue">
                File Attachments
              </h3>

              <button
                className="flex justify-center items-center p-1"
                type="button"
                onClick={handleCloseModal}
              >
                <CloseIcon className="text-primary-blue" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="relative bg-gray-100 p-2 overflow-y-auto"
            >
              <LoadingWrap isLoading={false} />

              {files.length === 0 ? (
                <label
                  className={clsx(
                    "flex flex-col justify-center items-center cursor-pointer text-center",
                    "w-full h-30 border border-dashed border-gray-300 bg-white rounded-sm opacity-70",
                    "hover:opacity-100 hover:border-primary-blue hover:shadow-sm",
                  )}
                >
                  <AddImageIcon className="w-10 h-10 text-primary-blue mb-2" />
                  <span className="text-sm text-gray-500">
                    Click to add files
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              ) : (
                <div className="flex flex-col gap-2">
                  {files.map((file) => (
                    <div
                      key={file.name}
                      className="flex justify-between items-center p-2 bg-white rounded-sm shadow-sm"
                    >
                      <span className="truncate text-sm text-gray-700 max-w-[10rem]">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        className="text-red-500 text-xs"
                        onClick={() => handleRemoveFile(file.name)}
                      >
                        remove
                      </button>
                    </div>
                  ))}

                  <label
                    className={clsx(
                      "flex justify-center items-center cursor-pointer p-2 border border-dashed border-gray-300 bg-white rounded-sm opacity-70",
                      "hover:opacity-100 hover:border-primary-blue hover:shadow-sm",
                    )}
                  >
                    <AddImageIcon className="w-5 h-5 text-primary-blue mr-1" />
                    <span className="text-sm text-gray-500">Add more</span>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              )}
              <div className="flex gap-2 mt-3">
                <TextArea
                  value={newMessage}
                  onChange={handleNewMessageChange}
                  placeholder="Write your message here..."
                />

                <button
                  type="submit"
                  className="flex justify-center items-center px-2 py-1 rounded-sm bg-primary-blue text-white"
                >
                  <MessageIcon />
                </button>
              </div>
            </form>
          </div>
        </ModalWrap>
      )}
    </div>
  );
};

export default FileMessage;
