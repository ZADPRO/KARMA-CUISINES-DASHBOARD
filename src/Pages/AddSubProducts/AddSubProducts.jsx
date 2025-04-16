import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";

import { Divider } from "primereact";

import {
  AlignLeft,
  ArrowUpNarrowWide,
  BadgeSwissFranc,
  Blocks,
  BringToFront,
  CircleMinus,
  CirclePlus,
  Ham,
  IdCard,
  NotepadText,
} from "lucide-react";

export default function AddSubProducts() {
  return (
    <div>
      <h3>Add Sub Products</h3>
      <h3>Categories</h3>

      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <Blocks />{" "}
          </span>
          <InputText placeholder="Category" />
        </div>

        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <BringToFront />{" "}
          </span>
          <InputText placeholder="Sub Category (Optional)" />
        </div>
      </div>

      <Divider />

      <h3>Product Details</h3>

      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <IdCard />{" "}
          </span>
          <InputText placeholder="Product ID" />
        </div>

        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <Ham />{" "}
          </span>
          <InputText placeholder="Product Name" />
        </div>
      </div>

      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <AlignLeft />{" "}
          </span>
          <InputText placeholder="Product Description" />
        </div>
      </div>

      <p className="mt-3">Product Image Upload</p>
      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <FileUpload
          name="demo[]"
          url={"/api/upload"}
          multiple
          accept="image/*"
          maxFileSize={1000000}
          className="w-full"
          emptyTemplate={
            <p className="m-0">Drag and drop files to here to upload.</p>
          }
        />
      </div>

      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <ArrowUpNarrowWide />{" "}
          </span>
          <InputText placeholder="Product Quantity" />
        </div>

        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <BadgeSwissFranc />{" "}
          </span>
          <InputText placeholder="Product Price" />
        </div>
      </div>

      <Divider />

      <h3>Others</h3>

      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <CircleMinus />{" "}
          </span>
          <InputText placeholder="Min Limit" />
        </div>

        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <CirclePlus />{" "}
          </span>
          <InputText placeholder="Max Limit" />
        </div>
      </div>

      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <NotepadText />{" "}
          </span>
          <InputText placeholder="Product Notes" />
        </div>
      </div>

      <div className="flex mt-3 align-items-end justify-content-end w-full">
        <Button label="Submit" severity="success" />
      </div>
    </div>
  );
}
