import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatService } from "../services/chatService";

export const useUserChats = () => {
  return useQuery({
    queryKey: ["chats"],
    queryFn: () => ChatService.getUserChats(),
    refetchOnWindowFocus: true,
  });
};

export const useChat = (chatId: string) => {
  return useQuery({
    queryKey: ["chat", chatId],
    queryFn: () => ChatService.getChat(chatId),
    enabled: !!chatId,
    refetchOnWindowFocus: true,
  });
};

export const useCreateChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (receiverId: string) => ChatService.createChat({ receiverId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
};

export const useDeleteChat = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chatId: string) => ChatService.deleteChat(chatId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats", userId] });
    },
  });
};
