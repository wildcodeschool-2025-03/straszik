import { useState } from "react";

interface PhotoHotspotsProps {
  imageSrc: string;
  alt?: string;
  hotspots: Hotspot[];
}

interface Hotspot {
  id: string;
  top: number;
  left: number;
  name: string;
  role: string;
  anecdote: string;
}

export const PhotoHotspots: React.FC<PhotoHotspotsProps> = ({
  imageSrc,
  alt = "Image interactive",
  hotspots,
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const handleClick = (id: string) =>
    setActiveId((prev) => (prev === id ? null : id));

  return (
    <div className="relative inline-block">
      <img
        src={imageSrc}
        alt={alt}
        className="block w-[350px] h-auto rounded-lg lg:w-[400px] xl:w-[550px] object-cover"
      />

      {hotspots.map((hs: Hotspot) => (
        <div
          key={hs.id}
          className="absolute"
          style={{ top: `${hs.top}%`, left: `${hs.left}%` }}
        >
          <button
            type="button"
            onClick={() => handleClick(hs.id)}
            className={`
              text-lg
              text-secondary
              bg-white
              border-white
              border-1
              rounded-full w-5 h-5 flex items-center justify-center
              cursor-pointer
              z-10
                hover:bg-secondary hover:text-white hover:border-secondary
                active:bg-secondary active:text-white active:border-secondary
                           `}
            aria-label={`${hs.name}, ${hs.role}. Appuyez pour plus d’infos.`}
          >
            ★
          </button>

          <div
            className={`
              text-center
              absolute
              top-full
              left-1/2
              transform -translate-x-1/2
              mt-2
                            px-2 py-2
              bg-white
              border-2 border-secondary
              text-secondary  text-xs md:text-sm
              rounded
              transition-all duration-200
              z-20
              opacity-0 pointer-events-none
              w-30
              md:w-50
              lg:w-60
              xl:w-70
              whitespace-normal
              
              ${activeId === hs.id ? "opacity-100 pointer-events-auto" : "opacity-0"}
            `}
          >
            <strong>{hs.name}</strong>
            <br />
            <em>{hs.role}</em>
            <br />
            <span>{hs.anecdote}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
