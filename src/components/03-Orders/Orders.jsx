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
import { Tag } from "primereact/tag";
import { Sidebar } from "primereact/sidebar";

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
  const [visibleRight, setVisibleRight] = useState(false);

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
        id: "1000",
        code: "VND001",
        name: "KingsKurry",
        cuisine: "Indian, Mughlai",
        contactNo: "9876543210",
        email: "info@kingskurry.com",
        status: "OPEN",
      },
      {
        id: "1001",
        code: "VND002",
        name: "Ban Thai",
        cuisine: "Thai, Asian",
        contactNo: "9876543211",
        email: "info@banthai.com",
        status: "OPEN",
      },
      {
        id: "1002",
        code: "VND003",
        name: "Sushi Haven",
        cuisine: "Japanese, Sushi",
        contactNo: "9876543212",
        email: "info@sushihaven.com",
        status: "CLOSED",
      },
      {
        id: "1003",
        code: "VND004",
        name: "Fajita Friends",
        cuisine: "Mexican, Tex-Mex",
        contactNo: "9876543213",
        email: "info@fajitafriends.com",
        status: "OPEN",
      },
    ];

    setProducts(restaurantData);
  }, []);

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
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

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => setVisibleRight(true)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const getSeverity = (product) => {
    switch (product.status) {
      case "OPEN":
        return "success";

      case "CLOSED":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Vendors</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </IconField>
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

  return (
    <div>
      <div className="primaryNav">
        <p>Orders</p>
        <p className="">Logged in as: Admin</p>
      </div>
      <div className="">
        <Toast ref={toast} />
        <div className="card ml-3 mr-3">
          <div className="filterTabs flex flex-wrap justify-content-evenly mb-3">
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
            <Column selectionMode="multiple" frozen></Column>
            <Column
              field="id"
              header="Vendor ID"
              sortable
              frozen
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              field="code"
              header="Code"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="name"
              header="Name"
              sortable
              style={{ minWidth: "16rem" }}
            ></Column>
            <Column
              field="cuisine"
              header="Category"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="contactNo"
              header="Contact No"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="email"
              header="Email ID"
              sortable
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              field="status"
              header="Status"
              body={statusBodyTemplate}
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "12rem" }}
            ></Column>
          </DataTable>
        </div>

        <Dialog
          visible={deleteProductDialog}
          style={{ width: "32rem" }}
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
          visible={visibleRight}
          position="right"
          style={{ width: "1000px" }}
          onHide={() => setVisibleRight(false)}
        >
          <h2>Right Sidebar</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </Sidebar>
      </div>
    </div>
  );
}
