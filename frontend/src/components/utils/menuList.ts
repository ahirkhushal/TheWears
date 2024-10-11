import { LayoutGrid, LucideIcon } from "lucide-react";
import { TbGenderDemiboy, TbGenderDemigirl } from "react-icons/tb";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Home",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Clothing",
      menus: [
        {
          href: "/post",
          label: "Women",
          icon: TbGenderDemigirl as unknown as LucideIcon,
          submenus: [
            {
              href: "/posts",
              label: "T-Shirts",
            },
            {
              href: "/posts/new",
              label: "Jeans",
            },
            {
              href: "/posts/new",
              label: "Dresses",
            },
            {
              href: "/posts/new",
              label: "Jackets",
            },
            {
              href: "/posts/new",
              label: "Footwear",
            },
          ],
        },
        {
          href: "/post",
          label: "Men",
          icon: TbGenderDemiboy as unknown as LucideIcon,
          submenus: [
            {
              href: "/posts",
              label: "T-Shirts",
            },
            {
              href: "/posts/new",
              label: "Jeans",
            },
            {
              href: "/posts/new",
              label: "Dresses",
            },
            {
              href: "/posts/new",
              label: "Jackets",
            },
            {
              href: "/posts/new",
              label: "Footwear",
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Accessories",
      menus: [
        {
          href: "/post",
          label: "Women",
          icon: TbGenderDemigirl as unknown as LucideIcon,
          submenus: [
            {
              href: "/posts/new",
              label: "Watches",
            },
            {
              href: "/posts/new",
              label: "Bags",
            },
            {
              href: "/posts/new",
              label: "Belts",
            },
            {
              href: "/posts/new",
              label: "Hats",
            },
            {
              href: "/posts/new",
              label: "Sunglasses",
            },
            {
              href: "/posts/new",
              label: "Wallets",
            },
          ],
        },

        {
          href: "/post",
          label: "Men",
          icon: TbGenderDemiboy as unknown as LucideIcon,
          submenus: [
            {
              href: "/posts/new",
              label: "Watches",
            },
            {
              href: "/posts/new",
              label: "Bags",
            },
            {
              href: "/posts/new",
              label: "Belts",
            },
            {
              href: "/posts/new",
              label: "Hats",
            },
            {
              href: "/posts/new",
              label: "Sunglasses",
            },
            {
              href: "/posts/new",
              label: "Wallets",
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Footwear",
      menus: [
        {
          href: "/post",
          label: "Women",
          icon: TbGenderDemigirl as unknown as LucideIcon,
          submenus: [
            {
              href: "/posts/new",
              label: "Sneakers",
            },
            {
              href: "/posts/new",
              label: "Heels",
            },
            {
              href: "/posts/new",
              label: "Boots",
            },
            {
              href: "/posts/new",
              label: "Sandals",
            },
            {
              href: "/posts/new",
              label: "Flats",
            },
          ],
        },
        {
          href: "/post",
          label: "Men",
          icon: TbGenderDemiboy as unknown as LucideIcon,
          submenus: [
            {
              href: "/posts/new",
              label: "Sneakers",
            },
            {
              href: "/posts/new",
              label: "Dress Shoes",
            },
            {
              href: "/posts/new",
              label: "Boots",
            },
            {
              href: "/posts/new",
              label: "Sandals",
            },
            {
              href: "/posts/new",
              label: "Loafers",
            },
          ],
        },
      ],
    },
  ];
}

// Clothing

// T-Shirts
// Jeans
// Dresses
// Jackets
// Footwear

// Shoes
// Accessories

// Accessories
