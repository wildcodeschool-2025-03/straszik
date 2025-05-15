import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

function NewsletterList() {
  const [newsLetterList, setNewsLetterList] = useState<string[]>(() => {
    // Récupérer depuis le localStorage et parser en tableau
    const storedData = localStorage.getItem("newsletterEmailList");
    return storedData ? JSON.parse(storedData) : [];
  });

  function handleAddUserNewsletter() {
    const emailInput = document.getElementById("addEmail") as HTMLInputElement;
    const newEmail = emailInput.value;
    const newEmailList = [...newsLetterList, newEmail];
    if (!newsLetterList.includes(newEmail)) {
      localStorage.setItem("newsletterEmailList", JSON.stringify(newEmailList));
      setNewsLetterList(newEmailList);
    } else {
      alert("Cet email est déjà inscrit à la newsletter !");
    }
  }

  function handleRemoveEmail(email: string) {
    const newEmailList = newsLetterList.filter((mail) => mail !== email);
    setNewsLetterList(newEmailList);
    localStorage.setItem("newsletterEmailList", JSON.stringify(newEmailList));
  }

  return (
    <>
      <h2 className="text-2xl text-center my-5 text-secondary font-bold mt-16">
        Newsletter
      </h2>

      <table
        className="overflow-hidden
            border-separate border-spacing-0 rounded-lg border-4 border-secondary mx-auto w-full max-w-[250px] md:max-w-[500px] lg:max-w-[800px] xl:max-w-[1000px]"
      >
        <thead>
          <tr>
            <th className="bg-block rounded-tl-lg text-secondary md:text-2xl font-bold md:p-4 pt-0.5 px-1 md:px-10 border-r-4 border-b-2">
              Email
            </th>
            <th className="bg-block rounded-tr-lg text-secondary md:text-2xl font-bold text-center pt-0.5 md:p-4 px-2 md:px-10 border-b-2">
              <FaTrashCan />
            </th>
          </tr>
        </thead>
        <tbody>
          {newsLetterList.length > 0 ? (
            newsLetterList.map((mail) => (
              <tr key={mail} className=" bg-block text-secondary border-t-2">
                <td>{mail}</td>
                <td className="text-center p-2 md:p-11 border-t-2 cursor-pointer">
                  <FaTrashCan onClick={() => handleRemoveEmail(mail)} />
                </td>
              </tr>
            ))
          ) : (
            <td
              className="bg-block text-secondary text-center font-semibold border-t-2 p-4"
              colSpan={2}
            >
              Aucun utilisateur inscrit...
            </td>
          )}
          <tr className=" bg-block text-secondary">
            <td className=" text-secondary md:text-2xl pt-0.5 h-23 lg:h-30 border-t-2 ">
              <input id="addEmail" type="email" placeholder="Email" />
            </td>
            <td className="text-center p-2 md:p-11 border-t-2 cursor-pointer">
              <FaCheck onClick={handleAddUserNewsletter} />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default NewsletterList;
