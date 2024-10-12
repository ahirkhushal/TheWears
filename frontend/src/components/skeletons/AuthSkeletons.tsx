import Logo from "../common/Logo";
import { ModeToggle } from "../common/ModeToggle";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function AuthSkeletons(isSignUp: { isSignup?: boolean }) {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center gap-3 overflow-hidden">
      <Logo />
      <ModeToggle className="absolute right-0 top-0 m-4" />

      <Card className="z-10 mx-4 max-h-[80vh] w-[300px] overflow-y-auto md:w-[350px] lg:w-[400px]">
        <CardHeader className="gap-1 space-y-1">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10" />
          </div>
          <div className="grid gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10" />
            {isSignUp && <Skeleton className="mt-1 h-4 w-1/2" />}
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                <Skeleton className="h-4 w-1/4" />
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="flex items-center justify-center"
          >
            <Skeleton className="mr-2 h-6 w-6" />
            <Skeleton className="h-4 w-2/3" />
          </Button>
          <div className="mt-1 flex items-center justify-center gap-2 text-center">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </CardContent>

        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    </div>
  );
}
