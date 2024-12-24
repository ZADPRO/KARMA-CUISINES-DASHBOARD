import { DataView } from "primereact/dataview";
import offersIcon from "../../assets/images/offersIcon.svg";

const cardsData = [
  { id: 1, title: "Offers", icon: offersIcon },
  { id: 2, title: "Offers", icon: offersIcon },
  { id: 3, title: "Offers", icon: offersIcon },
  { id: 4, title: "Offers", icon: offersIcon },
  { id: 5, title: "Offers", icon: offersIcon },
  { id: 6, title: "Offers", icon: offersIcon },
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
