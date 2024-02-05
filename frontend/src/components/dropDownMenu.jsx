import PropTypes from "prop-types";

DropDownMenu.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
};

export function DropDownMenu({ isHidden, children }) {
  if (Object.keys(children).length === 0) return;
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
        !isHidden ? "hidden" : ""
      }`}
      id="navbar-search"
    >
      {children}
    </div>
  );
}
