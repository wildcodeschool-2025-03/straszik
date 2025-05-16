import InstrumentCard from "../../components/Backstage/InstrumentCard";
import ZoomImage from "../../components/Backstage/ZoomImage";
import Header from "../../components/Header/Header";

const setup = [
  {
    src: "./guitare.png",
    alt: "Guitare de Max",
    label: "Instrument",
    name: "Fender Jazzmaster 66",
    anecdote:
      "Elle grince mais elle groove. Maxime l’a trouvée dans un vide-grenier... depuis, ils ne se quittent plus.",
  },
  {
    src: "./micro.png",
    alt: "Micro d'Alex",
    label: "Accessoire",
    name: "Micro Shure SM58",
    anecdote:
      "Le micro d’Alex a entendu plus de confidences qu’un psy. Heureusement, il ne répète rien.",
  },
  {
    src: "./bass.png",
    alt: "Bass de Quentin",
    label: "Instrument",
    name: "Fender Precision Bass",
    anecdote:
      "Quentin lui parle avant chaque concert. Elle ne répond jamais. Mais ensemble, ils font vibrer les murs.",
  },
  {
    src: "./batterie.png",
    alt: "Batterie d'Eric",
    label: "Instrument",
    name: "Kit Gretsch + caisse claire custom",
    anecdote:
      "Elle a perdu deux peaux, trois baguettes et un peu de sa dignité… mais tant qu’Éric tape, elle tient bon.",
  },
];

function Backstage() {
  return (
    <>
      <Header />
      <h1 className="text-secondary text-4xl font-extrabold text-center lg:text-5xl mt-10">
        BACKSTAGE
      </h1>
      <p className="text-xl text-center my-5 text-secondary font-bold">
        "Entrez dans notre univers, loin des projecteurs..."
      </p>

      {/* La section "Dans les coulisses de Stras'Zik" avec des images */}
      <section className="flex justify-center">
        <section className="bg-button/60 rounded-md mt-10 text-secondary p-6 mx-6 w-5/7 mb-5">
          <h2 className="text-xl text-center font-semibold my-5">
            Dans les coulisses de Stras'Zik
          </h2>

          <section className="md:grid md:grid-cols-3 gap-5">
            <section className="grid grid-cols-2 gap-4 mt-5 text-center md:grid-cols-1">
              <figure className="flex flex-col justify-end md:justify-start">
                <figcaption className="text-lg font-bold opacity-80 leading-tight">
                  Dans les loges
                </figcaption>
                <ZoomImage
                  src="./loge-maquillage.png"
                  alt="Straz'Zik en loge"
                  className="w-full max-w-[300px] md:max-w-[400px]"
                />
              </figure>
              <figure className="flex flex-col justify-end">
                <figcaption className="text-lg font-bold opacity-80 leading-tight">
                  Bloc-notes
                </figcaption>
                <ZoomImage
                  src="./carnet-notes.png"
                  alt="Extrait d'un carnet de notes"
                  className="w-full max-w-[300px] md:max-w-[400px]"
                />
              </figure>
            </section>

            <section>
              <figure className="flex flex-col items-center mt-5 md:justify-between">
                <figcaption className="text-lg font-bold opacity-80 leading-tight">
                  En tournée
                </figcaption>
                <ZoomImage
                  src="./scene.png"
                  alt="Straz'Zik sur scène"
                  className="w-full max-w-[300px] md:max-w-[400px]"
                />
              </figure>
            </section>

            <section>
              <figure className="flex flex-col items-center mt-5">
                <figcaption className="text-lg font-bold opacity-80 leading-tight">
                  En studio
                </figcaption>
                <ZoomImage
                  src="./studio.png"
                  alt="Straz'Zik en studio"
                  className="w-full max-w-[300px] md:max-w-[400px]"
                />
              </figure>

              <section className="grid grid-cols-2 gap-4 mt-5 text-center">
                <figure className="flex flex-col justify-end">
                  <figcaption className="text-lg font-bold opacity-80 leading-tight">
                    Sur la route
                  </figcaption>
                  <ZoomImage
                    src="./route.png"
                    alt="Straz'Zik dans son van"
                    className="w-full max-w-[300px] md:max-w-[400px]"
                  />
                </figure>
                <figure className="flex flex-col justify-end">
                  <figcaption className="text-lg font-bold opacity-80 leading-tight">
                    En dédicace
                  </figcaption>
                  <ZoomImage
                    src="./dedicace.png"
                    alt="Straz'Zik en séance de dédicace"
                    className="w-full max-w-[300px] md:max-w-[400px]"
                  />
                </figure>
              </section>
            </section>
          </section>
        </section>
      </section>

      {/* La section "Set-up du groupe" avec les instruments et anecdotes */}
      <section className="flex justify-center">
        <section className="bg-button/60 rounded-md mt-10 text-secondary p-6 mx-6 w-5/7">
          <h2 className="text-xl text-center font-semibold mb-10 mt-5">
            Set-up du groupe
          </h2>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {setup.map((caracteristic) => (
              <InstrumentCard
                key={caracteristic.name}
                src={caracteristic.src}
                alt={caracteristic.alt}
                name={caracteristic.name}
                anecdote={caracteristic.anecdote}
              />
            ))}
          </section>
        </section>
      </section>
    </>
  );
}

export default Backstage;
