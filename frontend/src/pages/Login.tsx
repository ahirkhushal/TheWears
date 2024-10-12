import AuthForm from "@/components/common/AuthForm";

export default function Login() {
  return (
    <AuthForm
      heading="Login to Your Account"
      subHead="Enter your email and password to sign in"
      btnTitle="Login Now"
      noAccountText="Don't have an account?"
      textAboutLink="signup"
    />
  );
}
