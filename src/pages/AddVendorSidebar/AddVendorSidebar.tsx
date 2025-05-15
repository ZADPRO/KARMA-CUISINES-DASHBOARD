import {
  IdCard,
  User,
  Mail,
  MapPin,
  Building2,
  Landmark,
  FileText,
  Banknote,
  Hash,
  PhoneCall,
} from "lucide-react";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import decrypt from "../../helper";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useRef } from "react";

interface VendorDetailsProps {
  alcohol: string;
  bankCode: string;
  bankName: string;
  code: string;
  cre: string;
  designation: string;
  email: string;
  floor: string;
  iban: string;
  id: number;
  land: string;
  mobile: string;
  personName: string;
  restroName: string;
  streetNo: string;
  vat: string;
  vendorId: string;
  zone: string;
}

interface AddVendorSidebarProps {
  vendorToEdit: VendorDetailsProps | null;
  onCloseSidebar: () => void;
}

const AddVendorSidebar: React.FC<AddVendorSidebarProps> = ({
  vendorToEdit,
  onCloseSidebar,
}) => {
  const toast = useRef<Toast>(null);

  const [formData, setFormData] = useState({
    restroName: "",
    vendorId: "",
    contactName: "",
    designation: "",
    email: "",
    mobile: "",
    street: "",
    floor: "",
    zone: "",
    code: "",
    land: "",
    vatNumber: "",
    commercialExtract: "",
    alcoholLicense: "",
    bankName: "",
    accountNumber: "",
    bankCode: "",
  });

  useEffect(() => {
    if (vendorToEdit) {
      setFormData({
        restroName: vendorToEdit.restroName,
        vendorId: vendorToEdit.vendorId,
        contactName: vendorToEdit.personName,
        designation: vendorToEdit.designation,
        email: vendorToEdit.email,
        mobile: vendorToEdit.mobile,
        street: vendorToEdit.streetNo,
        floor: vendorToEdit.floor,
        zone: vendorToEdit.zone,
        code: vendorToEdit.code,
        land: vendorToEdit.land,
        vatNumber: vendorToEdit.vat,
        commercialExtract: vendorToEdit.cre,
        alcoholLicense: vendorToEdit.alcohol,
        bankName: vendorToEdit.bankName,
        accountNumber: vendorToEdit.iban,
        bankCode: vendorToEdit.bankCode,
      });
    }
  }, [vendorToEdit]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    for (const key in formData) {
      if (!formData[key as keyof typeof formData]) {
        const formattedKey = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());

        toast.current?.show({
          severity: "warn",
          summary: "Missing Field",
          detail: `${formattedKey} is required`,
          life: 3000,
        });
        return;
      }
    }
    console.log("Form Values:", formData);

    const apiUrl = vendorToEdit
      ? `${import.meta.env.VITE_API_URL}/admin/updateVendor`
      : `${import.meta.env.VITE_API_URL}/admin/uploadVendor`;

    axios
      .post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTtoken")}`,
        },
      })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("Upload success", data);
        if (data.success) {
          setFormData({
            restroName: "",
            vendorId: "",
            contactName: "",
            designation: "",
            email: "",
            mobile: "",
            street: "",
            floor: "",
            zone: "",
            code: "",
            land: "",
            vatNumber: "",
            commercialExtract: "",
            alcoholLicense: "",
            bankName: "",
            accountNumber: "",
            bankCode: "",
          });

          toast.current?.show({
            severity: "success",
            summary: "Success",
            detail: "Vendor uploaded successfully!",
            life: 3000,
          });
          setTimeout(() => {
            onCloseSidebar(); // ✅ Close and refresh parent list
          }, 3000);
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Failed",
            detail: "Upload failed. Please try again.",
            life: 3000,
          });
        }
      })
      .catch((error) => {
        console.error("Upload error", error);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "An error occurred during upload.",
          life: 3000,
        });
      });
  };

  return (
    <div>
      <Toast ref={toast} />

      {/* <h3>{vendorToEdit ? "Update Vendor" : "Add Vendor"}</h3> */}

      <label>Restro Basic Details</label>
      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <Building2 />
          </span>
          <InputText
            placeholder="Restro Name"
            value={formData.restroName}
            onChange={(e) => handleChange("restroName", e.target.value)}
          />
        </div>
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <IdCard />
          </span>
          <InputText
            placeholder="Vendor ID"
            value={formData.vendorId}
            onChange={(e) => handleChange("vendorId", e.target.value)}
          />
        </div>
      </div>

      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <User />
          </span>
          <InputText
            placeholder="Contact Person Name"
            value={formData.contactName}
            onChange={(e) => handleChange("contactName", e.target.value)}
          />
        </div>
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <IdCard />
          </span>
          <InputText
            placeholder="Designation"
            value={formData.designation}
            onChange={(e) => handleChange("designation", e.target.value)}
          />
        </div>
      </div>

      <div className="card flex flex-column md:flex-row gap-3 mt-3 mb-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <Mail />
          </span>
          <InputText
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <PhoneCall />
          </span>
          <InputText
            placeholder="Mobile"
            type="mobile"
            value={formData.mobile}
            onChange={(e) => handleChange("mobile", e.target.value)}
          />
        </div>
      </div>

      <label>Communication Details</label>
      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <MapPin />
          </span>
          <InputText
            placeholder="Street Name, Number"
            value={formData.street}
            onChange={(e) => handleChange("street", e.target.value)}
          />
        </div>
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <Building2 />
          </span>
          <InputText
            placeholder="Floor"
            value={formData.floor}
            onChange={(e) => handleChange("floor", e.target.value)}
          />
        </div>
      </div>

      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <MapPin />
          </span>
          <InputText
            placeholder="Zone"
            value={formData.zone}
            onChange={(e) => handleChange("zone", e.target.value)}
          />
        </div>
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <Hash />
          </span>
          <InputText
            placeholder="Code"
            value={formData.code}
            onChange={(e) => handleChange("code", e.target.value)}
          />
        </div>
      </div>

      <div className="card flex flex-column md:flex-row gap-3 mt-3 mb-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <Landmark />
          </span>
          <InputText
            placeholder="Land"
            value={formData.land}
            onChange={(e) => handleChange("land", e.target.value)}
          />
        </div>
      </div>

      <label>Doc & Bank Details</label>
      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <FileText />
          </span>
          <InputText
            placeholder="VAT Registration Number"
            value={formData.vatNumber}
            onChange={(e) => handleChange("vatNumber", e.target.value)}
          />
        </div>
      </div>

      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <FileText />
          </span>
          <InputText
            placeholder="Commercial Register Extract"
            value={formData.commercialExtract}
            onChange={(e) => handleChange("commercialExtract", e.target.value)}
          />
        </div>
      </div>

      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <FileText />
          </span>
          <InputText
            placeholder="Alcohol License Number"
            value={formData.alcoholLicense}
            onChange={(e) => handleChange("alcoholLicense", e.target.value)}
          />
        </div>
      </div>

      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <Banknote />
          </span>
          <InputText
            placeholder="Bank Name"
            value={formData.bankName}
            onChange={(e) => handleChange("bankName", e.target.value)}
          />
        </div>
      </div>

      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <Banknote />
          </span>
          <InputText
            placeholder="Account Number"
            value={formData.accountNumber}
            onChange={(e) => handleChange("accountNumber", e.target.value)}
          />
        </div>
      </div>

      <div className="card flex flex-column md:flex-row gap-3 mt-3 mb-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <Hash />
          </span>
          <InputText
            placeholder="Code"
            value={formData.bankCode}
            onChange={(e) => handleChange("bankCode", e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          label={vendorToEdit ? "Update Vendor" : "Add Vendor"}
          className="mt-4"
          onClick={handleSubmit}
        />{" "}
      </div>
    </div>
  );
};

export default AddVendorSidebar;
