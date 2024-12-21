import { Fieldset } from "primereact/fieldset";
import userSvg from "../../assets/images/userIcon.svg";
import offerSvg from "../../assets/images/userIcon.svg"; // Add an icon for offers
import { Tag } from "primereact/tag";

export default function TransactionSidebar() {
  return (
    <div>
      <div className="flex flex-column gap-10">
        {/* Transaction Details */}
        <Fieldset legend="Transaction ID: TXN12342">
          <div className="flex w-full align-items-center justify-center">
            <img src={userSvg} alt="User" width={100} />
            <div className="transactionDetails w-full ml-3">
              <div className="userDetails w-full flex justify-content-between">
                <p>
                  <b>Name:</b> User 1
                </p>
                <p>
                  <b>Vendor:</b> Kings Kurry
                </p>
              </div>
              <div className="transactionDetails mt-2">
                <p>
                  <b>Date: </b>19-12-2024
                </p>
                <p>
                  <b>Time: </b>08:37 AM
                </p>
                <p>
                  <b>Payment Method: </b>Credit Card
                </p>
                <div className="flex align-items-center justify-content-between w-full">
                  <p>
                    <b>Amount Paid: </b>$250.00
                  </p>
                  <Tag value="SUCCESS" severity="success"></Tag>
                </div>
              </div>
            </div>
          </div>
        </Fieldset>

        {/* Offer Details */}
        <Fieldset legend="Offer Details" style={{ marginTop: "20px" }}>
          <div className="flex w-full align-items-center justify-center">
            <img src={offerSvg} alt="Offer" width={100} />
            <div className="offerDetails w-full ml-3">
              <p>
                <b>Offer Applied: </b> Yes
              </p>
              <p>
                <b>Offer Details: </b> Get 10% off on orders above $100.
              </p>
            </div>
          </div>
        </Fieldset>

        {/* Additional Notes */}
        <Fieldset legend="Additional Notes" style={{ marginTop: "20px" }}>
          <p>
            <b>Note: </b> Please contact customer service for any discrepancies
            in transaction details.
          </p>
        </Fieldset>
      </div>
    </div>
  );
}
