import ZoomImage from "./ZoomImage";

interface InstrumentCardProps {
  src: string;
  alt: string;
  name: string;
  anecdote: string;
}

function InstrumentCard({ src, alt, name, anecdote }: InstrumentCardProps) {
  return (
    <div className="bg-block text-secondary flex flex-col gap-10 p-6 rounded-2xl border-secondary border-4">
      <figure>
        <div className="md:relative group">
          <ZoomImage
            className="block rounded-2xl w-full object-cover mx-auto"
            src={src}
            alt={alt}
          />
          <div className="hidden md:absolute md:inset-0 md:bg-primary/70 md:text-secondary md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-300 md:flex md:flex-col md:justify-center md:text-center md:p-4 md:cursor-pointer">
            <h3 className="text-base font-bold">Anecdote :</h3>
            <p className="mt-2 text-xs font-semibold">{anecdote}</p>
          </div>
        </div>
        <figcaption className="text-lg font-bold opacity-80 mt-5 text-center">
          {name}
        </figcaption>
        <p className="mt-2 opacity-80 font-semibold md:hidden">
          Anecdote :<p>{anecdote}</p>
        </p>
      </figure>
    </div>
  );
}

export default InstrumentCard;
