import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Sidebar } from "primereact/sidebar";

import AddVendorStepper from "../../Pages/AddVendorStepper/AddVendorStepper";
import PreviewVendorStepper from "../../Pages/PreviewVendorStepper/PreviewVendorStepper";
import { FloatLabel } from "primereact/floatlabel";
import { MultiSelect } from "primereact/multiselect";

export default function Users() {
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

  const [products, setProducts] = useState([]);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const [addNew, setAddNew] = useState(false);
  const [viewData, setViewData] = useState(false);

  const [typeOfUsers, setTypeOfUsers] = useState(null);
  const usersList = [
    { name: "Registered Users", code: "NY" },
    { name: "Temporary Users", code: "RM" },
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
        <p>Users</p>
        <p className="">Logged in as: Admin</p>
      </div>
      <div className="">
        <Toast ref={toast} />
        <div className="card ml-3 mr-3">
          <div className="filterTabs flex flex-wrap align-items-center justify-content-between gap-4 mb-3">
            <div className="dataFilterContainer flex flex-wrap gap-5 ">
              <FloatLabel className="w-full md:w-20rem mt-5">
                <MultiSelect
                  value={typeOfUsers}
                  onChange={(e) => setTypeOfUsers(e.value)}
                  options={usersList}
                  optionLabel="name"
                  disabled
                  maxSelectedLabels={3}
                  className="w-full"
                />
                <label htmlFor="ms-usersList">Users Filter</label>
              </FloatLabel>
              <div className="w-full md:w-20rem mt-5">
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-search" />
                  <InputText
                    type="search"
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                  />
                </IconField>
              </div>
            </div>
            <div className="buttons mt-5">
              <Button
                icon="pi pi-pencil"
                rounded
                outlined
                severity="secondary"
                className="mr-2"
                disabled
                onClick={() => setAddNew(true)}
              />
              <Button
                icon="pi pi-trash"
                rounded
                outlined
                disabled
                severity="danger"
                onClick={() => confirmDeleteProduct(true)}
              />
            </div>
          </div>
          <DataTable
            ref={dt}
            value={products}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="id"
            showGridlines
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            scrollable
            globalFilter={globalFilter}
          >
            <Column
              selectionMode="multiple"
              style={{ background: "white" }}
              frozen
            ></Column>
            <Column
              field="id"
              header="Vendor ID"
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
              style={{ minWidth: "10rem", background: "white" }}
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
              style={{ minWidth: "13rem" }}
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
          visible={addNew}
          position="right"
          style={{ inlineSize: "1000px" }}
          onHide={() => setAddNew(false)}
        >
          <AddVendorStepper />
        </Sidebar>

        <Sidebar
          visible={viewData}
          position="right"
          onHide={() => setViewData(false)}
          style={{ inlineSize: "1000px" }}
        >
          <PreviewVendorStepper />
        </Sidebar>
      </div>
    </div>
  );
}
