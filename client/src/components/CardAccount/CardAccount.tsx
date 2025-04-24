import { useEffect, useState } from "react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaApplePay,
} from "react-icons/fa";
import cors from "cors";

interface accountInterface {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const apiAccount = import.meta.env.VITE_API_ACCOUNT_URL;

function CardAccount() {
  const [account, setAccount] = useState<accountInterface[]>([]);
  useEffect(() => {
    fetch(apiAccount)
      .then((res) => res.json())
      .then((data) => {
        setAccount(data.slice(0, 3));
      });
  }, []);
  return (
    <>
      <section className="mb-12">
        <h1 className="text-secondary text-4xl font-extrabold text-center lg:text-7xl mt-10 mb-14">
          MON COMPTE
        </h1>
      </section>
      <section className="lg:grid lg:grid-col-2 lg:grid-rows-[70px_70px_70px_70px] flex flex-col items-center gap-4 lg:gap-4 lg:mx-50">
        <input
          className="bg-block text-secondary rounded-xl  text-center lg:h-full border-3 border-secondary lg:rounded-xl lg:text-2xl "
          type="text"
          placeholder="Email"
        />
        <input
          className="bg-block text-secondary rounded-xl  text-center lg:h-full border-3 border-secondary lg:col-start-1 lg:rounded-xl lg:text-2xl"
          type="text"
          placeholder="Nom"
        />
        <input
          className="bg-block text-secondary rounded-xl  text-center lg:h-full border-3 border-secondary lg:col-start-1 lg:row-start-3 lg:rounded-xl lg:text-2xl"
          type="text"
          placeholder="Prénom"
        />
        <input
          className="bg-block text-secondary rounded-xl  text-center lg:h-full h-24 border-3 border-secondary lg:col-start-1 lg:row-end-5 lg:col-span-2 lg:text-2xl"
          type="text"
          placeholder="Adresse"
        />

        <div className="bg-block text-secondary rounded-xl  text-center border-3 border-secondary  lg:col-start-2 lg:row-span-3 lg:-row-start-5 h-full p-2">
          <h2 className="text-center font-bold">Moyen de paiement</h2>
          <div className="flex flex-row justify-center mt-4 lg:gap-2 gap-4 lg:grid lg:grid-cols-[100px_100px] lg:justify-items-center">
            <FaCcVisa
              className="text-blue-600 w-12 h-12 lg:w-20 lg:h-20 hover:scale-90"
              size={30}
            />
            <FaCcMastercard
              className="text-red-500 w-12 h-12 lg:w-20 lg:h-20 hover:scale-90"
              size={30}
            />
            <FaCcPaypal
              className="text-blue-800 w-12 h-12 lg:w-20 lg:h-20 hover:scale-90"
              size={30}
            />
            <FaApplePay
              className="text-gray-800 w-12 h-12 lg:w-20 lg:h-20 hover:scale-90"
              size={30}
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center md:mx-7">
        <div className="bg-block text-secondary rounded-2xl w-70 lg:w-270 text-center h-full border-3 border-secondary mt-12 mb-12 md:w-full">
          <h2 className="text-center text-2xl mt-4 font-bold">Historique</h2>

          <div className="lg:flex-row lg:justify-around lg:px-4 mb-12 flex flex-col md:flex-row items-center md:gap-6 md:mx-6">
            <div className="bg-block text-secondary font-extrabold rounded-2xl w-60 text-center border-3 border-secondary mt-12 lg:mt-8">
              <p>Le 19/10/24</p>
              <ul>
                {account.slice(0, 1).map((item) => (
                  <li key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <p>Prix : {item.price} €</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-block text-secondary font-extrabold rounded-2xl w-60 text-center border-3 border-secondary mt-12 lg:mt-8">
              <p>Le 14/02/25</p>
              <ul>
                {account.slice(1, 2).map((item) => (
                  <li key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <p>Prix : {item.price} €</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-block text-secondary font-extrabold rounded-2xl w-60 text-center border-3 border-secondary mt-12 lg:mt-8 md:h-70.5">
              <p>Le 24/01/25</p>
              <ul>
                {account.slice(2, 3).map((item) => (
                  <li key={item.id}>
                    <img src={item.image} alt={item.name} className="md:my-9" />
                    <p>Prix : {item.price} €</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CardAccount;
