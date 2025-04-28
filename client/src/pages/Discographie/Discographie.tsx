import { useEffect, useState } from "react";
import AlbumDetails from "../../components/Discographie/AlbumDetails";
import AlbumPochette from "../../components/Discographie/AlbumPochette";
import Header from "../../components/Header/Header";

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

// Composant Discographie qui affiche la liste des albums et les détails d'un album sélectionné
function Discographie() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const apiDiscographieUrl = import.meta.env.VITE_API_DISCOGRAPHIE_URL;

  // Récupération des données de l'album depuis l'API
  useEffect(() => {
    fetch(apiDiscographieUrl)
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data);
        // 👇 Sélection automatique de l'album 0
        if (data.length > 0) {
          setSelectedAlbum(data[0]);
        }
      })
      .catch((error) => console.error("Error fetching album data:", error));
  }, []);

  // Affichage d'un message de chargement si l'album n'est pas encore chargé
  if (albums.length === 0) return <p>Chargement...</p>;

  // Fonction pour gérer la sélection d'un album : met à jour l'état selectedAlbum avec l'album sélectionné
  const handleAlbumSelect = (album: Album) => {
    setSelectedAlbum(album);
  };

  return (
    <>
      <Header />
      <h1 className="text-secondary text-4xl font-extrabold text-center lg:text-5xl mt-10">
        DISCOGRAPHIE
      </h1>
      <section className="bg-button ">
        <h2 className="font-bold mt-15 ml-5 p-2 text-xl">Albums</h2>
        <AlbumPochette albums={albums} onAlbumClick={handleAlbumSelect} />
      </section>
      {selectedAlbum && <AlbumDetails album={selectedAlbum} />}
    </>
  );
}

export default Discographie;
