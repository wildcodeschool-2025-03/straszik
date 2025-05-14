import { useEffect, useState } from "react";

function EnterPage() {
  const [isClicked, setIsClicked] = useState(false);

  // Fonction pour jouer le son
  function playSound() {
    const audio = new Audio("/garage-sound.mp3"); // Utilise le fichier depuis le dossier public
    audio.play().catch((error) => {
      console.log("Erreur lors de la lecture du son:", error);
    });
  }

  // Fonction pour gérer le clic sur le logo
  // et le changement de page
  const handleClick = () => {
    if (isClicked) return;
    playSound();
    setTimeout(() => {
      setIsClicked(true);
    }, 500);
    setTimeout(() => {
      window.location.href = "/home";
    }, 3500);
  };

  // Fonction pour gérer l'accesibilité clavier
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        handleClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden">
        {/* Page /home en arrière-plan */}
        <iframe
          src="/home"
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
          style={{ filter: "blur(3px) brightness(0.5)" }}
          title="Preview home"
        />

        {/* Portes */}
        <div
          className={`absolute top-0 left-0 w-full h-1/2 bg-door z-40 transition-transform duration-3500 ease-in-out ${
            isClicked ? "-translate-y-full" : ""
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 w-full h-1/2 bg-door z-40 transition-transform duration-3500 ease-in-out delay-100 ${
            isClicked ? "translate-y-full" : ""
          }`}
        />

        {/* Logo */}
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <img
          src="./logo.png"
          alt="Logo Stras'Zik"
          onClick={handleClick}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 cursor-pointer ${
            isClicked ? "animate-spin-once" : "logo-animation"
          } hover:scale-110 transition-transform duration-1000`}
        />
      </div>
    </>
  );
}

export default EnterPage;
