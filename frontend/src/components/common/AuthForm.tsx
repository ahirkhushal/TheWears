// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { FcGoogle } from "react-icons/fc";
// import { Link } from "react-router-dom";
// import Logo from "./Logo";
// import { ModeToggle } from "./ModeToggle";
// import { ControllerRenderProps, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Spinner } from "../ui/spinner";

// interface FormValues {
//   email: string;
//   password: string;
// }

// const schema = z.object({
//   email: z.string().email({ message: "Invalid email address" }),
//   password: z
//     .string()
//     .min(6, { message: "Password must be at least 6 characters" }),
// });

// type FormData = z.infer<typeof schema>;

// export default function AuthForm({
//   heading,
//   subHead,
//   btnTitle,
//   noAccountText,
//   textAboutLink,
//   onSubmit,
//   isLoading,
// }: {
//   heading: string;
//   subHead: string;
//   btnTitle: string;
//   noAccountText: string;
//   textAboutLink: string;
//   onSubmit: (data: FormData) => void;
//   isLoading: boolean;
// }) {
//   const form = useForm<FormData>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   return (
//     <div className="relative flex h-screen flex-col items-center justify-center gap-3 overflow-hidden">
//       <Logo />
//       <ModeToggle className="absolute right-0 top-0 m-4" />

//       <Card className="z-10 mx-4 max-h-[80vh] w-[300px] overflow-y-auto md:w-[350px] lg:w-[400px]">
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl">{heading}</CardTitle>
//           <CardDescription>{subHead}</CardDescription>
//         </CardHeader>
//         <CardContent className="grid gap-4">
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//               <FormField
//                 name="email"
//                 control={form.control}
//                 render={({
//                   field,
//                 }: {
//                   field: ControllerRenderProps<FormValues>;
//                 }) => (
//                   <FormItem>
//                     <FormLabel className="text-black dark:text-white">
//                       Email
//                     </FormLabel>
//                     <FormControl>
//                       <Input placeholder="m@example.com" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 name="password"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-black dark:text-white">
//                       Password
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="********"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {textAboutLink !== "signup" && (
//                 <Link to="/" className="text-xs text-blue-500">
//                   Forgot Password?
//                 </Link>
//               )}

//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <span className="w-full border-t" />
//                 </div>
//                 <div className="relative flex justify-center text-xs uppercase">
//                   <span className="bg-background px-2 text-muted-foreground">
//                     Or continue with
//                   </span>
//                 </div>
//               </div>

//               <Button variant="outline" type="button" className="w-full">
//                 <FcGoogle className="mr-2 h-4 w-4" />
//                 Continue With Google
//               </Button>

//               <Button type="submit" className="w-full">
//                 {btnTitle}
//               </Button>
//             </form>
//           </Form>

//           <div className="mt-1 flex items-center justify-center gap-2 text-center">
//             <p>{noAccountText}</p>
//             <Link to={`/${textAboutLink}`} className="text-blue-500">
//               {isLoading && <Spinner />} {textAboutLink}
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Spinner } from "../ui/spinner";

interface FormValues {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const signinSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
} as const);

const signupSchema = z
  .object({
    firstName: z.string().min(2, { message: "FirstName is required" }),
    lastName: z.string().min(2, { message: "LastName is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Please confirm your password" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export default function AuthForm({
  heading,
  subHead,
  btnTitle,
  noAccountText,
  textAboutLink,
  onSubmit,
  isLoading,
  type,
}: {
  heading: string;
  subHead: string;
  btnTitle: string;
  noAccountText: string;
  textAboutLink: string;
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
  type: "signin" | "signup";
}) {
  const schema = type === "signin" ? signinSchema : signupSchema;
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {type === "signup" && (
                <div className="flex gap-3">
                  <FormField
                    name="firstName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black dark:text-white">
                          FirstName
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs lg:text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="lastName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black dark:text-white">
                          LastName
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs lg:text-sm" />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <FormField
                name="email"
                control={form.control}
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<FormValues>;
                }) => (
                  <FormItem>
                    <FormLabel className="text-black dark:text-white">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs lg:text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black dark:text-white">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs lg:text-sm" />
                  </FormItem>
                )}
              />

              {type === "signup" && (
                <FormField
                  name="confirmPassword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black dark:text-white">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs lg:text-sm" />
                    </FormItem>
                  )}
                />
              )}

              {type === "signin" && (
                <Link to="/" className="text-xs text-blue-500">
                  Forgot Password?
                </Link>
              )}

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

              <Button variant="outline" type="button" className="w-full">
                <FcGoogle className="mr-2 h-4 w-4" />
                Continue With Google
              </Button>

              <Button type="submit" className="w-full">
                {isLoading && (
                  <Spinner className="mr-1 h-4 w-5 text-white dark:text-black" />
                )}
                {btnTitle}
              </Button>
            </form>
          </Form>

          <div className="mt-1 flex items-center justify-center gap-2 text-center">
            <p>{noAccountText}</p>
            <Link to={`/${textAboutLink}`} className="text-blue-500">
              {textAboutLink}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
