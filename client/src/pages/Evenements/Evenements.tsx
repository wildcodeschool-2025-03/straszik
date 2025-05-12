import type { LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useMap } from "react-leaflet";
import Header from "../../components/Header/Header";

interface EventsInterface {
  id: number;
  name: string;
  date: string;
  hour: string;
  localisation: string;
  image: string;
}

const apiEventsUrl = import.meta.env.VITE_API_EVENTS_URL;

function Evenements() {
  const [events, setEvents] = useState<EventsInterface[]>([]);
  const [eventLocalisation, setEventLocalisation] = useState<LatLngTuple>([
    48.57572664033915, 7.729281881921365,
  ]);
  const [eventAdress, setEventAddress] = useState<string>("");

  useEffect(() => {
    fetch(apiEventsUrl)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);

  const handleMap = (localisation: string) => {
    setEventAddress(localisation);
    switch (localisation) {
      case "Le Molodoï, Strasbourg (67)":
        setEventLocalisation([48.57572664033915, 7.729281881921365]);

        break;
      case "La Laiterie, Strasbourg (67)":
        setEventLocalisation([48.5756815371275, 7.729220180594914]);

        break;
      case "Le Grillen, Colmar (68)":
        setEventLocalisation([48.07718227769037, 7.371599981899124]);
        break;
      case "Elastic Bar, Strasbourg (67)":
        setEventLocalisation([48.579857126116906, 7.756087841440163]);
        break;
      case "La Grenze, Strasbourg (67)":
        setEventLocalisation([48.589099840279495, 7.735111381274346]);
        break;
    }
    // if (localisation === "Le Molodoï, Strasbourg (67)") {
    //   const newPos = [48.57572664033915, 7.729281881921365];
    //   setEventLocalisation(newPos);
    // }
    console.log(localisation);
  };
  function MapUpdater({ center }: { center: LatLngTuple }) {
    const map = useMap();

    useEffect(() => {
      map.setView(center);
    }, [center, map]);

    return null;
  }

  return (
    <>
      <Header />
      <h1 className="text-secondary text-4xl font-extrabold text-center lg:text-5xl mt-10 mx-10">
        EVENEMENTS A VENIR
      </h1>

      <section className="eventContainer flex flex-col items-center text-secondary gap-10 mt-16 bg-button/60 rounded-md p-6 mx-auto w-5/7 md:max-w-6xl mb-10 md:flex-row md:flex-wrap md:justify-center">
        {events.map((event) => (
          <article
            key={event.id}
            className="eventCard flex flex-col bg-block border-secondary border-4 rounded-lg p-4 gap-4 w-[180px] min-h-[375px] md:flex-col"
          >
            <img
              src={event.image}
              alt={`Affiche : ${event.name}`}
              className="mx-auto w-full object-cover rounded-lg"
            />
            <hr className="my-2 mx-2" />
            <div className="flex flex-col gap-2 font-semibold justify-between h-[150px]">
              <p className="opacity-80 text-sm italic md:ml-2">
                {event.date} - {event.hour}
              </p>
              <h2 className="ml-3 md:ml-6 text-sm mt-2">{event.name}</h2>
              {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
              <h2
                className="ml-3 md:ml-6 text-sm hover:cursor-pointer hover:font-extrabold"
                onClick={() => handleMap(event.localisation)}
              >
                <FiMapPin />
                {event.localisation}
              </h2>
            </div>
          </article>
        ))}
      </section>
      <MapContainer
        className="h-[500px] w-5/7 m-auto md:max-w-6xl"
        center={eventLocalisation}
        zoom={13}
        scrollWheelZoom={true}
      >
        <MapUpdater center={eventLocalisation} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={eventLocalisation}>
          <Popup className="hover:cursor-pointer">
            {eventAdress}
            <br />
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default Evenements;
