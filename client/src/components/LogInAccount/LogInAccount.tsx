function LogInAccount() {
  const userList = JSON.parse(localStorage.getItem("userList") || "{}");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    for (let i = 0; i < userList.length; i++) {
      if (
        userList[i].email === (e.currentTarget[0] as HTMLInputElement).value &&
        userList[i].password === (e.currentTarget[1] as HTMLInputElement).value
      ) {
        localStorage.setItem("userConnected", JSON.stringify(userList[i]));
        window.location.href = "/";
      }
    }
  }

  return (
    <>
      <div>
        <h1 className="text-secondary text-4xl font-extrabold text-center lg:text-5xl mt-10 mb-14">
          CONNEXION
        </h1>

        <form
          className="flex flex-col items-center gap-3"
          onSubmit={handleSubmit}
        >
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
          <a
            href="/reset-password"
            className="flex justify-center italic underline underline-offset-1 text-secondary text-xs mx-10"
          >
            Mot de passe oublié ?
          </a>

          <div className="flex flex-col items-center gap-1">
            <button
              className="bg-button text-xl rounded-xl p-2 w-52 mt-6 font-semibold hover:scale-110"
              type="submit"
            >
              Se connecter
            </button>
            <p className="text-secondary font-semibold text-xs mt-2">
              Vous n'avez pas de compte ?
            </p>
            <a
              href="/sign-in"
              className="underline underline-offset-1 text-secondary text-xs font-semibold"
            >
              S'inscrire
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

export default LogInAccount;
