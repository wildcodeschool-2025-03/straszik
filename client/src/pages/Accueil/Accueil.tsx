import { useEffect, useState } from "react";
import { Link } from "react-router";
import photogroupe from "../../assets/images/photogroupe.png";
import AlbumHome from "../../components/AlbumHome/AlbumHome";
import DateHome from "../../components/EventsHome/EventsHome";
import GoodiesHome from "../../components/GoodiesHome/GoodiesHome";
import { PhotoHotspots } from "../../components/PhotoHotspots/PhotoHotspots";

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
    left: 25,
    name: "Quentin",
    role: "Bassiste",
    anecdote: "Il joue de la basse depuis l’âge de 10 ans !",
  },
  {
    id: "batteur",
    top: 50,
    left: 40,
    name: "Eric",
    role: "Batteur",
    anecdote: "Il tape sur tout ce qui bouge tant que le rythme y est !",
  },
  {
    id: "chanteur",
    top: 35,
    left: 60,
    name: "Alex",
    role: "Chanteur",
    anecdote: "Son premier micro était une brosse à cheveux !",
  },
  {
    id: "guitariste",
    top: 55,
    left: 80,
    name: "Max",
    role: "Guitariste",
    anecdote: "Il compose ses propres riffs depuis ses 15 ans !",
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
      .then((data: EventsInterface[]) => setEvents(data.slice(0, 3)));
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
      <section>
        <div>
          {/*login*/}
          <div className="absolute right-3 min-md:right-1">
            <Link
              to={
                Object.keys(userConnected).length === 0 ? "/log-in" : "/compte"
              }
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
        className={`absolute top-14 left-0 bg-primary/90 text-secondary font-semibold rounded-lg shadow-md p-4 flex flex-col space-y-3 md:hidden transform transition-transform duration-300 ${
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

      <div className="flex justify-center ">
        <section className="flex items-center md:mx-10 mt-20">
          <div className="hidden md:flex flex-col gap-10 text-secondary text-right mr-5">
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

          <div className="flex mx-4 min-md:mx-0">
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
      </div>
      <section className="mt-10 mx-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* CARTE ÉVÉNEMENTS */}
        <div className="bg-button/60 p-6 rounded-3xl shadow-lg flex flex-col justify-between ">
          <DateHome events={events} />
        </div>

        {/* CARTE DISCOGRAPHIE */}
        <div className="bg-button/60 p-6 rounded-3xl shadow-lg flex flex-col justify-between ">
          <AlbumHome albums={albums} />
        </div>

        {/* GOODIES – full-width en tablette, grille en desktop */}
        <div
          className="bg-button/60 p-6 rounded-3xl shadow-lg flex flex-col justify-between
                        md:col-span-2"
        >
          <GoodiesHome goodies={goodies} />
        </div>
      </section>
    </>
  );
}

export default Accueil;
