import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Toast } from "primereact/toast";

import FileUploadTemplate from "../FileUpload/FileUploadTemplate";

// LUCIDE ICONS
import {
  BriefcaseBusiness,
  Contact,
  MapPinHouse,
  Phone,
  User,
  Utensils,
  Link,
  Facebook,
  Instagram,
  Twitter,
  Landmark,
  Banknote,
  CreditCard,
  BadgeSwissFranc,
} from "lucide-react";
import axios from "axios";
import { FileUpload } from "primereact/fileupload";
import decrypt from "../../helper";

export default function AddVendorStepper() {
  const toastRef = useRef(null);

  const stepperRef = useRef(null);
  const [uploadLogoEnabled, setUploadLogoEnabled] = useState(false);
  const [socialLinksEnabled, setSocialLinksEnabled] = useState(false);

  const [logoFile, setLogoFile] = useState(null);

  const [isCommercialRegisterEnabled, setCommercialRegisterEnabled] =
    useState(false);
  const [isVatEnabled, setVatEnabled] = useState(false);
  const [isAlcoholLicenseEnabled, setAlcoholLicenseEnabled] = useState(false);
  const [isFoodSafetyEnabled, setFoodSafetyEnabled] = useState(false);
  const [isLiabilityInsuranceEnabled, setLiabilityInsuranceEnabled] =
    useState(false);

  const [acceptInternationalCard, setAcceptInternationalCard] = useState(false);
  const [acceptTwint, setAcceptTwint] = useState(false);
  const [acceptPostFinance, setAcceptPostFinance] = useState(false);
  const [acceptApplePay, setAcceptApplePay] = useState(false);

  const [formData, setFormData] = useState({
    restaurantName: "",
    contactPersonName: "",
    contactPersonDesignation: "",
    contactPersonNumber: "",
    contactPersonEmail: "",
    restaurantAddress: "",
    logoUrl: "",
    websiteURL: "",
    facebook: "",
    instagram: "",
    twitter: "",
  });

  const [bankData, setBankData] = useState({
    bankName: "",
    accountNumber: "",
    ibanCode: "",
    paymentMethods: "",
    moneyTransferDetails: "",
  });

  // States for file uploads
  const [vatCertificateFile, setVatCertificateFile] = useState(null);
  const [commercialRegisterFile, setCommercialRegisterFile] = useState(null);
  const [alcoholLicenseFile, setAlcoholLicenseFile] = useState(null);
  const [foodSafetyFile, setFoodSafetyFile] = useState(null);
  const [liabilityInsuranceFile, setLiabilityInsuranceFile] = useState(null);

  const [documentName, setDocumentName] = useState(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/vendorRoutes/getDocuments", {
        headers: {
          Authorization: localStorage.getItem("JWTtoken"),
        },
      })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("restro doc data", data);
        setDocumentName(data.restroDetails);
      });
  }, [documentName]);

  const handleNext = async () => {
    try {
      // Create FormData instance
      const formData = new FormData();

      // Append enabled flags
      formData.append("isVatEnabled", isVatEnabled);
      formData.append(
        "isCommercialRegisterEnabled",
        isCommercialRegisterEnabled
      );
      formData.append("isAlcoholLicenseEnabled", isAlcoholLicenseEnabled);
      formData.append("isFoodSafetyEnabled", isFoodSafetyEnabled);
      formData.append(
        "isLiabilityInsuranceEnabled",
        isLiabilityInsuranceEnabled
      );

      // Append files (only if uploaded and the corresponding switch is enabled)
      if (isVatEnabled && vatCertificateFile) {
        formData.append("vatCertificate", vatCertificateFile);
      }
      if (isCommercialRegisterEnabled && commercialRegisterFile) {
        formData.append("commercialRegister", commercialRegisterFile);
      }
      if (isAlcoholLicenseEnabled && alcoholLicenseFile) {
        formData.append("alcoholLicense", alcoholLicenseFile);
      }
      if (isFoodSafetyEnabled && foodSafetyFile) {
        formData.append("foodSafetyCertificate", foodSafetyFile);
      }
      if (isLiabilityInsuranceEnabled && liabilityInsuranceFile) {
        formData.append("liabilityInsurance", liabilityInsuranceFile);
      }

      // Axios POST request
      const response = await axios.post(
        "https://your-api-endpoint.com/restro-details",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Handle success
      console.log("Data submitted successfully:", response.data);

      // Proceed to the next step
      stepperRef.current.nextCallback();
    } catch (error) {
      // Handle error
      console.error("Error submitting data:", error);
    }
  };

  const handleUploadSuccess = (response) => {
    console.log("Upload Successful:", response);
    setFormData((prevFormData) => ({
      ...prevFormData, // Spread the previous state
      logoUrl: response.filePath, // Update the logoUrl
    }));
  };

  const handleUploadFailure = (error) => {
    console.error("Upload Failed:", error);
    // Add your failure handling logic here
  };

  const customUploader = async (event) => {
    console.table("event", event);
    const file = event.files[0]; // Assuming single file upload
    const formData = new FormData();
    formData.append("logo", file);
    console.log("formData", formData);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ":", pair[1]); // Log each field in the FormData
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/vendorRoutes/LogoUpload",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("JWTtoken"),
          },
        }
      );

      const data = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      if (data.success) {
        handleUploadSuccess(data);
      } else {
        handleUploadFailure(data);
      }
    } catch (error) {
      handleUploadFailure(error); // Handle any network errors
    }
  };

  const validateForm = () => {
    for (const key in formData) {
      console.log("key", key);
      if (formData[key] === "") {
        console.log("formData", formData);
        toastRef.current.show({
          severity: "error",
          summary: "Validation Error",
          detail: `Please fill in the ${key
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()} field.`,
          life: 3000,
        });
        return false;
      }
    }
    return true;
  };

  const handleToRestroDoc = () => {
    if (validateForm()) {
      stepperRef.current.nextCallback(); // Proceed to next step
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
      <Toast ref={toastRef} />

      <Stepper ref={stepperRef} style={{ flexBasis: "50rem" }}>
        <StepperPanel header="Basic Info">
          <div className="border-2 px-5 py-5 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
            <div className="inputForms">
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
              <div className="flex gap-3 mt-3">
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <Contact size={20} />{" "}
                  </span>
                  <InputText
                    placeholder="Contact Person Number"
                    value={formData.contactPersonNumber}
                    onChange={(e) =>
                      handleInputChange(e, "contactPersonNumber")
                    }
                  />{" "}
                </div>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <Phone size={20} />
                  </span>
                  <InputText
                    placeholder="Contact Person Email"
                    value={formData.contactPersonEmail}
                    onChange={(e) => handleInputChange(e, "contactPersonEmail")}
                  />{" "}
                </div>
              </div>
              <div className="p-inputgroup flex-1 mt-3">
                <span className="p-inputgroup-addon">
                  <MapPinHouse size={20} />{" "}
                </span>
                <InputText
                  placeholder="Restaurant Address"
                  value={formData.restaurantAddress}
                  onChange={(e) => handleInputChange(e, "restaurantAddress")}
                />{" "}
              </div>{" "}
              <div className="p-inputgroup flex-1 mt-3">
                <span className="p-inputgroup-addon">
                  <Link size={20} />
                </span>
                <InputText
                  placeholder="Website URL"
                  value={formData.websiteURL}
                  onChange={(e) => handleInputChange(e, "websiteURL")}
                />{" "}
              </div>{" "}
              <div className="fileUpload mt-3 flex-col">
                <FileUpload
                  name="logo"
                  customUpload
                  className="mt-3"
                  uploadHandler={customUploader}
                  accept="image/*"
                  maxFileSize={10000000}
                  emptyTemplate={
                    <p className="m-0">
                      Drag and drop your logo here to upload.
                    </p>
                  }
                />
              </div>
              <div className="fileUpload mt-3 flex-col">
                <div className="flex align-items-center gap-3">
                  <InputSwitch
                    checked={socialLinksEnabled}
                    onChange={(e) => setSocialLinksEnabled(e.value)}
                  />
                  <span className="">Social Media Links</span>
                </div>
                <div className="socialMediaLinks flex gap-3 mt-3">
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <Facebook size={20} />{" "}
                    </span>
                    <InputText
                      placeholder="Facebook"
                      value={formData.facebook}
                      onChange={(e) => handleInputChange(e, "facebook")}
                      disabled={!socialLinksEnabled}
                    />{" "}
                  </div>
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <Instagram size={20} />{" "}
                    </span>
                    <InputText
                      placeholder="Instagram"
                      value={formData.instagram}
                      onChange={(e) => handleInputChange(e, "instagram")}
                      disabled={!socialLinksEnabled}
                    />{" "}
                  </div>
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <Twitter size={20} />{" "}
                    </span>
                    <InputText
                      placeholder="Twitter"
                      value={formData.twitter}
                      onChange={(e) => handleInputChange(e, "twitter")}
                      disabled={!socialLinksEnabled}
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex pt-4 justify-content-end">
            <Button
              label="Next"
              icon="pi pi-arrow-right"
              iconPos="right"
              severity="success"
              onClick={handleToRestroDoc}
            />
          </div>
        </StepperPanel>
        <StepperPanel header="Restro Details">
          <div className="border-2 px-5 py-5 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
            <div className="uploadFiles w-full">
              {documentName && (
                <>
                  <div className="fileUpload mt-3 flex-col">
                    <div className="flex align-items-center gap-3">
                      <InputSwitch
                        checked={isVatEnabled}
                        onChange={(e) => setVatEnabled(e.value)}
                      />
                      <span>Upload VAT Registration Certificate</span>
                    </div>
                    <FileUploadTemplate enabled={isVatEnabled} />
                  </div>
                  <div className="fileUpload mt-3 flex-col">
                    <div className="flex align-items-center gap-3">
                      <InputSwitch
                        checked={isVatEnabled}
                        onChange={(e) => setVatEnabled(e.value)}
                      />
                      <span>Upload VAT Registration Certificate</span>
                    </div>
                    <FileUploadTemplate enabled={isVatEnabled} />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex pt-4 justify-content-between">
            <Button
              label="Back"
              severity="secondary"
              icon="pi pi-arrow-left"
              onClick={() => stepperRef.current.prevCallback()}
            />
            <Button
              label="Next"
              icon="pi pi-arrow-right"
              iconPos="right"
              severity="success"
              onClick={handleNext}
            />
          </div>
        </StepperPanel>
        <StepperPanel header="Financial Info">
          <div className="border-2 px-5 py-5 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
            <div className="inputForms w-full">
              <span>Bank Account Details</span>
              <div className="p-inputgroup flex-1 mt-3">
                <span className="p-inputgroup-addon">
                  <Landmark size={20} />
                </span>
                <InputText placeholder="Bank Name" />
              </div>
              <div className="flex gap-3 mt-3 mb-3">
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <Banknote size={20} />
                  </span>
                  <InputText placeholder="Account Number" />
                </div>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <CreditCard size={20} />
                  </span>
                  <InputText placeholder="IBAN Code" />
                </div>
              </div>
              <span>Payment Accepted</span>
              <div className="flex align-items-center gap-3 mt-3">
                <InputSwitch
                  checked={acceptInternationalCard}
                  onChange={(e) => setAcceptInternationalCard(e.value)}
                />
                <span>Regular International Card</span>
              </div>
              <div className="flex align-items-center gap-3 mt-3">
                <InputSwitch
                  checked={acceptTwint}
                  onChange={(e) => setAcceptTwint(e.value)}
                />
                <span>Twint</span>
              </div>
              <div className="flex align-items-center gap-3 mt-3">
                <InputSwitch
                  checked={acceptPostFinance}
                  onChange={(e) => setAcceptPostFinance(e.value)}
                />
                <span>PostFinance</span>
              </div>
              <div className="flex align-items-center gap-3 mt-3 mb-3">
                <InputSwitch
                  checked={acceptApplePay}
                  onChange={(e) => setAcceptApplePay(e.value)}
                />
                <span>Apple Pay</span>
              </div>
              <span>Money Transfer Details</span>
              <div className="p-inputgroup flex-1 mt-3">
                <span className="p-inputgroup-addon">
                  <BadgeSwissFranc size={20} />
                </span>
                <InputText placeholder="Payout Frequency (Weekly or Monthly)" />
              </div>
            </div>
          </div>
          <div className="flex pt-4 justify-content-between">
            <Button
              label="Back"
              severity="secondary"
              icon="pi pi-arrow-left"
              onClick={() => stepperRef.current.prevCallback()}
            />
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
        </StepperPanel>
      </Stepper>
    </div>
  );
}
