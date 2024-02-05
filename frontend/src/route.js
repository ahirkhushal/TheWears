import { Heart, ListOrdered, LogOut, UserRound } from "lucide-react";

const profileOptions = [
  { label: "My Account", routes: "/myaccount", icons: UserRound },
  { label: "My Wishlist", routes: "/mywishlist", icons: Heart },
  { label: "My Orders", routes: "/myorders", icons: ListOrdered },
  { label: "Logout", routes: "/", icons: LogOut },
];

const sections = ["Home", "Shop", "Collections", "Sale", "About Us", "Contact"];
// const sections = [
//   { label: "Home", routes: "/" },
//   { label: "Shop", routes: "/shop" },
//   { label: "Collections", routes: "/collections" },
//   { label: "Sale", routes: "/Sale" },
//   { label: "About Us", routes: "/about" },
//   { label: "Contact", routes: "/contact" },
// ];

export { profileOptions, sections };
