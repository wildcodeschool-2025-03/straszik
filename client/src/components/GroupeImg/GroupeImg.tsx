function GroupeImg() {
  return (
    <>
      <section id="fontWalter">
        <h2 className="text-center mt-18 text-4xl text-secondary mb-24 lg:text-6xl">
          Notre Groupe
        </h2>

        <div className="max-w-5xl mx-auto mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 justify-items-center mt-12">
            <div className="flex flex-col items-center hover:scale-90">
              <img
                className="rounded-3xl border-secondary border-4 w-40 "
                src="./Quentin.png"
                alt="Quentin le bassiste"
              />
              <p className="mt-4 text-center text-secondary text-xl">
                Quentin le bassiste
              </p>
            </div>

            <div className="flex flex-col items-center lg:mt-24 hover:scale-110">
              <img
                className="rounded-3xl border-secondary border-4 w-40"
                src="./Alexandra.png"
                alt="Alexandra la chanteuse"
              />
              <p className="mt-4 text-center text-secondary text-xl">
                Alexandra la chanteuse
              </p>
            </div>

            <div className="flex flex-col items-center hover:scale-90">
              <img
                className="rounded-3xl border-secondary border-4 w-40"
                src="./Maxime.png"
                alt="Maxime le guitariste"
              />
              <p className="mt-4 text-center text-secondary text-xl">
                Maxime le guitariste
              </p>
            </div>

            <div className="flex flex-col items-center lg:mt-24 hover:scale-110">
              <img
                className="rounded-3xl border-secondary border-4 w-40"
                src="./Eric.png"
                alt="Eric le batteur"
              />
              <p className="mt-4 text-center text-secondary text-xl mb-12">
                Eric le batteur
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default GroupeImg;
