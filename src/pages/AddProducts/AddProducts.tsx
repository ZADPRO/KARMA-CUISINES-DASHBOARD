import React from "react";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import {
  BadgeSwissFranc,
  Grid2x2Plus,
  IdCard,
  LayoutPanelLeft,
  Minimize2,
  NotepadText,
  Soup,
} from "lucide-react";

const AddProducts: React.FC = () => {
  return (
    <div>
      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <IdCard />{" "}
          </span>
          <InputText placeholder="Product ID" />
        </div>

        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <Soup />
          </span>
          <InputText placeholder="Product Name" />
        </div>
      </div>

      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <FileUpload
            name="demo[]"
            url={"/api/upload"}
            multiple
            accept="image/*"
            className="w-full"
            maxFileSize={1000000}
            emptyTemplate={
              <p className="m-0">Drag and drop files to here to upload.</p>
            }
          />
        </div>
      </div>

      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <NotepadText />{" "}
          </span>
          <InputText placeholder="Product Description" />
        </div>
      </div>

      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <BadgeSwissFranc />{" "}
          </span>
          <InputText placeholder="Product Price" />
        </div>

        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <Minimize2 />
          </span>
          <InputText placeholder="Product Quantity" />
        </div>
      </div>

      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <LayoutPanelLeft />{" "}
          </span>
          <InputText placeholder="Product Category" />
        </div>

        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <Grid2x2Plus />
          </span>
          <InputText placeholder="Add ons" />
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
