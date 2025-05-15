import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { useBasket } from "../../Context/BasketContext";
import Header from "../../components/Header/Header";
import { Button } from "../../components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/Dialog";

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
  const [isLoginPopup, setIsLoginPopup] = useState(false);

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
      setIsLoginPopup(true);
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
      toast.success(`${product.name} ajouté au panier !`);
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

      {/*pop-up connection*/}
      <Dialog open={isLoginPopup} onOpenChange={() => setIsLoginPopup(false)}>
        <DialogContent>
          <DialogHeader>
            <div className="text-center  gap-3 mb-4 text-secondary">
              <DialogTitle>
                <h2 className="mb-4">Veuillez vous connecter d'abord !</h2>
              </DialogTitle>
              <DialogDescription>
                <p className="font-thin">
                  Pour ajouter un article au panier, vous devez vous
                  connecter/inscrire
                </p>
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="flex justify-center  p-1 mx-10 bg-button rounded-xl border-2 border-secondary font-semibold">
            <Link to="/log-in">
              <motion.button
                type="button"
                onClick={() => {
                  setIsLoginPopup(false);
                }}
                className=" px-5 py-2 rounded-lg cursor-pointer text-secondary"
              >
                Se connecter ou s'inscrire
              </motion.button>
            </Link>
          </div>
          <div className="flex justify-center pt-3 underline cursor-pointer">
            <Button
              type="button"
              onClick={() => setIsLoginPopup(false)}
              className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300  "
            >
              Annuler
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/*Alert ajouté au panier*/}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default Boutique;
