import { useMutation } from "@tanstack/react-query";
import { refreshToken as refreshTokenApi } from "../services/auth";
import { useAuth } from "../context/AuthContext";

export const useRefreshToken = () => {
  const { refreshToken, setAccessToken, setRefreshToken } = useAuth();
  const { mutate: refresh, isPending: isRefreshing } = useMutation({
    mutationFn: () => refreshTokenApi({ refreshToken: refreshToken ?? "" }),
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
    },
    onError: (error) => {
      console.error("Failed to refresh token", error);
      // Optionally handle errors, e.g., log out the user
    },
  });

  return { refresh, isRefreshing };
};
