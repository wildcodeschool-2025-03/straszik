import { useState } from "react";
import { Link } from "react-router";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="2xl:fixed top-0 left-0 right-0 z-50 p-0">
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
        <div className="w-10 h-10 md:absolute md:right-5">
          <img src="./src/assets/images/account_circle.png" alt="logo_login" />
        </div>

        {/* Liens desktop */}
        <section className="flex items-center">
          <div className="hidden md:flex flex-col gap-5 text-secondary text-right">
            <Link
              to="/rockband"
              className="hover:text-white font-extrabold  transition bg-button text-center text-xl p-2 rounded-lg shadow-2xl "
            >
              RockBand
            </Link>
            <Link
              to="/discographie"
              className="hover:text-white font-extrabold  transition bg-button text-center text-xl p-2 rounded-lg shadow-2xl -translate-x-5 "
            >
              Discographie
            </Link>
            <Link
              to="/backstage"
              className="hover:text-white font-extrabold  transition bg-button text-center text-xl p-2 rounded-lg shadow-2xl "
            >
              Backstage
            </Link>
          </div>

          <div className="hidden md:flex">
            <Link to="/">
              <img
                src="./src/assets/images/logo.png"
                className="w-60"
                alt="Stras'Zik logo"
              />
            </Link>
          </div>

          <div className="hidden md:flex flex-col gap-5 text-secondary">
            <Link
              to="/evenements"
              className="hover:text-white font-extrabold  transition bg-button text-center text-xl p-2 rounded-lg shadow-2xl w-36"
            >
              Evenements
            </Link>
            <Link
              to="/boutique"
              className="hover:text-white font-extrabold  transition bg-button text-center text-xl p-2 rounded-lg shadow-2xl translate-x-5 w-36"
            >
              Boutique
            </Link>
            <Link
              to="/contact"
              className="hover:text-white font-extrabold  transition bg-button text-center text-xl p-2 rounded-lg shadow-2xl w-36"
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
        <Link onClick={() => setOpen(false)} to="/rockband">
          Rockband
        </Link>

        <Link onClick={() => setOpen(false)} to="/discographie">
          Discographie
        </Link>

        <Link onClick={() => setOpen(false)} to="/backstage">
          Backstage
        </Link>

        <Link onClick={() => setOpen(false)} to="/evenements">
          Evènements
        </Link>

        <Link onClick={() => setOpen(false)} to="/boutique">
          Boutique
        </Link>
        <Link onClick={() => setOpen(false)} to="/contact">
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Header;
