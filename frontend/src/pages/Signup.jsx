import React from "react";
import Logo from "../ui/Logo";
import SignupForm from "../features/authentication/SignupForm";

export default function Signup() {
  return (
    <div className="custom-bg-image max-h-auto flex min-h-screen flex-col items-center justify-center gap-2 bg-red-200">
      <Logo
        className="h-[150px] w-[150px] sm:h-[200px] sm:w-[200px]"
        logo="Logo-3.svg"
      />
      <SignupForm />
    </div>
  );
}
