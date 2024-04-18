import React from "react";
import Button from "../../ui/Button";
import AuthenticationPromt from "../../ui/AuthenticationPromt";
import { FcGoogle } from "react-icons/fc";

export default function GoogleAuth() {
  return (
    <>
      <div className="flex w-[200px] items-center justify-center smallSr:w-[250px] signupSm:w-[400px] md:w-[500px] lg:w-[400px] xl:w-[500px]">
        <span className="h-0.5 flex-grow bg-gray-300"></span>
        <div className="f8ont-mulish mx-4 text-xs text-white signupSm:text-lg lg:text-gray-600">
          or Sign in With
        </div>
        <span className="h-0.5 flex-grow bg-gray-300"></span>
      </div>
      <Button type="rare">
        <FcGoogle />
        sign in with google
      </Button>
      <AuthenticationPromt type="dark" route="/signup" routeText="sign Up">
        Don't have an account?
      </AuthenticationPromt>
    </>
  );
}
