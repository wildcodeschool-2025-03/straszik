function LogInAccount() {
  return (
    <>
      <div className="md:pb-60">
        <h1 className="text-secondary text-4xl font-extrabold text-center lg:text-7xl mt-10 mb-14">
          CONNEXION
        </h1>

        <div className="flex flex-col items-center gap-3">
          <input
            className="bg-button/30 text-secondary rounded-xl text-center border-3 border-secondary text-xl w-80 lg:w-100 lg:h-15"
            type="text"
            placeholder="E-mail"
          />
          <input
            className="bg-button/30 text-secondary rounded-xl text-center border-3 border-secondary text-xl w-80 lg:w-100 lg:h-15"
            type="password"
            placeholder="Mot de passe"
          />
        </div>
        <a
          href="/reset-password"
          className="flex justify-end md:justify-center italic underline underline-offset-1 text-secondary text-sm mx-10 mt-2"
        >
          Mot de passe oublié ?
        </a>

        <div className="flex flex-col items-center gap-1 mt-4">
          <button
            className="bg-button text-2xl rounded-xl p-2 w-80 mt-6 font-semibold"
            type="submit"
          >
            Se connecter
          </button>

          <p className="text-secondary font-semibold text-sm">
            Vous n'avez pas de compte ?
          </p>
          <a
            href="/reset-password"
            className="underline underline-offset-1 text-secondary text-sm font-semibold mb-12"
          >
            S'inscrire
          </a>
        </div>
      </div>
    </>
  );
}

export default LogInAccount;
