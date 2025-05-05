import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface GoodiesHomeInterface {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

type Props = {
  goodies: GoodiesHomeInterface[];
};

function GoodiesHome({ goodies }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // largeur d’un groupe (la moitié du track total)
    const groupWidth = track.scrollWidth / 2;
    let x = 0;
    const speed = 0.3; // px par frame

    let rafId: number;
    const step = () => {
      x += speed;
      if (x >= groupWidth) x = 0;
      track.style.transform = `translateX(-${x}px)`;
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div>
      <h2 className="text-secondary text-2xl font-bold mb-4 text-center">
        Boutique
      </h2>

      {/* === MOBILE & TABLETTE === */}
      <div className="relative overflow-x-hidden ">
        <div ref={wrapperRef} className="w-full">
          <div
            ref={trackRef}
            className="flex whitespace-nowrap will-change-transform px-6"
          >
            {[...goodies, ...goodies].map((item, i) => (
              <Link
                key={`${item.id}-${i}`}
                to="/boutique"
                className="flex-shrink-0 w-57 rounded-xl mx-2 cursor-pointer bg-block p-2 border-4 border-secondary flex flex-col items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-40 h-40 object-cover rounded-lg "
                />
                <h3 className="mt-2 font-semibold text-lg text-secondary">
                  {item.name}
                </h3>
                <p className="text-sm text-secondary">{item.description}</p>
                <span className="block mt-1 font-bold text-secondary ">
                  {item.price} €
                </span>
              </Link>
            ))}
          </div>
        </div>
        {/* Masques dégradés aux bords, sur fond de la carte */}
      </div>
    </div>
  );
}

export default GoodiesHome;
