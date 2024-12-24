import { BriefcaseBusiness, User, Utensils } from "lucide-react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

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

  const handleInputChange = (e, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
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
              <InputText
                placeholder="Restaurant Name"
                value={formData.restaurantName}
                onChange={(e) => handleInputChange(e, "restaurantName")}
              />
            </div>{" "}
            <div className="flex gap-3 mt-3">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <User size={20} />{" "}
                </span>
                <InputText
                  placeholder="Contact Person Name"
                  value={formData.contactPersonName}
                  onChange={(e) => handleInputChange(e, "contactPersonName")}
                />{" "}
              </div>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <BriefcaseBusiness size={20} />
                </span>
                <InputText
                  placeholder="Contact Person Designation"
                  value={formData.contactPersonDesignation}
                  onChange={(e) =>
                    handleInputChange(e, "contactPersonDesignation")
                  }
                />{" "}
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
