import React, { useState } from "react";

import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart, FaRegUser } from "react-icons/fa";

import SignUpNotification from "./SignUpNotification";
import Logo from "./Logo";

export default function NavBar() {
  const [isClose, setIsClose] = useState(true);

  function handleClose() {
    setIsClose(false);
  }

  return (
    <div>
      {isClose && <SignUpNotification handleClose={handleClose} />}
      <nav className="flex items-center justify-between bg-[#2b2b2b] py-3 pr-1 smallSr:py-5 smallSr:pr-2">
        <div className="flex smallSr:gap-2">
          <div className="flex cursor-pointer flex-col justify-center gap-1 px-2">
            <span className="h-[2px] w-[20px] bg-[#e6e6dd] smallSr:h-1 smallSr:w-[25px]"></span>
            <span className="h-[2px] w-[20px] bg-[#e6e6dd] smallSr:h-1 smallSr:w-[25px]"></span>
            <span className="h-[2px] w-[20px] bg-[#e6e6dd] smallSr:h-1 smallSr:w-[25px]"></span>
          </div>
          <Logo
            className="h-[30px] w-[80px] smallSr:h-[50px] smallSr:w-[100px] sm:h-[70px] sm:w-[150px]"
            logo="Logo-3.svg"
          />
        </div>
        <FaRegHeart className="cursor-pointer text-[#e6e6dd]" />
        <IoCartOutline className="cursor-pointer text-[#e6e6dd]" />
        <FaRegUser className="cursor-pointer text-[#e6e6dd]" />
      </nav>
    </div>
  );
}
