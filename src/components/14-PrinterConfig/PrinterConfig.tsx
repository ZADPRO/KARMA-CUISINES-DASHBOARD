import axios from "axios";
import React, { useEffect } from "react";
import decrypt from "../../helper";

const PrinterConfig: React.FC = () => {
  const getRestroDetails = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/printer/getRestro`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTtoken")}`,
        },
      })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("data", data);
        if (data.success) {
          //   setVendorDetails(data.result);
        }
      });
  };

  useEffect(() => {
    getRestroDetails();
  });

  return (
    <div>
      <div className="primaryNav">
        <p>Printer Configuration</p>
        <p className="">Logged in as: Admin</p>
      </div>
    </div>
  );
};

export default PrinterConfig;
