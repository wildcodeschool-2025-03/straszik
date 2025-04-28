interface UserInterface {
  id: number;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  email: string;
  address: string;
  password: string;
}

interface UserListInterface {
  id: number;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  email: string;
  address: string;
  password: string;
}

let idCount = JSON.parse(localStorage.getItem("myCount") || "0");

const userList: UserListInterface[] = JSON.parse(
  localStorage.getItem("userList") || "[]",
);

function SignIn() {
  const user = {} as UserInterface;
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(user);
    const exists = userList.some((u) => u.email === user.email);

    if (!exists) {
      idCount++;
      localStorage.setItem("myCount", idCount);
      user.id = idCount;
      userList.push(user);
      localStorage.setItem("userList", JSON.stringify(userList));
      //recupérer l'objet dans le local storage avec son id
      const userConnected = userList.find((u) => u.id === idCount);
      localStorage.setItem("userConnected", JSON.stringify(userConnected));
      window.location.href = "./compte";
    } else {
      alert(
        "Un compte existe déjà avec cette adresse email.\nVeuillez en saisir une autre ou vous connecter à votre compte.",
      );
    }
  }

  function handleLastName(e: React.ChangeEvent<HTMLInputElement>) {
    user.lastName = e.target.value;
    console.log(user);
  }
  function handleFirstName(e: React.ChangeEvent<HTMLInputElement>) {
    user.firstName = e.target.value;
    console.log(user);
  }
  function handlePhoneNumber(e: React.ChangeEvent<HTMLInputElement>) {
    user.phoneNumber = e.target.value;
    console.log(user);
  }
  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    user.email = e.target.value;
    console.log(user);
  }
  function handleAddress(e: React.ChangeEvent<HTMLInputElement>) {
    user.address = e.target.value;
    console.log(user);
  }
  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    user.password = e.target.value;
    console.log(user);
  }

  return (
    <>
      <div>
        <h1 className="text-secondary text-4xl font-extrabold text-center lg:text-5xl mt-10 mb-14">
          INSCRIPTION
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-3"
        >
          <input
            className="bg-button/30 text-secondary rounded-xl border-3 pl-2 border-secondary text-lg w-80 lg:w-80 lg:h-10"
            type="text"
            placeholder="Nom"
            onChange={handleLastName}
            required
          />
          <input
            className="bg-button/30 text-secondary rounded-xl border-3 pl-2 border-secondary text-lg w-80 lg:w-80 lg:h-10"
            type="text"
            placeholder="Prénom"
            onChange={handleFirstName}
            required
          />
          <input
            className="bg-button/30 text-secondary rounded-xl border-3 pl-2 border-secondary text-lg w-80 lg:w-80 lg:h-10"
            type="text"
            placeholder="Portable"
            onChange={handlePhoneNumber}
            required
          />
          <input
            className="bg-button/30 text-secondary rounded-xl border-3 pl-2 border-secondary text-lg w-80 lg:w-80 lg:h-10"
            type="text"
            placeholder="E-mail"
            onChange={handleEmail}
            required
          />
          <input
            className="bg-button/30 text-secondary rounded-xl border-3 pl-2 border-secondary text-lg w-80 lg:w-80 lg:h-10"
            type="text"
            placeholder="Adresse postale"
            onChange={handleAddress}
            required
          />
          <input
            className="bg-button/30 text-secondary rounded-xl border-3 pl-2 border-secondary text-lg w-80 lg:w-80 lg:h-10"
            type="password"
            placeholder="Mot de passe"
            onChange={handlePassword}
            required
          />
          <div className="flex flex-col items-center gap-1 mt-4">
            <button
              className="bg-button text-xl rounded-xl p-2 w-52 mt-4 font-semibold hover:scale-110"
              type="submit"
            >
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignIn;
