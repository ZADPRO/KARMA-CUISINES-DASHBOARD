import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";

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
} from "lucide-react";

export default function AddVendorStepper() {
  const stepperRef = useRef(null);
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <Stepper ref={stepperRef} style={{ flexBasis: "50rem" }}>
        <StepperPanel header="Basic Info">
          <div className="border-2 px-5 py-5 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
            <div className="inputForms">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <Utensils size={20} />
                </span>
                <InputText placeholder="Restaurant Name" />
              </div>{" "}
              <div className="flex gap-3 mt-3">
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <User size={20} />{" "}
                  </span>
                  <InputText placeholder="Contact Person Name " />
                </div>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <BriefcaseBusiness size={20} />
                  </span>
                  <InputText placeholder="Contact Person Designation " />
                </div>
              </div>
              <div className="flex gap-3 mt-3">
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <Contact size={20} />{" "}
                  </span>
                  <InputText placeholder="Contact Person Number" />
                </div>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <Phone size={20} />
                  </span>
                  <InputText placeholder="Contact Person Email" />
                </div>
              </div>
              <div className="p-inputgroup flex-1 mt-3">
                <span className="p-inputgroup-addon">
                  <MapPinHouse size={20} />{" "}
                </span>
                <InputText placeholder="Restaurant Address" />
              </div>{" "}
              <div className="p-inputgroup flex-1 mt-3">
                <span className="p-inputgroup-addon">
                  <Link size={20} />
                </span>
                <InputText placeholder="Website URL" />
              </div>{" "}
              <div className="fileUpload mt-3 flex-col">
                <div className="flex align-items-center gap-3">
                  <InputSwitch
                    checked={checked}
                    onChange={(e) => setChecked(e.value)}
                  />
                  <span className="">Upload Logo</span>
                </div>
                <FileUploadTemplate enabled={checked} />
              </div>
              <div className="fileUpload mt-3 flex-col">
                <div className="flex align-items-center gap-3">
                  <InputSwitch
                    checked={checked}
                    onChange={(e) => setChecked(e.value)}
                  />
                  <span className="">Social Media Links</span>
                </div>
                <div className="socialMediaLinks flex gap-3 mt-3">
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <Facebook size={20} />{" "}
                    </span>
                    <InputText placeholder="Facebook" />
                  </div>
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <Instagram size={20} />{" "}
                    </span>
                    <InputText placeholder="Instagram" />
                  </div>
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                      <Twitter size={20} />{" "}
                    </span>
                    <InputText placeholder="Twitter" />
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
              onClick={() => stepperRef.current.nextCallback()}
            />
          </div>
        </StepperPanel>
        <StepperPanel header="Restro Details">
          <div className="flex flex-column h-12rem">
            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              
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
              onClick={() => stepperRef.current.nextCallback()}
            />
          </div>
        </StepperPanel>
        <StepperPanel header="Financial Info">
          <div className="flex flex-column h-12rem">
            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              Content II
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
              onClick={() => stepperRef.current.nextCallback()}
            />
          </div>
        </StepperPanel>
        <StepperPanel header="Menu & Pricing">
          <div className="flex flex-column h-12rem">
            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              Content III
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
              label="Success"
              icon="pi pi-arrow-right"
              iconPos="right"
              severity="success"
              onClick={() => stepperRef.current.nextCallback()}
            />
          </div>
        </StepperPanel>
      </Stepper>
    </div>
  );
}
