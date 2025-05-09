import { Link } from "react-router";

function Footer() {
  // Fonction pour gérer l'inscription à la newsletter et sauvegarder l'email dans le localStorage
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      const email = (e.target as HTMLInputElement).value;
      if (email) {
        const newsletterEmailList = JSON.parse(
          localStorage.getItem("newsletterEmailList") || "[]",
        );
        if (!newsletterEmailList.includes(email)) {
          newsletterEmailList.push(email);
          localStorage.setItem(
            "newsletterEmailList",
            JSON.stringify(newsletterEmailList),
          );
          alert(
            `Votre inscription à notre newsletter a bien été enregistrée avec l'adresse email suivante : ${email}`,
          );
          localStorage.setItem("newsletterEmail", email);
        } else {
          alert(
            `Cette adresse email est déjà inscrite à notre newsletter : ${email}`,
          );
        }
      }
    }
  }

  return (
    <section className="flex flex-col items-center bg-[#4C7B74] gap-3 mt-10">
      <div className="flex flex-col items-center mt-3">
        <h2>S'inscrire à la NewsLetter</h2>
        <form onKeyDown={handleKeyDown}>
          <input
            className="bg-white rounded text-secondary text-center mt-2 w-60 md:w-72 lg:w-80"
            type="email"
            inputMode="email"
            placeholder="Votre adresse mail"
          />
        </form>
      </div>

      <section className="p-2 flex flex-row md:items-center w-full justify-between items-end">
        <div className="flex items-center gap-1 md:gap-2 w-30 md:w-50">
          <p className="text-xl">&copy;</p>
          <p className="text-xs md:text-sm italic">
            Tous droits
            <br /> réservés Stras'Zik
          </p>
        </div>

        <div className="flex flex-row gap-3">
          <a
            href="https://www.instagram.com/straszik_wcs/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              className="w-7 h-7 hover:scale-120"
              src="./instagram-icon.png"
              alt="Instagram icon"
            />
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61575664886768"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              src="./facebook-icon.png"
              alt="Facebook icon"
              className="w-7 h-7 hover:scale-120"
            />
          </a>
        </div>

        <div className="w-30 text-right md:w-50 flex flex-col md:flex-col-reverse">
          <p className="text-xs md:text-sm italic">
            <Link to="/cgv" className="hidden md:block">
              Conditions Générales de Vente
            </Link>
            <Link to="/cgv" className="md:hidden">
              CGV
            </Link>
          </p>
          <p className="text-xs md:text-sm italic">
            <Link to="/mentions-legales">Mentions Légales</Link>
          </p>
        </div>
      </section>
    </section>
  );
}

export default Footer;
