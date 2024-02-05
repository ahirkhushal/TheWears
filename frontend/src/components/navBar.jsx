import { useEffect, useState } from "react";
import { sections } from "../route";
import { ListItem } from "./listItem";
import { DropDownMenu } from "./dropDownMenu";
import { RightCornerNav } from "./rightCornerNav";
import { SearchBar } from "./searchBar";

function Navbar() {
  const [isHidden, SetIsHidden] = useState(false);
  const [dropDownOn, SetDropDownOn] = useState(false);
  const [isSearchHidden, SetIsSearchHidden] = useState(false);
  const [isHiddenProfile, SetIsHiddenProfile] = useState(false);

  function handleHiddenProfile() {
    SetIsHiddenProfile(!isHiddenProfile);
    SetIsHidden(false);
  }

  function handleHiddenButton() {
    SetIsHidden(false);
    SetIsHidden((isHidden) => !isHidden);
    SetDropDownOn(!dropDownOn);
    SetIsSearchHidden(false);
    SetIsHiddenProfile(false);
  }

  function handleSearchButton() {
    SetIsHidden(false);
    SetIsHidden((isHidden) => !isHidden);
    SetIsSearchHidden(!isSearchHidden);
    SetDropDownOn(false);
    SetIsHiddenProfile(false);
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1413) {
        SetDropDownOn(true);
        SetIsSearchHidden(false);
      } else SetDropDownOn(false);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   function handleClickOutside() {
  //     SetIsHidden(false);
  //     SetDropDownOn(false);
  //     SetIsSearchHidden(false);
  //     SetIsHiddenProfile(false);
  //   }

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  return (
    <nav className="bg-black text-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="../public/images/favicon-3.jpg"
            className="h-20"
            alt="Thewears Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap hidden sm2:flex">
            THEWEARS
          </span>
        </a>
        <div className="flex md:order-2">
          <SearchBar classProp="relative hidden md:block" />
          <RightCornerNav
            onProfileClick={handleHiddenProfile}
            isHiddenProfile={isHiddenProfile}
            onButtonClick={handleHiddenButton}
            onSearchClick={handleSearchButton}
            dropDownOn={dropDownOn}
            isSearchHidden={isSearchHidden}
            isHidden={isHidden}
            classProp="md:hidden"
          />
        </div>

        <DropDownMenu isHidden={isHidden}>
          {isSearchHidden ? (
            <SearchBar classProp="relative mt-3 md:hidden" />
          ) : dropDownOn ? (
            <ul className="bg-black font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-black ">
              {sections.map((section) => (
                <ListItem key={section}>{section}</ListItem>
              ))}
            </ul>
          ) : (
            {}
          )}
        </DropDownMenu>
        <RightCornerNav
          onProfileClick={handleHiddenProfile}
          isHiddenProfile={isHiddenProfile}
          onButtonClick={handleHiddenButton}
          onSearchClick={handleSearchButton}
          dropDownOn={dropDownOn}
          isSearchHidden={isSearchHidden}
          isHidden={isHidden}
          classProp="hidden md:flex"
        />
      </div>
    </nav>
  );
}

export default Navbar;
