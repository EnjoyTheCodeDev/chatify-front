export interface UserRegisterRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface UserLoginRequest {
  login: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  tokenType: string;
}

export interface DecodedTokenPayload {
  sub: string;
  exp: number;
}
