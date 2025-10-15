import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { chatSocket } from "../services/socketService";

export const useChatSocket = (chatId: string, token: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    chatSocket.connect(chatId, token, (event) => {
      try {
        const data = JSON.parse(event);
        if (data.type === "NEW_MESSAGE") {
          queryClient.invalidateQueries({ queryKey: ["messages", chatId] });
        }
      } catch (e) {
        console.error("Invalid WS message", e);
      }
    });

    return () => {
      chatSocket.disconnect();
    };
  }, [chatId, token, queryClient]);
};
