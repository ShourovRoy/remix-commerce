import { NavLink } from "@remix-run/react";

const DefaultHeader = () => {
  return (
    <div>
      <header className="py-4 bg-white drop-shadow">
        <div className="container flex justify-between space-x-2 items-center">
          {/* left side */}
          <NavLink prefetch="render" to="/">
            <img src="/assets/svgs/logo.svg" alt="Discover Nuxt 3" />
          </NavLink>
          {/* right side */}
          <ul className="flex space-x-4">
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pendingNavLinkBtn"
                  : isActive
                  ? "activeNavLinkBtn"
                  : "navLinkBtn"
              }
              to="/"
              rel="prefetch"
              prefetch="render"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pendingNavLinkBtn"
                  : isActive
                  ? "activeNavLinkBtn"
                  : "navLinkBtn"
              }
              to="/about"
              rel="prefetch"
              prefetch="render"
            >
              About
            </NavLink>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pendingNavLinkBtn"
                  : isActive
                  ? "activeNavLinkBtn"
                  : "navLinkBtn"
              }
              to="/products"
              rel="prefetch"
              prefetch="render"
            >
              Products
            </NavLink>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default DefaultHeader;
