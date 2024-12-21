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
import OrderSideBar from "../../Pages/OrdersSideBar/OrderSideBar";

export default function Orders() {
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
    const restaurantData = [
      {
        id: "1001",
        code: "US001",
        name: "User 1",
        vendor: "Kings Kurry",
        product: "Dish 1",
        date: "19-12-2024",
        time: "08:37 AM",
        contactNo: "9876543210",
        status: "DELIVERED",
      },
      {
        id: "1002",
        code: "US002",
        name: "User 2",
        vendor: "Fajita Friends",
        product: "Dish 2",
        date: "19-12-2024",
        time: "08:37 AM",
        contactNo: "9876543210",
        status: "CANCELLED",
      },
      {
        id: "1003",
        code: "US003",
        name: "User 3",
        vendor: "Kings Kurry",
        product: "Dish 3",
        date: "19-12-2024",
        time: "08:37 AM",
        contactNo: "9876543210",
        status: "CANCELLED",
      },
      {
        id: "1004",
        code: "US004",
        name: "User 4",
        vendor: "Fajita Friends",
        product: "Dish 4",
        date: "19-12-2024",
        time: "08:37 AM",
        contactNo: "9876543210",
        status: "YET TO DELIVER",
      },
      {
        id: "1005",
        code: "US005",
        name: "User 5",
        vendor: "Ban Thai",
        product: "Dish 5",
        date: "19-12-2024",
        time: "08:37 AM",
        contactNo: "9876543210",
        status: "DELIVERED",
      },
      {
        id: "1006",
        code: "US006",
        name: "User 6",
        vendor: "Ban Thai",
        product: "Dish 6",
        date: "19-12-2024",
        time: "08:37 AM",
        contactNo: "9876543210",
        status: "DELIVERED",
      },
    ];

    setProducts(restaurantData);
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
      case "DELIVERED":
        return "success";

      case "YET TO DELIVER":
        return "warning";

      case "CANCELLED":
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
        <p>Orders</p>
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
              field="code"
              header="User ID"
              sortable
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              field="name"
              header="Name"
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
              field="product"
              header="Product"
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
              field="contactNo"
              header="Contact No"
              sortable
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              field="status"
              header="Status"
              body={statusBodyTemplate}
              sortable
              style={{ minWidth: "10rem" }}
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
          <OrderSideBar />
        </Sidebar>
      </div>
    </div>
  );
}
