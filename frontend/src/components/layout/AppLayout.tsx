import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "../specific/Sidebar";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { useStore } from "@/hooks/useStore";

export default function AppLayout() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { getOpenState, settings } = sidebar;
  return (
    <main
      className={cn(
        "min-h-[calc(100vh_-_56px)] bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900",
        !settings.disabled && (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-72"),
      )}
    >
      <Sidebar />
      <Header title="DashBoard" />
      <div className="container px-4 pb-8 pt-8 sm:px-8">
        <Outlet />
      </div>
    </main>
  );
}
