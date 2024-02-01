// // Navbar.js
// import "../css/navbar.css";
// import SearchIcon from "@mui/icons-material/Search";
// import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
// import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
// import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
// import PropTypes from "prop-types";

// ListIcons.propTypes = { children: PropTypes.node.isRequired };

// function Navbar() {
//   return (
//     <nav className="navbar bg-custom-gray flex items-center justify-between px-14 py-2">
//       <div className="flex items-center space-x-4">
//         <img
//           src="../public/images/favicon-3.jpg"
//           alt="logo image"
//           className="h-32"
//         />
//       </div>
//       <ul className="flex items-center text-white space-x-11">
//         <SearchBar />
//         <ListIcons>
//           <AccountCircleRoundedIcon
//             style={{ fontSize: 32, cursor: "pointer" }}
//           />
//         </ListIcons>
//         <ListIcons>
//           <FavoriteBorderRoundedIcon
//             style={{ fontSize: 32, cursor: "pointer" }}
//           />
//         </ListIcons>
//         <ListIcons>
//           <ShoppingCartRoundedIcon
//             style={{ fontSize: 32, cursor: "pointer" }}
//           />
//         </ListIcons>
//       </ul>
//     </nav>
//   );
// }

// function ListIcons({ children }) {
//   return <li className="flex items-center">{children}</li>;
// }

// function SearchBar() {
//   return (
//     <li className="flex items-center">
//       <input
//         type="text"
//         placeholder="Search..."
//         className="bg-gray-200 px-2 py-1 rounded-md focus:outline-none"
//       />
//     </li>
//   );
// }

// export default Navbar;

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// function Navbar() {
//   const [isHidden, SetIsHidden] = useState(false);
//   console.log(isHidden);
//   return (
//     <nav className="bg-black text-white border-gray-200 dark:bg-gray-900">
//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//         <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
//           <img
//             src="../public/images/favicon-3.jpg"
//             className="h-20"
//             alt="Thewears Logo"
//           />
//           <span className="self-center text-2xl font-semibold whitespace-nowrap  dark:text-white">
//             THEWEARS
//           </span>
//         </a>
//         <button
//           data-collapse-toggle="navbar-default"
//           type="button"
//           className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden ${
//             isHidden ? "bg-gray-100" : ""
//           }`}
//           aria-controls="navbar-default"
//           onClick={() => SetIsHidden(!isHidden)}
//           aria-expanded={isHidden}
//         >
//           <span className="sr-only">Open main menu</span>
//           <svg
//             className="w-5 h-5"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 17 14"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M1 1h15M1 7h15M1 13h15"
//             />
//           </svg>
//         </button>
//         <div
//           className={`w-full md:block md:w-auto ${!isHidden ? "hidden" : ""}`}
//           id="navbar-default"
//         >
//           <ul className="bg-black font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-black dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//             <ListItem elementName="Home" />
//             <ListItem elementName="Shop" />
//             <ListItem elementName="Collections" />
//             <ListItem elementName="Sale" />
//             <ListItem elementName="About Us" />
//             <ListItem elementName="Contact" />
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// function ListItem({ elementName }) {
//   return (
//     <li>
//       <a
//         href="#"
//         className="block py-2 px-3 text-white rounded hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
//         aria-current="page"
//       >
//         {elementName}
//       </a>
//     </li>
//   );
// }

// export default Navbar;
