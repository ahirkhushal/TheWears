import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      Home
      <div className="flex items-center justify-center gap-2">
        <Link to="/signup" className="rounded bg-yellow-200 p-4 text-lg">
          signup
        </Link>
        <Link to="/login" className="rounded bg-yellow-200 p-4 text-lg">
          login
        </Link>
      </div>
    </div>
  );
}
