import type { UserRead } from "./user";

export interface ChatCreate {
  receiverId: string;
}

export interface ChatRead {
  id: string;
  users: UserRead[];
  lastMessage: string | null;
}
