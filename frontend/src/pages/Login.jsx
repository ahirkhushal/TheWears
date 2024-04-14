import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthenticationPromt from "../ui/AuthenticationPromt";
import Logo from "../ui/Logo";
import Form from "../ui/Form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

import Button from "../ui/Button";

export default function Login() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // <div className="max-h-auto custom-bg-image-signin flex min-h-screen items-center justify-center lg:justify-between lg:bg-none">
    <div className="max-h-auto custom-bg-image-signin flex min-h-screen items-center justify-center lg:grid lg:grid-cols-2 lg:bg-none">
      <div className="flex flex-col items-center gap-4">
        <Logo className="signupSm:h-[170px] signupSm:w-[170px] h-[150px] w-[150px]" />
        <Form className="flex flex-col items-center justify-center gap-4">
          <h1 className="signupSm:text-2xl text-lg uppercase text-white lg:text-black xl:text-4xl">
            Sign in
          </h1>
          <div className="flex flex-col items-start justify-center">
            <label
              htmlFor="email"
              className="font-mulish signupSm:block hidden text-lg text-white lg:text-black xl:text-2xl"
            >
              Email <span className="text-red-700">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter Email Address"
              className="signupSm:w-[400px] signupSm:text-2xl smallSr:w-[250px] w-[200px] rounded border-[1px] px-3 py-2 text-lg placeholder:text-brown focus:outline-none focus:ring focus:ring-brown focus:ring-offset-2 md:w-[500px] lg:w-[400px] xl:w-[500px]"
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label
              htmlFor="password"
              className="font-mulish signupSm:block hidden text-lg text-white lg:text-black xl:text-2xl"
            >
              Password <span className="text-red-700">*</span>
            </label>
            <div className="relative">
              <input
                type={isOpen ? "text" : "password"}
                placeholder="Enter Password"
                className="signupSm:text-2xl signupSm:w-[400px] smallSr:w-[250px] w-[200px] rounded border-[1px] px-3 py-2 text-lg placeholder:text-brown focus:outline-none focus:ring focus:ring-brown focus:ring-offset-2 md:w-[500px] lg:w-[400px] xl:w-[500px]"
              />
              <div
                className="absolute right-0 top-2 m-2 text-lg"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                {isOpen ? <FiEye /> : <FiEyeOff />}
              </div>
            </div>
          </div>
          <div className="my-2 flex w-full justify-between">
            <div className="flex items-center gap-2 accent-brown">
              <input
                type="checkbox"
                id="remember-me"
                className="signupSm:h-5 signupSm:w-5 h-3.5 w-3.5 "
              />
              <label
                htmlFor="remember-me"
                className="signupSm:text-lg font-mulish smallSr:text-[0.9rem] text-[0.7rem] font-semibold text-white lg:text-black xl:text-xl"
              >
                Remember me
              </label>
            </div>
            <Link
              to="/signup"
              className="signupSm:text-lg font-mulish hover:text-blur-800 smallSr:text-[0.9rem] text-[0.7rem] font-bold text-blue-600 underline hover:text-blue-700 xl:text-xl"
            >
              forgotPassword
            </Link>
          </div>
          <Button type="secondary">sign in</Button>
        </Form>
        <div className="signupSm:w-[400px] smallSr:w-[250px] flex w-[200px] items-center justify-center md:w-[500px] lg:w-[400px] xl:w-[500px]">
          <span className="h-0.5 flex-grow bg-gray-300"></span>
          <div className="signupSm:text-lg font-mulish mx-4 text-xs text-white lg:text-gray-600">
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
      </div>
      <img
        src="/bg-6.jpg"
        className="hidden h-screen w-full object-cover p-5 lg:block "
        alt=""
      />
    </div>
  );
}
