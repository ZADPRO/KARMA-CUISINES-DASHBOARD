import React, { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import {
  BadgeSwissFranc,
  Grid2x2Plus,
  IdCard,
  LayoutPanelLeft,
  Minimize2,
  NotepadText,
  Soup,
} from "lucide-react";
import decrypt from "../../helper";
import axios from "axios";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

interface Categories {
  refFoodCategoryId: number;
  refFoodCategoryName: string;
}

const AddProducts: React.FC = () => {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productAddons, setProductAddons] = useState("");
  const [categoriesData, setCategoriesData] = useState<Categories[]>([]);

  const toastRef = useRef<Toast>(null);

  const getCategory = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/productCombo/getCategory", {
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
        setCategoriesData(data.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const showToast = (
    detail: string,
    severity: "error" | "success" = "error"
  ) => {
    toastRef.current?.show({
      severity,
      summary: severity === "error" ? "Validation Error" : "Success",
      detail,
      life: 3000,
    });
  };

  const validateForm = (): boolean => {
    const idValid = /^\d+$/.test(productId);
    const nameValid = /^[a-zA-Z0-9\s]+$/.test(productName);
    const descValid = /^[a-zA-Z0-9\s.,!?'-]*$/.test(
      productDescription.replace(/<[^>]+>/g, "")
    );
    const priceValid = /^(\d+)(\.\d{1,2})?$/.test(productPrice);
    const quantityValid = /^\d+$/.test(productQuantity);

    if (!idValid) {
      showToast("Product ID must be entered.");
      return false;
    }

    if (!nameValid) {
      showToast("Product Name must be entered.");
      return false;
    }

    if (!descValid) {
      showToast("Product Description must be entered.");
      return false;
    }

    if (!priceValid) {
      showToast("Product Price must be entered (e.g., 12.00, 12.90).");
      return false;
    }

    if (!quantityValid) {
      showToast("Product Quantity must be entered.");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const formattedPrice = parseFloat(productPrice).toFixed(2);

    const formData = {
      productId: parseInt(productId),
      productName,
      productDescription,
      productPrice: formattedPrice,
      productQuantity: parseInt(productQuantity),
      productCategory,
      productAddons,
    };

    console.log("Submitted Data: ", formData);
    showToast("Product submitted successfully!", "success");

    // Reset fields
    setProductId("");
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductQuantity("");
    setProductCategory("");
    setProductAddons("");
  };

  const customUploadHandler = (event: any) => {
    const files = event.files;
    const formData = new FormData();

    files.forEach((file: File) => {
      formData.append("foodImg", file, file.name);
    });

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/productCombo/FoodImg`,
        {
          foodImg: formData,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWTtoken")}`,
          },
        }
      )
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("Upload success", data);
      })
      .catch((error) => {
        console.error("Upload error", error);
      });
  };

  return (
    <div>
      <Toast ref={toastRef} />

      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <IdCard />
          </span>
          <InputText
            placeholder="Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </div>

        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <Soup />
          </span>
          <InputText
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
      </div>

      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          {/* <FileUpload
            name="foodImg"
            url={`${import.meta.env.VITE_API_URL}/productCombo/FoodImg`}
            multiple
            accept="image/*"
            className="w-full"
            maxFileSize={1000000}
            emptyTemplate={
              <p className="m-0">Drag and drop files here to upload.</p>
            }
          /> */}
          <FileUpload
            name="demo[]"
            url={`${import.meta.env.VITE_API_URL}/productCombo/FoodImg`}
            multiple
            accept="image/*"
            className="w-full"
            maxFileSize={1000000}
            emptyTemplate={
              <p className="m-0">Drag and drop files here to upload.</p>
            }
            customUpload
            uploadHandler={customUploadHandler} // Use custom upload handler
          />
        </div>
      </div>

      <div className="card flex flex-column gap-3 mt-3">
        <label htmlFor="productDescription" className="text-gray-600 text-sm">
          <div className="flex items-center gap-1">
            <NotepadText />
            Product Description
          </div>
        </label>
        <Editor
          id="productDescription"
          value={productDescription}
          onTextChange={(e) => setProductDescription(e.htmlValue || "")}
          style={{ height: "150px" }}
        />
      </div>

      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <BadgeSwissFranc />
          </span>
          <InputText
            placeholder="Product Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>

        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <Minimize2 />
          </span>
          <InputText
            placeholder="Product Quantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />
        </div>
      </div>

      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <LayoutPanelLeft />
          </span>
          <Dropdown
            value={productCategory}
            onChange={(e: DropdownChangeEvent) => setProductCategory(e.value)}
            options={categoriesData}
            filter
            optionLabel="refFoodCategoryName"
            optionValue="refFoodCategoryId"
            placeholder="Select Category"
            className="w-full md:w-14rem"
            checkmark={true}
            highlightOnSelect={false}
          />
        </div>

        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <Grid2x2Plus />
          </span>
          <InputText
            placeholder="Add ons"
            value={productAddons}
            onChange={(e) => setProductAddons(e.target.value)}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-4">
        <Button label="Submit" icon="pi pi-check" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AddProducts;
