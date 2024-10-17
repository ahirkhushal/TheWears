import "./App.css";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./context/ThemeProviderContext";
import { AuthProvider } from "./context/AuthContext";
import { TailwindIndicator } from "./components/common/TailwindIndicator";
import GeneralSkeleton from "./components/skeletons/GeneralSkeleton";
import AuthSkeletons from "./components/skeletons/AuthSkeletons";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/queryClient";
import { Toaster } from "react-hot-toast";

const AppLayout = lazy(() => import("./components/layout/AppLayout"));

const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));
const Otpverify = lazy(() => import("@/pages/Otpverify"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
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
                  <Suspense fallback={<AuthSkeletons />}>
                    <Login />
                  </Suspense>
                }
              />
              <Route
                path="signup"
                element={
                  <Suspense fallback={<AuthSkeletons isSignup={true} />}>
                    <Signup />
                  </Suspense>
                }
              />

              <Route
                path="/verification/:verifyToken"
                element={
                  <Suspense fallback={<AuthSkeletons isSignup={true} />}>
                    <Otpverify />
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
          <Toaster
            position="top-left"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "black",
                color: "white",
              },
            }}
          />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
