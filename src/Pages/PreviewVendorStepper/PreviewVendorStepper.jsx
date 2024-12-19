import { TabView, TabPanel } from "primereact/tabview";
import {
  BadgeSwissFranc,
  Banknote,
  BriefcaseBusiness,
  Contact,
  CreditCard,
  Facebook,
  Instagram,
  Landmark,
  Link,
  MapPinHouse,
  Phone,
  Twitter,
  User,
  Utensils,
} from "lucide-react";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { useState } from "react";
import FileUploadTemplate from "../FileUpload/FileUploadTemplate";
import { Button } from "primereact/button";

export default function PreviewVendorStepper() {
  const [checked, setChecked] = useState(false);
  const [editEnabled, setEditEnabled] = useState(false);
  const [restroEditEnabled, setRestroEditEnabled] = useState(false);
  const [uploadLogoEnabled, setUploadLogoEnabled] = useState(false);
  const [socialLinksEnabled, setSocialLinksEnabled] = useState(false);

  const [isCommercialRegisterEnabled, setCommercialRegisterEnabled] =
    useState(false);
  const [isVatEnabled, setVatEnabled] = useState(false);
  const [isAlcoholLicenseEnabled, setAlcoholLicenseEnabled] = useState(false);
  const [isFoodSafetyEnabled, setFoodSafetyEnabled] = useState(false);
  const [isLiabilityInsuranceEnabled, setLiabilityInsuranceEnabled] =
    useState(false);

  const [financeRegEnabled, setFinanceRegEnabled] = useState(false);
  const [acceptInternationalCard, setAcceptInternationalCard] = useState(false);
  const [acceptTwint, setAcceptTwint] = useState(false);
  const [acceptPostFinance, setAcceptPostFinance] = useState(false);
  const [acceptApplePay, setAcceptApplePay] = useState(false);

  const isSaveEnabled =
    acceptInternationalCard ||
    acceptTwint ||
    acceptPostFinance ||
    acceptApplePay;

  const isAnySwitchEnabled =
    isCommercialRegisterEnabled ||
    isVatEnabled ||
    isAlcoholLicenseEnabled ||
    isFoodSafetyEnabled ||
    isLiabilityInsuranceEnabled;

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

  const handleBasicInfo = () => {
    console.log("Saved Data:", formData);
  };
  const handleRestroDetails = () => {
    console.log("Saving Restaurant Details");
    // Add save logic here
  };

  const handleFinanceInfo = () => {
    console.log("Saving Finance Info");
    // Add save logic here
  };

  return (
    <div>
      <div className="card">
        <TabView>
          <TabPanel header="Basic Info">
            <div className="flex pb-3 align-items-center justify-content-between">
              <div className="flex align-items-center gap-3">
                <InputSwitch
                  checked={editEnabled}
                  onChange={(e) => setEditEnabled(e.value)}
                />
                <span className="">Edit</span>
              </div>
              <Button
                label="Save"
                disabled={!editEnabled}
                onClick={handleBasicInfo}
                icon="pi pi-check"
                iconPos="right"
                severity="success"
              />
            </div>
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
                    disabled={!editEnabled}
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
                      onChange={(e) =>
                        handleInputChange(e, "contactPersonName")
                      }
                      disabled={!editEnabled}
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
                      disabled={!editEnabled}
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
                      disabled={!editEnabled}
                    />{" "}
                  </div>
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <Phone size={20} />
                    </span>
                    <InputText
                      placeholder="Contact Person Email"
                      value={formData.contactPersonEmail}
                      onChange={(e) =>
                        handleInputChange(e, "contactPersonEmail")
                      }
                      disabled={!editEnabled}
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
                    disabled={!editEnabled}
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
                    disabled={!editEnabled}
                  />{" "}
                </div>{" "}
                <div className="fileUpload mt-3 flex-col">
                  <div className="flex align-items-center gap-3">
                    <InputSwitch
                      disabled={!editEnabled}
                      checked={uploadLogoEnabled}
                      onChange={(e) => setUploadLogoEnabled(e.value)}
                    />
                    <span className="">Upload Logo</span>
                  </div>
                  <FileUploadTemplate enabled={uploadLogoEnabled} />
                </div>
                <div className="fileUpload mt-3 flex-col">
                  <div className="flex align-items-center gap-3">
                    <InputSwitch
                      disabled={!editEnabled}
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
          </TabPanel>
          <TabPanel header="Restaurant Details">
            <div className="flex pb-3 align-items-center justify-content-between">
              <div className="flex align-items-center gap-3">
                <InputSwitch
                  checked={restroEditEnabled}
                  onChange={(e) => setRestroEditEnabled(e.value)}
                />
                <span>Edit</span>
              </div>
              <Button
                label="Save"
                disabled={!isAnySwitchEnabled}
                icon="pi pi-check"
                iconPos="right"
                severity="success"
                onClick={handleRestroDetails}
              />
            </div>
            <div className="border-2 px-5 py-5 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              <div className="uploadFiles w-full">
                <div className="fileUpload mt-3 flex-col">
                  <div className="fileUpload flex-col">
                    <div className="flex align-items-center gap-3">
                      <InputSwitch
                        disabled={!restroEditEnabled}
                        checked={isVatEnabled}
                        required
                        onChange={(e) => setVatEnabled(e.value)}
                      />
                      <span>Upload VAT Registration Certificate</span>
                    </div>
                    <FileUploadTemplate enabled={isVatEnabled} />
                  </div>

                  <div className="flex align-items-center mt-3 gap-3">
                    <InputSwitch
                      checked={isCommercialRegisterEnabled}
                      disabled={!restroEditEnabled}
                      onChange={(e) => setCommercialRegisterEnabled(e.value)}
                    />
                    <span>Upload Commercial Register Extract</span>
                  </div>
                  <FileUploadTemplate enabled={isCommercialRegisterEnabled} />
                </div>

                <div className="fileUpload mt-3 flex-col">
                  <div className="flex align-items-center gap-3">
                    <InputSwitch
                      disabled={!restroEditEnabled}
                      checked={isAlcoholLicenseEnabled}
                      onChange={(e) => setAlcoholLicenseEnabled(e.value)}
                    />
                    <span>Upload Alcohol License (if applicable)</span>
                  </div>
                  <FileUploadTemplate enabled={isAlcoholLicenseEnabled} />
                </div>

                <div className="fileUpload mt-3 flex-col">
                  <div className="flex align-items-center gap-3">
                    <InputSwitch
                      disabled={!restroEditEnabled}
                      checked={isFoodSafetyEnabled}
                      onChange={(e) => setFoodSafetyEnabled(e.value)}
                    />
                    <span>Upload Food Safety and Hygiene Certificate</span>
                  </div>
                  <FileUploadTemplate enabled={isFoodSafetyEnabled} />
                </div>

                <div className="fileUpload mt-3 flex-col">
                  <div className="flex align-items-center gap-3">
                    <InputSwitch
                      disabled={!restroEditEnabled}
                      checked={isLiabilityInsuranceEnabled}
                      onChange={(e) => setLiabilityInsuranceEnabled(e.value)}
                    />
                    <span>Upload Liability Insurance Certificate</span>
                  </div>
                  <FileUploadTemplate enabled={isLiabilityInsuranceEnabled} />
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel header="Financial Info">
            <div className="flex pb-3 align-items-center justify-content-between">
              <div className="flex align-items-center gap-3">
                <InputSwitch
                  checked={financeRegEnabled}
                  onChange={(e) => setFinanceRegEnabled(e.value)}
                />
                <span>Edit</span>
              </div>
              <Button
                label="Save"
                disabled={!isSaveEnabled}
                icon="pi pi-check"
                iconPos="right"
                severity="success"
                onClick={handleFinanceInfo}
              />
            </div>
            <div className="border-2 px-5 py-5 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              <div className="inputForms w-full">
                <span>Bank Account Details</span>
                <div className="p-inputgroup flex-1 mt-3">
                  <span className="p-inputgroup-addon">
                    <Landmark size={20} />
                  </span>
                  <InputText
                    placeholder="Bank Name"
                    disabled={!financeRegEnabled}
                  />
                </div>
                <div className="flex gap-3 mt-3 mb-3">
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <Banknote size={20} />
                    </span>
                    <InputText
                      placeholder="Account Number"
                      disabled={!financeRegEnabled}
                    />
                  </div>
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <CreditCard size={20} />
                    </span>
                    <InputText
                      placeholder="IBAN Code"
                      disabled={!financeRegEnabled}
                    />
                  </div>
                </div>
                <span>Payment Accepted</span>
                <div className="flex align-items-center gap-3 mt-3">
                  <InputSwitch
                    checked={acceptInternationalCard}
                    disabled={!financeRegEnabled}
                    onChange={(e) => setAcceptInternationalCard(e.value)}
                  />
                  <span>Regular International Card</span>
                </div>
                <div className="flex align-items-center gap-3 mt-3">
                  <InputSwitch
                    checked={acceptTwint}
                    disabled={!financeRegEnabled}
                    onChange={(e) => setAcceptTwint(e.value)}
                  />
                  <span>Twint</span>
                </div>
                <div className="flex align-items-center gap-3 mt-3">
                  <InputSwitch
                    checked={acceptPostFinance}
                    disabled={!financeRegEnabled}
                    onChange={(e) => setAcceptPostFinance(e.value)}
                  />
                  <span>PostFinance</span>
                </div>
                <div className="flex align-items-center gap-3 mt-3 mb-3">
                  <InputSwitch
                    checked={acceptApplePay}
                    disabled={!financeRegEnabled}
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
                    disabled={!financeRegEnabled}
                  />
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel header="Menu & Pricing">
            <div className="flex pb-3 align-items-center justify-content-between">
              <div className="flex align-items-center gap-3">
                <InputSwitch
                  checked={checked}
                  onChange={(e) => setChecked(e.value)}
                />
                <span className="">Edit</span>
              </div>
              <Button
                label="Save"
                disabled
                icon="pi pi-check"
                iconPos="right"
                severity="success"
              />
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
}
