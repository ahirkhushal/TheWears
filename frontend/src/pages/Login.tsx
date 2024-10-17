import AuthForm from "@/components/common/AuthForm";
import { useLogin } from "@/hooks/useLogin";

export default function Login() {
  const { login, isLoading } = useLogin();
  const handleLogin = (data: { email: string; password: string }) => {
    console.log(isLoading);
    login({ email: data.email, password: data.password });
  };

  return (
    <AuthForm
      heading="Login to Your Account"
      subHead="Enter your email and password to sign in"
      btnTitle="Login Now"
      noAccountText="Don't have an account?"
      textAboutLink="signup"
      onSubmit={handleLogin}
      isLoading={isLoading}
      type="signin"
    />
  );
}
