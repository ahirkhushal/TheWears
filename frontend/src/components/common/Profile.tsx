// import { useNavigate } from "react-router-dom";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { Cog, LogOut, Monitor, Moon, Sun, SunMoon, User2 } from "lucide-react";

// import { Button } from "../ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuPortal,
//   DropdownMenuSeparator,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { useTheme } from "@/context/ThemeProviderContext";

// const user = {
//   name: "John Doe",
//   email: "john.doe@example.com",
//   image: "/images/user/john-doe.jpg",
// };

// export default function Profile() {
//   const navigate = useNavigate();
//   const { setTheme } = useTheme();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild className="rounded-full">
//         <Button variant="outline" size="icon">
//           <Avatar className="border shadow-sm">
//             <AvatarImage
//               src="https://github.com/shadcn.png"
//               alt={user?.name ?? "Guest User"}
//             />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent
//         side="bottom"
//         align="end"
//         className="max-w-[300px] *:cursor-pointer"
//       >
//         <DropdownMenuLabel className="flex flex-col">
//           <span title={user?.name ?? undefined} className="truncate">
//             {user ? (user.name ? user.name : "~") : "Guest User"}
//           </span>
//           <span
//             title={user?.email ?? undefined}
//             className="truncate text-sm font-normal text-muted-foreground"
//           >
//             {user?.email}
//           </span>
//         </DropdownMenuLabel>

//         <DropdownMenuSeparator />

//         <DropdownMenuItem disabled={user === undefined} asChild>
//           <div
//             onClick={() => navigate("/me")}
//             className="text-black dark:text-white"
//           >
//             <User2 size={16} className="mr-2" />
//             My Profile
//           </div>
//         </DropdownMenuItem>

//         <DropdownMenuItem asChild>
//           <div
//             onClick={() => navigate("/settings")}
//             className="text-black dark:text-white"
//           >
//             <Cog size={16} className="mr-2" />
//             Settings
//           </div>
//         </DropdownMenuItem>

//         <DropdownMenuSub>
//           <DropdownMenuSubTrigger>
//             <SunMoon size={16} className="mr-2" />
//             Theme
//           </DropdownMenuSubTrigger>

//           <DropdownMenuPortal>
//             <DropdownMenuSubContent>
//               <DropdownMenuItem
//                 onClick={() => setTheme("light")}
//                 className="cursor-pointer"
//               >
//                 <Sun size={16} className="mr-2" />
//                 Light
//               </DropdownMenuItem>

//               <DropdownMenuItem
//                 onClick={() => setTheme("dark")}
//                 className="cursor-pointer"
//               >
//                 <Moon size={16} className="mr-2" />
//                 Dark
//               </DropdownMenuItem>

//               <DropdownMenuItem
//                 onClick={() => setTheme("system")}
//                 className="cursor-pointer"
//               >
//                 <Monitor size={16} className="mr-2" />
//                 System
//               </DropdownMenuItem>
//             </DropdownMenuSubContent>
//           </DropdownMenuPortal>
//         </DropdownMenuSub>

//         {user && (
//           <>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem onClick={() => {}}>
//               <LogOut size={16} className="mr-2" />
//               Log Out
//             </DropdownMenuItem>
//           </>
//         )}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

"use client";

import { LayoutGrid, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="#" alt="Avatar" />
                  <AvatarFallback className="bg-transparent">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">
              johndoe@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link to="/dashboard" className="flex items-center">
              <LayoutGrid className="mr-3 h-4 w-4 text-muted-foreground" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link to="/account" className="flex items-center">
              <User className="mr-3 h-4 w-4 text-muted-foreground" />
              Account
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer" onClick={() => {}}>
          <LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
