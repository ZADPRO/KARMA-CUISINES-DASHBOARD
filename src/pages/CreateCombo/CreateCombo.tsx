import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import {
  BadgeSwissFranc,
  IdCard,
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

  const [productAddons, setProductAddons] = useState<number[]>([]);
  const [mainProductAds, setMainProductAdds] = useState<number[]>([]);
  const [drinkAds, setDrinksAdds] = useState<number[]>([]);

  const [products, setProducts] = useState<FixedProductsProps[]>([]);
  const [mainProducts, setMainProducts] = useState<FixedProductsProps[]>([]);
  const [drinks, setDrinks] = useState<FixedProductsProps[]>([]);

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

  return (
    <div>
      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <IdCard />
          </span>
          <InputText placeholder="Menu ID" />
        </div>
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <Utensils />{" "}
          </span>
          <InputText placeholder="Combo Name" />
        </div>
      </div>

      <div className="card flex flex-column md:flex-row gap-3 mt-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <NotebookText />{" "}
          </span>
          <InputText placeholder="Combo Description" />
        </div>
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <BadgeSwissFranc />{" "}
          </span>
          <InputText placeholder="Combo Price" />
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
            <p className="mt-3">Main Dishes</p>
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
            <p className="mt-3">Drinks or Beverages</p>
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
    </div>
  );
};

export default CreateCombo;
