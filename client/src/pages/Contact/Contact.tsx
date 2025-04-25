import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { useState } from "react";
import Header from "../../components/Header/Header";

const serviceId = import.meta.env.VITE_YOUR_SERVICE_ID;
const templateId = import.meta.env.VITE_YOUR_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_YOUR_PUBLIC_KEY;

function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [mailStatus, setMailStatus] = useState("");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs.sendForm(serviceId, templateId, form.current, publicKey).then(
        () => {
          setMailStatus("Message envoyé !");
          console.log("SUCCESS!");
        },
        (error) => {
          setMailStatus(
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
      <h1 className="font-extrabold text-4xl md:text-7xl mb-4 text-secondary text-center m-10 ">
        NOUS CONTACTER
      </h1>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="allInput text-secondary flex flex-col items-center w-10/12 m-auto gap-6 mt-10 md:w-3/5 md:grid md:grid-cols-2"
      >
        <input
          name="name"
          type="text"
          placeholder="Nom"
          className="text-center bg-block w-full border-2 border-secondary rounded-full h-12"
        />
        <input
          type="text"
          placeholder="Prénom"
          className="text-center bg-block w-full border-2 border-secondary rounded-full h-12"
        />
        <input
          name="email"
          type="email"
          placeholder="Adresse Mail"
          className="text-center bg-block w-full border-2 border-secondary rounded-full h-12"
        />
        <input
          name="telephone"
          type="tel"
          placeholder="Téléphone"
          className="text-center bg-block w-full border-2 border-secondary rounded-full h-12"
        />
        <input
          name="title"
          type="text"
          placeholder="Objet"
          className="text-center bg-block w-full border-2 border-secondary rounded-full h-12 md:col-span-2"
        />
        <textarea
          name="message"
          id="message"
          placeholder="Message"
          className="text-center bg-block w-full border-2 border-secondary rounded-3xl h-50 md:col-span-2"
        />
        <p className="text-secondary font-bold">{mailStatus}</p>
        <button
          type="submit"
          className="hover:text-white font-extrabold bg-button text-center text-xl p-2 rounded-2xl shadow-2xl w-40 md:justify-self-end"
        >
          Envoyer
        </button>
      </form>
      <p className="text-secondary text-center m-10 font-bold">
        Une question ? Une demande de concert ? Envie de nous dire que vous
        aimez notre dernier son ?
      </p>
      <p className="text-secondary text-center m-10 font-bold">
        N’hésitez pas à nous écrire, on répond dès qu’on sort du studio !
      </p>
      <section className="text-secondary font-bold bg-button/60 w-11/12 m-auto rounded-3xl flex flex-col gap-10 pt-10 pb-10 md:flex-row md:w-10/12 md:h-1/3 md:px-10">
        <article className="bg-block w-10/12 m-auto rounded-3xl border-2 border-secondary p-5 text-sm flex flex-col justify-around  lg:w-1/3 md:h-70 ">
          <p>Nom du groupe : Stras’Zik</p>
          <p>Style : Rock alternatif</p>
          <p>Origine : Strasbourg, France</p>
          <p>
            Adresse de correspondance : <br /> Stras’Zik – Groupe Rock <br />{" "}
            c/o Maison des Musiciens <br /> 5 rue de la Musique <br /> 67000
            Strasbourg, France
          </p>
        </article>
        <article className="bg-block w-10/12 m-auto rounded-3xl border-2 border-secondary p-5 text-sm flex flex-col justify-around  lg:w-1/3 md:h-70">
          <p>Nom du manager : Julien Meyer</p>
          <p>Poste : Manager du groupe Stras’Zik</p>
          <p>Téléphone : +33 7 81 23 45 67</p>
          <p>
            Email : <br /> straszik@gmail.com
          </p>
          <p>
            Adresse professionnelle : <br /> Strain's Management <br /> 14 rue
            du Faubourg-de-Saverne <br /> 67000 Strasbourg, France
          </p>
        </article>
      </section>
    </>
  );
}

export default Contact;
