import classNames from "classnames";
import PropTypes from "prop-types";

ProfileOptions.propTypes = {
  children: PropTypes.string.isRequired,
  routes: PropTypes.string.isRequired,
  icons: PropTypes.object.isRequired,
};
export function ProfileOptions({ icons: Icon, routes, children }) {
  function handleRoute() {
    window.location.href = routes;
  }

  return (
    <li
      className={classNames({
        "text-red-500": children === "Logout",
        "p-3 transition duration-300 flex items-center justify-start py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer": true,
      })}
      onClick={handleRoute}
    >
      <Icon set="bulk" size={20} strokeWidth={1} />
      <span className="ml-3">{children}</span>
    </li>
  );
}
