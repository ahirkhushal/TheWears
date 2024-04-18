import React from "react";

export default function Logo({ className, logo }) {
  return <img src={`/${logo}`} alt="logo" className={className} />;
}
