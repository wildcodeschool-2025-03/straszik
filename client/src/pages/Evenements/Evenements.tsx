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
      <h1 className="text-secondary text-4xl font-extrabold text-center lg:text-5xl mt-10 mx-10">
        EVENEMENTS A VENIR
      </h1>

      <section className="eventContainer flex flex-col items-center text-secondary gap-10 mt-16 bg-button/60 rounded-md p-6 mx-auto w-5/7 md:max-w-6xl mb-10 md:flex-row md:flex-wrap md:justify-center">
        {events.map((event) => (
          <article
            key={event.id}
            className="eventCard flex flex-col bg-block border-secondary border-4 rounded-lg p-4 gap-4 w-[200px] md:flex-col"
          >
            <img
              src={event.image}
              alt={`Affiche : ${event.name}`}
              className="mx-auto w-full object-cover md:max-w-[200px] rounded-lg"
            />
            <hr className="my-2 mx-2" />
            <div className="flex flex-col gap-2 font-semibold">
              <p className="opacity-80 text-sm italic md:ml-2">
                {event.date} - {event.hour}
              </p>
              <h2 className="ml-3 md:ml-6 text-sm mt-2">{event.name}</h2>
              <h2 className="ml-3 md:ml-6 text-sm">{event.localisation}</h2>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

export default Evenements;
