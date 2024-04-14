import React from "react";
import Button from "../../ui/Button";
import AuthenticationPromt from "../../ui/AuthenticationPromt";
import Form from "../../ui/Form";

export default function SignupForm() {
  return (
    <div className="space-y-4 text-center">
      <div className="signupSm:mb-[20px] px-4 text-2xl text-white sm:text-3xl">
        Begin your fashion journey by signing up with your email
      </div>
      <Form className="signupSm:flex-row flex flex-col items-center justify-center gap-3">
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email.."
          autoComplete="off"
          className="smallSr:w-[250px] w-[200px] rounded border-[1px] px-3 py-2 text-lg placeholder:text-brown focus:outline-none focus:ring focus:ring-brown sm:w-[400px] sm:text-2xl"
        />
        <Button type="primary">GET STARTED</Button>
      </Form>
      <AuthenticationPromt route="/login" routeText="sign in">
        Already Signed Up?
      </AuthenticationPromt>
    </div>
  );
}
