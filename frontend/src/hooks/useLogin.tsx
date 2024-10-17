import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface LoginPayload {
  email: string;
  password: string;
}

interface UserResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoading } = useMutation<
    UserResponse,
    Error,
    LoginPayload
  >({
    mutationFn: ({ email, password }: LoginPayload) =>
      loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success("Login Successful");
      navigate("/", { replace: true });
    },
    onError: (err: ApiError) => {
      toast.error(
        err.response?.data?.message || "something went wrong! Please try again",
      );
    },
  });

  return { login, isLoading };
}
