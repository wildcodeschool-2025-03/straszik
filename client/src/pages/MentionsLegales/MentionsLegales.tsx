import Header from "../../components/Header/Header";

function MentionsLegales() {
  return (
    <>
      <Header />
      <h1 className="text-secondary text-4xl font-extrabold text-center lg:text-5xl mt-10 mb-16">
        MENTIONS LÉGALES
      </h1>
      <section className="bg-block rounded-4xl text-secondary border-secondary border-4 lg:w-250 mx-5 lg:mx-auto p-2 mb-16">
        <h2 className="mx-5 lg:mx-0 text-center md:text-left font-bold mt-6 text-xl leading-relaxed tracking-wide lg:px-20 lg:tracking-widest lg:leading-loose p-2 lg:p-0">
          Editeur du site
        </h2>
        <p className="mx-5 lg:mx-0 lg:text-left text-justify md:text-left text-sm leading-relaxed tracking-wide lg:px-20 lg:tracking-widest lg:leading-loose p-2 lg:p-0">
          Le site Stras'Zik a été réalisé dans le cadre d’un projet pédagogique
          de la Wild Code School, dans le cadre d’une formation développeur web
          fullstack en téléprésentiel (remote). Le projet a été mené par un
          groupe d’élèves développeurs, sous la responsabilité du formateur
          Yavuz Kutuk.
        </p>
        <p className="mx-5 lg:mx-0 lg:text-left text-justify md:text-left text-xs md:text-sm italic leading-relaxed tracking-wide mb-8 lg:px-20 p-2 lg:p-0">
          Responsable de la publication : Yavuz Kutuk <br />
          Organisme de formation : Wild Code School <br />
          Adresse : 44 Rue Alphonse Penaud, 75020 Paris <br />
          Site : www.wildcodeschool.com <br />
          Email : straszik@gmail.com
        </p>
        <h2 className="mx-5 lg:mx-0 text-center md:text-left font-bold mt-6 text-xl leading-relaxed tracking-wide lg:px-20 lg:tracking-widest lg:leading-loose p-2 lg:p-0">
          Propriété intellectuelle
        </h2>
        <p className="mx-5 lg:mx-0 lg:text-left text-justify md:text-left text-sm leading-relaxed tracking-wide mb-4 lg:px-20 lg:tracking-widest lg:leading-loose p-2 lg:p-0">
          Les contenus du site Stras'Zik (textes, images, logos, musiques,
          vidéos) sont protégés par la législation en vigueur sur la propriété
          intellectuelle. Toute reproduction, représentation ou utilisation sans
          autorisation est interdite.
        </p>
        <h2 className="mx-5 lg:mx-0 text-center md:text-left font-bold mt-6 text-xl leading-relaxed tracking-wide lg:px-20 lg:tracking-widest lg:leading-loose p-2 lg:p-0">
          Données personnelles
        </h2>
        <p className="mx-5 lg:mx-0 lg:text-left text-justify md:text-left text-sm leading-relaxed tracking-wide mb-8 lg:px-20 lg:tracking-widest lg:leading-loose p-2 lg:p-0">
          Aucune donnée personnelle n’est collectée sans votre consentement. Les
          données recueillies via les formulaires (newsletter, contact) sont
          utilisées uniquement dans le cadre de ce projet fictif et ne sont pas
          transmises à des tiers. Conformément au RGPD, vous pouvez exercer vos
          droits à l’adresse suivante : straszik@gmail.com
        </p>
        <h2 className="mx-5 lg:mx-0 text-center md:text-left font-bold mt-6 text-xl leading-relaxed tracking-wide lg:px-20 lg:tracking-widest lg:leading-loose p-2 lg:p-0">
          Crédits
        </h2>
        <p className="mx-5 lg:mx-0 lg:text-left text-justify md:text-left text-sm leading-relaxed tracking-wide mb-8 lg:px-20 lg:tracking-widest lg:leading-loose p-2 lg:p-0">
          Site conçu par un groupe d’élèves de la Wild Code School – formation
          remote, promotion 2025.
        </p>
      </section>
    </>
  );
}

export default MentionsLegales;
