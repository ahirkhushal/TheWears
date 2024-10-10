import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-full items-center justify-center overflow-y-hidden">
      <div className="max-w-md space-y-6 text-center">
        <div className="flex items-center justify-center gap-2">
          <p className="text-sm font-bold text-black lg:text-xl">404</p>
          <span className="mx-2 text-sm text-black lg:text-xl">|</span>{" "}
          <p className="text-sm font-bold text-black lg:text-xl">
            Oops! Page not found.
          </p>
        </div>
        <Button onClick={() => navigate("/")}>Go back home</Button>
      </div>
    </div>
  );
}
