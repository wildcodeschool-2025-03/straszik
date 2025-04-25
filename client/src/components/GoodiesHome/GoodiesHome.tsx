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
      if (x >= groupWidth) x -= groupWidth;
      track.style.transform = `translateX(-${x}px)`;
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div>
      <h2 className="text-secondary font-extrabold text-2xl lg:text-4xl flex justify-center mb-5">
        Boutique
      </h2>

      {/* === MOBILE & TABLETTE === */}
      <div className="relative lg:hidden overflow-hidden">
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

      {/* === DESKTOP === */}
      <div className="hidden lg:grid lg:grid-cols-6 lg:gap-4 ">
        {goodies.map((item) => (
          <Link
            key={item.id}
            to="/boutique"
            className="rounded-xl p-6 lg:p-3.5 flex flex-col border-2 border-secondary bg-block"
          >
            <img
              src={item.image}
              alt={item.name}
              className="hidden lg:grid lg:grid-cols-6 lg:gap-x-6 lg:gap-y-4"
            />
            <div className="justify-items-center text-center text-secondary">
              <h3 className="mt-3 font-semibold text-xl">{item.name}</h3>
              <p className="mt-1 text-sm flex-grow">{item.description}</p>
              <span className="mt-2 font-bold text-lg">{item.price} €</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GoodiesHome;
