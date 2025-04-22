function Footer() {
  return (
    <section className="flex flex-col items-center bg-[#4C7B74] gap-3">
      <div className="flex flex-col items-center mt-3">
        <h2>S'inscrire à la NewsLetter</h2>
        <form>
          <input
            className="bg-white rounded text-secondary text-center mt-2"
            type="email"
            placeholder="Votre adresse mail"
          />
        </form>
      </div>

      <section className="p-2 flex flex-row items-center w-screen justify-between">
        <div className="flex items-center gap-2">
          <p className="text-xl">&copy;</p>
          <p className="text-sm italic">
            Tous droits réservés <br />
            Stras'Zik
          </p>
        </div>

        <div className="flex flex-row gap-3">
          <img
            className="w-7 h-7 hover:scale-120"
            src="./src/assets/images/instagram-icon.png"
            alt="Instagram icon"
          />
          <a
            href="https://www.facebook.com/profile.php?id=61575664886768"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              src="./src/assets/images/facebook-icon.png"
              alt="Facebook icon"
              className="w-7 h-7 hover:scale-120"
            />
          </a>
        </div>
      </section>
    </section>
  );
}

export default Footer;
