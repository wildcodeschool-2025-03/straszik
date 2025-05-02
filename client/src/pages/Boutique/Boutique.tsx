import { useEffect, useState } from "react";
import { useBasket } from "../../Context/BasketContext";
import Header from "../../components/Header/Header";

interface Goodie {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

const apiGoodiesUrl = import.meta.env.VITE_API_GOODIES_URL;

function Boutique() {
  const [goodies, setGoodies] = useState<Goodie[]>([]);
  const { basket, setBasket } = useBasket();

  useEffect(() => {
    fetch(apiGoodiesUrl)
      .then((res) => res.json())
      .then((data) => setGoodies(data));
  }, []);

  const handleBasket = (product: Goodie) => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      quantity: 1,
    };
    setBasket([...basket, item]);
  };

  return (
    <>
      <Header />
      <section className="px-4 py-8">
        <div className="flex flex-col items-center text-secondary">
          <h1 className="font-extrabold text-4xl md:text-5xl mb-4">GOODIES</h1>
          <p className="mb-10 lg:mb-15 lg:text-xl">
            Supporte Stras'Zik avec des produits exclusifs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
            {goodies.map((products) => (
              <div
                key={products.id}
                className="bg-block border-secondary border-4 rounded-2xl shadow-md p-2"
              >
                <img
                  src={products.image}
                  alt={products.name}
                  className="w-70 h-70 object-cover"
                />
                <div className="flex flex-col items-center text-center">
                  <div>
                    <h3 className="text-2xl font-semibold mb-1">
                      {products.name}
                    </h3>
                    <p className="text-sm text-secondary mb-2">
                      {products.description}
                    </p>
                    <span className="text-xl font-semibold">
                      {products.price} €
                    </span>
                  </div>
                  <button
                    type="button"
                    className="bg-button p-2.5 px-4 rounded-full mb-3 mt-3 border-secondary border-3 font-semibold"
                    id={String(products.id)}
                    onClick={() => handleBasket(products)}
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Boutique;
