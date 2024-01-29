import { Outlet, useLocation } from 'react-router-dom';
import classNames from 'classnames';

const ROUTES = [
  {
    label: 'home',
    routes: '/',
  },
  {
    label: 'category',
    routes: '/category',
  },
];

export const Nagivation = () => {
  const location = useLocation();

  return (
    <>
      <div className="p-4 bg-white border-b">
        <nav className="flex items-center">
          <ul className="flex space-x-6">
            {ROUTES.map((link) => (
              <li key={link.routes}>
                <a
                  className={classNames({
                    'text-zinc-900': location.pathname === link.routes,
                    'text-zinc-500 hover:text-zinc-900 transition-color': true,
                  })}
                  href={link.routes}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  );
};
