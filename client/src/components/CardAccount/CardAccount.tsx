import { motion } from "framer-motion";
import { useState } from "react";
import type { ChangeEvent } from "react";
import {
  FaApplePay,
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
} from "react-icons/fa";
import { Button } from "../ui/Button"; // Assure-toi d'importer Button de shadcn/ui
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";

// Removed unused interface declaration

// Removed unused apiAccount variable

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

    // maj localstorage
    localStorage.setItem(
      "newsletterEmailList",
      JSON.stringify(updatednewsletterEmailList),
    );
    setNewsletterEmailList(updatednewsletterEmailList);
  }

  const [userConnected, setUserConnected] = useState(() =>
    JSON.parse(localStorage.getItem("userConnected") || "{}"),
  );
  const [historyToMap] = useState(() =>
    JSON.parse(
      localStorage.getItem(`orderHistory_${userConnected.email}`) || "{}",
    ),
  );

  //pop-up moyen de paiements

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");

  const handleCardSubmit = () => {
    console.log("Numéro de carte:", cardNumber);
    console.log("Nom sur la carte:", cardName);
    console.log("Date d'expiration:", cardExpiry);
    console.log("CVV:", cardCVV);
    togglePopup();
  };

  // MasterCard popup
  const [isMcOpen, setIsMcOpen] = useState(false);
  const toggleMc = () => setIsMcOpen(!isMcOpen);
  const [mcNumber, setMcNumber] = useState("");
  const [mcName, setMcName] = useState("");
  const [mcExpiry, setMcExpiry] = useState("");
  const [mcCvv, setMcCvv] = useState("");
  const handleMcSubmit = () => {
    const key = `paymentMc_${userConnected.email}`;
    localStorage.setItem(
      key,
      JSON.stringify({
        number: mcNumber,
        name: mcName,
        expiry: mcExpiry,
        cvv: mcCvv,
      }),
    );
    setIsMcOpen(false);
  };

  // PayPal popup
  const [isPpOpen, setIsPpOpen] = useState(false);
  const togglePp = () => setIsPpOpen(!isPpOpen);
  const [ppEmail, setPpEmail] = useState("");
  const [ppPwd, setPpPwd] = useState("");
  const handlePpSubmit = () => {
    localStorage.setItem(
      `paymentPp_${userConnected.email}`,
      JSON.stringify({ email: ppEmail, pwd: ppPwd }),
    );
    setIsPpOpen(false);
  };

  // ApplePay popup
  const [isApOpen, setIsApOpen] = useState(false);
  const toggleAp = () => setIsApOpen(!isApOpen);
  const [apEmail, setApEmail] = useState("");
  const [apPwd, setApPwd] = useState("");
  const handleApSubmit = () => {
    localStorage.setItem(
      `paymentAp_${userConnected.email}`,
      JSON.stringify({ email: apEmail, pwd: apPwd }),
    );
    setIsApOpen(false);
  };

  // edition button
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    lastName: userConnected.lastName || "",
    firstName: userConnected.firstName || "",
    phoneNumber: userConnected.phoneNumber || "",
    email: userConnected.email || "",
    address: userConnected.address || "",
    password: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Alerte de confirmation
  const [showAlert, setShowAlert] = useState(false);

  function handleSave() {
    const updated = { ...userConnected, ...formData };
    setUserConnected(updated);
    localStorage.setItem("userConnected", JSON.stringify(updated));

    const list = JSON.parse(localStorage.getItem("userList") || "[]") as {
      id: number;
    }[];
    const idx = list.findIndex((u) => u.id === updated.id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...formData };
      localStorage.setItem("userList", JSON.stringify(list));
    }

    setEditing(false);
    // afficher l’alerte et la masquer au bout de 3s
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  }

  function handleCancel() {
    setFormData({
      lastName: userConnected.lastName || "",
      firstName: userConnected.firstName || "",
      phoneNumber: userConnected.phoneNumber || "",
      email: userConnected.email || "",
      address: userConnected.address || "",
      password: "",
    });
    setEditing(false);
  }

  // Removed unused account state and corresponding useEffect block.

  interface OrderInterface {
    id: number;
    image: string;
    name: string;
    date: Date;
    price: number;
    quantity: number;
    total: number;
  }
  // orderHistory

  // Removed unused orderHistory state as its value is never read.

  function groupItems(items: OrderInterface[]) {
    return Object.values(
      items.reduce(
        (acc, it) => {
          if (!acc[it.id]) {
            acc[it.id] = { ...it }; // créé la première fois
          } else {
            acc[it.id].quantity += it.quantity; // cumule les quantités
            // on ne modifie pas price ici : garde-le unitaire
          }
          return acc;
        },
        {} as Record<number, OrderInterface>,
      ),
    );
  }

  return (
    <>
      {showAlert && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Vos informations ont bien été mises à jour !
        </div>
      )}
      <section className="mb-12 ">
        <h1 className="text-secondary text-4xl font-extrabold text-center md:text-5xl mt-10 mb-14">
          MON COMPTE
        </h1>
      </section>

      <section className="md:grid md:grid-col-2 md:grid-rows-[40px_40px_40px_40px_40px] md:justify-center flex flex-col items-center gap-4 md:gap-4 mx-auto">
        <input
          name="lastName"
          type="text"
          placeholder="Nom"
          value={formData.lastName}
          onChange={handleChange}
          disabled={!editing}
          className="bg-block w-[300px] lg:w-[400px] text-secondary rounded-xl text-center md:h-full border-3 border-secondary lg:text-lg"
        />
        <input
          name="firstName"
          type="text"
          placeholder="Prénom"
          value={formData.firstName}
          onChange={handleChange}
          disabled={!editing}
          className="bg-block w-[300px] lg:w-[400px] text-secondary rounded-xl text-center md:h-full border-3 border-secondary lg:text-lg"
        />
        <input
          name="phoneNumber"
          type="text"
          placeholder="Portable"
          value={formData.phoneNumber}
          onChange={handleChange}
          disabled={!editing}
          className="bg-block w-[300px] lg:w-[400px] text-secondary rounded-xl text-center md:h-full border-3 border-secondary lg:text-lg"
        />
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          disabled={!editing}
          className="bg-block w-[300px] text-secondary rounded-xl text-center md:h-full border-3 border-secondary lg:text-lg md:col-span-2 md:w-full"
        />
        <input
          name="address"
          type="text"
          placeholder="Adresse"
          value={formData.address}
          onChange={handleChange}
          disabled={!editing}
          className="bg-block w-[300px] text-secondary rounded-xl text-center md:h-full h-24 border-3 border-secondary lg:text-lg md:col-span-2 md:w-full"
        />

        {/* Mdp a l'édition */}
        {editing && (
          <input
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="bg-block w-[300px] text-secondary rounded-lg text-center md:h-full h-24 border-3 border-secondary lg:text-lg md:col-span-2 md:w-full"
          />
        )}

        <div className=" flex flex-col bg-block items-center justify-center text-secondary rounded-xl text-center border-3 border-secondary  md:col-start-2 md:row-span-3 md:-row-start-6 h-full p-2 w-[300px] lg:w-[400px] ">
          <h2 className="text-center font-bold lg:text-lg">
            Moyen de paiement
          </h2>
          <div className="flex flex-row justify-center mt-4 md:mt-1 md:gap-2 gap-4 md:grid md:grid-cols-[100px_100px] md:justify-items-center">
            <Button onClick={togglePopup} type="button" className="bg-black">
              <FaCcVisa
                className="text-blue-600 w-12 h-12 hover:scale-90"
                size={30}
              />
            </Button>
            {/* {savedVisa && <FaEye onClick={togglePopup} className="cursor-pointer text-blue-500 w-12 h-12 hover:scale-90" size={30} />} */}

            {/* MasterCard */}
            <Button onClick={toggleMc} type="button" className="bg-black">
              <FaCcMastercard
                className="text-red-500 w-12 h-12 hover:scale-90"
                size={30}
              />
            </Button>
            {/* PayPal */}
            <Button onClick={togglePp} type="button" className="bg-black">
              <FaCcPaypal
                className="text-blue-800 w-12 h-12 hover:scale-90"
                size={30}
              />
            </Button>
            {/* Apple Pay */}
            <Button onClick={toggleAp} type="button" className="bg-black">
              <FaApplePay
                className="text-gray-800 w-12 h-12 hover:scale-90"
                size={30}
              />
            </Button>
          </div>
        </div>
      </section>

      <Dialog open={isPopupOpen} onOpenChange={togglePopup}>
        <DialogContent>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Bouton fermer */}
            <button
              type="button"
              onClick={togglePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* Header */}
            <DialogHeader>
              <div className="flex items-center justify-center gap-3 mb-6">
                <FaCcVisa size={48} className="text-blue-600" />
                <DialogTitle>Paiement Visa</DialogTitle>
              </div>
            </DialogHeader>

            {/* Formulaire */}
            <form className="space-y-5">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Numéro de carte
                  <input
                    type="text"
                    placeholder="XXXX XXXX XXXX XXXX"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Nom du titulaire
                  <input
                    type="text"
                    placeholder="Jean DUPONT"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full p-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600  mb-1">
                    Date d'expiration
                    <input
                      type="text"
                      placeholder="MM/AA"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full p-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    CVV
                    <input
                      type="text"
                      placeholder="123"
                      value={cardCVV}
                      onChange={(e) => setCardCVV(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-2">
                <Button
                  type="button"
                  onClick={handleCardSubmit}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                  Confirmer
                </Button>
                <Button
                  type="button"
                  onClick={togglePopup}
                  className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300"
                >
                  Annuler
                </Button>
              </div>
            </form>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* MasterCard Dialog */}
      <Dialog open={isMcOpen} onOpenChange={toggleMc}>
        <DialogContent>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              onClick={toggleMc}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <DialogHeader>
              <div className="flex items-center justify-center gap-3 mb-6">
                <FaCcMastercard size={48} className="text-red-500" />
                <DialogTitle>Paiement MasterCard</DialogTitle>
              </div>
            </DialogHeader>
            <form className="space-y-5">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Numéro de carte
                  <input
                    type="text"
                    placeholder="XXXX XXXX XXXX XXXX"
                    value={mcNumber}
                    onChange={(e) => setMcNumber(e.target.value)}
                    className="w-full p-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Nom du titulaire
                  <input
                    type="text"
                    placeholder="Jean DUPONT"
                    value={mcName}
                    onChange={(e) => setMcName(e.target.value)}
                    className="w-full p-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    MM/AA
                    <input
                      type="text"
                      placeholder="MM/AA"
                      value={mcExpiry}
                      onChange={(e) => setMcExpiry(e.target.value)}
                      className="w-full p-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    CVV
                    <input
                      type="text"
                      placeholder="123"
                      value={mcCvv}
                      onChange={(e) => setMcCvv(e.target.value)}
                      className="w-full p-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-4 pt-2">
                <Button
                  type="button"
                  onClick={handleMcSubmit}
                  className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
                >
                  Confirmer
                </Button>
                <Button
                  type="button"
                  onClick={toggleMc}
                  className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300"
                >
                  Annuler
                </Button>
              </div>
            </form>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* PayPal Dialog */}
      <Dialog open={isPpOpen} onOpenChange={togglePp}>
        <DialogContent>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              onClick={togglePp}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <DialogHeader>
              <div className="flex items-center justify-center gap-3 mb-6">
                <FaCcPaypal size={48} className="text-blue-800" />
                <DialogTitle>Paiement PayPal</DialogTitle>
              </div>
            </DialogHeader>
            <form autoComplete="off" className="space-y-5">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Email PayPal
                  <input
                    type="email"
                    placeholder="exemple@paypal.com"
                    value={ppEmail}
                    onChange={(e) => setPpEmail(e.target.value)}
                    className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Mot de passe
                  <input
                    type="password"
                    placeholder="••••••"
                    value={ppPwd}
                    onChange={(e) => setPpPwd(e.target.value)}
                    className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800"
                  />
                </label>
              </div>
              <div className="flex justify-end space-x-4 pt-2">
                <Button
                  type="button"
                  onClick={handlePpSubmit}
                  className="bg-blue-800 text-white px-5 py-2 rounded-lg hover:bg-blue-900"
                >
                  Se connecter
                </Button>
                <Button
                  type="button"
                  onClick={togglePp}
                  className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300"
                >
                  Annuler
                </Button>
              </div>
            </form>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* ApplePay Dialog */}
      <Dialog open={isApOpen} onOpenChange={toggleAp}>
        <DialogContent>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              onClick={toggleAp}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <DialogHeader>
              <div className="flex items-center justify-center gap-3 mb-6">
                <FaApplePay size={48} className="text-gray-800" />
                <DialogTitle>Paiement Apple Pay</DialogTitle>
              </div>
            </DialogHeader>
            <form autoComplete="off" className="space-y-5">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Email Apple Pay
                  <input
                    type="email"
                    placeholder="exemple@apple.com"
                    value={apEmail}
                    onChange={(e) => setApEmail(e.target.value)}
                    className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Mot de passe
                  <input
                    type="password"
                    placeholder="••••••"
                    value={apPwd}
                    onChange={(e) => setApPwd(e.target.value)}
                    className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800"
                  />
                </label>
              </div>
              <div className="flex justify-end space-x-4 pt-2">
                <Button
                  type="button"
                  onClick={handleApSubmit}
                  className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-black"
                >
                  Se connecter
                </Button>
                <Button
                  type="button"
                  onClick={toggleAp}
                  className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300"
                >
                  Annuler
                </Button>
              </div>
            </form>
          </motion.div>
        </DialogContent>
      </Dialog>

      <div className="flex justify-center pt-2">
        {!editing ? (
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => setEditing(true)}
            className="bg-button p-1.5 rounded-lg text-secondary"
          >
            Modifier mes Informations personnelles
          </motion.button>
        ) : (
          <>
            <button
              type="button"
              onClick={handleSave}
              className="bg-green-600 p-1.5 rounded-lg mr-2"
            >
              Enregistrer
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 p-1.5 rounded-lg"
            >
              Annuler
            </button>
          </>
        )}
      </div>

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

      {/* Section Historique */}
      <section className="flex flex-col items-center justify-center text-center text-secondary bg-block rounded-2xl border-3 border-secondary mx-auto mt-4 w-[300px] md:w-[900px] p-2 gap-4">
        <h2 className="font-bold lg:text-lg">Historique de commandes</h2>
        <section className="flex flex-wrap justify-center gap-6 mt-2">
          {(historyToMap as OrderInterface[][]).length >= 0 ? (
            (historyToMap as OrderInterface[][]).map(
              (orderItems: OrderInterface[]) => {
                // Ensure orderItems is an array
                if (!Array.isArray(orderItems)) return null;
                const items: OrderInterface[] = groupItems(orderItems);
                const total: number = items.reduce(
                  (sum: number, it: OrderInterface) =>
                    sum + (it.price ?? 0) * it.quantity,
                  0,
                );
                return (
                  <div
                    key={`${orderItems[0]?.id}-${orderItems[0]?.date}`}
                    className="flex flex-col items-center bg-block text-secondary rounded-2xl 
                      border-3 border-secondary p-4 w-[180px] shadow-md"
                  >
                    {items.map((it: OrderInterface) => (
                      <div key={it.id} className="mb-2">
                        <p className="font-bold">{it.name}</p>
                        <img
                          src={it.image}
                          alt={it.name}
                          className="w-24 h-24 object-cover rounded-md mx-auto mb-1"
                        />
                        <p>Quantité : {it.quantity}</p>
                        <p>Prix unitaire : {(it.price ?? 0).toFixed(2)}€</p>
                      </div>
                    ))}

                    <p className="mt-2 font-semibold">
                      Total commande : {total.toFixed(2)}€
                    </p>
                  </div>
                );
              },
            )
          ) : (
            <p className="border-2 p-2 border-secondary font-semibold">
              Aucun historique...
            </p>
          )}
        </section>
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
