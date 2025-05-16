import e from "cors";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
}

interface NewUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
}

function UserList() {
  const [addUserRow, setAddUserRow] = useState<boolean>(false);

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<string>("");

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const [userList, setUserList] = useState<User[]>(
    JSON.parse(localStorage.getItem("userList") || "[]") as User[],
  );

  const [isNewEmail, setIsNewEmail] = useState<boolean>(false);

  const [newUser, setNewUser] = useState<NewUser>({
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
  });

  function handleRemoveAllUsers() {
    setUserList([]);
    localStorage.removeItem("userList");
    const allInput = document.querySelectorAll("input");
    for (const input of allInput) {
      input.value = "";
    }
    const allTextArea = document.querySelectorAll("textarea");
    for (const textArea of allTextArea) {
      textArea.value = "";
    }
    setIsNewEmail(true);
  }

  function handleRemoveUser(id: number) {
    setUserList((prevUserList) => {
      const updatedList = prevUserList.filter((user) => user.id !== id);
      localStorage.setItem("userList", JSON.stringify(updatedList));
      return updatedList;
    });
    setIsNewEmail(true);
    setStatusMessage("✅ Utilisateur supprimé avec succès");
    setStatusType("success");
  }

  function handleAddUser() {
    const regex = /\S+@\S+\.\S+/;

    if (!regex.test(newUser.email)) {
      setStatusMessage("❌ Veuillez entrer une adresse email valide");
      setStatusType("error");
      return;
    }

    if (
      newUser.email === "" ||
      newUser.firstName === "" ||
      newUser.lastName === "" ||
      newUser.address === "" ||
      newUser.phoneNumber === ""
    ) {
      setStatusMessage("❌ Tous les champs sont obligatoires");
      setStatusType("error");
      return;
    }

    if (!isNewEmail) {
      setStatusMessage(
        "❌ Cet email existe déjà dans la liste des utilisateurs",
      );
      setStatusType("error");
      return;
    }

    const newUserWithId = { ...newUser, id: userList.length + 1 };
    const newUserList = [...userList, newUserWithId];
    setUserList(newUserList);
    localStorage.setItem("userList", JSON.stringify(newUserList));
    setStatusMessage("✅ Utilisateur ajouté avec succès");
    setStatusType("success");

    setNewUser({
      id: 0,
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
    });
    setAddUserRow(false);
  }

  function handleLastName(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setNewUser((prev) => ({ ...prev, lastName: e.target.value }));
  }

  function handleFirstName(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setNewUser((prev) => ({ ...prev, firstName: e.target.value }));
  }

  function handleEmail(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const email = e.target.value;
    setNewUser((prev) => ({ ...prev, email }));
    const emailExists = userList.some((user) => user.email === email);
    setIsNewEmail(!emailExists);
  }

  function handleAddress(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setNewUser((prev) => ({ ...prev, address: e.target.value }));
  }

  function handlePhoneNumber(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setNewUser((prev) => ({ ...prev, phoneNumber: e.target.value }));
  }

  return (
    <>
      <h2 className="text-2xl text-center my-5 text-secondary font-bold mt-16">
        Gestion des comptes utilisateurs
      </h2>

      <div className="overflow-x-auto w-full px-4 md:px-2 lg:px-8 xl:px-16">
        <table className="table-fixed w-full border-separate border-spacing-0 rounded-lg border-4 border-secondary">
          <thead>
            <tr className="h-8 md:h-10 lg:h-12">
              <th className="w-8 bg-block rounded-tl-lg text-secondary md:text-xl font-bold h-8 border-r-4 border-b-4">
                ID
              </th>
              <th className="w-28 bg-block text-secondary md:text-xl font-bold border-r-4 border-b-4">
                Nom
              </th>
              <th className="w-32 bg-block text-secondary md:text-xl font-bold border-r-4 border-b-4">
                Prénom
              </th>
              <th className="w-40 bg-block text-secondary md:text-xl font-bold border-r-4 border-b-4">
                Email
              </th>
              <th className="w-40 bg-block text-secondary md:text-xl font-bold border-r-4 border-b-4">
                Adresse
              </th>
              <th className="w-30 bg-block text-secondary md:text-xl font-bold border-r-4 border-b-4">
                Téléphone
              </th>
              <th className="w-8 bg-block rounded-tr-lg text-secondary md:text-xl font-bold text-center border-b-4">
                <div className="flex items-center justify-center h-full w-full">
                  <FaTrashCan
                    className="cursor-pointer"
                    onClick={() => handleRemoveAllUsers()}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {userList.length > 0 ? (
              userList.map((user) => (
                <tr
                  key={user.id}
                  className="bg-block text-secondary border-t-2"
                >
                  <td className="w-8 text-secondary  h-8 md:h-10 lg:h-12 text-center">
                    {user.id}
                  </td>
                  <td className="w-28 text-secondary  h-8 md:h-10 lg:h-12 pl-2">
                    {user.lastName}
                  </td>
                  <td className="w-32 text-secondary  h-8 md:h-10 lg:h-12 pl-2">
                    {user.firstName}
                  </td>
                  <td className="w-40 text-secondary  h-8 md:h-10 lg:h-12 pl-2">
                    {user.email}
                  </td>
                  <td className="w-40 text-secondary  h-8 md:h-10 lg:h-12 pl-2 break-words">
                    {user.address}
                  </td>
                  <td className="w-30 text-secondary  h-8 md:h-10 lg:h-12 pl-2">
                    {user.phoneNumber}
                  </td>
                  <td className="w-8 text-secondary  h-8 md:h-10 lg:h-12">
                    <div className="flex items-center justify-center h-full w-full">
                      <FaTrashCan
                        className="cursor-pointer"
                        onClick={() => handleRemoveUser(user.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="bg-block text-secondary text-sm lg:text-base text-center font-semibold h-8 md:h-10 lg:h-12"
                  colSpan={7}
                >
                  Aucun compte utilisateur enregistré...
                </td>
              </tr>
            )}

            {addUserRow && (
              <tr className="bg-block text-secondary">
                <td className="w-12 text-secondary h-8 md:h-10 lg:h-12 border-t-2" />

                <td className="w-32 text-secondary h-8 md:h-10 lg:h-12 border-t-2 px-2">
                  <div className="flex items-center">
                    <textarea
                      name="lastName"
                      placeholder="Nom"
                      value={newUser.lastName}
                      onChange={(e) => {
                        handleLastName(
                          e as React.ChangeEvent<HTMLTextAreaElement>,
                        );
                      }}
                      className="h-auto resize-none break-words text-sm lg:text-base rounded bg-block text-secondary"
                      required
                      rows={1}
                    />
                  </div>
                </td>

                <td className="w-40 text-secondary h-8 md:h-10 lg:h-12 border-t-2 px-2">
                  <div className="flex items-center">
                    <textarea
                      name="firstName"
                      placeholder="Prénom"
                      value={newUser.firstName}
                      onChange={(e) => {
                        handleFirstName(
                          e as React.ChangeEvent<HTMLTextAreaElement>,
                        );
                      }}
                      className="h-auto resize-none break-words text-sm lg:text-base rounded bg-block text-secondary"
                      required
                      rows={1}
                    />
                  </div>
                </td>

                <td className="w-60 text-secondary h-8 md:h-10 lg:h-12 border-t-2 px-2">
                  <div className="flex items-center">
                    <textarea
                      name="email"
                      placeholder="Email"
                      value={newUser.email}
                      onChange={(e) => {
                        handleEmail(
                          e as React.ChangeEvent<HTMLTextAreaElement>,
                        );
                      }}
                      className="h-auto resize-none break-words text-sm lg:text-base rounded bg-block text-secondary"
                      required
                      rows={1}
                    />
                  </div>
                </td>

                <td className="w-64 text-secondary h-8 md:h-10 lg:h-12 border-t-2 px-2">
                  <div className="flex items-center">
                    <textarea
                      name="address"
                      placeholder="Adresse"
                      value={newUser.address}
                      onChange={(e) => {
                        handleAddress(e);
                        e.currentTarget.style.height = "auto";
                        e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                      }}
                      rows={1}
                      className="w-full h-auto resize-none overflow-hidden text-sm break-words lg:text-base rounded bg-block text-secondary"
                      required
                    />
                  </div>
                </td>

                <td className="w-52 text-secondary h-8 md:h-10 lg:h-12 border-t-2 px-2">
                  <div className="flex items-center">
                    <textarea
                      name="phoneNumber"
                      placeholder="Téléphone"
                      value={newUser.phoneNumber}
                      onChange={(e) => {
                        handlePhoneNumber(
                          e as React.ChangeEvent<HTMLTextAreaElement>,
                        );
                      }}
                      className="h-auto resize-none break-words text-sm lg:text-base rounded bg-block text-secondary"
                      required
                      rows={1}
                    />
                  </div>
                </td>

                <td className="border-t-2">
                  <div className="flex items-center justify-center h-full w-full">
                    <FaCheck
                      className="cursor-pointer"
                      onClick={handleAddUser}
                    />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 md:px-2 lg:px-8 xl:px-16 mx-auto mt-4 flex items-center justify-end">
        <div
          className={`text-center font-semibold text-sm rounded-xl ${
            statusType === "error" ? "text-red-500" : "text-green-700"
          }`}
        >
          {statusMessage}
        </div>
        <button
          type="button"
          onClick={() => {
            if (addUserRow) {
              setNewUser({
                id: 0,
                email: "",
                firstName: "",
                lastName: "",
                address: "",
                phoneNumber: "",
              });
            }
            setAddUserRow(!addUserRow);
          }}
          className="bg-button hover:bg-button/50 cursor-pointer text-secondary px-4 py-2 rounded-full border-secondary border-3 font-semibold text-sm md:text-base ml-4"
        >
          {addUserRow ? "Annuler l'ajout" : "Ajouter un utilisateur"}
        </button>
      </div>
    </>
  );
}

export default UserList;
