import { apiFetch } from "../api/fetch";
import type { MessageRead } from "../types/message";

const BASE_URL = "/messages";

export class MessageService {
  static async getChatMessages(chatId: string): Promise<MessageRead[]> {
    return apiFetch(`${BASE_URL}/chat/${chatId}`);
  }

  static async sendMessage(
    chatId: string,
    content?: string,
    files?: File[],
  ): Promise<MessageRead> {
    const formData = new FormData();
    formData.append("chat_id", chatId);
    if (content) formData.append("content", content);

    if (files && files.length > 0) {
      for (const file of files) {
        formData.append("files", file);
      }
    }

    return apiFetch(`${BASE_URL}`, {
      method: "POST",
      body: formData,
    });
  }

  static async updateMessage(
    messageId: string,
    content: string,
  ): Promise<MessageRead> {
    const formData = new FormData();
    formData.append("content", content);

    return apiFetch(`${BASE_URL}/${messageId}`, {
      method: "PUT",
      body: formData,
    });
  }

  static async deleteMessage(messageId: string): Promise<{ detail: string }> {
    return apiFetch(`${BASE_URL}/${messageId}`, {
      method: "DELETE",
    });
  }
}
