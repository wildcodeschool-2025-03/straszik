import { Scrollbar } from "react-scrollbars-custom";

export interface EventsInterface {
  id: number;
  name: string;
  date: string;
  hour: string;
  localisation: string;
  image: string;
}

interface DateHomeProps {
  events: EventsInterface[];
}

function EventsHome({ events }: DateHomeProps) {
  return (
    <>
      <h2 className="text-secondary text-2xl font-bold mb-4 text-center">
        Prochaines dates
      </h2>
      <Scrollbar className="min-h-[340px] md:min-h-[220px]">
        <ul className="space-y-4 px-2 flex flex-col items-center justify-center pr-4">
          {events.map((event: EventsInterface) => (
            <li
              key={event.id}
              className="border-4 border-secondary bg-block p-4 rounded-lg bg-body w-[260px] lg:w-[350px]"
            >
              {" "}
              <div className="flex gap-4 font-bold text-xs items-center justify-between">
                <img
                  src={event.image}
                  alt={`Affiche : ${event.name}`}
                  className="lg:mx-4 w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex flex-col gap-2 text-secondary">
                  <p className="opacity-80  italic md:ml-2 text-center">
                    {event.date} - {event.hour}
                  </p>{" "}
                  <hr className="border-secondary" />
                  <h2 className="lg:text-center">{event.name}</h2>
                  <h2 className="lg:text-center">{event.localisation}</h2>
                </div>{" "}
              </div>
            </li>
          ))}
        </ul>
      </Scrollbar>
    </>
  );
}

export default EventsHome;
