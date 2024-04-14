import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function AppLayout() {
  return (
    <div>
      <NavBar />

      <p>layout</p>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
