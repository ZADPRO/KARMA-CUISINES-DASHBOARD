import { Beef, CalendarRange, Euro, Percent, Utensils } from "lucide-react";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { useRef, useState } from "react";
import FileUploadTemplate from "../FileUpload/FileUploadTemplate";

export default function AddProductSideBar() {
  const toastRef = useRef(null);

  const [formData, setFormData] = useState({
    refVendorId: 0,
    restaurantName: "",
    productName: "",
    productPrice: "",
    description: "",
  });

  const [uploadLogoEnabled, setUploadLogoEnabled] = useState(false);
  const [updateOffersEnabled, setUpdateOffersEnabled] = useState(false);
  const [customOffersEnabled, setCustomOffersEnabled] = useState(false);
  const [customOfferRangeEnabled, setCustomOfferRangeEnabled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [dates, setDates] = useState(null);

  const categories = [
    { name: "Fast Food", code: "FF" },
    { name: "Fine Dining", code: "FD" },
    { name: "Cafe", code: "CA" },
    { name: "Bakery", code: "BK" },
    { name: "Seafood", code: "SF" },
  ];

  const restroDetails = [
    { refVendorName: "Restro 1", refVendorId: 1 },
    { refVendorName: "Restro 2", refVendorId: 2 },
    { refVendorName: "Restro 3", refVendorId: 3 },
    { refVendorName: "Restro 4", refVendorId: 4 },
    { refVendorName: "Restro 5", refVendorId: 5 },
  ];

  const ratings = [
    { name: "1 Star", code: "1" },
    { name: "2 Stars", code: "2" },
    { name: "3 Stars", code: "3" },
    { name: "4 Stars", code: "4" },
    { name: "5 Stars", code: "5" },
  ];

  const offers = [
    { name: "Buy 1 Get 1 Free", code: "BOGO" },
    { name: "Flat 50% Off", code: "50OFF" },
    { name: "Free Dessert", code: "FDESSERT" },
    { name: "20% Cashback", code: "CASH20" },
    { name: "No Delivery Charge", code: "NODEL" },
  ];

  const handleInputChange = (e, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleDropdownChange = (e, fieldName) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: e.value.refVendorId,
    }));
  };

  const handleSubmit = () => {
    const payload = {
      refVendorId: formData.refVendorId,
      restaurantName: formData.restaurantName,
      productName: formData.productName,
      productPrice: formData.productPrice,
      category: selectedCategory ? selectedCategory.name : null,
      description: formData.description,
      rating: selectedRating ? selectedRating.name : null,
      offerAppliedStatus: uploadLogoEnabled,
      offer: selectedOffer ? selectedOffer.name : null,
      range: dates,
    };

    // ADD PRODUCT PAYLOAD - /api/v1/vendorRoutes/addProduct

    console.log("Payload:", payload);

    toastRef.current.show({
      severity: "success",
      summary: "Success",
      detail: "Form submitted successfully!",
      life: 3000,
    });
  };

  return (
    <div>
      <Toast ref={toastRef} />

      <div className="flex flex-column gap-10">
        <h3>Add Products</h3>
        <div className="border-2 px-5 py-5 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
          <div className="inputForms w-full">
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <Utensils size={20} />
              </span>
              <Dropdown
                value={restroDetails.find(
                  (restro) => restro.refVendorId === formData.refVendorId
                )} // Find the selected option by comparing the ID
                options={restroDetails}
                onChange={(e) => handleDropdownChange(e, "refVendorId")}
                placeholder="Select a Restaurant Type"
                optionLabel="refVendorName"
                className="w-full"
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
            <div className="flex gap-3 mt-3">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <Beef size={20} />
                </span>
                <Dropdown
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.value)}
                  options={categories}
                  optionLabel="name"
                  placeholder="Category"
                  className="w-full md:w-14rem"
                />
              </div>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <Euro size={20} />
                </span>
                <InputText
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => handleInputChange(e, "description")}
                />
              </div>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <Euro size={20} />
                </span>
                <Dropdown
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.value)}
                  options={ratings}
                  optionLabel="name"
                  placeholder="Rating"
                  className="w-full md:w-14rem"
                />
              </div>
            </div>
            <div className="mt-3">
              <div className="fileUpload mt-3 flex-col">
                <div className="flex align-items-center gap-3">
                  <InputSwitch
                    checked={uploadLogoEnabled}
                    onChange={(e) => setUploadLogoEnabled(e.value)}
                  />
                  <span className="">Upload Image</span>
                </div>
                <FileUploadTemplate enabled={uploadLogoEnabled} />
              </div>
            </div>
            <div className="mt-3">
              <div className="gap-5 mt-3 flex">
                <div
                  className="flex gap-3 mt-3 flex-1"
                  style={{ flexDirection: "column" }}
                >
                  <div className="flex align-items-center gap-3">
                    <InputSwitch
                      checked={updateOffersEnabled}
                      onChange={(e) => setUpdateOffersEnabled(e.value)}
                    />
                    <span className="">Offers Applied</span>
                  </div>
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <Percent size={20} />
                    </span>
                    <Dropdown
                      value={selectedOffer}
                      disabled={!updateOffersEnabled}
                      onChange={(e) => setSelectedOffer(e.value)}
                      options={offers}
                      optionLabel="name"
                      placeholder="Select Offer"
                      className="w-full md:w-14rem"
                    />
                  </div>
                </div>
                <div
                  className="flex gap-3 mt-3 flex-1"
                  style={{ flexDirection: "column" }}
                >
                  <div className="flex align-items-center gap-3">
                    <InputSwitch
                      disabled={!updateOffersEnabled}
                      checked={customOffersEnabled}
                      onChange={(e) => setCustomOffersEnabled(e.value)}
                    />
                    <span className="">Custom Date Select</span>
                  </div>
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <CalendarRange size={20} />
                    </span>
                    <Calendar
                      value={dates}
                      disabled={!(customOffersEnabled && updateOffersEnabled)}
                      onChange={(e) => setDates(e.value)}
                      selectionMode="multiple"
                      readOnlyInput
                      placeholder="Select Offer Dates"
                      hideOnRangeSelection
                    />
                  </div>
                </div>
                <div
                  className="flex gap-3 mt-3 flex-1"
                  style={{ flexDirection: "column" }}
                >
                  <div className="flex align-items-center gap-3">
                    <InputSwitch
                      disabled={!updateOffersEnabled}
                      checked={customOfferRangeEnabled}
                      onChange={(e) => setCustomOfferRangeEnabled(e.value)}
                    />
                    <span className="">Custom Range Selected</span>
                  </div>
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <CalendarRange size={20} />
                    </span>
                    <Calendar
                      value={dates}
                      disabled={
                        !(customOfferRangeEnabled && updateOffersEnabled)
                      }
                      onChange={(e) => setDates(e.value)}
                      selectionMode="range"
                      readOnlyInput
                      placeholder="Offer Range"
                      hideOnRangeSelection
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex pt-4 justify-content-end">
          <Button
            label="Submit"
            icon="pi pi-arrow-right"
            iconPos="right"
            severity="success"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
