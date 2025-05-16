import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

function NewsletterList() {
  const [newsLetterList, setNewsLetterList] = useState<string[]>(() => {
    // Récupérer depuis le localStorage et parser en tableau
    const storedData = localStorage.getItem("newsletterEmailList");
    return storedData ? JSON.parse(storedData) : [];
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<string>("");
  const [addEmailRow, setAddEmailRow] = useState<boolean>(false);
  const [newEmailInput, setNewEmailInput] = useState("");

  function handleAddUserNewsletter() {
    const newEmail = newEmailInput.trim(); // On retire les espaces superflus
    const regex = /\S+@\S+\.\S+/;

    if (newEmail === "") {
      setStatusMessage("❌ Veuillez entrer un email !");
      setStatusType("error");
      setNewEmailInput("");
      return;
    }

    if (!regex.test(newEmail)) {
      setStatusMessage("❌ Veuillez entrer un email valide !");
      setStatusType("error");
      return;
    }

    if (newsLetterList.includes(newEmail)) {
      setStatusMessage("❌ Cet email est déjà inscrit à la newsletter !");
      setStatusType("error");
      setNewEmailInput("");
      return;
    }

    const newEmailList = [...newsLetterList, newEmail];
    localStorage.setItem("newsletterEmailList", JSON.stringify(newEmailList));
    setNewsLetterList(newEmailList);
    setNewEmailInput("");
    setStatusMessage("✅ Email ajouté à la newsletter !");
    setStatusType("success");
    setAddEmailRow(false);
  }

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  function handleRemoveEmail(email: string) {
    const newEmailList = newsLetterList.filter((mail) => mail !== email);
    setNewsLetterList(newEmailList);
    localStorage.setItem("newsletterEmailList", JSON.stringify(newEmailList));
  }

  function handleRemoveAllEmails() {
    setNewsLetterList([]);
    localStorage.removeItem("newsletterEmailList");
  }

  return (
    <>
      <h2 className="text-2xl text-center my-5 text-secondary font-bold mt-16">
        Inscription à la Newsletter
      </h2>

      <div className="px-4">
        <table className="table-fixed overflow-hidden border-separate border-spacing-0 rounded-lg border-4 border-secondary mx-auto w-full max-w-[250px] md:max-w-[400px] lg:max-w-[600px] xl:max-w-[800px]">
          <thead>
            <tr className="h-8 md:h-10 lg:h-12">
              <th className="bg-block rounded-tl-lg text-secondary md:text-2xl font-bold border-r-4 border-b-4">
                Email
              </th>
              <th className="bg-block rounded-tr-lg text-secondary md:text-2xl font-bold border-b-4 text-center w-16">
                <div className="flex items-center justify-center h-full w-full">
                  <FaTrashCan
                    className="cursor-pointer"
                    onClick={handleRemoveAllEmails}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {newsLetterList.length > 0 ? (
              newsLetterList.map((mail) => (
                <tr
                  key={mail}
                  className="bg-block text-secondary border-t-2 h-8 md:h-10 lg:h-12"
                >
                  <td className="pl-2 break-all whitespace-normal max-w-[200px] md:max-w-[300px] lg:max-w-[400px]">
                    {mail}
                  </td>

                  <td className="text-center p-2">
                    <div className="flex items-center justify-center">
                      <FaTrashCan
                        className="cursor-pointer"
                        onClick={() => handleRemoveEmail(mail)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <td
                className="bg-block text-secondary text-sm lg:text-base text-center pl-2 md:pl-0 font-semibold h-8 md:h-10 lg:h-12"
                colSpan={2}
              >
                Aucune inscription enregistrée...
              </td>
            )}

            {addEmailRow && (
              <tr className="bg-block text-secondary">
                <td className="text-secondary h-8 border-t-2 text-center md:text-left md:h-10 lg:h-12">
                  <div className="flex items-center justify-center ">
                    <textarea
                      rows={1}
                      id="addEmail"
                      placeholder="Email"
                      className="pl-2 w-full h-full resize-none text-sm break-words lg:text-base"
                      required
                      value={newEmailInput}
                      onChange={(e) => setNewEmailInput(e.target.value)}
                    />
                  </div>
                </td>
                <td className="border-t-2">
                  <div className="flex items-center justify-center">
                    <FaCheck
                      className="cursor-pointer"
                      onClick={handleAddUserNewsletter}
                    />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="w-full max-w-[250px] md:max-w-[400px] lg:max-w-[600px] xl:max-w-[800px] mx-auto mt-4 flex items-center justify-end">
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
            if (addEmailRow) setNewEmailInput("");
            setAddEmailRow(!addEmailRow);
          }}
          className="bg-button hover:bg-button/50 cursor-pointer text-secondary px-4 py-2 rounded-full border-secondary border-3 font-semibold text-sm md:text-base ml-4"
        >
          {addEmailRow ? "Annuler l'ajout" : "Ajouter un email"}
        </button>
      </div>
    </>
  );
}

export default NewsletterList;
