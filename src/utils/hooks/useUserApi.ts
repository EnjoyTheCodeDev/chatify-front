import { useQuery } from "@tanstack/react-query";
import { UserService } from "../services/userService";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => UserService.getAllUsers(),
    refetchOnWindowFocus: true,
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => UserService.getMe(),
    refetchOnWindowFocus: true,
  });
};
