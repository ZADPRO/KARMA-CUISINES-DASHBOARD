import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import decrypt from "../../helper";
import { Toast } from "primereact/toast";
import { Fieldset } from "primereact/fieldset";

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
  refFoodCategory: "Combo";
  refFoodName: "Family Pack (2 Personen)";
  refFoodPrice: "69.00";
  refFoodQuantity: null;
  refIfCombo: true;
  subProduct: SubProductProps[];
}

interface UserOrderDetailsProps {
  TotalOrderPrice: "111.80";
  refCreateAt: "2025-05-06 14:59:59";
  refCreateBy: "User";
  order: OrderDetails[];
  refUserCountry: "Switzerland";
  refUserEmail: "faisal.khan@karmacuisine.ch";
  refUserFName: "FAISAL KHAN2";
  refUserId: 21;
  refUserLName: "M";
  refUserMobile: "41424242242";
  refUserPostCode: "8305";
  refUserStreet: "Industriestrasse 24";
  refUserZone: "Zurich";
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
          <p>Order ID: {orderId}</p>
          <p>User Name: {userOrderDetails?.refUserFName}</p>
        </Fieldset>
      </div>
    </div>
  );
};

export default OrderSidebar;
