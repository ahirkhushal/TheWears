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
        "min-h-[calc(100vh_-_56px)] bg-zinc-50 transition-all duration-300 ease-in-out dark:bg-zinc-900",
        !settings.disabled && (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-72"),
      )}
    >
      <Sidebar />
      <Header title="Home" />
      <div className="flex flex-1 justify-center">
        <main className="mx-auto max-w-7xl flex-1 py-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </main>
  );
}
