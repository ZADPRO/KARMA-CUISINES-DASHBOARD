import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import {
  BadgeSwissFranc,
  IdCard,
  Maximize2,
  NotebookText,
  Utensils,
  UtensilsCrossed,
} from "lucide-react";
import { MultiSelect } from "primereact/multiselect";
import axios from "axios";
import decrypt from "../../helper";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { FileUpload } from "primereact/fileupload";

interface FixedProductsProps {
  refFoodId: number;
  refFoodName: string;
  refFoodCategoryName: string;
  refPrice: string;
  quantity: number;
}

const CreateCombo: React.FC = () => {
  const toastRef = useRef<Toast>(null);
  const [dropdownItems, setDropdownItems] = useState<FixedProductsProps[]>([]);
  const [mainProductDropdown, setMainProductDropdown] = useState<
    FixedProductsProps[]
  >([]);
  const [drinkDropdown, setDrinkDropdown] = useState<FixedProductsProps[]>([]);

  const [mainProductAds, setMainProductAdds] = useState<number[]>([]);
  const [drinkAds, setDrinksAdds] = useState<number[]>([]);

  const [products, setProducts] = useState<FixedProductsProps[]>([]);
  const [mainProducts, setMainProducts] = useState<FixedProductsProps[]>([]);
  const [drinks, setDrinks] = useState<FixedProductsProps[]>([]);

  const [menuId, setMenuId] = useState("");
  const [comboName, setComboName] = useState("");
  const [comboDescription, setComboDescription] = useState("");
  const fileUploadRef = useRef<FileUpload>(null);
  const [productImageFile, setProductImageFile] = useState("");
  const [productAddons, setProductAddons] = useState<number[]>([]);
  const [mainDishLimit, setMainDishLimit] = useState("");
  const [sideDishLimit, setSideDishLimit] = useState("");
  const [comboPrice, setComboPrice] = useState("");

  const getFixedProducts = (value: string) => {
    console.log("value", value);

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/productCombo/searchFood`,
        { searchKey: value },
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

        console.log("data.data line 203", data.data);

        const filtered = data.data.filter((item: any) =>
          (item.refFoodName + " " + item.refFoodCategoryName)
            .toLowerCase()
            .includes(value.toLowerCase())
        );

        setDropdownItems(filtered);
      })
      .catch((error) => {
        toastRef.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error Fetching Product Add-ons",
          life: 3000,
        });
        console.error("Fetch error", error);
      });
  };

  const customUploadHandler = (event: any) => {
    const files = event.files;
    console.log("files", files);
    const formData = new FormData();

    files.forEach((file: File) => {
      formData.append("foodImg", file, file.name);
    });

    axios
      .post(`${import.meta.env.VITE_API_URL}/productCombo/FoodImg`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTtoken")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("Upload success", data);
        console.log("data.filePaths.files[0]", data.filePaths.files[0]);
        setProductImageFile(data.filePaths.files[0]);
        toastRef.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Product Image Uploaded !",
          life: 3000,
        });
      })
      .catch((error) => {
        toastRef.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error In Product Image Upload ",
          life: 3000,
        });

        console.error("Upload error", error);
      });
  };

  const getMainProducts = (value: string) => {
    console.log("value", value);

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/productCombo/searchFood`,
        { searchKey: value },
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

        console.log("data.data line 203", data.data);

        const filtered = data.data.filter((item: any) =>
          (item.refFoodName + " " + item.refFoodCategoryName)
            .toLowerCase()
            .includes(value.toLowerCase())
        );

        setMainProductDropdown(filtered);
      })
      .catch((error) => {
        toastRef.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error Fetching Product Add-ons",
          life: 3000,
        });
        console.error("Fetch error", error);
      });
  };

  const getDrinks = (value: string) => {
    console.log("value", value);

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/productCombo/searchFood`,
        { searchKey: value },
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

        console.log("data.data line 203", data.data);

        const filtered = data.data.filter((item: any) =>
          (item.refFoodName + " " + item.refFoodCategoryName)
            .toLowerCase()
            .includes(value.toLowerCase())
        );

        setDrinkDropdown(filtered);
      })
      .catch((error) => {
        toastRef.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error Fetching Product Add-ons",
          life: 3000,
        });
        console.error("Fetch error", error);
      });
  };

  const handleMultiselectFixedProducts = (e: any) => {
    const selectedIds = e.value;

    const selectedItems = selectedIds.map((id: number) => {
      const existingProduct = products.find((item) => item.refFoodId === id);
      const newProduct = dropdownItems.find((item) => item.refFoodId === id);

      return existingProduct || { ...newProduct, quantity: 1 };
    });

    setProductAddons(selectedIds);
    setProducts(selectedItems);
  };

  const handleMultiselectMainproducts = (e: any) => {
    const selectedIds = e.value;

    const selectedItems = selectedIds.map((id: number) => {
      const existingProduct = mainProducts.find(
        (item) => item.refFoodId === id
      );
      const newProduct = mainProductDropdown.find(
        (item) => item.refFoodId === id
      );

      return existingProduct || { ...newProduct, quantity: 1 };
    });

    setMainProductAdds(selectedIds);
    setMainProducts(selectedItems);
  };

  const handleMultiselectDrinks = (e: any) => {
    const selectedIds = e.value;

    const selectedItems = selectedIds.map((id: number) => {
      const existingProduct = drinks.find((item) => item.refFoodId === id);
      const newProduct = drinkDropdown.find((item) => item.refFoodId === id);

      return existingProduct || { ...newProduct, quantity: 1 };
    });

    setDrinksAdds(selectedIds);
    setDrinks(selectedItems);
  };

  const quantityTemplate = (rowData: FixedProductsProps, options: any) => {
    console.log("options", options);
    const updateQuantity = (delta: number) => {
      const updatedProducts = products.map((product) =>
        product.refFoodId === rowData.refFoodId
          ? { ...product, quantity: Math.max(1, product.quantity + delta) }
          : product
      );
      console.log("updatedProducts", updatedProducts);
      setProducts(updatedProducts);
    };

    return (
      <div className="flex items-center gap-2">
        <Button
          severity="secondary"
          rounded
          onClick={() => updateQuantity(-1)}
          size="small"
        >
          -
        </Button>
        <span>{rowData.quantity}</span>
        <Button
          severity="success"
          rounded
          onClick={() => updateQuantity(1)}
          size="small"
        >
          +
        </Button>
      </div>
    );
  };

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
    if (!menuId || isNaN(parseInt(menuId))) {
      showToast("Menu ID must be a valid number.");
      return false;
    }

    if (!comboName || comboName.trim() === "") {
      showToast("Combo Name is required.");
      return false;
    }

    if (!comboPrice || !/^(\d+)(\.\d{1,2})?$/.test(comboPrice)) {
      showToast("Combo Price must be a valid format (e.g., 12.00).");
      return false;
    }

    if (!productImageFile) {
      showToast("Combo Image must be uploaded.");
      return false;
    }

    if (products.length === 0) {
      showToast("Please select at least one fixed food item.");
      return false;
    }

    const fixedFoodList = products.map((item) => item.refFoodId);
    const fixedFoodLimit = products.map((item) => item.quantity);
    const mainDishList = mainProducts.map((item) => item.refFoodId);
    const sideDishList = drinks.map((item) => item.refFoodId);

    if (fixedFoodList.length !== fixedFoodLimit.length) {
      showToast("Mismatch in fixed food and their quantities.");
      return false;
    }

    if (mainDishList.length === 0 || isNaN(parseInt(mainDishLimit))) {
      showToast("Please select main dish and enter valid limit.");
      return false;
    }

    if (sideDishList.length === 0 || isNaN(parseInt(sideDishLimit))) {
      showToast("Please select side dish and enter valid limit.");
      return false;
    }

    return true;
  };

  // FORM SUBMIT

  const handleSubmit = () => {
    if (!validateForm()) return;

    const fixedFoodList = products.map((item) => item.refFoodId);
    const fixedFoodLimit = products.map((item) => item.quantity);
    const mainDishList = mainProducts.map((item) => item.refFoodId);
    const sideDishList = drinks.map((item) => item.refFoodId);

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/productCombo/CreateCombo`,
        {
          menuId: parseInt(menuId, 10),
          comboName: comboName,
          comboImg: productImageFile,
          fixedFood: fixedFoodList,
          fixedQuantity: fixedFoodLimit,
          mainDish: mainDishList,
          comboDescription: comboDescription,
          mainDishLimit: parseInt(mainDishLimit, 10),
          sideDish: sideDishList,
          sideDishLimit: parseInt(sideDishLimit, 10),
          comboPrice: comboPrice,
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

        console.log("data", data);
        if (data.success) {
          toastRef.current?.show({
            severity: "success",
            summary: "Success",
            detail: "Combo Added Successfully !",
            life: 3000,
          });
          console.log("data", data);
          setMenuId("");
          setComboName("");
          setComboDescription("");
          fileUploadRef.current?.clear();
          setProductImageFile("");
          setMainDishLimit("");
          setSideDishLimit("");
          setProducts([]);
          setMainProducts([]);
          setDrinks([]);
          setDrinkDropdown([]);
          setMainProductAdds([]);
          setDrinksAdds([]);
        }
      })
      .catch((error) => {
        toastRef.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error In Product Image Upload ",
          life: 3000,
        });

        console.error("Upload error", error);
      });
  };

  return (
    <div>
      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <IdCard />
          </span>
          <InputText
            placeholder="Menu ID"
            value={menuId}
            onChange={(e) => setMenuId(e.target.value)}
          />
        </div>
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <Utensils />{" "}
          </span>
          <InputText
            placeholder="Combo Name"
            value={comboName}
            onChange={(e) => setComboName(e.target.value)}
          />
        </div>
      </div>

      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <NotebookText />{" "}
          </span>
          <InputText
            placeholder="Combo Description"
            value={comboDescription}
            onChange={(e) => setComboDescription(e.target.value)}
          />
        </div>
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <BadgeSwissFranc />{" "}
          </span>
          <InputText
            placeholder="Combo Price"
            value={comboPrice}
            onChange={(e) => setComboPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <FileUpload
            name="demo[]"
            url={`${import.meta.env.VITE_API_URL}/productCombo/FoodImg`}
            multiple
            accept="image/*"
            className="w-full"
            ref={fileUploadRef}
            maxFileSize={1000000}
            emptyTemplate={
              <p className="m-0">Drag and drop files here to upload.</p>
            }
            customUpload
            uploadHandler={customUploadHandler}
          />
        </div>
      </div>

      <p className="mt-3">Fixed Products</p>
      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <UtensilsCrossed />{" "}
          </span>
          <MultiSelect
            value={productAddons}
            options={dropdownItems}
            onChange={handleMultiselectFixedProducts}
            onFilter={(e) => getFixedProducts(e.filter)}
            optionLabel="refFoodName"
            optionValue="refFoodId"
            placeholder="Search Food Name"
            filter
            showClear
            display="chip"
            className="w-full md:w-14rem"
          />
        </div>
      </div>

      <DataTable value={products} className="mt-3" showGridlines stripedRows>
        <Column
          header="S.No"
          body={(_, { rowIndex }) => rowIndex + 1}
          style={{ width: "4rem" }}
        />
        <Column field="refFoodName" header="Product Name" />
        <Column header="Count" body={quantityTemplate} />
      </DataTable>

      <div className="card mt-3">
        <div className="flex flex-column md:flex-row">
          <div className="w-full flex flex-column  gap-3 py-5">
            <div className="card flex flex-column md:flex-row gap-3 mt-3">
              <div className="p-inputgroup flex-1">
                <p className="mt-3">Main Dishes</p>
              </div>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <Maximize2 />{" "}
                </span>
                <InputText
                  placeholder="Enter Maximum Limit"
                  value={mainDishLimit}
                  onChange={(e) => setMainDishLimit(e.target.value)}
                />
              </div>
            </div>
            <div className="card flex flex-column md:flex-row gap-3 mt-3">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <UtensilsCrossed />{" "}
                </span>
                <MultiSelect
                  value={mainProductAds}
                  options={mainProductDropdown}
                  onChange={handleMultiselectMainproducts}
                  onFilter={(e) => getMainProducts(e.filter)}
                  optionLabel="refFoodName"
                  optionValue="refFoodId"
                  placeholder="Search Food Name"
                  filter
                  showClear
                  display="chip"
                  className="w-full md:w-14rem"
                />
              </div>
            </div>

            <DataTable
              value={mainProducts}
              className="mt-3"
              showGridlines
              stripedRows
            >
              <Column
                header="S.No"
                body={(_, { rowIndex }) => rowIndex + 1}
                style={{ width: "4rem" }}
              />
              <Column field="refFoodName" header="Product Name" />
            </DataTable>
          </div>
          <div className="w-full md:w-2">
            <Divider layout="vertical" className="hidden md:flex"></Divider>
            <Divider
              layout="horizontal"
              className="flex md:hidden"
              align="center"
            >
              <b>OR</b>
            </Divider>
          </div>
          <div className="w-full flex flex-column gap-3 py-5">
            <div className="card flex flex-column md:flex-row gap-3 mt-3">
              <div className="p-inputgroup flex-1">
                <p className="mt-3">Drinks or Beverages</p>
              </div>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <Maximize2 />{" "}
                </span>
                <InputText
                  placeholder="Enter Maximum Limit"
                  value={sideDishLimit}
                  onChange={(e) => setSideDishLimit(e.target.value)}
                />
              </div>
            </div>{" "}
            <div className="card flex flex-column md:flex-row gap-3 mt-3">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <UtensilsCrossed />{" "}
                </span>
                <MultiSelect
                  value={drinkAds}
                  options={drinkDropdown}
                  onChange={handleMultiselectDrinks}
                  onFilter={(e) => getDrinks(e.filter)}
                  optionLabel="refFoodName"
                  optionValue="refFoodId"
                  placeholder="Search Food Name"
                  filter
                  showClear
                  display="chip"
                  className="w-full md:w-14rem"
                />
              </div>
            </div>
            <DataTable
              value={drinks}
              className="mt-3"
              showGridlines
              stripedRows
            >
              <Column
                header="S.No"
                body={(_, { rowIndex }) => rowIndex + 1}
                style={{ width: "4rem" }}
              />
              <Column field="refFoodName" header="Product Name" />
            </DataTable>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button label="Submit" icon="pi pi-check" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateCombo;
