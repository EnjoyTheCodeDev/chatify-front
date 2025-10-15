import { apiFetch } from "../api/fetch";
import type { UserRead } from "../types/user";

const BASE_URL = "/users";

export class UserService {
  static async getAllUsers(): Promise<UserRead[]> {
    return apiFetch(BASE_URL);
  }

  static async getMe(): Promise<UserRead> {
    return apiFetch(`${BASE_URL}/me`);
  }
}
