import { useEffect, useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { PiBasketBold } from "react-icons/pi";
import { Link } from "react-router";
import photogroupe from "../../../public/photogroupe.png";
import AlbumHome from "../../components/AlbumHome/AlbumHome";
import DateHome from "../../components/EventsHome/EventsHome";
import GoodiesHome from "../../components/GoodiesHome/GoodiesHome";
import { PhotoHotspots } from "../../components/PhotoHotspots/PhotoHotspots";
import adminAccounts from "../../data/adminAccounts.json";

const apiEventsUrl = import.meta.env.VITE_API_EVENTS_URL;
const apiDiscographiesUrl = import.meta.env.VITE_API_DISCOGRAPHIE_URL;
const apiGoodiesUrl = import.meta.env.VITE_API_GOODIES_URL;

interface Hotspot {
  id: string;
  top: number;
  left: number;
  name: string;
  role: string;
  anecdote: string;
}

const hotspotsData: Hotspot[] = [
  {
    id: "bassiste",
    top: 40,
    left: 18,
    name: "Quentin",
    role: "Bassiste",
    anecdote: "Il joue de la basse depuis l’âge de 10 ans !",
  },
  {
    id: "batteur",
    top: 52,
    left: 40,
    name: "Eric",
    role: "Batteur",
    anecdote: "Il tape sur tout ce qui bouge tant que le rythme y est !",
  },
  {
    id: "chanteur",
    top: 38,
    left: 65,
    name: "Alex",
    role: "Chanteuse",
    anecdote: "Son premier micro était une brosse à cheveux !",
  },
  {
    id: "guitariste",
    top: 43,
    left: 85,
    name: "Max",
    role: "Guitariste",
    anecdote: "Il crée ses propres riffs depuis ses 15 ans !",
  },
];

interface EventsInterface {
  id: number;
  name: string;
  date: string;
  hour: string;
  localisation: string;
  image: string;
}

interface AlbumInterface {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  sound: string;
  tracklist: string;
}

interface Track {
  id: number;
  title: string;
  sound: string;
}

interface GoodiesHomeInterface {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

function setTracks(_arg0: Track[]) {
  throw new Error("Function not implemented.");
}

function Accueil() {
  const userConnected = JSON.parse(
    localStorage.getItem("userConnected") || "{}",
  );
  const [events, setEvents] = useState<EventsInterface[]>([]);
  const [albums, setAlbums] = useState<AlbumInterface[]>([]);
  const [goodies, setGoodies] = useState<GoodiesHomeInterface[]>([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(apiEventsUrl)
      .then((res) => res.json())
      .then((data: EventsInterface[]) => setEvents(data));
  }, []);

  useEffect(() => {
    fetch(apiDiscographiesUrl)
      .then((res) => res.json())
      .then((data: AlbumInterface[]) => {
        setAlbums(data.slice(0, 4));
        if (data.length > 0) {
          setTracks(JSON.parse(data[0].tracklist) as Track[]);
        }
      });
  }, []);

  useEffect(() => {
    fetch(apiGoodiesUrl)
      .then((res) => res.json())
      .then((data) => setGoodies(data));
  }, []);

  return (
    <>
      <section className="p-3 mx-auto">
        {/*login*/}
        <div className="absolute right-3 min-md:right-1">
          {Object.keys(userConnected).length === 0 ? null : (
            <p className="text-secondary font-semibold lg:text-sm mr-1 min-md:mr-2 text-xs">
              Bonjour {userConnected.firstName}
            </p>
          )}
          <div className="flex items-center flex-row-reverse">
            <Link
              to={
                Object.keys(userConnected).length === 0
                  ? "/log-in"
                  : adminAccounts.find(
                        (admin) => admin.email === userConnected.email,
                      )
                    ? "/admin"
                    : "/compte"
              }
              className="flex justify-end md:items-center md:flex-row"
            >
              <div className="text-black text-4xl p-1 ">
                <MdAccountCircle />
              </div>
            </Link>
            <Link to="/panier">
              <div className="text-black text-xl p-1 border-2 rounded-full ">
                <PiBasketBold />
              </div>
            </Link>
          </div>
        </div>

        <div className="md:hidden absolute top-4 left-2 z-50">
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button className="focus:outline-none" onClick={() => setOpen(!open)}>
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg
              className="w-15 h-12"
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
      </section>

      {/* Menu mobile toujours présent */}

      <div
        className={`absolute top-14 left-0 bg-primary/90 text-secondary font-semibold rounded-lg shadow-md p-4 flex flex-col space-y-3 md:hidden transform transition-transform duration-300 z-80 mt-2 ${
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

      <div className="flex justify-center mt-5 ">
        <section className="flex items-center">
          <div className="hidden md:flex flex-col gap-10 text-secondary text-right mr-5">
            <Link
              to="/rockband"
              className="hover:text-white font-extrabold  transition bg-button text-center text-xl p-2 rounded-lg shadow-2xl "
            >
              RockBand
            </Link>
            <Link
              to="/discographie"
              className="hover:text-white font-extrabold  transition bg-button text-center text-xl p-2 rounded-lg shadow-2xl -translate-x-8 "
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

          <div className="flex mx-4 mt-10">
            <PhotoHotspots
              imageSrc={photogroupe}
              alt="Photo du groupe Stras'Zik"
              hotspots={hotspotsData}
            />
          </div>

          <div className="hidden md:flex flex-col gap-10 text-secondary ml-5">
            <Link
              to="/evenements"
              className="hover:text-white font-extrabold  transition bg-button text-center text-xl p-2 rounded-lg shadow-2xl w-38"
            >
              Evenements
            </Link>
            <Link
              to="/boutique"
              className="hover:text-white font-extrabold  transition bg-button text-center text-xl p-2 rounded-lg shadow-2xl translate-x-8 w-36"
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
      </div>
      <section className="mt-10 mx-6 grid grid-cols-1 md:grid-cols-2 gap-8 xl:grid-cols-3">
        {/* CARTE ÉVÉNEMENTS */}
        <div className="bg-button/60 p-6 rounded-3xl shadow-lg flex flex-col justify-between xl:col-span-1">
          <DateHome events={events} />
        </div>

        {/* CARTE DISCOGRAPHIE */}
        <div className="bg-button/60 p-6 rounded-3xl shadow-lg flex flex-col justify-between xl:col-span-2">
          <AlbumHome albums={albums} />
        </div>

        {/* GOODIES – full-width en tablette, grille en desktop */}
        <div className="bg-button/60 p-6 rounded-3xl shadow-lg flex flex-col justify-between md:col-span-2 xl:col-span-3">
          <GoodiesHome goodies={goodies} />
        </div>
      </section>
    </>
  );
}

export default Accueil;
