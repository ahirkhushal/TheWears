import axiosInstance from "./axiosInstance";
interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RefreshTokenPayload {
  refreshToken: string;
}

interface verifyOTPPayload {
  verifyToken: string;
  OTP: string;
}

export const login = async ({ email, password }: LoginPayload) => {
  const response = await axiosInstance.post("/v1/users/login", {
    email,
    password,
  });
  console.log({ response });

  return response.data;
};

export const signup = async ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
}: SignupPayload) => {
  const response = await axiosInstance.post("/v1/users/signup", {
    userName: `${firstName} ${lastName}`,
    email,
    password,
    confirmPassword,
  });

  return response.data;
};

export const refreshToken = async ({ refreshToken }: RefreshTokenPayload) => {
  const response = await axiosInstance.post("/v1/users/refresh-token", {
    refreshToken: refreshToken,
  });

  return response.data;
};

export const verifyOtp = async ({ verifyToken, OTP }: verifyOTPPayload) => {
  const response = await axiosInstance.post("/v1/users/verifyotp", {
    verifyToken,
    OTP,
  });

  return response.data;
};
