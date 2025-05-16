import { useState } from "react";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

interface AlbumInterface {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  sound: string;
}

interface AlbumHomeProps {
  albums: AlbumInterface[];
}

function AlbumHome({ albums }: AlbumHomeProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const tracks = albums.map((alb) => ({
    id: alb.id,
    title: alb.title,
    sound: alb.sound,
  }));

  return (
    <>
      {/* Title: */}
      <h2 className="text-secondary text-2xl font-bold mb-6 text-center">
        Discographie
      </h2>

      {/* Covers grid */}
      <div className="grid grid-cols-2 justify-items-center lg:grid-cols-4 gap-4 mb-2">
        {albums.map((album, idx) => (
          <div
            key={album.id}
            onClick={() => setActiveIndex(idx)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setActiveIndex(idx);
              }
            }}
            className={`relative transform transition-transform duration-300
              ${activeIndex === idx ? "scale-120" : "hover:scale-110"}`}
          >
            <img
              src={album.image}
              alt={album.title}
              className="w-32 object-cover border-4 border-secondary rounded-xl"
            />
          </div>
        ))}
      </div>

      {/* Player responsive container */}
      <div className="w-full">
        <div className="flex justify-center items-center">
          <AudioPlayer
            tracks={tracks}
            currentTrackIndex={activeIndex}
            onTrackChange={(newIdx) => setActiveIndex(newIdx)}
          />
        </div>
      </div>
    </>
  );
}

export default AlbumHome;
