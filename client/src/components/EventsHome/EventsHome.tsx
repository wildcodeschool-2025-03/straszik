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
      <ul className="space-y-4 flex-1">
        {events.map((event: EventsInterface) => (
          <li
            key={event.id}
            className="border-4 border-secondary bg-block p-4 rounded-lg bg-body"
          >
            <p className="text-secondary text-lg">
              {event.date} — {event.name}
              <br />➤ {event.localisation} — {event.hour}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default EventsHome;
