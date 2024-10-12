import React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Link } from "react-router-dom";

export type MegaMenuItem = {
  name: string;
  url: string;
};

export type MegaMenuSection = {
  section: string;
  items: MegaMenuItem[];
};

export type MegaMenu = {
  clothing: MegaMenuSection[];
  accessories: MegaMenuSection[];
  footwear: MegaMenuSection[];
};

type MainNavProps = {
  megaMenu: MegaMenu;
  className?: string;
};

export function NavBar({ className, megaMenu }: MainNavProps) {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-transparent`}
            >
              Menu
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {Object.entries(megaMenu).map(([category, sections]) => (
          <NavigationMenuItem key={category}>
            <NavigationMenuTrigger className="bg-transparent hover:bg-transparent">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </NavigationMenuTrigger>

            <NavigationMenuContent className="p-6 lg:w-[250px]">
              <div className="flex justify-around">
                {sections.map(({ section, items }) => (
                  <div key={section}>
                    <h4 className="font-heading text-2xl">{section}</h4>
                    {items.map(({ name, url }) => (
                      <ListItem
                        key={name}
                        to={url}
                        className="cursor-pointer text-sm"
                      >
                        {name}
                      </ListItem>
                    ))}
                  </div>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, children, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        ref={ref}
        className={cn(
          "block space-y-1 rounded-md py-1.5 text-muted-foreground duration-150 hover:text-secondary-foreground",
          className,
        )}
        {...props}
      >
        <span className="line-clamp-1">{children}</span>
      </Link>
    </NavigationMenuLink>
  );
});

ListItem.displayName = "ListItem";
