import { Fieldset } from "primereact/fieldset";

import userSvg from "../../assets/images/userIcon.svg";
import { Tag } from "primereact/tag";

export default function OrderSideBar() {
  return (
    <div className="flex flex-column gap-10">
      <Fieldset legend="Order ID: 1001">
        <div className="flex w-full align-items-center justify-center">
          <img src={userSvg} alt="" width={100} />
          <div className="orderDetails w-full ml-3">
            <div className="userDetails w-full flex justify-content-between">
              <p>
                <b>Name:</b> User 1
              </p>
              <p>
                <b>Contact Number:</b> 9876543210
              </p>
            </div>
            <div className="orderDetails mt-2">
              <div className="flex justify-content-between align-items-center">
                <p>
                  <b>Order ID: </b>1001
                </p>
                <Tag value="DELIVERED" severity="success"></Tag>
              </div>
              <p>
                <b>Order Date: </b>19th December 2024
              </p>
              <p>
                <b>Order Time: </b>08:37 AM
              </p>
            </div>
          </div>
        </div>
      </Fieldset>
      <Fieldset
        legend="Product Details"
        className=""
        style={{ marginTop: "20px" }}
      >
        <div className="flex w-full align-items-center justify-center">
          <img src={userSvg} alt="" width={100} />
          <div className="orderDetails w-full ml-3">
            <div className="userDetails w-full flex justify-content-between">
              <p>
                <b>Vendor:</b> Kings Kurry
              </p>
              <p>
                <b>Contact Number:</b> 8899776633
              </p>
            </div>
            <div className="orderDetails mt-2">
              <p>
                <b>Dish Name: </b>Dish 1
              </p>
              <p>
                <b>Quantity: </b>1
              </p>
              <p>
                <b>Cuisine Type: </b>Indian
              </p>
            </div>
            <div className="userDetails w-full flex justify-content-between">
              <p>
                <b>From Delivery Address:</b> <br /> Kings Kurry, 123, ABC{" "}
                <br /> Street, XYZ City, 123456
              </p>
              <p>
                <b>To Delivery Address:</b> <br /> User 1, 123, ABC <br />{" "}
                Street, XYZ City, 123456
              </p>
            </div>
          </div>
        </div>
      </Fieldset>
      <Fieldset
        legend="Transaction Details"
        className=""
        style={{ marginTop: "20px" }}
      >
        <div className="flex w-full align-items-center justify-center">
          <img src={userSvg} alt="" width={100} />
          <div className="orderDetails w-full ml-3">
            <div className="orderDetails mt-2">
              <p>
                <b>Transaction ID: </b>TXN12342
              </p>
              <p>
                <b>Payment Method: </b>Credit Card
              </p>
              <p>
                <b>Amount Paid: </b>250
              </p>
            </div>
          </div>
        </div>
      </Fieldset>
    </div>
  );
}
