import CardAccount from "../../components/CardAccount/CardAccount";
import Header from "../../components/Header/Header";

//console.log(localStorage.getItem("userConnected"));

function Compte() {
  return (
    <>
      <div>
        <Header />
        <CardAccount />
      </div>
    </>
  );
}

export default Compte;
