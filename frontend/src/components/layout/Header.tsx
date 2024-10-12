import Logo from "../common/Logo";
import { ModeToggle } from "../common/ModeToggle";
import Profile from "../common/Profile";
import { NavBar } from "../specific/NavBar";
import { SheetMenu } from "../specific/SheetMenu";
import { megaMenu } from "../utils/menuList";

export function Header() {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 flex h-14 items-center sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <Logo />
        </div>
        <div className="hidden flex-1 items-center justify-center lg:flex">
          <NavBar megaMenu={megaMenu} />
        </div>

        <div className="flex flex-1 items-center justify-end lg:flex-none">
          <ModeToggle />
          <Profile />
        </div>
      </div>
    </header>
  );
}
