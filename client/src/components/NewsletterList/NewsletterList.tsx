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

  function handleAddUserNewsletter() {
    const emailInput = document.getElementById(
      "addEmail",
    ) as HTMLTextAreaElement;
    const newEmail = emailInput.value.trim();
    const newEmailList = [...newsLetterList, newEmail];

    if (newEmail === "") {
      setStatusMessage("❌ Veuillez entrer un email !");
      setStatusType("error");
      emailInput.value = "";
    } else if (newsLetterList.includes(newEmail)) {
      setStatusMessage("❌ Cet email est déjà inscrit à la newsletter !");
      setStatusType("error");
      emailInput.value = "";
    } else {
      localStorage.setItem("newsletterEmailList", JSON.stringify(newEmailList));
      setNewsLetterList(newEmailList);
      emailInput.value = "";
      setStatusMessage("✅ Email ajouté à la newsletter !");
      setStatusType("success");
    }
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

      <table className="overflow-hidden border-separate border-spacing-0 rounded-lg border-4 border-secondary mx-auto w-full max-w-[250px] md:max-w-[400px] lg:max-w-[600px] xl:max-w-[800px]">
        <thead>
          <tr className="h-8 md:h-10 lg:h-12">
            <th className="bg-block rounded-tl-lg text-secondary md:text-2xl font-bold border-r-4 border-b-4">
              Email
            </th>
            <th className="bg-block rounded-tr-lg text-secondary md:text-2xl font-bold border-b-4 text-center p-2 md:p-4 md:px-2 lg:px-4">
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
                <td className="pl-2">{mail}</td>
                <td className="text-center p-2">
                  <div className="flex items-center justify-center h-full w-full">
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
              className="bg-block text-secondary text-center pl-2 md:pl-0 font-semibold h-8 md:h-10 lg:h-12"
              colSpan={2}
            >
              Aucune inscription enregistrée...
            </td>
          )}

          <tr className="bg-block text-secondary">
            <td className="text-secondary h-8 border-t-2 text-center md:text-left md:h-10 lg:h-12 flex items-center justify-center">
              <input
                id="addEmail"
                placeholder="Email"
                className="pl-2 w-full h-full resize-none"
              />
            </td>
            <td className="border-t-2">
              <div className="flex items-center justify-center h-full w-full">
                <FaCheck
                  className="cursor-pointer"
                  onClick={handleAddUserNewsletter}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {statusMessage && (
        <div
          className={`mt-3 font-semibold text-sm text-center ${statusType === "error" ? "text-red-500" : "text-green-700"} rounded-xl`}
        >
          {statusMessage}
        </div>
      )}
    </>
  );
}

export default NewsletterList;
