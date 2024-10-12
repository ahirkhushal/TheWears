import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { useSidebar } from "@/hooks/useSidebar";
import { useStore } from "@/hooks/useStore";
import Footer from "./Footer";

export default function AppLayout() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;

  return (
    <main>
      <Header />
      <div className="flex flex-1 justify-center">
        <main className="mx-auto max-w-7xl flex-1 py-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
      <Footer />
    </main>
  );
}
