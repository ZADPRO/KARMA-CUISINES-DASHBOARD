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
import { Paginator } from "primereact/paginator";

import AddVendorStepper from "../../Pages/AddVendorStepper/AddVendorStepper";
import PreviewVendorStepper from "../../Pages/PreviewVendorStepper/PreviewVendorStepper";

export default function Vendors() {
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
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const onPageChange = (event) => {
    setCurrentPage(event.first);
    setRowsPerPage(event.rows);
  };

  const [restaurantVendors, setRestaurantVendor] = useState(null);
  const restaurants = [
    { name: "Kings Kurry" },
    { name: "Fajita Friends" },
    { name: "Ban Thai" },
    { name: "Sushi Haven" },
  ];

  useEffect(() => {
    const restaurantData = [
      {
        id: "1000",
        name: "Kings Kurry",
        cuisine: "Indian, Mughlai",
        contactNo: "9876543210",
        email: "info@kingskurry.com",
        status: "OPEN",
      },
      {
        id: "1001",
        name: "Ban Thai",
        cuisine: "Thai, Asian",
        contactNo: "9876543211",
        email: "info@banthai.com",
        status: "OPEN",
      },
      {
        id: "1002",
        name: "Sushi Haven",
        cuisine: "Japanese, Sushi",
        contactNo: "9876543212",
        email: "info@sushihaven.com",
        status: "CLOSED",
      },
      {
        id: "1003",
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

  const [filteredProducts, setFilteredProducts] = useState(null);

  useEffect(() => {
    let updatedProducts = products;
    if (restaurantVendors && restaurantVendors.length) {
      updatedProducts = updatedProducts.filter((product) =>
        restaurantVendors.some((vendor) => vendor.name === product.name)
      );
    }

    setFilteredProducts(updatedProducts);
  }, [restaurantVendors, products]);

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

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <div className="flex align-items-center gap-4">
        <h4 className="m-0"></h4>
      </div>
      <div className="leftDiv flex gap-2 align-items-center">
        <Paginator
          style={{ background: "transparent" }}
          first={currentPage}
          rows={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          onPageChange={onPageChange}
          totalRecords={products?.length || 0}
          // template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          // currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        />
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
          />
        </IconField>
        <Button
          icon="pi pi-plus"
          rounded
          className="mr-2"
          style={{ background: "#00052e" }}
          onClick={() => setAddNew(true)}
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
        <p>Vendors</p>
        <p className="">Logged in as: Admin</p>
      </div>
      <div className="">
        <Toast ref={toast} />
        <div className="card ml-3 mr-3">
          <div className="filterTabs flex flex-wrap align-items-center justify-content-between gap-4 mb-3">
            <div className="dataFilterContainer flex flex-wrap gap-5 ">
              <FloatLabel className="w-full md:w-20rem mt-5">
                <MultiSelect
                  value={restaurantVendors}
                  onChange={(e) => setRestaurantVendor(e.value)}
                  options={restaurants}
                  optionLabel="name"
                  maxSelectedLabels={3}
                  className="w-full"
                />
                <label htmlFor="ms-cities">Restaurant Filter</label>
              </FloatLabel>
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
            value={filteredProducts || products}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="id"
            showGridlines
            scrollable
            globalFilter={globalFilter}
            header={header}
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
              // body={(rowData) => (
              //   <span
              //     style={{
              //       color: "blue",
              //     }}
              //     onClick={() => handleVendorClick(rowData)}
              //   >
              //     {rowData.id}
              //   </span>
              // )}
              style={{ minWidth: "10rem", background: "white" }}
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
            {/* <Column
              field="status"
              header="Status"
              body={statusBodyTemplate}
              sortable
              style={{ minWidth: "12rem" }}
            ></Column> */}
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
