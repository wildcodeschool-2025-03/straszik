function LogInAccount() {
  return (
    <>
      <div>
        <h1 className="text-secondary text-4xl font-extrabold text-center lg:text-5xl mt-10 mb-14">
          CONNEXION
        </h1>

        <div className="flex flex-col items-center gap-3">
          <input
            className="bg-button/30 text-secondary rounded-xl border-3 pl-2 border-secondary text-lg w-80 lg:w-80 lg:h-10"
            type="text"
            placeholder="E-mail"
          />
          <input
            className="bg-button/30 text-secondary rounded-xl border-3 pl-2 border-secondary text-lg w-80 lg:w-80 lg:h-10"
            type="password"
            placeholder="Mot de passe"
          />
        </div>
        <a
          href="/reset-password"
          className="flex justify-center italic underline underline-offset-1 text-secondary text-xs mx-10 mt-2"
        >
          Mot de passe oublié ?
        </a>

        <div className="flex flex-col items-center gap-1 mt-4">
          <button
            className="bg-button text-xl rounded-xl p-2 w-52 mt-4 font-semibold hover:scale-110"
            type="submit"
          >
            Se connecter
          </button>

          <p className="text-secondary font-semibold text-xs">
            Vous n'avez pas de compte ?
          </p>
          <a
            href="/sign-in"
            className="underline underline-offset-1 text-secondary text-xs font-semibold"
          >
            S'inscrire
          </a>
        </div>
      </div>
    </>
  );
}

export default LogInAccount;
