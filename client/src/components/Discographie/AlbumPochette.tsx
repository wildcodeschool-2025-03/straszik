import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  return (
    <div className="relative px-8">
      <Slider {...settings}>
        {albums.map((album) => (
          <div key={album.id} className="flex justify-center items-center p-5">
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div
              className="flex justify-center items-center cursor-pointer"
              onClick={() => onAlbumClick(album)}
            >
              <img
                src={album.image}
                alt={`Pochette de ${album.title}`}
                className="object-contain w-50 h-50 "
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default AlbumPochette;
