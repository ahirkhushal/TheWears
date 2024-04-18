import React from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function SignUpNotification({ handleClose }) {
  return (
    <div className="flex w-full items-center justify-between gap-3 bg-red-950 px-4 py-3 font-mulish text-[13px] text-white sm:gap-8 sm:px-5 sm:text-xl md:px-24">
      <span className="hidden text-center sm:block">
        support <span className="whitespace-nowrap">(+91-9979503660)</span>
      </span>
      <p className="space-x-1 text-center sm:space-x-3">
        <span> Sign up and GET 35% OFF for your first order.</span>
        <Link
          className="whitespace-nowrap text-yellow-500 underline"
          to="/signup"
        >
          Sign up now.
        </Link>
      </p>
      <span>
        <IoClose
          className="cursor-pointer text-lg sm:text-2xl"
          onClick={handleClose}
        />
      </span>
    </div>
  );
}
