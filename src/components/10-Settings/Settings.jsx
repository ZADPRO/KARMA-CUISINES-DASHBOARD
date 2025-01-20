import { DataView } from "primereact/dataview";
import offersIcon from "../../assets/settings/offerIcon.svg";
import category from "../../assets/settings/food.svg";
import restroDoc from "../../assets/settings/restroDoc.svg";
import paymentMethods from "../../assets/settings/payment.svg";
import money from "../../assets/settings/moneyTransfer.svg";

import { Sidebar } from "primereact/sidebar";

import OffersSidebar from "../../Pages/OffersSidebar/OffersSidebar";
import FoodCategorySidebar from "../../Pages/FoodCategorySidebar/FoodCategorySidebar";
import RestroDocSidebar from "../../Pages/RestroDocSidebar/RestroDocSidebar";
import PaymentMethodsSidebar from "../../Pages/PaymentMethodsSidebar/PaymentMethodsSidebar";
import MoneyTransferSidebar from "../../Pages/MoneyTransferSidebar/MoneyTransferSidebar";
import { useState } from "react";

const cardsData = [
  { id: 1, title: "Offers", icon: offersIcon },
  { id: 2, title: "Food Category", icon: category },
  { id: 3, title: "Restro Documents", icon: restroDoc },
  { id: 4, title: "Payment Methods", icon: paymentMethods },
  { id: 5, title: "Money Transfer", icon: money },
];

export default function Settings() {
  const [visibleSidebar, setVisibleSidebar] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const renderCard = (card) => (
    <div
      className="col-12 sm:col-6 lg:col-3"
      onClick={() => handleCardClick(card)}
      style={{ cursor: "pointer" }}
    >
      <div className="card shadow-2 m-2 p-4 border-round">
        <div className="flex align-items-center justify-content-between">
          <span>{card.title}</span>
          <img src={card.icon} width={70} alt={card.title} />
        </div>
      </div>
    </div>
  );

  const handleCardClick = (card) => {
    setSelectedCard(card.title);
    setVisibleSidebar(true);
  };

  const renderSidebarContent = () => {
    switch (selectedCard) {
      case "Offers":
        return <OffersSidebar />;
      case "Food Category":
        return <FoodCategorySidebar />;
      case "Restro Documents":
        return <RestroDocSidebar />;
      case "Payment Methods":
        return <PaymentMethodsSidebar />;
      case "Money Transfer":
        return <MoneyTransferSidebar />;
      default:
        return <p>Select an option to view details.</p>;
    }
  };

  return (
    <div>
      <div className="primaryNav">
        <p>Settings</p>
        <p className="">Logged in as: Admin</p>
      </div>
      <div className="flex w-full items-center justify-content-center mt-4">
        <DataView
          value={cardsData}
          layout="grid"
          itemTemplate={renderCard}
          className="p-grid"
        />
      </div>

      <Sidebar
        visible={visibleSidebar}
        position="right"
        style={{ width: "70vw" }}
        onHide={() => setVisibleSidebar(false)}
      >
        {renderSidebarContent()}
      </Sidebar>
    </div>
  );
}
