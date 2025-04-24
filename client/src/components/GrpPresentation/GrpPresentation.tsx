function GrpPresentation() {
  return (
    <>
      <h1 className="text-secondary text-4xl font-extrabold text-center lg:text-7xl mt-10 mb-14">
        Stras'Zik
      </h1>

      <div className=" lg:flex lg:items-center lg:justify-center lg:flex-col lg:mt-8">
        <section className="bg-block rounded-4xl text-secondary border-secondary border-4 text-center mt-6 mb-6 ml-3 mr-3 lg:w-150">
          <h2 className="font-bold mt-4 text-2xl">Qui sommes nous ?</h2>
          <div className="text-lg leading-relaxed tracking-wide mt-6 mb-8 lg:px-20 lg:tracking-widest lg:leading-loose">
            <p className="mb-4">
              Né dans les ruelles de Strasbourg, Stras'Zik incarne l'essence du
              rock alsacien depuis 2018. Notre quartet fusionne l'énergie brute
              du rock avec des mélodies captivantes qui racontent notre région.
            </p>
            <p className="mb-4">
              Sur scène, notre complicité transforme chaque concert en moment
              unique. Notre son distinctif, porté par des textes en français,
              explore les émotions de la vie contemporaine.
            </p>
            <p>
              Avec plusieurs projets à notre actif, Stras'Zik poursuit son
              aventure musicale, fidèle à ses racines strasbourgeoises tout en
              repoussant les frontières de son univers sonore.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default GrpPresentation;
