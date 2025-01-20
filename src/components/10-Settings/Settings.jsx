import { DataView } from "primereact/dataview";
import offersIcon from "../../assets/settings/offerIcon.svg";
import category from "../../assets/settings/food.svg";
import restroDoc from "../../assets/settings/restroDoc.svg";
import paymentMethods from "../../assets/settings/payment.svg";
import money from "../../assets/settings/moneyTransfer.svg";

const cardsData = [
  { id: 1, title: "Offers", icon: offersIcon },
  { id: 2, title: "Food Category", icon: category },
  { id: 3, title: "Restro Documents", icon: restroDoc },
  { id: 4, title: "Payment Methods", icon: paymentMethods },
  { id: 5, title: "Money Transfer", icon: money },
];

export default function Settings() {
  const renderCard = (card) => (
    <div className="col-12 sm:col-6 lg:col-3">
      <div className="card shadow-2 m-2 p-4 border-round">
        <div className="flex align-items-center justify-content-between">
          <span>{card.title}</span>
          <img src={card.icon} width={70} alt={card.title} />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="primaryNav">
        <p>Settings</p>
        <p className="">Logged in as: Admin</p>
      </div>
      <DataView
        value={cardsData}
        layout="grid"
        itemTemplate={renderCard}
        className="p-grid"
      />
    </div>
  );
}
