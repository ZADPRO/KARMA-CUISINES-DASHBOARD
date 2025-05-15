import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import decrypt from "../../helper";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { Nullable } from "primereact/ts-helpers";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import OrderSidebar from "../../pages/OrderSidebar/OrderSidebar";

interface OrderDetailsProps {
  refCreateAt: string;
  refCustOrId: string;
  refFoodAmtPaid: string;
  refPaymentType: string;
  refUserFName: string;
  refUserLName: string;
  refUserMobile: string;
  refStoreId: number;
  refUserPostCode?: string;
  refUserZone?: string;
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
  refPaymentType: string;
  refFoodQuantity: string;
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
  floor: string;
  refUserStreet: string;
  refUserZone: string;
}

const Orders: React.FC = () => {
  const [userOrderDetails, setUserOrderDetails] =
    useState<UserOrderDetailsProps | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetailsProps[] | []>(
    []
  );
  const [visibleSidebar, setVisibleSidebar] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const dt = useRef<DataTable<OrderDetailsProps[]>>(null);

  const [selectedRestaurants, setSelectedRestaurants] = useState<
    number[] | null
  >(null);
  const [fromDate, setFromDate] = useState<Nullable<Date>>(null);
  const [toDate, setToDate] = useState<Nullable<Date>>(null);

  const restaurants = [
    { name: "Kings Kurry", code: 1 },
    { name: "Ban Thai", code: 2 },
    { name: "Fajita Friends", code: 3 },
    { name: "Sushi Heaven", code: 4 },
    { name: "O! Momos", code: 5 },
  ];

  const getCategory = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/productCombo/orderList", {
        headers: {
          Authorization: localStorage.getItem("JWTtoken"),
        },
      })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        setOrderDetails(data.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const exportCSV = (selectionOnly: any) => {
    dt.current?.exportCSV({ selectionOnly });
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between flex-wrap gap-2 align-items-center py-3">
        <div className="flex align-items-center gap-2">
          <span className="font-bold text-lg">
            Total Orders: {orderDetails?.length}
          </span>
        </div>
        <div className="flex gap-3">
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search Here"
          />
          <Button
            type="button"
            icon="pi pi-file"
            severity="success"
            onClick={() => exportCSV(false)}
            data-pr-tooltip="CSV"
          />
        </div>
      </div>
    );
  };

  const handleDateFilter = () => {
    const from = fromDate ? fromDate.toISOString().split("T")[0] : null;
    const to = toDate ? toDate.toISOString().split("T")[0] : null;

    const filteredByRestaurant = selectedRestaurants?.length
      ? orderDetails.filter((order) =>
          selectedRestaurants.includes(order.refStoreId)
        )
      : orderDetails;
    console.log("selectedRestaurants", selectedRestaurants);
    console.log("filteredByRestaurant", filteredByRestaurant);

    return filteredByRestaurant.filter((order) => {
      const orderDate = order.refCreateAt.split(" ")[0];
      let valid = true;
      if (from && orderDate < from) valid = false;
      if (to && orderDate > to) valid = false;
      return valid;
    });
  };

  const header = renderHeader();

  const orderIdBodyTemplate = (rowData: any) => {
    return (
      <span
        style={{
          cursor: "pointer",
          color: "blue",
          textDecoration: "underline",
        }}
        onClick={() => {
          setSelectedOrderId(rowData.refCustOrId);
          setVisibleSidebar(true);
        }}
      >
        {rowData.refCustOrId}
      </span>
    );
  };

  const handlePrint = (rowData: any) => {
    // Fetch order data via axios
    console.log("selectedOrderId", rowData);
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/productCombo/viewOrderData`,
        { orderId: rowData.refCustOrId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWTtoken")}`,
          },
        }
      )
      .then((res) => {
        // Decrypt the data
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        // Set the user order details in state
        console.log("data", data);
        setUserOrderDetails(data.data[0]);
        setSelectedOrderId(rowData.refCustOrId);
      })
      .catch((error) => {
        console.error("Fetch error", error);
      });
  };

  const logoUrl = `${window.location.origin}/logoImg.jpg`;

  useEffect(() => {
    console.log(
      "userOrderDetails?.order?.[0]?.refPaymentType",
      userOrderDetails?.order?.[0]?.refPaymentType
    );
    if (userOrderDetails && userOrderDetails.refUserFName) {
      const printContents = `
      <div style="padding: 20px; font-family: Arial, sans-serif; font-size: 14px; text-align: center;">
        <img id="print-logo" src="${logoUrl}" alt="Karma Cuisines" style="max-width: 60%; height: auto; margin-bottom: 10px;" />
        <p style="text-align: center; font-weight: bold;">Order Number: ${selectedOrderId}</p>
        
        <div><hr />
          ${userOrderDetails.order
            .map(
              (item) => `
              <div style="margin-bottom: 10px; display:flex; flex-direction:column; justify-content:start;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <p style="flex: 1; text-align: left;"><b>${
                    item.refFoodName
                  }</b></p>
                  <p style="flex: 0 0 auto; text-align: right;">CHF ${
                    item.refFoodPrice
                  }</p>
                </div>
                ${
                  item.refComments
                    ? `<p style="margin-top: 5px; font-style: italic;">Comments: ${item.refComments}</p>`
                    : ""
                }
              </div>`
            )
            .join("")}
          <hr />
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center;">
          <p style="flex: 1; text-align: left; font-weight: bold;">Total</p>
          <p style="flex: 0 0 auto; text-align: right;">CHF ${
            userOrderDetails.TotalOrderPrice
          }</p>
        </div>

        <hr />
        <div style="font-size: 12px;">
          <p><b>IMPORTANT:</b> FOR INFORMATION ON FOOD ALLERGENS</p>
          <p>Contact the restaurant or check their menu</p>
        </div>
        <hr />

        <div>
          <p><b>${
            userOrderDetails?.order?.[0]?.refPaymentType === "offline"
              ? "ORDER UNPAID"
              : "ORDER PAID"
          }</b></p>
        </div>

        <hr />
        <div>
          <p><b>Customer Details:</b></p>
          <p><b>Name:</b> ${userOrderDetails.refUserFName} ${
        userOrderDetails.refUserLName
      }</p>
          <p><b>Email:</b> ${userOrderDetails.refUserEmail}</p>
          <p><b>Mobile:</b> ${userOrderDetails.refUserMobile}</p>
          <p><b>Address:</b> ${userOrderDetails.refUserStreet}, ${
        userOrderDetails.refUserPostCode
      }, 
            ${
              userOrderDetails?.floor
                ? `Floor: ${userOrderDetails.floor}, `
                : ""
            }${userOrderDetails.refUserZone}, ${
        userOrderDetails.refUserCountry
      }</p>
        </div>
        <hr />
        <p>Thanks</p>
      </div>
    `;

      const printWindow = window.open("", "_blank", "width=800,height=600");
      if (printWindow) {
        printWindow.document.write(`
        <html>
          <head><title>Print Order Details</title></head>
          <body>${printContents}</body>
        </html>
      `);
        printWindow.document.close();

        const interval = setInterval(() => {
          const img = printWindow.document.getElementById(
            "print-logo"
          ) as HTMLImageElement | null;
          if (img && img.complete) {
            clearInterval(interval);
            printWindow.focus();
            printWindow.print();
            printWindow.close();
          }
        }, 100);
      } else {
        console.error("Failed to open the print window.");
      }
    }
  }, [userOrderDetails]);

  return (
    <div>
      <div className="primaryNav">
        <p>Order</p>
        <p className="">Logged in as: Admin</p>
      </div>

      <div className="card m-3 p-2">
        <div className="filters flex gap-3">
          <MultiSelect
            value={selectedRestaurants}
            onChange={(e: MultiSelectChangeEvent) =>
              setSelectedRestaurants(e.value)
            }
            options={restaurants}
            optionLabel="name"
            optionValue="code"
            placeholder="Select Restaurant"
            className="w-full md:w-14rem"
          />
          <Calendar
            value={fromDate}
            placeholder="Select From Date"
            onChange={(e) => setFromDate(e.value)}
            className="w-full md:w-14rem"
            dateFormat="yy-mm-dd"
            showIcon
          />
          <Calendar
            value={toDate}
            placeholder="Select To Date"
            onChange={(e) => setToDate(e.value)}
            className="w-full md:w-14rem"
            dateFormat="yy-mm-dd"
            maxDate={new Date()}
            showIcon
          />
        </div>

        <DataTable
          value={handleDateFilter()}
          showGridlines
          stripedRows
          paginator
          header={header}
          scrollable
          ref={dt}
          className="mt-3"
          rows={5}
          globalFilter={globalFilter}
          filters={{ global: { value: globalFilter, matchMode: "contains" } }}
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          rowsPerPageOptions={[5, 10, 25, 50]}
        >
          <Column
            field="sno"
            header="S.No"
            frozen
            body={(_, { rowIndex }) => rowIndex + 1}
          ></Column>
          <Column
            header="Print"
            frozen
            style={{ minWidth: "5rem" }}
            body={(rowData) => (
              <Button icon="pi pi-print" onClick={() => handlePrint(rowData)} />
            )}
          />
          <Column
            field="refCustOrId"
            header="Order ID"
            frozen
            sortable
            body={orderIdBodyTemplate}
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="refUserFName"
            header="First Name"
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="refUserLName"
            header="Last Name"
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            header="Order Date"
            style={{ minWidth: "10rem" }}
            body={(rowData) => rowData.refCreateAt.split(" ")[0]}
          />
          <Column
            header="Order Time"
            style={{ minWidth: "10rem" }}
            body={(rowData) => rowData.refCreateAt.split(" ")[1]}
          />
          <Column
            field="refFoodAmtPaid"
            header="Amount Paid"
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="refPaymentType"
            header="Payment Mode"
            style={{ minWidth: "10rem", textTransform: "capitalize" }}
          ></Column>
          <Column
            field="refUserMobile"
            header="Mobile Number"
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="refUserPostCode"
            header="Code"
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="refUserZone"
            header="Zone"
            style={{ minWidth: "10rem" }}
          ></Column>
        </DataTable>
      </div>

      <Sidebar
        visible={visibleSidebar}
        onHide={() => setVisibleSidebar(false)}
        position="right"
        style={{ width: "60vw" }}
      >
        <OrderSidebar orderId={selectedOrderId} />
      </Sidebar>
    </div>
  );
};

export default Orders;
