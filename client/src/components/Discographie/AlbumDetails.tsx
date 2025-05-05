import { useState } from "react";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

//Interface pour typer les données de l'Album
interface Track {
  id: number;
  title: string;
}

interface Album {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  tracklist: Track[];
  sound: string;
}

interface AlbumDetailsProps {
  album: Album;
}

// Composant AlbumDetails qui affiche les détails d'un album
function AlbumDetails({ album }: AlbumDetailsProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const tracks = [
    {
      id: album.id,
      title: album.title,
      sound: album.sound,
    },
  ];

  return (
    <section className="md:flex md:justify-center">
      <section
        key={album.id}
        className="bg-block mt-15 text-secondary flex flex-col justify-center gap-10 p-6 rounded-2xl mx-5 border-secondary border-4 md:flex-row lg:w-2/3 md:justify-around"
      >
        <div className="md:w-1/2">
          <div>
            <h2 className="font-semibold text-xl">"{album.title}"</h2>
            <p className="font-semibold mt-2 text-lg">
              Date de sortie : {album.date}
            </p>
            <p className="mt-2">{album.description}</p>
            <img
              src={album.image}
              alt={`Pochette de ${album.title}`}
              className="rounded-xl w-32 h-32 mt-2 object-cover"
            />
          </div>
          <div className="mt-10">
            <h2 className="font-semibold text-xl">
              Lire un extrait de l'album
            </h2>
            <div className="w-full">
              <div className="lg:w-[400px] xl:w-[500px] 2xl:w-[600px]">
                <AudioPlayer
                  tracks={tracks}
                  currentTrackIndex={activeIndex}
                  onTrackChange={(newIdx) => setActiveIndex(newIdx)}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-xl">Tracklist</h2>
          <ul className="list-decimal pl-10 mt-2">
            {album.tracklist.map((track) => (
              <li key={track.id} className="mt-1">
                {track.title}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
}

export default AlbumDetails;
