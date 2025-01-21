import axios from "axios";
import {
  AlignLeft,
  BadgeEuro,
  CalendarArrowDown,
  CalendarArrowUp,
  HandCoins,
  Percent,
  TicketPercent,
} from "lucide-react";
import { Button } from "primereact/button";
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
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";

export default function OffersSidebar() {
  const dt = useRef(null);
  const toast = useRef(null);

  const [filteredProducts, setFilteredProducts] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [restaurantVendors, setRestaurantVendor] = useState(null);

  const [products, setProducts] = useState(null);

  const restaurants = [
    { name: "Percentage", id: "Percentage" },
    { name: "Discount", id: "Discount" },
  ];

  const [formData, setFormData] = useState({
    minValue: "", // Minimum Value
    discountPrice: "", // Discount / Offers
    description: "", // Description
    coupon: "", // Coupon
    startDate: null, // Start Date
    endDate: null, // End Date
  });
  useEffect(() => {
    const restaurantData = [
      {
        id: 1,
        offerType: "Flat Discount",
        code: "FLAT50",
        name: "Flat ₹50 Off on Main Course",
        vendor: "Tandoori Palace",
        description: "Get ₹50 off on any main course",
        product: "2025-01-15",
        date: "2025-02-15",
        status: "LIVE",
        time: "2025-01-10",
        contactNo: "Edit/Delete",
      },
      {
        id: 2,
        offerType: "Percentage Discount",
        code: "SAVE20",
        name: "20% Off on Pizza",
        vendor: "Pizza Delight",
        description: "Save 20% on all pizzas",
        product: "2025-01-01",
        date: "2025-01-31",
        status: "EXPIRE TODAY",
        time: "2025-01-05",
        contactNo: "Edit/Delete",
      },
      {
        id: 3,
        offerType: "Flat Discount",
        code: "FLAT100",
        name: "Flat ₹100 Off on Buffet",
        vendor: "Royal Buffet",
        description: "₹100 off on any buffet package",
        product: "2024-12-01",
        date: "2025-01-01",
        status: "EXPIRED",
        time: "2024-11-25",
        contactNo: "Edit/Delete",
      },
      {
        id: 4,
        offerType: "Buy One Get One",
        code: "BOGO",
        name: "Buy 1 Get 1 Free on Burgers",
        vendor: "Burger Junction",
        description: "Applicable on all burgers",
        product: "2025-01-10",
        date: "2025-01-25",
        status: "LIVE",
        time: "2025-01-05",
        contactNo: "Edit/Delete",
      },
      {
        id: 5,
        offerType: "Cashback",
        code: "CASHBACK10",
        name: "10% Cashback on Orders Above ₹500",
        vendor: "Café Mocha",
        description: "Get 10% cashback on orders above ₹500",
        product: "2025-01-01",
        date: "2025-03-01",
        status: "LIVE",
        time: "2024-12-30",
        contactNo: "Edit/Delete",
      },
      {
        id: 6,
        offerType: "Free Shipping",
        code: "FREESHIP",
        name: "Free Delivery on Orders Above ₹300",
        vendor: "Foodie Express",
        description: "No delivery charges on orders above ₹300",
        product: "2024-12-15",
        date: "2025-01-15",
        status: "EXPIRED",
        time: "2024-12-10",
        contactNo: "Edit/Delete",
      },
      {
        id: 7,
        offerType: "Flat Discount",
        code: "FLAT200",
        name: "Flat ₹200 Off on Family Meal",
        vendor: "Family Feast",
        description: "₹200 off on any family meal set",
        product: "2025-01-05",
        date: "2025-01-20",
        status: "EXPIRE TODAY",
        time: "2025-01-01",
        contactNo: "Edit/Delete",
      },
      {
        id: 8,
        offerType: "Referral Bonus",
        code: "REFER50",
        name: "₹50 Referral Bonus on Next Order",
        vendor: "QuickBites",
        description: "Earn ₹50 for every friend referred",
        product: "2024-12-01",
        date: "2025-03-01",
        status: "LIVE",
        time: "2024-11-25",
        contactNo: "Edit/Delete",
      },
      {
        id: 9,
        offerType: "Membership Discount",
        code: "VIP20",
        name: "20% Off on VIP Membership",
        vendor: "The Gourmet Club",
        description: "20% off on all VIP memberships",
        product: "2025-01-01",
        date: "2025-12-31",
        status: "LIVE",
        time: "2024-12-20",
        contactNo: "Edit/Delete",
      },
      {
        id: 10,
        offerType: "Festive Sale",
        code: "DIWALI25",
        name: "25% Off on Diwali Special Sweets",
        vendor: "Sweet Treats",
        description: "Festive discounts on Diwali sweets",
        product: "2025-01-01",
        date: "2025-01-10",
        status: "EXPIRED",
        time: "2024-12-25",
        contactNo: "Edit/Delete",
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
        restaurantVendors.some((vendor) => vendor.id === product.offerType)
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
      case "LIVE":
        return "success";

      case "EXPIRE TODAY":
        return "warning";

      case "EXPIRED":
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

  const handleSubmit = async () => {
    try {
      // Send data via axios.post
      const response = await axios.post("api/v1/2020", formData);
      console.log(response.data); // Log response from backend

      // Show success toast after successful submission
      toast.current.show({
        severity: "success",
        summary: "Submitted",
        detail: "Offer added successfully",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to add offer",
      });
    }
  };

  const handleClear = () => {
    setFormData({
      minValue: "",
      discountPrice: "",
      productPrice: "",
      description: "",
      coupon: "",
      startDate: null,
      endDate: null,
    });
    toast.current.show({
      severity: "info",
      summary: "Cleared",
      detail: "Form has been cleared",
    });
  };

  const generateCouponCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let couponCode = "";
    const codeLength = 7; // Max 7 characters

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      couponCode += characters[randomIndex];
    }

    setFormData({ ...formData, coupon: couponCode });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formData.coupon);
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Coupon copied successfully!",
      life: 3000,
    });
  };

  return (
    <div>
      <Toast ref={toast} />

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
                  <label htmlFor="calendar-date">Offer Created At</label>
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
              style={{ fontSize: "1rem" }}
              stripedRows
              rows={5}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
              globalFilter={globalFilter}
              header={header}
            >
              <Column
                field="offerType"
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
                field="description"
                header="Description"
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
                header="Created At"
                style={{ minWidth: "9rem" }}
              ></Column>
              <Column
                field="time"
                header="Edit"
                style={{ minWidth: "9rem" }}
                body={(rowData) => (
                  <div className="flex gap-3">
                    <Button
                      icon="pi pi-pencil"
                      severity="success"
                      rounded
                      onClick={() =>
                        toast.current.show({
                          severity: "info",
                          summary: "Edit",
                          detail: `Editing ${rowData.name}`,
                        })
                      }
                    ></Button>
                    <Button
                      icon="pi pi-trash"
                      severity="danger"
                      rounded
                      onClick={() =>
                        toast.current.show({
                          severity: "warn",
                          summary: "Delete",
                          detail: `Deleting ${rowData.name}`,
                        })
                      }
                    ></Button>
                  </div>
                )}
              ></Column>
            </DataTable>
          </TabPanel>
          <TabPanel header="Add Offers">
            <div className="border-2 px-5 py-5 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              <div className="inputForms w-full">
                <div className="flex gap-3 mt-3">
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <HandCoins size={20} />
                    </span>
                    <InputText
                      placeholder="Offer Name"
                      value={formData.minValue}
                      onChange={(e) => handleInputChange(e, "minValue")}
                    />
                  </div>
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <BadgeEuro size={20} />
                    </span>
                    <InputText
                      placeholder="Minimum Value"
                      value={formData.minValue}
                      onChange={(e) => handleInputChange(e, "minValue")}
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-3">
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <Percent size={20} />
                    </span>
                    <InputText
                      placeholder="Discount / Offers"
                      value={formData.discountPrice}
                      onChange={(e) => handleInputChange(e, "discountPrice")}
                    />
                  </div>
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <AlignLeft size={20} />
                    </span>
                    <InputText
                      placeholder="Description"
                      value={formData.description}
                      onChange={(e) => handleInputChange(e, "productPrice")}
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-3">
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <CalendarArrowUp size={20} />
                    </span>
                    <Calendar
                      placeholder="Start Date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          startDate: e.value,
                        }))
                      }
                    />
                  </div>
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <CalendarArrowDown size={20} />
                    </span>
                    <Calendar
                      placeholder="End Date"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          endDate: e.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-3 align-items-center justify-content-center">
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <TicketPercent size={20} />
                    </span>
                    <InputText
                      placeholder="Coupon"
                      value={formData.coupon}
                      onChange={(e) => handleInputChange(e, "coupon")}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button
                      severity="success"
                      label="Generate"
                      onClick={generateCouponCode}
                    />
                    <Button
                      severity="success"
                      label="Copy"
                      icon="pi pi-copy"
                      outlined
                      onClick={handleCopy}
                    />
                  </div>
                </div>
                <div className="flex mt-2">
                  <small>Valid / Invalid</small>
                </div>
              </div>
            </div>
            <div className="flex justify-content-end mt-3 gap-3">
              <Button
                severity="success"
                label="Submit"
                icon="pi pi-check"
                onClick={handleSubmit}
              />
              <Button
                severity="danger"
                label="Clear All"
                icon="pi pi-times"
                onClick={handleClear}
              />
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
}
