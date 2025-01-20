import { Beef, Euro, Utensils } from "lucide-react";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FloatLabel } from "primereact/floatlabel";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { TabPanel, TabView } from "primereact/tabview";
import { Tag } from "primereact/tag";
import { useEffect, useRef, useState } from "react";

export default function OffersSidebar() {
  const dt = useRef(null);

  const [filteredProducts, setFilteredProducts] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [restaurantVendors, setRestaurantVendor] = useState(null);

  const [products, setProducts] = useState(null);

  const restaurants = [{ name: "Percentage" }, { name: "Discount" }];

  const [formData, setFormData] = useState({
    restaurantName: "",
    productName: "",
    productPrice: "",
    description: "",
  });

  useEffect(() => {
    const restaurantData = [
      {
        id: "Percentage",
        code: "US001",
        name: "User 1",
        vendor: "Kings Kurry",
        product: "Dish 1",
        date: "19/12/2024",
        time: "08:37 AM",
        contactNo: "9876543210",
        status: "DELIVERED",
      },
      {
        id: "Percentage",
        code: "US002",
        name: "User 2",
        vendor: "Fajita Friends",
        product: "Dish 2",
        date: "19/12/2024",
        time: "08:37 AM",
        contactNo: "9876543210",
        status: "CANCELLED",
      },
      {
        id: "Discount",
        code: "US003",
        name: "User 3",
        vendor: "Kings Kurry",
        product: "Dish 3",
        date: "19/12/2024",
        time: "08:37 AM",
        contactNo: "9876543210",
        status: "CANCELLED",
      },
      {
        id: "Percentage",
        code: "US004",
        name: "User 4",
        vendor: "Fajita Friends",
        product: "Dish 4",
        date: "04/12/2024",
        time: "08:37 AM",
        contactNo: "9876543210",
        status: "YET TO DELIVER",
      },
      {
        id: "Discount",
        code: "US005",
        name: "User 5",
        vendor: "Ban Thai",
        product: "Dish 5",
        date: "19/12/2024",
        time: "08:37 AM",
        contactNo: "9876543210",
        status: "DELIVERED",
      },
      {
        id: "Discount",
        code: "US006",
        name: "User 6",
        vendor: "Ban Thai",
        product: "Dish 6",
        date: "19/12/2024",
        time: "08:37 AM",
        contactNo: "9876543210",
        status: "DELIVERED",
      },
    ];

    setProducts(restaurantData);
  }, []);

  useEffect(() => {
    let updatedProducts = products;
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString("en-GB");
      updatedProducts = updatedProducts.filter(
        (product) => product.date === formattedDate
      );
    }
    if (restaurantVendors && restaurantVendors.length) {
      updatedProducts = updatedProducts.filter((product) =>
        restaurantVendors.some((vendor) => vendor.name === product.vendor)
      );
    }

    setFilteredProducts(updatedProducts);
  }, [selectedDate, restaurantVendors, products]);

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
      </div>
    </div>
  );

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

  const handleInputChange = (e, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <div>
      <div className="card">
        <TabView>
          <TabPanel header="Offers">
            <div className="filterTabs flex flex-wrap align-items-center justify-content-between gap-4 mb-2">
              <div className="dataFilterContainer flex flex-wrap gap-5 mt-2">
                <FloatLabel className="w-full md:w-20rem">
                  <MultiSelect
                    value={restaurantVendors}
                    onChange={(e) => setRestaurantVendor(e.value)}
                    options={restaurants}
                    optionLabel="name"
                    maxSelectedLabels={3}
                    className="w-full"
                  />
                  <label htmlFor="ms-restaurants">Offer Type</label>
                </FloatLabel>

                <FloatLabel className="w-full md:w-20rem">
                  <Calendar
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.value)}
                    dateFormat="dd/mm/yy"
                    showIcon
                    className="w-full"
                  />
                  <label htmlFor="calendar-date">Offer Created</label>
                </FloatLabel>
              </div>
            </div>
            <DataTable
              ref={dt}
              value={filteredProducts || products}
              selection={selectedProducts}
              onSelectionChange={(e) => setSelectedProducts(e.value)}
              dataKey="id"
              paginator
              showGridlines
              scrollable
              stripedRows
              rows={5}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
              globalFilter={globalFilter}
              header={header}
            >
              <Column
                field="id"
                header="Offer Type"
                frozen
                style={{ minWidth: "8rem", background: "white" }}
              ></Column>
              <Column
                field="code"
                header="Coupon"
                style={{ minWidth: "8rem" }}
              ></Column>
              <Column
                field="name"
                header="Minimum Value / Flat"
                style={{ minWidth: "13rem" }}
              ></Column>
              <Column
                field="vendor"
                header="Discount %"
                style={{ minWidth: "12rem" }}
              ></Column>
              <Column
                field="product"
                header="Starting Date"
                style={{ minWidth: "9rem" }}
              ></Column>
              <Column
                field="date"
                header="Ending Date"
                style={{ minWidth: "9rem" }}
              ></Column>
              <Column
                field="status"
                header="Status"
                body={statusBodyTemplate}
                style={{ minWidth: "10rem" }}
              ></Column>
              <Column
                field="time"
                header="Edit"
                style={{ minWidth: "9rem" }}
              ></Column>
              <Column
                field="contactNo"
                header="Delete"
                style={{ minWidth: "10rem" }}
              ></Column>
            </DataTable>
          </TabPanel>
          <TabPanel header="Add Offers">
            <div className="border-2 px-5 py-5 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              <div className="inputForms w-full">
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <Utensils size={20} />
                  </span>
                  <InputText
                    placeholder="Minimum Value"
                    value={formData.restaurantName}
                    onChange={(e) => handleInputChange(e, "restaurantName")}
                  />
                </div>
                <div className="flex gap-3 mt-3">
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <Beef size={20} />
                    </span>
                    <InputText
                      placeholder="Product Name"
                      value={formData.productName}
                      onChange={(e) => handleInputChange(e, "productName")}
                    />
                  </div>
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <Euro size={20} />
                    </span>
                    <InputText
                      placeholder="Product Price"
                      value={formData.productPrice}
                      onChange={(e) => handleInputChange(e, "productPrice")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
}
