import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  sub: string;
  exp?: number;
  iat?: number;
};

export const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.sub || null;
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
};
