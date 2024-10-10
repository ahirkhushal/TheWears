import DarkLogo from "@/assets/svg/DarkLogo";
import LightLogo from "@/assets/svg/LightLogo";
import { useTheme } from "@/context/ThemeProviderContext";

export default function Logo() {
  const { theme } = useTheme();

  return theme === "dark" ? (
    <DarkLogo />
  ) : theme === "light" ? (
    <LightLogo />
  ) : (
    <DarkLogo />
  );
}
