import PropTypes from "prop-types";

ListItem.propTypes = { children: PropTypes.string.isRequired };

export function ListItem({ children }) {
  return (
    <li>
      <a
        href="#"
        className="block py-2 px-3 text-white rounded hover:bg-custom-radBrown md:hover:bg-transparent md:border-0 md:hover:text-custom-radBrown md:p-0 transition duration-300"
        aria-current="page"
      >
        {children}
      </a>
    </li>
  );
}
