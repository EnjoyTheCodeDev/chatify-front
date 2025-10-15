import { apiFetch } from "../api/fetch";
import type { ChatCreate, ChatRead } from "../types/chat";

const BASE_URL = "/chats";

export class ChatService {
  static async getUserChats(): Promise<ChatRead[]> {
    return apiFetch(`${BASE_URL}/user`);
  }

  static async getChat(chatId: string): Promise<ChatRead> {
    return apiFetch(`${BASE_URL}/${chatId}`);
  }

  static async createChat(data: ChatCreate): Promise<ChatRead> {
    return apiFetch(`${BASE_URL}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async deleteChat(chatId: string): Promise<{ detail: string }> {
    return apiFetch(`${BASE_URL}/${chatId}`, {
      method: "DELETE",
    });
  }
}
