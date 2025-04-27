import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";

// Interface pour typer les données de l'Album
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

interface AlbumPochetteProps {
  albums: Album[];
  onAlbumClick: (album: Album) => void;
}

// Composant AlbumPochette qui affiche les pochettes d'album dans un carrousel
function AlbumPochette({ albums, onAlbumClick }: AlbumPochetteProps) {
  // Si albums est vide, affichage du message de chargement
  if (albums.length === 0) return <p>Chargement...</p>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // nombre de pochettes en mode desktop
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 768, // en dessous de 768px (tablette et mobile)
        settings: {
          slidesToShow: 1, // une seule pochette
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="relative px-8">
      <Slider {...settings}>
        {albums.map((album, idx) => (
          <div
            key={album.id}
            className="grid grid-rows-1 justify-items-center p-5 cursor-pointer"
          >
            <div
              key={album.id}
              onClick={() => {
                onAlbumClick(album);
                setActiveIndex(idx);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onAlbumClick(album);
                  setActiveIndex(idx);
                }
              }}
              className={`relative transform transition-transform duration-300
              ${activeIndex === idx ? "scale-120" : "hover:scale-120 md:hover:scale-110"}`}
            >
              <img
                src={album.image}
                alt={`Pochette de ${album.title}`}
                className="object-contain w-32 h-32 md:w-40 md:h-40"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default AlbumPochette;
