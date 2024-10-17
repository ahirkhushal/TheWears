import AuthForm from "@/components/common/AuthForm";
import { useSignup } from "@/hooks/useSignup";

export default function Signup() {
  const { signUp, isLoading } = useSignup();
  const handleSignup = (data: {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    confirmPassword?: string;
  }) => {
    signUp({
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword || "",
    });
  };
  return (
    <AuthForm
      heading="Create an account"
      subHead="Enter your email below to create your account"
      btnTitle="Create account"
      noAccountText="Already have an account?"
      textAboutLink="login"
      onSubmit={handleSignup}
      isLoading={isLoading}
      type="signup"
    />
  );
}
