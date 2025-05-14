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
  }

  function handleRemoveUser(id: number) {
    setUserList((prevUserList) =>
      prevUserList.filter((user) => user.id !== id),
    );
    localStorage.setItem(
      "userList",
      JSON.stringify(userList.filter((user) => user.id !== id)),
    );
  }

  function handleAddUser() {
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

    // Réinitialiser le formulaire après l'ajout
    setNewUser({
      id: 0,
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
    });
  }

  function handleLastName(e: React.ChangeEvent<HTMLInputElement>) {
    setNewUser((prev) => ({ ...prev, lastName: e.target.value }));
  }

  function handleFirstName(e: React.ChangeEvent<HTMLInputElement>) {
    setNewUser((prev) => ({ ...prev, firstName: e.target.value }));
  }

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
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

  function handlePhoneNumber(e: React.ChangeEvent<HTMLInputElement>) {
    setNewUser((prev) => ({ ...prev, phoneNumber: e.target.value }));
  }

  return (
    <>
      <h2 className="text-2xl text-center my-5 text-secondary font-bold mt-16">
        Gestion des comptes utilisateurs
      </h2>

      <div className="overflow-x-auto w-full px-4">
        <table className="table-fixed w-full min-w-[1000px] border-separate border-spacing-0 rounded-lg border-4 border-secondary">
          <thead>
            <tr>
              <th className="w-12 bg-block rounded-tl-lg text-secondary md:text-xl font-bold h-8 border-r-4 border-b-4">
                ID
              </th>
              <th className="w-32 bg-block text-secondary md:text-xl font-bold border-r-4 border-b-4">
                Nom
              </th>
              <th className="w-40 bg-block text-secondary md:text-xl font-bold border-r-4 border-b-4">
                Prénom
              </th>
              <th className="w-60 bg-block text-secondary md:text-xl font-bold border-r-4 border-b-4">
                Email
              </th>
              <th className="w-64 bg-block text-secondary md:text-xl font-bold border-r-4 border-b-4">
                Adresse
              </th>
              <th className="w-52 bg-block text-secondary md:text-xl font-bold border-r-4 border-b-4">
                Téléphone
              </th>
              <th className="w-16 bg-block rounded-tr-lg text-secondary md:text-xl font-bold text-center border-b-4">
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
                  <td className="w-12 text-secondary  h-12 md:h-14 lg:h-16 text-center">
                    {user.id}
                  </td>
                  <td className="w-32 text-secondary  h-12 md:h-14 lg:h-16 pl-2">
                    {user.lastName}
                  </td>
                  <td className="w-40 text-secondary  h-12 md:h-14 lg:h-16 pl-2">
                    {user.firstName}
                  </td>
                  <td className="w-60 text-secondary  h-12 md:h-14 lg:h-16 pl-2">
                    {user.email}
                  </td>
                  <td className="w-64 text-secondary  h-12 md:h-14 lg:h-16 pl-2 break-words">
                    {user.address}
                  </td>
                  <td className="w-52 text-secondary  h-12 md:h-14 lg:h-16 pl-2">
                    {user.phoneNumber}
                  </td>
                  <td className="w-16 text-secondary  h-12 md:h-14 lg:h-16">
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
                  className="bg-block text-secondary text-center font-semibold h-12 md:h-14 lg:h-16"
                  colSpan={7}
                >
                  Aucun compte utilisateur enregistré...
                </td>
              </tr>
            )}

            <tr className="bg-block text-secondary">
              <td className="w-12 text-secondary h-12 md:h-14 lg:h-16 border-t-2" />

              <td className="w-32 text-secondary h-12 md:h-14 lg:h-16 border-t-2 px-2">
                <div className="flex items-center h-full">
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Nom"
                    value={newUser.lastName}
                    onChange={handleLastName}
                    className="w-full h-full text-sm rounded bg-block text-secondary"
                    required
                  />
                </div>
              </td>

              <td className="w-40 text-secondary h-12 md:h-14 lg:h-16 border-t-2 px-2">
                <div className="flex items-center h-full">
                  <input
                    name="firstName"
                    type="text"
                    placeholder="Prénom"
                    value={newUser.firstName}
                    onChange={handleFirstName}
                    className="w-full h-full text-sm rounded bg-block text-secondary"
                    required
                  />
                </div>
              </td>

              <td className="w-60 text-secondary h-12 md:h-14 lg:h-16 border-t-2 px-2">
                <div className="flex items-center h-full">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={handleEmail}
                    className="w-full h-full text-sm rounded bg-block text-secondary"
                    required
                  />
                </div>
              </td>

              <td className="w-64 text-secondary h-12 md:h-14 lg:h-16 border-t-2 px-2">
                <div className="flex items-center h-full">
                  <textarea
                    name="address"
                    placeholder="Adresse"
                    value={newUser.address}
                    onChange={(e) => {
                      handleAddress(
                        e as React.ChangeEvent<HTMLTextAreaElement>,
                      );
                      e.currentTarget.style.height = "auto";
                      e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                    }}
                    rows={1}
                    className="w-full h-auto resize-none overflow-hidden text-sm rounded bg-block text-secondary placeholder:items-center flex items-center"
                    required
                  />
                </div>
              </td>

              <td className="w-52 text-secondary h-12 md:h-14 lg:h-16 border-t-2 px-2">
                <div className="flex items-center h-full">
                  <input
                    name="phoneNumber"
                    type="text"
                    placeholder="Téléphone"
                    value={newUser.phoneNumber}
                    onChange={handlePhoneNumber}
                    className="w-full h-full text-sm rounded bg-block text-secondary"
                    required
                  />
                </div>
              </td>

              <td className="border-t-2">
                <div className="flex items-center justify-center h-full w-full">
                  <FaCheck className="cursor-pointer" onClick={handleAddUser} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {statusMessage && (
        <div
          className={`mt-3 text-sm text-center p-1 ${statusType === "error" ? "text-red-500" : "text-green-700"} rounded-xl`}
        >
          {statusMessage}
        </div>
      )}
    </>
  );
}

export default UserList;
