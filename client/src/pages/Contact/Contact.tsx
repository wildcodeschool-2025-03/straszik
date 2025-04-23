import Header from "../../components/Header/Header";

function Contact() {
  return (
    <>
      <Header />
      <h1 className="font-extrabold text-4xl md:text-7xl mb-4 text-secondary text-center m-10">
        NOUS CONTACTER
      </h1>
      <section className="allInput text-secondary">
        <input type="text" placeholder="Nom" />
        <input type="text" placeholder="Prénom" />
        <input type="email" placeholder="Adresse Mail" />
        <input type="text" placeholder="Objet" />
        <textarea name="message" id="message" placeholder="Message" />
      </section>
      <p className="text-secondary text-center m-10 font-bold">
        Une question ? Une demande de concert ? Envie de nous dire que vous
        aimez notre dernier son ?
      </p>
      <p className="text-secondary text-center m-10 font-bold">
        N’hésitez pas à nous écrire, on répond dès qu’on sort du studio !
      </p>
    </>
  );
}

export default Contact;
