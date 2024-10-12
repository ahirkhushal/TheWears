import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";

export default function AuthForm({
  heading,
  subHead,
  btnTitle,
  noAccountText,
  textAboutLink,
}: {
  heading: string;
  subHead: string;
  btnTitle: string;
  noAccountText: string;
  textAboutLink: string;
}) {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-screen flex-col items-center justify-center gap-3 overflow-hidden">
      <Logo />
      <ModeToggle className="absolute right-0 top-0 m-4" />

      <Card className="z-10 mx-4 max-h-[80vh] w-[300px] overflow-y-auto md:w-[350px] lg:w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{heading}</CardTitle>
          <CardDescription>{subHead}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Password" />
            {textAboutLink !== "signup" && (
              <Link to="/" className="text-xs text-blue-500">
                Forgot Password ?
              </Link>
            )}
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button variant="outline">
            <FcGoogle className="mr-2 h-4 w-4" />
            Continue With Google
          </Button>
          <div className="mt-1 flex items-center justify-center gap-2 text-center">
            <p>{noAccountText}</p>
            <Link to={`/${textAboutLink}`} className="text-blue-500">
              {textAboutLink}
            </Link>
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full" onClick={() => navigate("/")}>
            {btnTitle}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
