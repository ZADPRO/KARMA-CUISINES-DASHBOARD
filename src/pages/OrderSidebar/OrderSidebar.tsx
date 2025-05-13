import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import decrypt from "../../helper";
import { Toast } from "primereact/toast";
import { Fieldset } from "primereact/fieldset";
import { Divider } from "primereact/divider";

interface OrderSidebarProps {
  orderId: string | null;
}

interface SubProductProps {
  refFoodName: string;
  refFoodQuantity: string;
  refFoodType: string;
}

interface OrderDetails {
  refComments: null;
  refFoodCategory: string;
  refFoodName: string;
  refFoodPrice: string;
  refFoodQuantity: string;
  refPaymentType: string;
  refIfCombo: boolean;
  subProduct: SubProductProps[];
}

interface UserOrderDetailsProps {
  TotalOrderPrice: string;
  refCreateAt: string;
  refCreateBy: string;
  order: OrderDetails[];
  refUserCountry: string;
  refUserEmail: string;
  refUserFName: string;
  refUserId: number;
  refUserLName: string;
  refUserMobile: string;
  refUserPostCode: string;
  refUserStreet: string;
  refUserZone: string;
}

const OrderSidebar: React.FC<OrderSidebarProps> = ({ orderId }) => {
  const toastRef = useRef<Toast>(null);

  const [userOrderDetails, setUserOrderDetails] =
    useState<UserOrderDetailsProps | null>(null);

  useEffect(() => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/productCombo/viewOrderData`,
        { orderId: orderId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWTtoken")}`,
          },
        }
      )
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        console.log("data.data line 33", data);
        setUserOrderDetails(data.data[0]);
      })
      .catch((error) => {
        toastRef.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error Fetching Product Add-ons",
          life: 3000,
        });
        console.error("Fetch error", error);
      });
  }, []);
  return (
    <div>
      <div>
        <Fieldset legend="Order Details">
          <div className="flex justify-content-between">
            <p>
              <b>Order ID: </b>
              {orderId}
            </p>
            <p>
              <b>User Name:</b> {userOrderDetails?.refUserFName}
            </p>
          </div>
          <div className="flex justify-content-between">
            <p>
              <b>User Email:</b> {userOrderDetails?.refUserEmail}
            </p>
            <p>
              <b>User Mobile: </b>
              {userOrderDetails?.refUserMobile}
            </p>
          </div>
          <p>
            <b> User Address: </b>
            {userOrderDetails?.refUserStreet},{" "}
            {userOrderDetails?.refUserPostCode}, {userOrderDetails?.refUserZone}
            , {userOrderDetails?.refUserCountry}
          </p>
          <p>
            <b>Total Price:</b> CHF {userOrderDetails?.TotalOrderPrice}
          </p>
          <p className="capitalize">
            <b>Payment:</b> {userOrderDetails?.order[0].refPaymentType}
          </p>
        </Fieldset>

        <Divider />

        <Fieldset legend="Ordered Items">
          {userOrderDetails?.order?.map((item, index) => (
            <div key={index} className="mb-3 border-bottom pb-2">
              <p>
                <b>{index + 1}.</b> <b>Food Name:</b> {item.refFoodName}
              </p>
              <p>
                <b>Category:</b> {item.refFoodCategory}
              </p>
              <p>
                <b>Price:</b> CHF {item.refFoodPrice}
              </p>
              {item.refFoodQuantity && (
                <p>
                  <b>Quantity:</b> {item.refFoodQuantity}
                </p>
              )}
              {item.refComments && (
                <p>
                  <b>Comments:</b> {item.refComments}
                </p>
              )}
              {item.refIfCombo && item.subProduct?.length > 0 && (
                <div className="">
                  <p>
                    <b>Combo Items:</b>
                  </p>
                  <ul className="pl-4 list-disc">
                    {item.subProduct.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        {subItem.refFoodName} (Qty: {subItem.refFoodQuantity},
                        Type: {subItem.refFoodType})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </Fieldset>
      </div>
    </div>
  );
};

export default OrderSidebar;
