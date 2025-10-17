import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageService } from "../services/messageService";
import type { MessageRead } from "../types/message";

export const useMessages = (chatId: string) => {
  return useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => MessageService.getChatMessages(chatId),
    refetchOnWindowFocus: true,
  });
};

export const useSendMessage = (chatId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      content,
      files,
    }: {
      content?: string;
      files?: File[];
    }) => {
      await queryClient.cancelQueries({ queryKey: ["messages", chatId] });

      const previousMessages = queryClient.getQueryData<MessageRead[]>([
        "messages",
        chatId,
      ]);

      queryClient.setQueryData<MessageRead[]>(
        ["messages", chatId],
        (old: any) => [...old, { content, files }],
      );

      return previousMessages;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", chatId] });
    },
  });
};

export const useUpdateMessage = (chatId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      messageId,
      content,
    }: {
      messageId: string;
      content: string;
    }) => MessageService.updateMessage(messageId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", chatId] });
    },
  });
};

export const useDeleteMessage = (chatId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageId: string) => MessageService.deleteMessage(messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", chatId] });
    },
  });
};
