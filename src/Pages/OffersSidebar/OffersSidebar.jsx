import Axios from "axios";
import {
  AlignLeft,
  BadgeEuro,
  CalendarArrowDown,
  CalendarArrowUp,
  Euro,
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
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { TabPanel, TabView } from "primereact/tabview";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";

import decrypt from "../../helper";

export default function OffersSidebar() {
  const dt = useRef(null);
  const toast = useRef(null);

  const [filteredProducts, setFilteredProducts] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [uploadLogoEnabled, setUploadLogoEnabled] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [restaurantVendors, setRestaurantVendor] = useState(null);

  const [products, setProducts] = useState(null);

  const restaurants = [
    { name: "Price", id: true },
    { name: "Discount", id: false },
  ];

  const [formData, setFormData] = useState({
    offerName: "",
    minValue: "",
    discountPrice: "",
    isOffer: false,
    description: "",
    coupon: "",
    startDate: null,
    endDate: null,
  });
  useEffect(() => {
    Axios.get(import.meta.env.VITE_API_URL + "/vendorRoutes/getOffers", {
      headers: {
        Authorization: localStorage.getItem("JWTtoken"),
      },
    }).then((res) => {
      const data = decrypt(
        res.data[1],
        res.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );
      console.log("data", data);

      setProducts(data.restroOffers);
    });
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
        restaurantVendors.some((vendor) => vendor.id === product.refOfferType)
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

  const handleInputChange = (e, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Send data via axios.post - /api/v1/vendorRoutes/offersApplied

      Axios.post(
        import.meta.env.VITE_API_URL + "/vendorRoutes/offersApplied",
        {
          refOfferName: formData.offerName,
          refOfferMinValue: formData.minValue,
          refDiscountPrice: formData.discountPrice,
          refOfferType: formData.isOffer,
          refOfferDescription: formData.description,
          refStartDate: formData.startDate,
          refEndDate: formData.endDate,
          refCoupon: formData.coupon,
        },
        {
          headers: {
            Authorization: localStorage.getItem("JWTtoken"),
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("data", data);
      });

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
      offerName: "",
      minValue: "",
      discountPrice: "",
      ifOffer: false,
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
                field="refOfferType"
                header="Offer Type"
                frozen
                body={(rowData) =>
                  rowData.refOfferType ? "Price" : "Discount"
                }
                style={{ minWidth: "8rem" }}
              ></Column>
              <Column
                field="refCoupon"
                header="Coupon"
                style={{ minWidth: "8rem" }}
              ></Column>
              <Column
                field="refOfferMinValue"
                header="Minimum Value / Flat"
                style={{ minWidth: "13rem" }}
              ></Column>
              <Column
                field="refDiscountPrice"
                header="Discount %"
                style={{ minWidth: "12rem" }}
              ></Column>
              <Column
                field="refOfferDescription"
                header="Description"
                style={{ minWidth: "12rem" }}
              ></Column>
              <Column
                field="refStartDate"
                header="Starting Date"
                style={{ minWidth: "9rem" }}
                body={(rowData) =>
                  new Date(rowData.refStartDate).toLocaleDateString("en-GB")
                }
              ></Column>
              <Column
                field="refEndDate"
                header="Ending Date"
                style={{ minWidth: "9rem" }}
                body={(rowData) =>
                  new Date(rowData.refEndDate).toLocaleDateString("en-GB")
                }
              ></Column>
              <Column
                field="status"
                header="Status"
                body={(rowData) => {
                  const currentTime = new Date();
                  const startDate = new Date(rowData.refStartDate);
                  const endDate = new Date(rowData.refEndDate);

                  let statusSeverity = "";

                  if (currentTime < startDate) {
                    statusSeverity = "UPCOMING";
                  } else if (
                    currentTime >= startDate &&
                    currentTime < endDate
                  ) {
                    statusSeverity = "LIVE";
                  } else if (
                    currentTime.toDateString() === endDate.toDateString() &&
                    currentTime <= endDate
                  ) {
                    statusSeverity = "EXPIRE TODAY";
                  } else if (currentTime > endDate) {
                    statusSeverity = "EXPIRED";
                  }

                  console.log("statusSeverity", statusSeverity);
                  switch (statusSeverity) {
                    case "UPCOMING":
                      return <span className="badge badge-info">UPCOMING</span>;
                    case "LIVE":
                      return <span className="badge badge-success">LIVE</span>;
                    case "EXPIRE TODAY":
                      return (
                        <span className="badge badge-warning">
                          EXPIRE TODAY
                        </span>
                      );
                    case "EXPIRED":
                      return (
                        <span className="badge badge-danger">EXPIRED</span>
                      );
                    default:
                      return null;
                  }
                }}
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
                      value={formData.offerName}
                      onChange={(e) => handleInputChange(e, "offerName")}
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

                <div className="flex gap-3 mt-3 align-items-center">
                  <InputSwitch
                    checked={uploadLogoEnabled}
                    onChange={(e) => setUploadLogoEnabled(e.value)}
                  />
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      {uploadLogoEnabled ? (
                        <Euro size={20} />
                      ) : (
                        <Percent size={20} />
                      )}{" "}
                    </span>
                    <InputText
                      placeholder={
                        uploadLogoEnabled ? "Price / Offer" : "Discount / Offer"
                      }
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
                      onChange={(e) => handleInputChange(e, "description")}
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
