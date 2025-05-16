import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface AdminAccount {
  email: string;
  password: string;
}

function LogInAccount() {
  const userList = JSON.parse(localStorage.getItem("userList") || "[]");

  const [adminAccounts, setAdminAccounts] = useState<AdminAccount[]>([]);

  useEffect(() => {
    fetch("/adminAccounts.json")
      .then((response) => response.json())
      .then((data) => {
        setAdminAccounts(data);
      })
      .catch((error) =>
        console.error("Erreur lors du chargement des e-mails admins :", error),
      );
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const emailInput = (e.currentTarget[0] as HTMLInputElement).value;
    const passwordInput = (e.currentTarget[1] as HTMLInputElement).value;
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(emailInput)) {
      toast.error("Veuillez entrer une adresse email valide");
      return;
    }

    const admin = adminAccounts.find(
      (admin: { email: string }) => admin.email === emailInput,
    );
    if (admin) {
      if (admin.password !== passwordInput) {
        toast.error("Mot de passe incorrect");
        return;
      }
      localStorage.setItem("userConnected", JSON.stringify(admin));
      window.location.href = "/admin";
      return;
    }

    const user = userList.find(
      (user: { email: string; password: string }) => user.email === emailInput,
    );
    if (user) {
      if (user.password !== passwordInput) {
        toast.error("Mot de passe incorrect");
        return;
      }
      localStorage.setItem("userConnected", JSON.stringify(user));
      window.location.href = "/compte";
      return;
    }

    toast.warn("Aucun compte n'est associé à cette adresse e-mail");
    return;
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
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
}

export default LogInAccount;
