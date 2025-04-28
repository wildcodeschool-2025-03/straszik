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
    <div className="min-md:relative inline-block">
      <img
        src={imageSrc}
        alt={alt}
        className="block w-full h-auto rounded-lg"
      />

      {hotspots.map((hs: Hotspot) => (
        <button
          key={hs.id}
          type="button"
          className={`
        max-md:hidden
        absolute
        transform -translate-x-1/2 -translate-y-1/2
        text-2xl 
        text-white
        z-20
        focus:outline-none
        `}
          style={{ top: `${hs.top}%`, left: `${hs.left}%` }}
          onClick={() => handleClick(hs.id)}
          onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick(hs.id);
            }
          }}
          aria-label={`${hs.name}, ${hs.role}. Appuyez pour plus d’infos.`}
        >
          ★
          <div
            className={`
          absolute
          bottom-full
          left-1/2
          transform -translate-x-1/2
          mb-2
          whitespace-nowrap
          px-2 py-1
          bg-white
          border-4 border-secondary
          text-secondary text-sm
          rounded
          transition-opacity duration-200
          z-30             
          ${activeId === hs.id ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
          >
            <strong>{hs.name}</strong>
            <br />
            <em>{hs.role}</em>
            <br />
            <span>{hs.anecdote}</span>
          </div>
        </button>
      ))}
    </div>
  );
};
