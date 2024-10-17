import Logo from "@/components/common/Logo";
import { ModeToggle } from "@/components/common/ModeToggle";
import { Button } from "@/components/ui/button";
import { IoChevronBack } from "react-icons/io5";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useVerifyOtp } from "@/hooks/useVerifyOtp";
import { Spinner } from "@/components/ui/spinner";

export default function Otpverify() {
  const navigate = useNavigate();
  const { verifyToken } = useParams();

  const { verifyOtp, isLoading } = useVerifyOtp();

  const [value, setValue] = useState("");

  const handleOtpSubmit = () => {
    verifyOtp({
      verifyToken: verifyToken || "",
      OTP: value,
    });
  };

  return (
    <div className="relative flex h-screen flex-col items-center justify-center gap-3 overflow-hidden">
      <Logo />
      <ModeToggle className="absolute right-0 top-0 m-4" />

      <div className="z-10 mx-4 max-h-[80vh] w-[300px] overflow-y-auto md:w-[350px] lg:w-[400px]">
        <div className="mb-4 flex items-center justify-start gap-8 sm:gap-[2.3rem] md:gap-14 lg:gap-[5rem]">
          <IoChevronBack
            className="cursor-pointer text-2xl"
            onClick={() => {
              navigate(-1);
            }}
          />
          <h1 className="text-2xl font-semibold">OTP Verification</h1>
        </div>
        <p className="mb-6 text-center">
          Please enter the OTP sent to your email to verify your account.
        </p>

        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <Button
          className="mx-auto mt-3 flex items-center justify-center"
          onClick={handleOtpSubmit}
        >
          {isLoading && (
            <Spinner className="mr-1 h-4 w-4 text-white dark:text-black" />
          )}
          Verify OTP
        </Button>
      </div>
    </div>
  );
}
