import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./context/ThemeProviderContext";
import { AuthProvider } from "./context/AuthContext";
import { TailwindIndicator } from "./components/common/TailwindIndicator";
import GeneralSkeleton from "./components/common/GeneralSkeleton";
const AppLayout = lazy(() => import("./components/layout/AppLayout"));
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<GeneralSkeleton />}>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <TailwindIndicator />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
