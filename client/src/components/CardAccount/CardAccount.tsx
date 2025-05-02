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

  const [newsletterEmailList, setNewsletterEmailList] = useState<string[]>(
    () => {
      const storedEmailList = localStorage.getItem("newsletterEmailList");
      return storedEmailList ? JSON.parse(storedEmailList) : [];
    },
  );

  function handleDesabonned() {
    let updatednewsletterEmailList: string[];
    if (newsletterEmailList.includes(userConnected.email)) {
      // Désabonnement : retire l'email de la liste
      updatednewsletterEmailList = newsletterEmailList.filter(
        (email) => email !== userConnected.email,
      );
    } else {
      // Abonnement : ajoute l'email à la liste
      updatednewsletterEmailList = [
        ...newsletterEmailList,
        userConnected.email,
      ];
    }

    // Met à jour localStorage et l'état
    localStorage.setItem(
      "newsletterEmailList",
      JSON.stringify(updatednewsletterEmailList),
    );
    setNewsletterEmailList(updatednewsletterEmailList);
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
      <section className="md:grid md:grid-col-2 md:grid-rows-[40px_40px_40px_40px_40px] md:justify-center flex flex-col items-center gap-4 md:gap-4 mx-auto">
        <input
          className="bg-block w-[300px] lg:w-[400px] text-secondary rounded-xl text-center md:h-full border-3 border-secondary md:col-start-1 md:rounded-xl lg:text-lg"
          type="text"
          placeholder="Nom"
          value={userConnected.lastName}
        />
        <input
          className="bg-block w-[300px] lg:w-[400px] text-secondary rounded-xl text-center md:h-full border-3 border-secondary md:col-start-1 md:row-start-2 md:rounded-xl lg:text-lg"
          type="text"
          placeholder="Prénom"
          value={userConnected.firstName}
        />
        <input
          className="bg-block w-[300px] lg:w-[400px] text-secondary rounded-xl text-center md:h-full border-3 border-secondary md:col-start-1 md:row-start-3 md:rounded-xl lg:text-lg"
          type="text"
          placeholder="Portable"
          value={userConnected.phoneNumber}
        />
        <input
          className="bg-block w-[300px] text-secondary rounded-xl text-center md:h-full border-3 border-secondary md:rounded-xl lg:text-lg md:col-start-1 md:row-start-4 md:col-span-2 md:w-full"
          type="text"
          placeholder="Email"
          value={userConnected.email}
        />
        <input
          className="bg-block w-[300px] text-secondary rounded-xl text-center md:h-full h-24 border-3 border-secondary md:col-start-1 md:row-end-6 md:col-span-2 lg:text-lg md:w-full"
          type="text"
          placeholder="Adresse"
          value={userConnected.address}
        />

        <div className=" flex flex-col bg-block items-center justify-center text-secondary rounded-xl text-center border-3 border-secondary  md:col-start-2 md:row-span-3 md:-row-start-6 h-full p-2 w-[300px] lg:w-[400px] ">
          <h2 className="text-center font-bold lg:text-lg">
            Moyen de paiement
          </h2>
          <div className="flex flex-row justify-center mt-4 md:mt-1 md:gap-2 gap-4 md:grid md:grid-cols-[100px_100px] md:justify-items-center">
            <FaCcVisa
              className="text-blue-600 w-12 h-12 hover:scale-90"
              size={30}
            />
            <FaCcMastercard
              className="text-red-500 w-12 h-12 hover:scale-90"
              size={30}
            />
            <FaCcPaypal
              className="text-blue-800 w-12 h-12 hover:scale-90"
              size={30}
            />
            <FaApplePay
              className="text-gray-800 w-12 h-12 hover:scale-90"
              size={30}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center text-center text-secondary bg-block rounded-2xl border-3 border-secondary mx-auto mt-4 w-[300px] md:w-[500px] p-2 gap-4">
        <p className="font-bold lg:text-lg">Informations d'abonnement</p>
        <p className="text-sm lg:text-base">
          {newsletterEmailList?.includes(userConnected.email)
            ? "Vous êtes abonné à notre Newsletter"
            : "Vous n'êtes actuellement pas abonné à notre Newsletter"}
        </p>
        <button
          type="submit"
          onClick={handleDesabonned}
          className="bg-button rounded-full border-secondary border-3 font-semibold text-sm lg:text-base p-1 w-30 md:w-50"
        >
          {newsletterEmailList?.includes(userConnected.email)
            ? "Se désabonner"
            : "S'abonner"}
        </button>
      </section>

      <section className="flex flex-col items-center justify-center">
        <div className="bg-block text-secondary rounded-2xl w-[300px] md:w-[650px] lg:w-[800px] xl:w-[1200px] text-center h-full border-3 border-secondary mt-12 mb-12">
          <h2 className="text-center text-2xl my-4 font-bold">Historique</h2>

          <div className="mx-auto md:px-4 mb-8 flex flex-col items-center justify-center md:flex-row gap-6 flex-wrap">
            <div className="bg-block text-secondary font-bold rounded-2xl w-[200px] h-[250px] border-3 border-secondary p-2 flex flex-col justify-center items-center">
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

            <div className="bg-block text-secondary font-bold rounded-2xl w-[200px] h-[250px] border-3 border-secondary p-2 flex flex-col justify-center items-center">
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

            <div className="bg-block text-secondary font-bold rounded-2xl w-[200px] h-[250px] border-3 border-secondary p-2 flex flex-col justify-center items-center">
              <p>Le 24/01/25</p>
              <ul>
                {account.slice(2, 3).map((item) => (
                  <li key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <p>Prix : {item.price} €</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center gap-1 mt-4">
        <button
          className="bg-red-600 hover:bg-red-700 text-xl rounded-xl p-2 w-52 mb-4 font-semibold hover:scale-110"
          type="submit"
          onClick={handleDisconnect}
        >
          Se déconnecter
        </button>
      </section>
    </>
  );
}

export default CardAccount;
