import React from "react";
import { Link } from "react-router-dom";

export default function AuthenticationPromt({
  type,
  children,
  route,
  routeText,
}) {
  return (
    <div
      className={`text-${type === "dark" ? "white lg:text-black" : "white"} signupSm:text-2xl text-lg`}
    >
      {children}
      <Link to={route} className="ml-3 text-blue-600 hover:text-blue-700">
        {routeText}
      </Link>
    </div>
  );
}
