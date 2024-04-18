import LoginForm from "../features/authentication/LoginForm";

export default function Login() {
  return (
    <div className="max-h-auto custom-bg-image-signin flex min-h-screen items-center justify-center lg:grid lg:grid-cols-2 lg:bg-[#e6e6dd] lg:bg-none">
      <LoginForm />
      <img
        src="/bg-6.jpg"
        className="hidden h-screen w-full object-cover p-5 lg:block "
        alt=""
        loading="eager"
      />
    </div>
  );
}
