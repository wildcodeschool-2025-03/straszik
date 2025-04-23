import { useEffect, useState } from "react";

interface accountInterface {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const apiaccountUrl = import.meta.env.VITE_API_ACCOUNT_URL;

function CardAccount() {
  const [account, setAccount] = useState<accountInterface[]>([]);
  useEffect(() => {
    fetch(apiaccountUrl)
      .then((res) => res.json())
      .then((data) => {
        setAccount(data);
      });
  }, []);
  return (
    <>
      <section className="mb-12">
        <h1 className="text-secondary text-4xl font-extrabold text-center lg:text-7xl mt-10 mb-14">
          MON COMPTE
        </h1>
        <section className="flex flex-col items-center gap-6">
          <input
            className="bg-block text-secondary rounded-full w-70 text-center h-10 border-3 border-secondary"
            type="text"
            placeholder="Email"
          />
          <input
            className="bg-block text-secondary rounded-full w-70 text-center h-10 border-3 border-secondary"
            type="text"
            placeholder="Nom"
          />
          <input
            className="bg-block text-secondary rounded-full w-70 text-center h-10 border-3 border-secondary"
            type="text"
            placeholder="Prénom"
          />
          <input
            className="bg-block text-secondary rounded-2xl w-70 text-center h-32 border-3 border-secondary"
            type="text"
            placeholder="Adresse"
          />
        </section>

        <section className="flex flex-col items-center">
          <div className="bg-block text-secondary/50 rounded-2xl w-70 text-center h-24 border-3 border-secondary mt-12">
            <h2 className="text-center">Moyen de paiement</h2>
          </div>
        </section>

        <section className="flex flex-col items-center">
          <div className="bg-block text-secondary/50 rounded-2xl w-70 text-center h-full border-3 border-secondary mt-12">
            <h2 className="text-center">Historique</h2>
            <section className="flex flex-col items-center">
              <div className="bg-block text-secondary font-extrabold rounded-2xl w-60 text-center border-3 border-secondary mt-12">
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
            </section>
            <section className="flex flex-col items-center">
              <div className="bg-block text-secondary font-extrabold rounded-2xl w-60 text-center border-3 border-secondary mt-12">
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
            </section>
            <section className="flex flex-col items-center mb-8">
              <div className="bg-block text-secondary font-extrabold rounded-2xl w-60 text-center border-3 border-secondary mt-12">
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
            </section>
          </div>
        </section>
      </section>
    </>
  );
}

export default CardAccount;
