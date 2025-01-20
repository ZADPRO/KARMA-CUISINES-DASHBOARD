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
    restaurantName: "",
    contactPersonName: "",
    contactPersonDesignation: "",
    contactPersonNumber: "",
    contactPersonEmail: "",
    restaurantAddress: "",
    websiteURL: "",
    facebook: "",
    instagram: "",
    twitter: "",
  });

  const [uploadLogoEnabled, setUploadLogoEnabled] = useState(false);

  const handleInputChange = (e, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const [selectedCity, setSelectedCity] = useState(null);
  const [dates, setDates] = useState(null);

  const cities = [
    { name: "Offer 1", code: "NY" },
    { name: "Offer 2", code: "RM" },
    { name: "Offer 3", code: "LDN" },
    { name: "Offer 4", code: "IST" },
    { name: "Offer 5", code: "PRS" },
  ];

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
              <InputText
                placeholder="Restaurant Name"
                value={formData.restaurantName}
                onChange={(e) => handleInputChange(e, "restaurantName")}
              />
            </div>{" "}
            <div className="flex gap-3 mt-3">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <Beef size={20} />
                </span>
                <InputText
                  placeholder="Product Name"
                  value={formData.contactPersonName}
                  onChange={(e) => handleInputChange(e, "contactPersonName")}
                />{" "}
              </div>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <Euro size={20} />
                </span>
                <InputText
                  placeholder="Product Price"
                  value={formData.contactPersonDesignation}
                  onChange={(e) =>
                    handleInputChange(e, "contactPersonDesignation")
                  }
                />{" "}
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <Beef size={20} />
                </span>
                <Dropdown
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.value)}
                  options={cities}
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
                  value={formData.contactPersonDesignation}
                  onChange={(e) =>
                    handleInputChange(e, "contactPersonDesignation")
                  }
                />{" "}
              </div>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <Euro size={20} />
                </span>
                <Dropdown
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.value)}
                  options={cities}
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
              <div className="fileUpload mt-3 flex-col">
                <div className="flex align-items-center gap-3">
                  <InputSwitch
                    checked={uploadLogoEnabled}
                    onChange={(e) => setUploadLogoEnabled(e.value)}
                  />
                  <span className="">Offers Applied</span>
                </div>
                <div className="flex gap-3 mt-3">
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <Percent size={20} />
                    </span>
                    <Dropdown
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.value)}
                      options={cities}
                      optionLabel="name"
                      placeholder="Select Offer"
                      className="w-full md:w-14rem"
                    />
                  </div>
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <CalendarRange size={20} />
                    </span>
                    <Calendar
                      value={dates}
                      onChange={(e) => setDates(e.value)}
                      selectionMode="range"
                      readOnlyInput
                      placeholder="Offer Valid Range"
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
            onClick={() => {
              toastRef.current.show({
                severity: "success",
                summary: "Success",
                detail: "Form submitted successfully!",
                life: 3000,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
