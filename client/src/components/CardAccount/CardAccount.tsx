import { useEffect, useState } from "react";
import {
  FaApplePay,
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
} from "react-icons/fa";

interface accountInterface {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const apiAccount = import.meta.env.VITE_API_ACCOUNT_URL;

function CardAccount() {
  function handleDisconnect() {
    localStorage.setItem("userConnected", "{}");
    window.location.href = "/";
  }
  const userConnected = JSON.parse(
    localStorage.getItem("userConnected") || "{}",
  );
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
        <h1 className="text-secondary text-4xl font-extrabold text-center md:text-5xl mt-10 mb-14">
          MON COMPTE
        </h1>
      </section>
      <section className="md:grid md:grid-col-2 md:grid-rows-[70px_70px_70px_70px_70px] md:justify-center flex flex-col items-center gap-4 md:gap-4 md:mx-50">
        <input
          className="bg-block text-secondary rounded-xl text-center md:h-full border-3 border-secondary md:col-start-1 md:rounded-xl md:text-2xl"
          type="text"
          placeholder="Nom"
          value={userConnected.lastName}
        />
        <input
          className="bg-block text-secondary rounded-xl text-center md:h-full border-3 border-secondary md:col-start-1 md:row-start-2 md:rounded-xl md:text-2xl"
          type="text"
          placeholder="Prénom"
          value={userConnected.firstName}
        />
        <input
          className="bg-block text-secondary rounded-xl text-center md:h-full border-3 border-secondary md:col-start-1 md:row-start-3 md:rounded-xl md:text-2xl"
          type="text"
          placeholder="Portable"
          value={userConnected.phoneNumber}
        />
        <input
          className="bg-block text-secondary rounded-xl text-center md:h-full border-3 border-secondary md:rounded-xl md:text-2xl md:col-start-1 md:row-start-4 md:col-span-2"
          type="text"
          placeholder="Email"
          value={userConnected.email}
        />
        <input
          className="bg-block text-secondary rounded-xl text-center md:h-full h-24 border-3 border-secondary md:col-start-1 md:row-end-6 md:col-span-2 md:text-2xl"
          type="text"
          placeholder="Adresse"
          value={userConnected.address}
        />

        <div className="bg-block text-secondary rounded-xl  text-center border-3 border-secondary  md:col-start-2 md:row-span-3 md:-row-start-6 h-full p-2">
          <h2 className="text-center font-bold md:">Moyen de paiement</h2>
          <div className="flex flex-row justify-center mt-4 md:gap-2 gap-4 md:grid md:grid-cols-[100px_100px] md:justify-items-center">
            <FaCcVisa
              className="text-blue-600 w-12 h-12 md:w-20 md:h-20 hover:scale-90"
              size={30}
            />
            <FaCcMastercard
              className="text-red-500 w-12 h-12 md:w-20 md:h-20 hover:scale-90"
              size={30}
            />
            <FaCcPaypal
              className="text-blue-800 w-12 h-12 md:w-20 md:h-20 hover:scale-90"
              size={30}
            />
            <FaApplePay
              className="text-gray-800 w-12 h-12 md:w-20 md:h-20 hover:scale-90"
              size={30}
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center md:mx-7 min-2xl:mx-100">
        <div className="bg-block text-secondary rounded-2xl w-70 text-center h-full border-3 border-secondary mt-12 mb-12 md:w-full">
          <h2 className="text-center text-2xl mt-4 font-bold">Historique</h2>

          <div className="md:justify-around md:px-4 mb-12 flex flex-col md:flex-row items-center md:gap-6 md:mx-6">
            <div className="bg-block text-secondary font-extrabold rounded-2xl w-60 text-center border-3 border-secondary mt-12 md:mt-8">
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

            <div className="bg-block text-secondary font-extrabold rounded-2xl w-60 text-center border-3 border-secondary mt-12 md:mt-8">
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

            <div className="bg-block text-secondary font-extrabold rounded-2xl w-60 text-center border-3 border-secondary mt-12 md:mt-8 md:h-70.5">
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
      <div className="flex flex-col items-center gap-1 mt-4">
        <button
          className="bg-red-600 hover:bg-red-700 text-xl rounded-xl p-2 w-52 mb-4 font-semibold hover:scale-110"
          type="submit"
          onClick={handleDisconnect}
        >
          Se déconnecter
        </button>
      </div>
    </>
  );
}

export default CardAccount;
