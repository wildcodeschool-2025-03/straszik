import { useState } from "react";
import { Link } from "react-router";

function Header() {
  const userConnected = JSON.parse(
    localStorage.getItem("userConnected") || "{}",
  );
  const [open, setOpen] = useState(false);

  return (
    <nav className="top-0 left-0 right-0 z-50 p-0">
      <section className="flex justify-between md:justify-center p-3">
        <div className="md:hidden">
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            className="text-white focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg
              className="w-10 h-10"
              fill="black"
              stroke="black"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Logo */}
        <div className="md:hidden mx-auto">
          <Link to="/">
            <img
              src="./src/assets/images/logo.png"
              className="w-40"
              alt="Stras'Zik logo"
            />
          </Link>
        </div>
        {/*login*/}
        <div className="absolute right-3 min-md:right-1">
          <Link
            to={Object.keys(userConnected).length === 0 ? "/log-in" : "/compte"}
            className="flex flex-col items-end md:items-center md:flex-row"
          >
            {Object.keys(userConnected).length === 0 ? null : (
              <p className="text-secondary font-semibold lg:text-sm mr-1 min-md:mr-2 text-xs">
                Bonjour {userConnected.firstName}
              </p>
            )}
            <img
              src="./src/assets/images/account_circle.png"
              alt="logo_login"
              className="w-10 h-10"
            />
          </Link>
        </div>

        {/* Liens desktop */}
        <section className="flex items-center">
          <div className="hidden md:flex flex-col gap-5 text-secondary text-right">
            <Link
              to="/rockband"
              className="hover:text-white font-extrabold  transition bg-button text-center text-sm p-1 rounded-lg shadow-2xl w-32"
            >
              RockBand
            </Link>
            <Link
              to="/discographie"
              className="hover:text-white font-extrabold  transition bg-button text-center text-sm p-1 rounded-lg shadow-2xl -translate-x-5 w-32"
            >
              Discographie
            </Link>
            <Link
              to="/backstage"
              className="hover:text-white font-extrabold  transition bg-button text-center text-sm p-1 rounded-lg shadow-2xl w-32"
            >
              Backstage
            </Link>
          </div>

          <div className="hidden md:flex">
            <Link to="/">
              <img
                src="./src/assets/images/logo.png"
                className="w-40"
                alt="Stras'Zik logo"
              />
            </Link>
          </div>

          <div className="hidden md:flex flex-col gap-5 text-secondary">
            <Link
              to="/evenements"
              className="hover:text-white font-extrabold transition bg-button text-center text-sm p-1 rounded-lg shadow-2xl w-32"
            >
              Evenements
            </Link>
            <Link
              to="/boutique"
              className="hover:text-white font-extrabold transition bg-button text-center text-sm p-1 rounded-lg shadow-2xl translate-x-5 w-32"
            >
              Boutique
            </Link>
            <Link
              to="/contact"
              className="hover:text-white font-extrabold transition bg-button text-center text-sm p-1 rounded-lg shadow-2xl w-32"
            >
              Contact
            </Link>
          </div>
        </section>

        {/* Bouton burger uniquement sur mobile */}
      </section>

      {/* Menu mobile toujours présent */}

      <div
        className={`absolute top-14 left-0 bg-primary text-secondary font-semibold rounded-lg shadow-md p-4 flex flex-col space-y-3 md:hidden transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link
          onClick={() => setOpen(false)}
          to="/rockband"
          className="hover:text-button"
        >
          Rockband
        </Link>

        <Link
          onClick={() => setOpen(false)}
          to="/discographie"
          className="hover:text-button"
        >
          Discographie
        </Link>

        <Link
          onClick={() => setOpen(false)}
          to="/backstage"
          className="hover:text-button"
        >
          Backstage
        </Link>

        <Link
          onClick={() => setOpen(false)}
          to="/evenements"
          className="hover:text-button"
        >
          Evènements
        </Link>

        <Link
          onClick={() => setOpen(false)}
          to="/boutique"
          className="hover:text-button"
        >
          Boutique
        </Link>
        <Link
          onClick={() => setOpen(false)}
          to="/contact"
          className="hover:text-button"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Header;
