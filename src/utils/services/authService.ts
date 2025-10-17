import type {
  UserRegisterRequest,
  UserLoginRequest,
  TokenResponse,
} from "../types/auth";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export class AuthService {
  static async signup(data: UserRegisterRequest): Promise<TokenResponse> {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }

    const token: TokenResponse = await response.json();
    localStorage.setItem("accessToken", token.accessToken);
    return token;
  }

  static async login(data: UserLoginRequest): Promise<TokenResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }

    const token: TokenResponse = await response.json();
    localStorage.setItem("accessToken", token.accessToken);
    return token;
  }

  static logout(): void {
    localStorage.removeItem("accessToken");
  }

  static getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  static isAuthenticated(): boolean {
    return Boolean(localStorage.getItem("accessToken"));
  }
}
