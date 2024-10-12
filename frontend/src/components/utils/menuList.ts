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

export type MegaMenuSection = {
  section: string;
  items: { name: string; url: string }[];
};

export type MegaMenu = {
  clothing: MegaMenuSection[];
  accessories: MegaMenuSection[];
  footwear: MegaMenuSection[];
};

export const megaMenu: MegaMenu = {
  clothing: [
    {
      section: "Women",
      items: [
        { name: "T-Shirts", url: "/women/t-shirts" },
        { name: "Tank Tops", url: "/women/tank-tops" },
        { name: "Jeans", url: "/women/jeans" },
        { name: "Dresses", url: "/women/dresses" },
        { name: "Skirts", url: "/women/skirts" },
        { name: "Jackets", url: "/women/jackets" },
        { name: "Sweaters", url: "/women/sweaters" },
        { name: "Blouses", url: "/women/blouses" },
        { name: "Footwear", url: "/women/footwear" },
        { name: "Activewear", url: "/women/activewear" },
      ],
    },
    {
      section: "Men",
      items: [
        { name: "T-Shirts", url: "/men/t-shirts" },
        { name: "Polos", url: "/men/polos" },
        { name: "Jeans", url: "/men/jeans" },
        { name: "Shorts", url: "/men/shorts" },
        { name: "Jackets", url: "/men/jackets" },
        { name: "Sweaters", url: "/men/sweaters" },
        { name: "Suits", url: "/men/suits" },
        { name: "Dress Shirts", url: "/men/dress-shirts" },
        { name: "Footwear", url: "/men/footwear" },
        { name: "Activewear", url: "/men/activewear" },
      ],
    },
  ],
  accessories: [
    {
      section: "Women",
      items: [
        { name: "Watches", url: "/women/accessories/watches" },
        { name: "Bags", url: "/women/accessories/bags" },
        { name: "Belts", url: "/women/accessories/belts" },
        { name: "Hats", url: "/women/accessories/hats" },
        { name: "Sunglasses", url: "/women/accessories/sunglasses" },
        { name: "Wallets", url: "/women/accessories/wallets" },
        { name: "Jewelry", url: "/women/accessories/jewelry" },
        { name: "Scarves", url: "/women/accessories/scarves" },
      ],
    },
    {
      section: "Men",
      items: [
        { name: "Watches", url: "/men/accessories/watches" },
        { name: "Bags", url: "/men/accessories/bags" },
        { name: "Belts", url: "/men/accessories/belts" },
        { name: "Hats", url: "/men/accessories/hats" },
        { name: "Sunglasses", url: "/men/accessories/sunglasses" },
        { name: "Wallets", url: "/men/accessories/wallets" },
        { name: "Ties", url: "/men/accessories/ties" },
        { name: "Cufflinks", url: "/men/accessories/cufflinks" },
      ],
    },
  ],
  footwear: [
    {
      section: "Women",
      items: [
        { name: "Sneakers", url: "/women/footwear/sneakers" },
        { name: "Heels", url: "/women/footwear/heels" },
        { name: "Boots", url: "/women/footwear/boots" },
        { name: "Sandals", url: "/women/footwear/sandals" },
        { name: "Flats", url: "/women/footwear/flats" },
        { name: "Ballet Shoes", url: "/women/footwear/ballet-shoes" },
        { name: "Ankle Boots", url: "/women/footwear/ankle-boots" },
        { name: "Wedges", url: "/women/footwear/wedges" },
      ],
    },
    {
      section: "Men",
      items: [
        { name: "Sneakers", url: "/men/footwear/sneakers" },
        { name: "Dress Shoes", url: "/men/footwear/dress-shoes" },
        { name: "Boots", url: "/men/footwear/boots" },
        { name: "Sandals", url: "/men/footwear/sandals" },
        { name: "Loafers", url: "/men/footwear/loafers" },
        { name: "Casual Shoes", url: "/men/footwear/casual-shoes" },
        { name: "Work Boots", url: "/men/footwear/work-boots" },
        { name: "Athletic Shoes", url: "/men/footwear/athletic-shoes" },
      ],
    },
  ],
};
