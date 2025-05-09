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

const Orders: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetailsProps[] | []>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const dt = useRef<DataTable<OrderDetailsProps[]>>(null);

  const [selectedRestaurants, setSelectedRestaurants] = useState(null);
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
            Total Orders: {orderDetails.length}
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
            rounded
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

    return orderDetails.filter((order) => {
      const orderDate = order.refCreateAt.split(" ")[0]; // Extract the date part (yyyy-mm-dd)
      let valid = true;
      if (from && orderDate < from) valid = false;
      if (to && orderDate > to) valid = false;
      return valid;
    });
  };

  const header = renderHeader();

  return (
    <div>
      <div className="primaryNav">
        <p>Order</p>
        <p className="">Logged in as:</p>
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
            body={() => <Button icon="pi pi-print" />}
          />
          <Column
            field="refCustOrId"
            header="Order ID"
            frozen
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
    </div>
  );
};

export default Orders;
