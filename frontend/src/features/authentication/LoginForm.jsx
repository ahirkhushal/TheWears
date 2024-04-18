import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Button from "../../ui/Button";
import Logo from "../../ui/Logo";
import Form from "../../ui/Form";
import GoogleAuth from "./GoogleAuth";

export default function LoginForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [logo, setLogo] = useState(
    window.innerWidth >= 1024 ? "Logo-2.svg" : "Logo-3.svg",
  );

  useEffect(() => {
    function handleResize() {
      setLogo(window.innerWidth >= 1024 ? "Logo-2.svg" : "Logo-3.svg");
    }

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <Logo
        className="h-[150px] w-[150px] signupSm:h-[100px] signupSm:w-[170px]"
        logo={logo}
      />
      <Form className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-lg uppercase text-white signupSm:text-2xl lg:text-black xl:text-4xl">
          Sign in
        </h1>
        <div className="flex flex-col items-start justify-center gap-2">
          <label
            htmlFor="email"
            className="hidden font-mulish text-lg text-white signupSm:block lg:text-black xl:text-2xl"
          >
            Email <span className="text-[#2b2b2b]">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter Email Address"
            className="w-[200px] rounded border-[1px] px-3 py-2 text-lg placeholder:text-[#2b2b2b] focus:outline-none focus:ring focus:ring-[#e6e6dd] focus:ring-offset-2 smallSr:w-[250px] signupSm:w-[400px] signupSm:text-2xl md:w-[500px] lg:w-[400px] xl:w-[500px]"
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-2">
          <label
            htmlFor="password"
            className="hidden font-mulish text-lg text-white signupSm:block lg:text-black xl:text-2xl"
          >
            Password <span className="text-[#2b2b2b]">*</span>
          </label>
          <div className="relative">
            <input
              type={isOpen ? "text" : "password"}
              placeholder="Enter Password"
              className="w-[200px] rounded border-[1px]  px-3 py-2 text-lg placeholder:text-[#2b2b2b] focus:outline-none focus:ring focus:ring-[#e6e6dd] focus:ring-offset-2 smallSr:w-[250px] signupSm:w-[400px] signupSm:text-2xl md:w-[500px] lg:w-[400px] xl:w-[500px]"
            />
            <div
              className="absolute right-2 top-2 m-2 text-lg"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              {isOpen ? <FiEye /> : <FiEyeOff />}
            </div>
          </div>
        </div>
        <div className="my-2 flex w-full justify-between">
          <div className="flex items-center gap-2 accent-[#e6e6dd]">
            <input
              type="checkbox"
              id="remember-me"
              className="h-3.5 w-3.5 signupSm:h-5 signupSm:w-5 "
            />
            <label
              htmlFor="remember-me"
              className="font-mulish text-[0.7rem] font-semibold text-white smallSr:text-[0.9rem] signupSm:text-lg lg:text-black xl:text-xl"
            >
              Remember me
            </label>
          </div>
          <Link
            to="/signup"
            className="hover:text-blur-800 font-mulish text-[0.7rem] font-bold text-blue-600 underline hover:text-blue-700 smallSr:text-[0.9rem] signupSm:text-lg xl:text-xl"
          >
            forgotPassword
          </Link>
        </div>
        <Button type="secondary">sign in</Button>
      </Form>
      <GoogleAuth />
    </div>
  );
}
