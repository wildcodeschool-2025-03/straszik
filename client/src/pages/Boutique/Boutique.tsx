import { motion } from "framer-motion";
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

  function isUserConnected() {
    const userConnected = JSON.parse(
      localStorage.getItem("userConnected") || "null",
    );

    if (!userConnected || Object.keys(userConnected).length === 0) {
      alert("Veuillez vous connecter pour ajouter un produit au panier.");
      return false;
    }

    return true;
  }

  const handleBasket = (product: Goodie) => {
    const isInBasket = basket.some((item) => item.id === product.id);

    if (!isUserConnected()) {
      return;
    }

    if (isInBasket) {
      const updatedBasket = basket.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      setBasket(updatedBasket);
    } else {
      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        quantity: 1,
      };
      setBasket([...basket, newItem]);
    }
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

          <div className="flex flex-col items-center text-secondary gap-10 rounded-md p-6 mx-auto mb-10 md:flex-row md:flex-wrap md:justify-center">
            {goodies.map((products) => (
              <div
                key={products.id}
                className="bg-block border-secondary border-4 rounded-2xl shadow-md p-2 w-[250px] min-h-[350px]"
              >
                <img
                  src={products.image}
                  alt={products.name}
                  className="w-40 h-40 object-cover mx-auto"
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
                      {products.price.toFixed(2)} €
                    </span>
                  </div>
                  <motion.button
                    onClick={() => handleBasket(products)}
                    whileTap={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-button hover:bg-button/50 p-2.5 px-4 rounded-full mb-3 mt-3 border-secondary border-3 font-semibold cursor-pointer"
                  >
                    Ajouter au panier
                  </motion.button>
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
