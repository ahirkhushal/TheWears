import AuthForm from "@/components/common/AuthForm";

export default function Signup() {
  // const navigate = useNavigate();
  return (
    <AuthForm
      heading="Create an account"
      subHead="Enter your email below to create your account"
      btnTitle="Create account"
    />
  );
}
