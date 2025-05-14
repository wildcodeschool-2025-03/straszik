import { useState } from "react";
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
  const [userList, setUserList] = useState<User[]>(
    JSON.parse(localStorage.getItem("userList") || "[]") as User[],
  );
  const [isNewEmail, setIsNewEmail] = useState(false);

  const newUser: NewUser = {
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
  };

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
    if (isNewEmail) {
      newUser.id = userList.length + 1;
      const newUserList = [...userList, newUser];
      localStorage.setItem("userList", JSON.stringify(newUserList));
      setUserList(newUserList);
      const allInput = document.querySelectorAll("input");
      for (const input of allInput) {
        input.value = "";
      }
    } else {
      alert("Cet email existe déjà");
    }
  }

  function handleLastName(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    newUser.lastName = e.currentTarget.value;
    console.log(newUser.lastName);
  }

  function handleFirstName(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    newUser.firstName = e.currentTarget.value;
    console.log(newUser.firstName);
  }

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (userList.some((user) => user.email === newUser.email)) {
      setIsNewEmail(false);
    } else {
      setIsNewEmail(true);
      newUser.email = e.currentTarget.value;
      console.log(newUser.email);
    }
  }

  function handleAddress(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    newUser.address = e.currentTarget.value;
    console.log(newUser.address);
  }

  function handlePhoneNumber(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    newUser.phoneNumber = e.currentTarget.value;
    console.log(newUser.phoneNumber);
  }

  return (
    <>
      <h2 className="text-2xl text-center my-5 text-secondary font-bold mt-16">
        Comptes
      </h2>
      <table
        className="overflow-hidden
            border-separate border-spacing-0 rounded-lg border-4 border-secondary mx-auto w-full max-w-[250px] md:max-w-[500px] lg:max-w-[800px] xl:max-w-[1000px]"
      >
        <thead>
          <tr>
            <th className="bg-block rounded-tl-lg text-secondary md:text-2xl font-bold md:p-4 pt-0.5 px-1 md:px-10 border-r-4 border-b-2">
              ID
            </th>
            <th className="bg-block text-secondary md:text-2xl font-bold md:p-4 pt-0.5 px-1 md:px-10 border-r-4 border-b-2">
              Nom
            </th>
            <th className="bg-block text-secondary md:text-2xl font-bold text-center pt-0.5 md:p-4 px-1 md:px-10 border-r-4 border-b-2">
              Prénom
            </th>
            <th className="bg-block text-secondary md:text-2xl font-bold text-center pt-0.5 md:p-4 px-1 md:px-10 border-r-4 border-b-2">
              Email
            </th>
            <th className="bg-block text-secondary md:text-2xl font-bold text-center pt-0.5 md:p-4 px-1 md:px-10 border-r-4 border-b-2">
              Adresse
            </th>
            <th className="bg-block text-secondary md:text-2xl font-bold text-center pt-0.5 md:p-4 px-1 md:px-10 border-r-4 border-b-2">
              Téléphone
            </th>
            <th className="bg-block rounded-tr-lg text-secondary md:text-2xl font-bold text-center pt-0.5 md:p-4 px-2 md:px-10 border-b-2">
              <FaTrashCan />
            </th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 ? (
            userList.map((user) => (
              <tr key={user.id} className=" bg-block text-secondary">
                <td className=" text-secondary md:text-2xl pt-0.5 h-23 lg:h-30 border-t-2 ">
                  <p> {user.id}</p>
                </td>
                <td className=" text-secondary md:text-2xl pt-0.5 h-23 lg:h-30 border-t-2 ">
                  <p> {user.lastName}</p>
                </td>
                <td className=" text-secondary md:text-2xl pt-0.5 h-23 lg:h-30 border-t-2 ">
                  <p> {user.firstName}</p>
                </td>
                <td className=" text-secondary md:text-2xl pt-0.5 h-23 lg:h-30 border-t-2 ">
                  <p> {user.email}</p>
                </td>
                <td className=" text-secondary md:text-2xl pt-0.5 h-23 lg:h-30 border-t-2 ">
                  <p> {user.address}</p>
                </td>
                <td className=" text-secondary md:text-2xl pt-0.5 h-23 lg:h-30 border-t-2 ">
                  <p> {user.phoneNumber}</p>
                </td>
                <td className=" text-secondary md:text-2xl pt-0.5 h-23 lg:h-30 border-t-2 ">
                  <p> </p>
                </td>
                <td className="text-center p-2 md:p-11 border-t-2">
                  <FaTrashCan onClick={() => handleRemoveUser(user.id)} />
                </td>
              </tr>
            ))
          ) : (
            <td
              className="bg-block text-secondary text-center font-semibold border-t-2 p-4"
              colSpan={8}
            >
              Aucun utilisateur inscrit...
            </td>
          )}
          <tr className=" bg-block text-secondary">
            <td className=" text-secondary md:text-2xl pt-0.5 h-23 lg:h-30 border-t-2 ">
              {" "}
            </td>
            <td className=" text-secondary md:text-2xl pt-0.5 h-23 lg:h-30 border-t-2 ">
              <input
                name="lastName"
                type="text"
                placeholder="Nom"
                onChange={handleLastName}
              />
            </td>
            <td className=" text-secondary md:text-2xl pt-0.5 h-23 lg:h-30 border-t-2 ">
              <input
                name="firstName"
                type="text"
                placeholder="Prénom"
                onChange={handleFirstName}
              />
            </td>
            <td className=" text-secondary md:text-2xl pt-0.5 h-23 lg:h-30 border-t-2 ">
              <input
                name="email"
                type="text"
                placeholder="Email"
                onChange={handleEmail}
              />
            </td>
            <td className=" text-secondary md:text-2xl pt-0.5 h-23 lg:h-30 border-t-2 ">
              <input
                name="address"
                type="text"
                placeholder="Adresse"
                onChange={handleAddress}
              />
            </td>
            <td className=" text-secondary md:text-2xl pt-0.5 h-23 lg:h-30 border-t-2 ">
              <input
                name="phoneNumber"
                type="text"
                placeholder="Téléphone"
                onChange={handlePhoneNumber}
              />
            </td>

            <td className="text-center p-2 md:p-11 border-t-2">
              <FaCheck onClick={handleAddUser} />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default UserList;
