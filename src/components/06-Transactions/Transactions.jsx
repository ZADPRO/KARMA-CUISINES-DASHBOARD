import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { FloatLabel } from "primereact/floatlabel";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import { Calendar } from "primereact/calendar";
import { Tag } from "primereact/tag";
import TransactionSidebar from "../../Pages/TransactionSidebar/TransactionSidebar";

export default function Transactions() {
  let emptyProduct = {
    id: null,
    name: "",
    image: null,
    description: "",
    category: null,
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: "INSTOCK",
  };
  const [products, setProducts] = useState(null);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewData, setViewData] = useState(false);

  const [selectedCities, setSelectedCities] = useState(null);
  const cities = [
    { name: "Restaurant 1", code: "NY" },
    { name: "Restaurant 2", code: "RM" },
    { name: "Restaurant 3", code: "LDN" },
    { name: "Restaurant 4", code: "IST" },
    { name: "Restaurant 5", code: "PRS" },
  ];

  useEffect(() => {
    const transactionData = [
      {
        id: "T1001",
        transactionId: "TXN12342",
        user: "User 1",
        vendor: "Kings Kurry",
        amount: "CHF 250.00",
        date: "19-12-2024",
        time: "08:37 AM",
        paymentMethod: "Credit Card",
        status: "SUCCESS",
        offerApplied: "Yes",
      },
      {
        id: "T1002",
        transactionId: "TXN12343",
        user: "User 2",
        vendor: "Fajita Friends",
        amount: "CHF 150.00",
        date: "20-12-2024",
        time: "10:15 AM",
        paymentMethod: "UPI",
        status: "PENDING",
        offerApplied: "No",
      },
      {
        id: "T1003",
        transactionId: "TXN12344",
        user: "User 3",
        vendor: "Kings Kurry",
        amount: "CHF 300.00",
        date: "20-12-2024",
        time: "01:45 PM",
        paymentMethod: "Cash",
        status: "FAILED",
        offerApplied: "No",
      },
      {
        id: "T1004",
        transactionId: "TXN12345",
        user: "User 4",
        vendor: "Pizza Palace",
        amount: "CHF 180.00",
        date: "21-12-2024",
        time: "05:25 PM",
        paymentMethod: "Debit Card",
        status: "SUCCESS",
        offerApplied: "Yes",
      },
      {
        id: "T1005",
        transactionId: "TXN12346",
        user: "User 5",
        vendor: "Sushi World",
        amount: "CHF 350.00",
        date: "22-12-2024",
        time: "11:00 AM",
        paymentMethod: "Net Banking",
        status: "SUCCESS",
        offerApplied: "Yes",
      },
      {
        id: "T1006",
        transactionId: "TXN12347",
        user: "User 6",
        vendor: "Taco Town",
        amount: "CHF 120.00",
        date: "23-12-2024",
        time: "02:15 PM",
        paymentMethod: "UPI",
        status: "FAILED",
        offerApplied: "No",
      },
      {
        id: "T1007",
        transactionId: "TXN12348",
        user: "User 7",
        vendor: "Burger Hub",
        amount: "CHF 200.00",
        date: "23-12-2024",
        time: "07:45 PM",
        paymentMethod: "Credit Card",
        status: "SUCCESS",
        offerApplied: "No",
      },
      {
        id: "T1008",
        transactionId: "TXN12349",
        user: "User 8",
        vendor: "Vegan Delight",
        amount: "CHF 275.00",
        date: "24-12-2024",
        time: "06:30 PM",
        paymentMethod: "Cash",
        status: "SUCCESS",
        offerApplied: "Yes",
      },
      {
        id: "T1009",
        transactionId: "TXN12350",
        user: "User 9",
        vendor: "Smoothie Stop",
        amount: "CHF 90.00",
        date: "24-12-2024",
        time: "08:00 AM",
        paymentMethod: "Debit Card",
        status: "FAILED",
        offerApplied: "No",
      },
      {
        id: "T1010",
        transactionId: "TXN12351",
        user: "User 10",
        vendor: "Pasta House",
        amount: "CHF 220.00",
        date: "25-12-2024",
        time: "09:30 PM",
        paymentMethod: "Net Banking",
        status: "SUCCESS",
        offerApplied: "Yes",
      },
    ];

    setProducts(transactionData);
  }, []);

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id);

    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.status} severity={getSeverity(rowData)}></Tag>;
  };

  const getSeverity = (product) => {
    switch (product.status) {
      case "SUCCESS":
        return "success";

      case "PENDING":
        return "warning";

      case "FAILED":
        return "danger";

      default:
        return null;
    }
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0"></h4>
      <div className="rightDiv flex gap-2 p-3">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
          />
        </IconField>
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-success"
          onClick={exportCSV}
        />
      </div>
    </div>
  );

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );

  const handleVendorClick = (vendor) => {
    setViewData(true);
    console.log(vendor);
  };
  return (
    <div>
      <div className="primaryNav">
        <p>Transactions</p>
        <p className="">Logged in as: Admin</p>
      </div>
      <div className="">
        <Toast ref={toast} />
        <div className="card ml-3 mr-3">
          <div className="filterTabs flex flex-wrap align-items-center justify-content-between gap-4 mb-3">
            <div className="dataFilterContainer flex flex-wrap gap-5 ">
              <FloatLabel className="w-full md:w-20rem mt-5">
                <MultiSelect
                  value={selectedCities}
                  onChange={(e) => setSelectedCities(e.value)}
                  options={cities}
                  optionLabel="name"
                  maxSelectedLabels={3}
                  className="w-full"
                />
                <label htmlFor="ms-cities">Restaurant Filter</label>
              </FloatLabel>

              <FloatLabel className="w-full md:w-20rem mt-5">
                <Calendar
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.value)}
                  dateFormat="dd/mm/yy"
                  showIcon
                  className="w-full"
                />
                <label htmlFor="calendar-date">Date Filter</label>
              </FloatLabel>

              <FloatLabel className="w-full md:w-20rem mt-5">
                <MultiSelect
                  value={selectedCities}
                  onChange={(e) => setSelectedCities(e.value)}
                  options={cities}
                  optionLabel="name"
                  maxSelectedLabels={3}
                  className="w-full"
                />
                <label htmlFor="ms-cities">Restaurant Filter</label>
              </FloatLabel>
            </div>
          </div>
          <DataTable
            ref={dt}
            value={products}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="id"
            paginator
            showGridlines
            scrollable
            rows={5}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            globalFilter={globalFilter}
            header={header}
          >
            <Column
              selectionMode="multiple"
              frozen
              style={{ background: "white" }}
            ></Column>
            <Column
              field="id"
              header="Order ID"
              sortable
              frozen
              body={(rowData) => (
                <span
                  style={{
                    color: "blue",
                  }}
                  onClick={() => handleVendorClick(rowData)}
                >
                  {rowData.id}
                </span>
              )}
              style={{ minWidth: "8rem", background: "white" }}
            ></Column>
            <Column
              field="transactionId"
              header="Transaction ID"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="user"
              header="User"
              sortable
              style={{ minWidth: "11rem" }}
            ></Column>
            <Column
              field="vendor"
              header="Vendor Name"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="amount"
              header="Price"
              sortable
              style={{ minWidth: "9rem" }}
            ></Column>
            <Column
              field="date"
              header="Date"
              sortable
              style={{ minWidth: "9rem" }}
            ></Column>
            <Column
              field="time"
              header="Time"
              sortable
              style={{ minWidth: "9rem" }}
            ></Column>
            <Column
              field="status"
              header="Status"
              body={statusBodyTemplate}
              sortable
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              field="paymentMethod"
              header="Payment Method"
              sortable
              style={{ minWidth: "13rem" }}
            ></Column>
            <Column
              field="offerApplied"
              header="Offer Applied"
              sortable
              style={{ minWidth: "13rem" }}
            ></Column>
          </DataTable>
        </div>

        <Dialog
          visible={deleteProductDialog}
          style={{ inlineSize: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Confirm"
          modal
          footer={deleteProductDialogFooter}
          onHide={hideDeleteProductDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {product && (
              <span>
                Are you sure you want to delete <b>{product.name}</b>?
              </span>
            )}
          </div>
        </Dialog>

        <Sidebar
          visible={viewData}
          position="right"
          onHide={() => setViewData(false)}
          style={{ inlineSize: "800px" }}
        >
          <TransactionSidebar />
        </Sidebar>
      </div>
    </div>
  );
}
