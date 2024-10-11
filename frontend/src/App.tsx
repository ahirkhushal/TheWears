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
          <Routes>
            <Route element={<AppLayout />}>
              <Route
                path="/"
                element={
                  <Suspense fallback={<GeneralSkeleton />}>
                    <Home />
                  </Suspense>
                }
              />
            </Route>

            <Route
              path="login"
              element={
                <Suspense fallback={<GeneralSkeleton />}>
                  <Login />
                </Suspense>
              }
            />

            <Route
              path="signup"
              element={
                <Suspense fallback={<GeneralSkeleton />}>
                  <Signup />
                </Suspense>
              }
            />

            <Route
              path="*"
              element={
                <Suspense fallback={<GeneralSkeleton />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
          <TailwindIndicator />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
