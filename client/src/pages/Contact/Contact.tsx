import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { useState } from "react";
import Header from "../../components/Header/Header";
import { ToastContainer, toast } from "react-toastify";


const serviceId = import.meta.env.VITE_YOUR_SERVICE_ID;
const templateId = import.meta.env.VITE_YOUR_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_YOUR_PUBLIC_KEY;

function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [mailStatus] = useState("");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs.sendForm(serviceId, templateId, form.current, publicKey).then(
        () => {
          toast.success("Message envoyé !");
          console.log("SUCCESS!");
        },
        (error) => {
          toast.error(
            "Erreur lors de l'envoi du message. Veuillez réessayer.",
          );
          console.error("Email sending error:", error);
        },
      );
    }
  };

  return (
    <>
      <Header />
      <h1 className="font-extrabold text-4xl md:text-5xl text-secondary text-center mt-10">
        NOUS CONTACTER
      </h1>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="allInput text-secondary flex flex-col items-center w-10/12 m-auto gap-6 mt-16 md:w-3/5 md:grid md:grid-cols-2"
      >
        <input
          name="name"
          type="text"
          placeholder="Nom"
          className="text-center bg-block w-full border-2 border-secondary rounded-full h-10"
        />
        <input
          type="text"
          placeholder="Prénom"
          className="text-center bg-block w-full border-2 border-secondary rounded-full h-10"
        />
        <input
          name="email"
          type="email"
          placeholder="Adresse Mail"
          className="text-center bg-block w-full border-2 border-secondary rounded-full h-10"
        />
        <input
          name="telephone"
          type="tel"
          placeholder="Téléphone"
          className="text-center bg-block w-full border-2 border-secondary rounded-full h-10"
        />
        <input
          name="title"
          type="text"
          placeholder="Objet"
          className="text-center bg-block w-full border-2 border-secondary rounded-full h-10 md:col-span-2"
        />
        <textarea
          name="message"
          id="message"
          placeholder="Message"
          className="text-center bg-block w-full border-2 border-secondary rounded-3xl h-50 md:col-span-2 p-2"
        />
        <p className="text-secondary font-bold">{mailStatus}</p>
        <button
          type="submit"
          className="hover:text-white font-extrabold bg-button text-center text-base p-2 rounded-2xl shadow-2xl w-36 self-end md:justify-self-end h-10 cursor-pointer"
        >
          Envoyer
        </button>
      </form>
      <p className="text-secondary text-center mt-5 mx-5 font-bold">
        Une question ? Une demande de concert ? Envie de nous dire que vous
        aimez notre dernier son ?
      </p>
      <p className="text-secondary text-center m-5 font-bold">
        N’hésitez pas à nous écrire, on répond dès qu’on sort du studio !
      </p>
      <section className="text-secondary font-bold bg-button/60 m-auto rounded-3xl flex flex-col pt-10 pb-10 w-5/7 md:max-w-6xl mb-10 md:flex-wrap md:flex-row md:w-10/12 md:px-10 md:justify-center gap-10 md:gap-5 lg:gap-0">
        <article className="bg-block mx-auto items-center rounded-3xl border-4 border-secondary p-3 gap-4 text-sm w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px]">
          <figure className="relative w-[150px] md:w-[200px] lg:w-[250px] xl:w-[300px] overflow-hidden rounded-2xl shadow-lg mb-4 mx-auto">
            <img
              src="/maison-musicien.png"
              alt="Logo du groupe"
              className="w-full object-contain rounded-lg mx-auto"
            />
            <figcaption className="absolute bottom-0 w-full bg-black/50 text-white text-center text-sm font-semibold py-2 px-3">
              STRAS’ZIK <br />
              Rock alternatif
            </figcaption>
          </figure>
          <div className="ml-2 md:ml-5 text-left font-semibold">
            <p>Adresse mail : straszik@gmail.com</p>
            <p className="mt-5 md:mt-2">Adresse de correspondance :</p>
            <address className="text-xs italic leading-relaxed ml-5">
              c/o Maison des Musiciens <br />5 rue de la Musique <br />
              67000 Strasbourg, France
            </address>
          </div>
        </article>

        <article className="bg-block mx-auto items-center rounded-3xl border-4 border-secondary p-3 gap-4 text-sm w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px]">
          <figure className="relative w-[150px] md:w-[200px] lg:w-[250px] xl:w-[300px] overflow-hidden rounded-2xl shadow-lg mb-4 mx-auto">
            <img
              src="/yavuz-kutuk.png"
              alt="Yavuz KUTUK - Manager"
              className="w-full object-contain rounded-lg mx-auto"
            />
            <figcaption className="absolute bottom-0 w-full bg-black/50 text-white text-center text-sm font-semibold py-2 px-3">
              Yavuz KUTUK <br /> Manager
            </figcaption>
          </figure>
          <div className="ml-2 md:ml-5 text-left font-semibold">
            <p>Téléphone : 06.00.00.00.00</p>
            <p className="mt-5 md:mt-2">Adresse professionnelle :</p>
            <address className="text-xs italic leading-relaxed ml-5">
              Strain's Management <br />
              14 rue du Faubourg-de-Saverne <br />
              67000 Strasbourg, France
            </address>
          </div>
        </article>
      </section>
      {/*Alert envoye*/}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default Contact;
