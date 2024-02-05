import { HiOutlineShoppingBag } from "react-icons/hi";
import PropTypes from "prop-types";
import { profileOptions } from "../route";
import { Search } from "lucide-react";
import { ProfileOptions } from "./profileOptions";

RightCornerNav.propTypes = {
  onProfileClick: PropTypes.func.isRequired,
  isHiddenProfile: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  onSearchClick: PropTypes.func.isRequired,
  dropDownOn: PropTypes.bool.isRequired,
  isSearchHidden: PropTypes.bool.isRequired,
  isHidden: PropTypes.bool.isRequired,
  classProp: PropTypes.string.isRequired,
};

export function RightCornerNav({
  onProfileClick,
  isHiddenProfile,
  onButtonClick,
  onSearchClick,
  isHidden,
  classProp,
  dropDownOn,
  isSearchHidden,
}) {
  return (
    <div
      className={`flex md:order-2 items-center space-x-6 relative ${classProp}`}
    >
      <Search
        className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden ${
          isSearchHidden ? "bg-gray-100" : ""
        }`}
        onClick={onSearchClick}
      />
      <button>
        <HiOutlineShoppingBag size={25} />
      </button>
      <div className="relative">
        <button
          className="flex text-sm bg-gray-800 rounded-full"
          data-dropdown-placement="bottom"
          onClick={onProfileClick}
        >
          <svg
            className="bg-zinc-100 text-zinc-400 rounded-full border-1"
            fill="currentColor"
            viewBox="0 0 24 24"
            width={28}
            height={28}
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
        </button>
        <div
          className={`origin-top-right absolute right-[-65px] mt-[20px] w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
            !isHiddenProfile ? "hidden" : ""
          }`}
          id="user-dropdown"
        >
          <ul className="py-2" aria-labelledby="user-menu-button">
            {profileOptions.map(({ label, routes, icons }) => (
              <ProfileOptions icons={icons} routes={routes} key={label}>
                {label}
              </ProfileOptions>
            ))}
          </ul>
        </div>
      </div>
      <button
        data-collapse-toggle="navbar-search"
        type="button"
        className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden ${
          dropDownOn ? "bg-gray-100" : ""
        }`}
        aria-controls="navbar-search"
        onClick={onButtonClick}
        aria-expanded={isHidden}
      >
        <span className="sr-only">Open main menu</span>

        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
    </div>
  );
}
