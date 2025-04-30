import { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { useBasket } from "../../Context/BasketContext";
import Header from "../../components/Header/Header";

function Basket() {
  //trier basket par id et creer un tableau de produits uniques avec une quantité en tsx
  type UniqueProduct = {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    quantity: number;
  };
  const [totalPrice, setTotalPrice] = useState(0);
  //   const [removeProducts, setremoveProducts] = useState<UniqueProduct[]>([]);
  const { basket } = useBasket();
  const uniqueProducts = basket.reduce<UniqueProduct[]>((acc, product) => {
    const existingProduct = acc.find((p) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      acc.push({ ...product, quantity: 1 });
    }
    return acc;
  }, []);

  function handleRemoveItem(id: number) {
    //const id= (e.target as HTMLElement).id;
    console.log(id);
    const newUniqueProducts = uniqueProducts.filter(
      (product) => product.id !== id,
    );
    console.log(uniqueProducts);
    // setremoveProducts(newUniqueProducts);
    console.log(newUniqueProducts);
  }
  useEffect(() => {
    setTotalPrice(
      uniqueProducts.reduce(
        (acc: number, product) => acc + product.price * product.quantity,
        0,
      ),
    );
  });

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
              <th className="bg-block rounded-tl-lg text-secondary md:text-2xl font-bold md:p-4 pt-0.5 px-5 md:px-10 border-r-4 border-b-2">
                Produits
              </th>
              <th className="bg-block text-secondary md:text-2xl font-bold md:p-4 pt-0.5 px-1 md:px-10 border-r-4 border-b-2">
                Quantité
              </th>
              <th className="bg-block text-secondary md:text-2xl font-bold text-center pt-0.5 md:p-4 px-1 md:px-10 border-r-4 border-b-2">
                Montant TTC
              </th>
              <th className="bg-block rounded-tr-lg text-secondary md:text-2xl font-bold text-center pt-0.5 md:p-4 px-2 md:px-10 border-b-2">
                <FaTrashCan />
              </th>
            </tr>
          </thead>
          <tbody>
            {uniqueProducts.map((product) => (
              <tr key={product.id} className=" bg-block text-secondary">
                <td className=" text-secondary md:text-2xl pt-0.5 h-23 lg:h-30 border-t-2 ">
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
                      <p className="text-xs lg:text-base">
                        <strong>Prix : </strong> {product.price} €
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-center text-lg border-t-2  ">
                  {product.quantity}
                </td>
                <td className="text-center text-lg border-t-2 ">
                  {product.price * product.quantity} €
                </td>
                <td className="text-center p-2 md:p-11 border-t-2">
                  <FaTrashCan onClick={() => handleRemoveItem(product.id)} />
                </td>
              </tr>
            ))}{" "}
          </tbody>
        </table>
      </div>

      <section className="flex justify-end mt-5 w-full mx-auto max-w-[300px] md:max-w-[650px] lg:max-w-[800px] xl:max-w-[1000px]">
        <tr className="border-4 text-secondary font-bold bg-block px-3 py-3 rounded-2xl    ">
          Total TTC : {totalPrice} €
        </tr>
      </section>

      <section className="flex justify-end items-center mt-5 w-full mx-auto max-w-[300px] md:max-w-[650px] border-4 text-secondary font-bold bg-block px-3 py-3 rounded-2xl">
        <div className="flex   ">
          <input type="checkbox" className="mr-2" />
          <label htmlFor="checkboxCG" className="text-xs mr-2 md:text-base">
            Je reconnais avoir lu et accepté les conditions générales de ventes.
          </label>
        </div>
        <button
          type="submit"
          className="bg-button px-4 rounded-full mb-3 mt-3 border-secondary border-3 font-semibold text-sm md:text-base"
        >
          Valider la commande
        </button>
      </section>
    </div>
  );
}

export default Basket;
