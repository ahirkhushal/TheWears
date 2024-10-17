import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyOtp as verifyOtpApi } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface verifyOTPPayload {
  verifyToken: string;
  OTP: string;
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

export function useVerifyOtp() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: verifyOtp, isPending: isLoading } = useMutation<
    UserResponse,
    Error,
    verifyOTPPayload
  >({
    mutationFn: ({ verifyToken, OTP }: verifyOTPPayload) =>
      verifyOtpApi({ verifyToken, OTP }),
    onSuccess: (user) => {
      console.log(user);

      queryClient.setQueryData(["user"], user?.data);
      toast.success("OTP verified Successfully!");
      navigate("/", { replace: true });
    },
    onError: (err: ApiError) => {
      toast.error(
        err.response?.data?.message || "something went wrong! Please try again",
      );
    },
  });

  return { verifyOtp, isLoading };
}
