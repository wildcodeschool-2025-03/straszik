import { useEffect, useState } from "react";
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
  useEffect(() => {
    fetch(apiEventsUrl)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);
  return (
    <>
      <Header />
      <h1 className="text-secondary text-4xl font-extrabold text-center lg:text-7xl mt-10">
        EVENEMENTS
        <br /> A VENIR
      </h1>
      <section className="eventContainer text-secondary flex flex-col gap-20 m-4 mt-10 mb-20">
        {events.map((event) => (
          <article
            key={event.id}
            className="eventCard bg-button/60 rounded-md mt-10 font-bold text-center md:flex md:flex-row-reverse p-4 md:max-w-2/3 m-auto flex flex-col gap-4"
          >
            <h2 className="bg-block border-2 border-secondary md:hidden w-3/4 m-auto rounded-lg h-12  flex items-center justify-center">
              {event.name}
            </h2>
            <img
              src={event.image}
              alt="affiche"
              className="m-auto w-10/12 md:max-w-1/2 rounded-lg"
            />
            <div className="md:flex md:flex-col md:min-w-1/2 flex flex-col gap-4">
              <h2 className="bg-block border-2 border-secondary hidden md:flex md:justify-center w-3/4 m-auto rounded-lg h-12 md:h-16  items-center justify-center md:text-xl">
                {event.name}
              </h2>
              <h2 className="bg-block border-2 border-secondary  w-3/4 m-auto rounded-lg h-12 md:h-16 flex items-center justify-center md:text-xl">
                {event.date} - {event.hour}
              </h2>
              <h2 className="bg-block border-2 border-secondary  w-3/4 m-auto rounded-lg h-12 md:h-16  flex items-center justify-center md:text-xl">
                {event.localisation}
              </h2>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

export default Evenements;
