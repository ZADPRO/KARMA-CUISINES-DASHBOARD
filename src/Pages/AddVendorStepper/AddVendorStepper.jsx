import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Toast } from "primereact/toast";

// import FileUploadTemplate from "../FileUpload/FileUploadTemplate";

// LUCIDE ICONS
import {
  BriefcaseBusiness,
  Contact,
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
  ShieldCheck,
} from "lucide-react";
import axios from "axios";
import { FileUpload } from "primereact/fileupload";
import { MultiSelect } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";
import { Divider } from "primereact/divider";

import decrypt from "../../helper";

export default function AddVendorStepper() {
  const toastRef = useRef(null);

  const stepperRef = useRef(null);
  const [socialLinksEnabled, setSocialLinksEnabled] = useState(false);

  const [acceptInternationalCard, setAcceptInternationalCard] = useState(false);
  const [acceptTwint, setAcceptTwint] = useState(false);
  const [acceptPostFinance, setAcceptPostFinance] = useState(false);
  const [acceptApplePay, setAcceptApplePay] = useState(false);

  const [formData, setFormData] = useState({
    refRestroName: "",
    refPerFName: "",
    refPerLName: "",
    refPerDesig: "",
    refPerMob: "",
    refPerEmail: "",
    refStreet: "",
    refCity: "",
    refPosCode: "",
    refZone: "",
    refCountry: "",
    ProfileImgPath: "",
    refWebsiteLink: "",
    refFaceBookLink: "",
    refInstragramLink: "",
    refTwitterLink: "",
  });

  const [bankData, setBankData] = useState({
    refBankName: "",
    refAccNo: "",
    refIBANCode: "",
    paymentMethods: "",
    refMonTransDetail: "",
  });

  const cities = [
    { name: "Monday", code: 1 },
    { name: "Tuesday", code: 2 },
    { name: "Wednesday", code: 3 },
    { name: "Thursday", code: 4 },
    { name: "Friday", code: 5 },
    { name: "Saturday", code: 6 },
    { name: "Sunday", code: 7 },
  ];

  const [fileUploadSections, setFileUploadSections] = useState([]);

  const [inputGroups, setInputGroups] = useState([
    { selectedCities: [], refStartTime: null, refEndTime: null },
  ]);

  const handleAddGroup = () => {
    setInputGroups([
      ...inputGroups,
      { selectedCities: [], refStartTime: null, refEndTime: null },
    ]);
  };

  const handleInputGroupChange = (index, field, value) => {
    const newInputGroups = [...inputGroups];
    newInputGroups[index][field] = value;
    setInputGroups(newInputGroups);
  };

  // const handleToggleSwitch = (id, value) => {
  //   setFileUploadSections((prevSections) =>
  //     prevSections.map((section) =>
  //       section.restroDocId === id ? { ...section, isEnabled: value } : section
  //     )
  //   );
  // };

  // const handleNext = async () => {
  //   // Prepare payload
  //   const payload = {
  //     documents: fileUploadSections
  //       .filter((section) => section.isEnabled && section.fileUploaded)
  //       .map((section) => ({
  //         label: section.label,
  //         file: section.fileUploaded,
  //       })),
  //   };

  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_API_URL}/vendorRoutes/RestaurentDocUplaod`,
  //       payload,
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("JWTtoken"),
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     // Decrypt response data
  //     const decryptedData = decrypt(
  //       response.data[1],
  //       response.data[0],
  //       import.meta.env.VITE_ENCRYPTION_KEY
  //     );

  // localStorage.setItem("JWTtoken", "Bearer " + decryptedData.token);

  //     console.log("Decrypted Response Data:", decryptedData);

  //     toastRef.current.show({
  //       severity: "success",
  //       summary: "Success",
  //       detail: "Documents uploaded successfully!",
  //       life: 3000,
  //     });

  //     // stepperRef.current.nextCallback();
  //   } catch (error) {
  //     toastRef.current.show({
  //       severity: "error",
  //       summary: "Error",
  //       detail: error.response?.data?.message || "Failed to upload documents.",
  //       life: 3000,
  //     });
  //   }
  // };

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

        // Filter the data to include only items where visibility is "true"
        const filteredSections = data.restroDetails
          .filter((section) => section.visibility === "true")
          .map((section) => ({
            id: section.restroDocId, // Use restroDocId as id
            label: section.refCertificateType, // Use refCertificateType as label
            isEnabled: section.visibility === "true", // Convert visibility to boolean
          }));

        console.log("filteredSections", filteredSections);
        setFileUploadSections(filteredSections);
      });
  }, []);

  // const handleNext = async () => {
  //   try {
  //     const formData = new FormData();

  //     formData.append("isVatEnabled", isVatEnabled);
  //     formData.append(
  //       "isCommercialRegisterEnabled",
  //       isCommercialRegisterEnabled
  //     );
  //     formData.append("isAlcoholLicenseEnabled", isAlcoholLicenseEnabled);
  //     formData.append("isFoodSafetyEnabled", isFoodSafetyEnabled);
  //     formData.append(
  //       "isLiabilityInsuranceEnabled",
  //       isLiabilityInsuranceEnabled
  //     );

  //     if (isVatEnabled && vatCertificateFile) {
  //       formData.append("vatCertificate", vatCertificateFile);
  //     }
  //     if (isCommercialRegisterEnabled && commercialRegisterFile) {
  //       formData.append("commercialRegister", commercialRegisterFile);
  //     }
  //     if (isAlcoholLicenseEnabled && alcoholLicenseFile) {
  //       formData.append("alcoholLicense", alcoholLicenseFile);
  //     }
  //     if (isFoodSafetyEnabled && foodSafetyFile) {
  //       formData.append("foodSafetyCertificate", foodSafetyFile);
  //     }
  //     if (isLiabilityInsuranceEnabled && liabilityInsuranceFile) {
  //       formData.append("liabilityInsurance", liabilityInsuranceFile);
  //     }

  //     // Axios POST request
  //     const response = await axios.post(
  //       "https://your-api-endpoint.com/restro-details",
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );

  //     console.log("Data submitted successfully:", response.data);

  //     stepperRef.current.nextCallback();
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //   }
  // };

  const handleUploadSuccess = (response) => {
    console.log("Upload Successful:", response);
    setFormData((prevFormData) => ({
      ...prevFormData, // Spread the previous state
      ProfileImgPath: response.filePath, // Update the ProfileImgPath
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

      localStorage.setItem("JWTtoken", "Bearer " + data.token);

      if (data.success) {
        handleUploadSuccess(data);
      } else {
        handleUploadFailure(data);
      }
    } catch (error) {
      handleUploadFailure(error);
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
    console.log("Form Data:", formData);
    console.log("Input Groups:", inputGroups);
    // axios
    //   .post(
    //     import.meta.env.VITE_API_URL + "/vendorRoutes",
    //     {
    //       formData: formData,
    //       inputGroups: inputGroups,
    //     },
    //     {
    //       headers: {
    //         Authorization: localStorage.getItem("JWTtoken"),
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     const data = decrypt(
    //       res.data[1],
    //       res.data[0],
    //       import.meta.env.VITE_ENCRYPTION_KEY
    //     );
    //     console.log("data", data);
    //   });
    if (validateForm()) {
      // axios.post(
      //   import.meta.env.VITE_API_URL + "/vendorRoutes/BasicDetails",
      //   {}
      // );
      stepperRef.current.nextCallback();
    }
  };

  const handleInputChange = (e, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleBankInputChange = (e, field) => {
    setBankData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmitRestroDetails = () => {
    const userDetails = localStorage.getItem("userDetails");
    const userDetailsObj = userDetails ? JSON.parse(userDetails) : {};

    // Access the refRoleId
    const refRoleId = userDetailsObj.refRoleId;
    const BasicInfo = {
      Users: {
        refPerFName: formData.refPerFName || "",
        refPerLName: formData.refPerLName || "",
        refRollId: refRoleId || "",
      },
      Communtication: {
        refPerMob: formData.refPerMob || "",
        refPerEmail: formData.refPerEmail || "",
      },
      Address: {
        refStreet: formData.refStreet || "",
        refCity: formData.refCity || "",
        refPosCode: formData.refPosCode || "",
        refZone: formData.refZone || "",
        refCountry: formData.refCountry || "",
      },
      RestroWork: [
        {
          refDayId: 1,
          refStartTime: formData.refStartTime1 || "",
          refEndTime: formData.refEndTime1 || "",
        },
        {
          refDayId: 2,
          refStartTime: formData.refStartTime2,
          refEndTime: formData.refEndTime2,
        },
      ],
      Vendor: {
        refRestroName: formData.refRestroName || "",
        refPerDesig: formData.refPerDesig || "",
      },
      SocialLink: {
        refWebsiteLink: formData.refWebsiteLink || "",
        refFaceBookLink: formData.refFaceBookLink || "",
        refInstragramLink: formData.refInstragramLink || "",
        refTwitterLink: formData.refTwitterLink || "",
      },
      ProfileImgPath: formData.ProfileImgPath || "",
    };
    const RestroDetails = fileUploadSections.map((section) => {
      const refRestroDocPath = document.getElementById(
        `input-${section.id}`
      ).value;
      return {
        refRestroDocId: section.id || "",
        refRestroDocPath: refRestroDocPath || "",
      };
    });

    const FinancialInfo = {
      refBankName: bankData.refBankName || "",
      refAccNo: bankData.refAccNo || "",
      refIBANCode: bankData.refIBANCode || "",
      refMonTransDetail: bankData.refMonTransDetail || "",
    };

    axios
      .post("https://dummyapi.com/submit", {
        BasicInfo,
        RestroDetails,
        FinancialInfo,
      })
      .then((res) => {
        console.log("res", res);
        console.log("Payload as RestroDetails:", {
          BasicInfo,
          RestroDetails,
          FinancialInfo,
        });
        toastRef.current.show({
          severity: "success",
          summary: "Success",
          detail: "Form submitted successfully!",
          life: 3000,
        });
      })
      .catch((error) => {
        console.error("Error in API request:", error);
        toastRef.current.show({
          severity: "error",
          summary: "Error",
          detail: error.message,
          life: 3000,
        });
      });
  };
  return (
    <div>
      <Toast ref={toastRef} />

      <Stepper ref={stepperRef} style={{ flexBasis: "50rem" }}>
        <StepperPanel header="Basic Info">
          <div className="border-2 px-5 py-5 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
            <div className="inputForms">
              <span>Restro Basic Details</span>
              <div className="flex gap-3 mt-3">
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <Utensils size={20} />
                  </span>
                  <InputText
                    placeholder="Restaurant Name"
                    value={formData.refRestroName}
                    onChange={(e) => handleInputChange(e, "refRestroName")}
                  />
                </div>{" "}
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <BriefcaseBusiness size={20} />
                  </span>
                  <InputText
                    placeholder="Contact Person Designation"
                    value={formData.refPerDesig}
                    onChange={(e) => handleInputChange(e, "refPerDesig")}
                  />{" "}
                </div>
              </div>
              <div className="flex gap-3 mt-3">
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <User size={20} />{" "}
                  </span>
                  <InputText
                    placeholder="First Name"
                    value={formData.refPerFName}
                    onChange={(e) => handleInputChange(e, "refPerFName")}
                  />{" "}
                </div>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <User size={20} />{" "}
                  </span>
                  <InputText
                    placeholder="Last Name"
                    value={formData.refPerLName}
                    onChange={(e) => handleInputChange(e, "refPerLName")}
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
                    value={formData.refPerMob}
                    onChange={(e) => handleInputChange(e, "refPerMob")}
                  />{" "}
                </div>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <Phone size={20} />
                  </span>
                  <InputText
                    placeholder="Contact Person Email"
                    value={formData.refPerEmail}
                    onChange={(e) => handleInputChange(e, "refPerEmail")}
                  />{" "}
                </div>
              </div>
              <Divider />
              <span>Working Days</span>
              <div className="flex justify-content-end">
                <Button
                  icon="pi pi-plus"
                  severity="success"
                  label="Add New Timing"
                  onClick={handleAddGroup}
                />
              </div>
              <div>
                {inputGroups.map((group, index) => (
                  <div key={index} className="flex gap-3 mt-3">
                    <div className="p-inputgroup flex-1">
                      <span className="p-inputgroup-addon">
                        <Phone size={20} />
                      </span>
                      <MultiSelect
                        value={group.selectedCities}
                        onChange={(e) =>
                          handleInputGroupChange(
                            index,
                            "selectedCities",
                            e.value
                          )
                        }
                        options={cities}
                        optionLabel="name"
                        style={{ minWidth: "10rem" }}
                        display="chip"
                        placeholder="Select Working Days"
                        maxSelectedLabels={1}
                      />
                    </div>
                    <div className="p-inputgroup flex-1">
                      <span className="p-inputgroup-addon">
                        <Contact size={20} />
                      </span>
                      <Calendar
                        placeholder="Restro Opening Time"
                        value={group.refStartTime}
                        style={{ minWidth: "4rem" }}
                        onChange={(e) =>
                          handleInputGroupChange(index, "refStartTime", e.value)
                        }
                        timeOnly
                      />
                    </div>
                    <div className="p-inputgroup flex-1">
                      <span className="p-inputgroup-addon">
                        <Phone size={20} />
                      </span>
                      <Calendar
                        placeholder="Restro Closing Time"
                        value={group.refEndTime}
                        style={{ minWidth: "4rem" }}
                        onChange={(e) =>
                          handleInputGroupChange(index, "refEndTime", e.value)
                        }
                        timeOnly
                        minDate={
                          group.refStartTime
                            ? new Date(group.refStartTime)
                            : undefined
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Divider />
              <span>Communication Details</span>
              <div className="flex gap-3 mt-3">
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <Phone size={20} />
                  </span>
                  <InputText
                    placeholder="Door No, Street"
                    value={formData.refStreet}
                    onChange={(e) => handleInputChange(e, "refStreet")}
                  />{" "}
                </div>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <Contact size={20} />{" "}
                  </span>
                  <InputText
                    placeholder="City"
                    value={formData.refCity}
                    onChange={(e) => handleInputChange(e, "refCity")}
                  />{" "}
                </div>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <Phone size={20} />
                  </span>
                  <InputText
                    placeholder="Postal Code"
                    value={formData.refPosCode}
                    onChange={(e) => handleInputChange(e, "refPosCode")}
                  />{" "}
                </div>
              </div>
              <div className="flex gap-3 mt-3 mb-3">
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <Phone size={20} />
                  </span>
                  <InputText
                    placeholder="Zone"
                    value={formData.refZone}
                    onChange={(e) => handleInputChange(e, "refZone")}
                  />{" "}
                </div>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <Contact size={20} />{" "}
                  </span>
                  <InputText
                    placeholder="Country"
                    value={formData.refCountry}
                    onChange={(e) => handleInputChange(e, "refCountry")}
                  />{" "}
                </div>
              </div>
              <div className="p-inputgroup flex-1 mt-3">
                <span className="p-inputgroup-addon">
                  <Link size={20} />
                </span>
                <InputText
                  placeholder="Website URL"
                  value={formData.refWebsiteLink}
                  onChange={(e) => handleInputChange(e, "refWebsiteLink")}
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
                      value={formData.refFaceBookLink}
                      onChange={(e) => handleInputChange(e, "refFaceBookLink")}
                      disabled={!socialLinksEnabled}
                    />{" "}
                  </div>
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <Instagram size={20} />{" "}
                    </span>
                    <InputText
                      placeholder="Instagram"
                      value={formData.refInstragramLink}
                      onChange={(e) =>
                        handleInputChange(e, "refInstragramLink")
                      }
                      disabled={!socialLinksEnabled}
                    />{" "}
                  </div>
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <Twitter size={20} />{" "}
                    </span>
                    <InputText
                      placeholder="Twitter"
                      value={formData.refTwitterLink}
                      onChange={(e) => handleInputChange(e, "refTwitterLink")}
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

        {/* <StepperPanel header="Restro Details">
          <div className="border-2 px-5 py-5 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
            <div className="uploadFiles w-full">
              {fileUploadSections.map((section) => (
                <div className="fileUpload mt-3 flex-col" key={section.id}>
                  <div className="flex align-items-center gap-3">
                    <InputSwitch
                      checked={section.isEnabled}
                      onChange={(e) => handleToggleSwitch(section.id, e.value)}
                    />
                    <span>{section.label}</span>
                  </div>
                  {section.isEnabled && (
                    <FileUploadTemplate
                      enabled={section.isEnabled}
                      onUploadSuccess={(filePath) =>
                        setFileUploadSections((prevSections) =>
                          prevSections.map((item) =>
                            item.id === section.id
                              ? { ...item, fileUploaded: filePath }
                              : item
                          )
                        )
                      }
                    />
                  )}
                </div>
              ))}
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
        </StepperPanel> */}

        <StepperPanel header="Financial Info">
          <div className="border-2 px-5 py-5 border-dashed surface-border border-round surface-ground flex flex-col justify-content-center font-medium">
            <div
              className="flex flex-col w-full"
              style={{ flexDirection: "column" }}
            >
              <span className="mb-3">Restro Details</span>
              <div>
                {fileUploadSections.length > 0 ? (
                  fileUploadSections.map((section) => (
                    <>
                      <span key={section.id} className="">
                        {section.label}
                      </span>
                      <div className="p-inputgroup flex-1 mt-3 mb-3">
                        <span className="p-inputgroup-addon">
                          <ShieldCheck size={20} />
                        </span>
                        <InputText
                          id={`input-${section.id}`}
                          placeholder="Certificate Name"
                        />
                      </div>
                    </>
                  ))
                ) : (
                  <span>No Labels Available</span>
                )}
              </div>
            </div>
            <Divider layout="vertical" />

            <div className="inputForms w-full">
              <span>Bank Account Details</span>
              <div className="p-inputgroup flex-1 mt-3">
                <span className="p-inputgroup-addon">
                  <Landmark size={20} />
                </span>
                <InputText
                  placeholder="Bank Name"
                  value={bankData.refBankName}
                  onChange={(e) => handleBankInputChange(e, "refBankName")}
                />
              </div>
              <div className="flex gap-3 mt-3 mb-3">
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <Banknote size={20} />
                  </span>
                  <InputText
                    placeholder="Account Number"
                    value={bankData.refAccNo}
                    onChange={(e) => handleBankInputChange(e, "refAccNo")}
                  />
                </div>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <CreditCard size={20} />
                  </span>
                  <InputText
                    placeholder="IBAN Code"
                    value={bankData.refIBANCode}
                    onChange={(e) => handleBankInputChange(e, "refIBANCode")}
                  />
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
                <InputText
                  placeholder="Payout Frequency (Weekly or Monthly)"
                  onChange={(e) =>
                    handleBankInputChange(e, "refMonTransDetail")
                  }
                />
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
              onClick={() => handleSubmitRestroDetails()}
            />
          </div>
        </StepperPanel>
      </Stepper>
    </div>
  );
}
