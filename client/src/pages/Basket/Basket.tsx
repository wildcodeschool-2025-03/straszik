import { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5";
import { useBasket } from "../../Context/BasketContext";
import Header from "../../components/Header/Header";

interface Goodie {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
}

function Basket() {
  const [totalPrice, setTotalPrice] = useState(0);

  const { basket, setBasket } = useBasket();

  function handleRemoveAll() {
    setBasket([]);
  }

  function handleRemoveItem(id: number) {
    setBasket((prevBasket) => prevBasket.filter((item) => item.id !== id));
  }

  useEffect(() => {
    setTotalPrice(
      basket.reduce(
        (acc: number, product) => acc + product.price * product.quantity,
        0,
      ),
    );
  });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<string>("");
  const userConnected = JSON.parse(
    localStorage.getItem("userConnected") || "{}",
  );

  function handleOrder(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    localStorage.setItem("newOrder", JSON.stringify(basket));
    const checkboxCGV = document.getElementById(
      "checkboxCGV",
    ) as HTMLInputElement;
    if (basket.length > 0 && checkboxCGV.checked) {
      const ordersKey = `orderHistory_${userConnected.email}`;
      // Récupère l'historique existant ou un tableau vide
      const orderHistory = JSON.parse(localStorage.getItem(ordersKey) || "[]");
      // Ajoute la nouvelle commande (basket) à l'historique
      orderHistory.push(basket);
      // Sauvegarde l'historique mis à jour
      localStorage.setItem(ordersKey, JSON.stringify(orderHistory));
      localStorage.removeItem("newOrder");
      setBasket([]);
      setStatusMessage("✅ Merci pour votre commande !");
      setStatusType("success");
    } else if (basket.length === 0) {
      setStatusMessage("❌ Le panier est vide !");
      setStatusType("error");
    } else if (basket.length > 0 && !checkboxCGV.checked) {
      setStatusMessage(
        "❌ Veuillez accepter les conditions générales de ventes.",
      );
      setStatusType("error");
    }
  }

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  function handleAdd(product: Goodie) {
    const isInBasket = basket.some((item) => item.id === product.id);

    if (isInBasket) {
      setBasket(
        basket.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
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
  }

  function handleLess(product: Goodie) {
    const isInBasket = basket.some((item) => item.id === product.id);

    if (isInBasket && product.quantity > 1) {
      setBasket(
        basket.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      );
    } else if (product.quantity === 1) {
      setBasket(basket.filter((item) => item.id !== product.id));
    }
  }

  return (
    <div>
      <Header />
      <div>
        <h2 className="text-secondary text-4xl font-extrabold text-center lg:text-5xl mt-10 mb-10">
          Votre Panier
        </h2>
      </div>
      <div>
        <table
          className="overflow-hidden
      border-separate border-spacing-0 rounded-lg border-4 border-secondary mx-auto w-full max-w-[250px] md:max-w-[500px] lg:max-w-[800px] xl:max-w-[1000px]"
        >
          <thead>
            <tr>
              <th className="bg-block rounded-tl-lg text-secondary md:text-2xl font-bold md:p-4 pt-0.5 px-5 md:px-10 border-r-4 border-b-4">
                Produits
              </th>
              <th className="bg-block text-secondary md:text-2xl font-bold md:p-4 pt-0.5 px-1 md:px-10 border-r-4 border-b-4">
                Quantité
              </th>
              <th className="bg-block text-secondary md:text-2xl font-bold text-center pt-0.5 md:p-4 px-1 md:px-10 border-r-4 border-b-4">
                Montant TTC
              </th>
              <th className="bg-block rounded-tr-lg text-secondary md:text-2xl font-bold text-center px-4 border-b-4">
                <div className="flex items-center justify-center h-full w-full">
                  <FaTrashCan
                    className="cursor-pointer"
                    onClick={() => handleRemoveAll()}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {basket.length > 0 ? (
              basket.map((product) => (
                <tr key={product.id} className=" bg-block text-secondary">
                  <td className=" text-secondary md:text-2xl pt-0.5 h-23 lg:h-30">
                    <div className="flex items-center md:gap-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 md:w-25 "
                      />
                      <div>
                        <p className=" text-xs lg:text-2xl font-bold ">
                          {product.name}
                        </p>
                        <p className=" font-stretch-50% text-xs lg:text-xl">
                          {product.description}
                        </p>
                        {product.price ? (
                          <p className="text-xs lg:text-base">
                            <strong>Prix : </strong> {product.price.toFixed(2)}{" "}
                            €
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td className="text-center text-lg">
                    <button
                      type="button"
                      className="p-1 md:p-2 lg:p-3"
                      onClick={() => handleLess(product)}
                    >
                      <IoRemoveCircleOutline className="cursor-pointer" />
                    </button>
                    {product.quantity}
                    <button
                      type="button"
                      className="p-1 md:p-2 lg:p-3"
                      onClick={() => handleAdd(product)}
                    >
                      <IoAddCircleOutline className="cursor-pointer" />
                    </button>
                  </td>

                  <td className="text-center text  fill-black ">
                    {(product.price * product.quantity).toFixed(2)} €
                  </td>

                  <td>
                    <div className="flex items-center justify-center h-full w-full">
                      <FaTrashCan
                        className="cursor-pointer"
                        onClick={() => handleRemoveItem(product.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <td
                className="bg-block text-secondary text-center font-semibold p-4"
                colSpan={4}
              >
                Aucun produit dans votre panier...
              </td>
            )}
          </tbody>
        </table>
      </div>

      <section className="flex justify-end mt-5 w-full mx-auto max-w-[300px] md:max-w-[650px] lg:max-w-[800px] xl:max-w-[1000px]">
        <div className="border-4 text-secondary font-bold bg-block px-3 py-3 rounded-2xl">
          Total TTC : {(totalPrice ?? 0).toFixed(2)} €
        </div>
      </section>

      <section className="flex flex-col mt-5 w-full mx-auto max-w-[300px] md:max-w-[650px] border-4 text-secondary font-bold bg-block px-3 py-3 rounded-2xl">
        <div className="flex items-center my-3">
          <input
            type="checkbox"
            id="checkboxCGV"
            className="mr-2 cursor-pointer"
          />
          <label htmlFor="checkboxCGV" className="text-xs mr-2 md:text-base ">
            Je reconnais avoir lu et accepté les conditions générales de ventes.
          </label>
          <button
            type="submit"
            className="bg-button hover:bg-button/50 cursor-pointer px-4 rounded-full border-secondary border-3 font-semibold text-sm md:text-base ml-2"
            onClick={handleOrder}
          >
            Valider la commande
          </button>
        </div>
        {statusMessage && (
          <div
            className={`mt-3 font-semibold text-sm text-center ${statusType === "error" ? "text-red-500" : "text-green-700"} rounded-xl`}
          >
            {statusMessage}
          </div>
        )}
      </section>
    </div>
  );
}

export default Basket;
