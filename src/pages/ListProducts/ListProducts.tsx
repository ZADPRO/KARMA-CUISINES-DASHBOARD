import axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import React, { useEffect, useState } from "react";
import decrypt from "../../helper";

interface Product {
  profileFile: any;
  refAddOns: string;
  refCategoryId: number;
  refCreateAt: string;
  refCreateBy: string;
  refDescription: string;
  refFoodCategoryName: string;
  refFoodId: number;
  refFoodImage: string;
  refFoodName: string;
  refIfDelete: boolean;
  refMenuId: number;
  refPrice: string;
  refQuantity: string;
  refUpdateAt: string;
  refUpdateBy: string;
}

interface Combo {
  profileFile: any;
  refComboDescription: string;
  refComboId: number;
  refComboImg: string;
  refComboName: string;
  refComboPrice: string;
  refCreateAt: string;
  refCreateBy: number;
  refFixedFood: number;
  refFixedQuantity: number;
  refIfDelete: boolean;
  refMainDish: string;
  refMainDishLimit: 4;
  refMenuId: 4;
  refSideDish: "{10,9}";
  refSideDishLimit: 3;
  refUpdateAt: null;
  refUpdateBy: null;
}

const ListProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [comboProducts, setComboProducts] = useState<Combo[]>([]);

  const getCategory = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/productCombo/foodList", {
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
        console.log("data", data);
        if (data.success) {
          setProducts(data.FoodItem);
          setComboProducts(data.comboList);
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const imageBodyTemplate = (product: Product) => {
    return (
      <img
        src={`data:${product.profileFile.contentType};base64,${product.profileFile.content}`}
        alt={product.profileFile}
        className="w-6rem shadow-2 border-round"
      />
    );
  };

  return (
    <div>
      <div className="card">
        <div className="flex flex-column md:flex-row">
          <div className="w-full flex flex-column align-items-center gap-3 py-5">
            <DataTable value={products} showGridlines scrollable stripedRows>
              <Column
                field="sno"
                header="S.No"
                body={(_, { rowIndex }) => rowIndex + 1}
              ></Column>
              <Column
                field="refMenuId"
                header="Menu ID"
                style={{ minWidth: "100px" }}
              ></Column>
              <Column
                field="refFoodName"
                header="Name"
                style={{ minWidth: "250px" }}
              ></Column>
              <Column header="Image" body={imageBodyTemplate}></Column>
              <Column
                field="refPrice"
                header="Price"
                style={{ minWidth: "100px" }}
              ></Column>
              <Column
                field="refFoodCategoryName"
                header="Category"
                style={{ minWidth: "150px" }}
              ></Column>
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
          <div className="w-full flex flex-column align-items-center gap-3 py-5">
            <DataTable value={comboProducts} showGridlines stripedRows>
              <Column
                field="sno"
                header="S.No"
                body={(_, { rowIndex }) => rowIndex + 1}
              ></Column>
              <Column
                field="refComboId"
                header="Menu ID"
                style={{ minWidth: "100px" }}
              ></Column>
              <Column
                field="refComboName"
                header="Name"
                style={{ minWidth: "100px" }}
              ></Column>
              <Column
                header="Image"
                body={imageBodyTemplate}
                style={{ minWidth: "100px" }}
              ></Column>
              <Column
                field="refComboPrice"
                header="Price"
                style={{ minWidth: "100px" }}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProducts;
