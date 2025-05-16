import Header from "../../components/Header/Header";
import NewsletterList from "../../components/NewsletterList/NewsletterList";
import UserList from "../../components/UserList/UserList";

function Admin() {
  function handleDisconnect() {
    localStorage.setItem("userConnected", "{}");
    window.location.href = "/";
  }

  return (
    <>
      <Header />
      <h1 className="text-secondary text-4xl font-extrabold text-center lg:text-5xl mt-10 mb-14">
        ESPACE ADMINISTRATEUR
      </h1>
      <UserList />
      <NewsletterList />
      <section className="flex flex-col items-center gap-1 mt-16">
        <button
          onClick={handleDisconnect}
          className="bg-red-600 hover:bg-red-700 text-xl rounded-xl p-2 w-52 mb-4 font-semibold hover:scale-110"
          type="submit"
        >
          Se déconnecter
        </button>
      </section>
    </>
  );
}

export default Admin;
