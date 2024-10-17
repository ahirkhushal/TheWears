import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface UserResponse {
  status: string;
  message: string;
  data: {
    _id: string;
    username: string;
    email: string;
    role: string;
    photo: string;
    EmailisVarified: boolean;
    __v: number;
    EmailVarificationToken: string;
    EmailvarificationExpires: string;
    generateOtp: string;
  };
  verifyToken: string;
}

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signUp, isPending: isLoading } = useMutation<
    UserResponse,
    Error,
    SignupPayload
  >({
    mutationFn: ({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    }: SignupPayload) =>
      signupApi({ firstName, lastName, email, password, confirmPassword }),
    onSuccess: (user) => {
      console.log(user);

      queryClient.setQueryData(["user"], user?.data);
      toast.success(user.message);
      navigate(`/verification/${user?.verifyToken}`, { replace: true });
    },
    onError: (err: ApiError) => {
      toast.error(
        err.response?.data?.message || "something went wrong! Please try again",
      );
    },
  });

  return { signUp, isLoading };
}
