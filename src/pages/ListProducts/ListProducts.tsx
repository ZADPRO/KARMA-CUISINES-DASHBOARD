import axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import decrypt from "../../helper";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

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
  restroName?: string;
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
  restroName?: string;
}

interface VendorDetailsProps {
  alcohol: string;
  bankCode: string;
  bankName: string;
  code: string;
  cre: string;
  designation: string;
  email: string;
  floor: string;
  iban: string;
  id: number;
  land: string;
  mobile: string;
  personName: string;
  restroName: string;
  streetNo: string;
  vat: string;
  vendorId: string;
  zone: string;
}

const ListProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [comboProducts, setComboProducts] = useState<Combo[]>([]);
  const [filteredCombos, setFilteredCombos] = useState<Combo[]>([]);
  const [vendorDetails, setVendorDetails] = useState<VendorDetailsProps[]>([]);
  const [selectedVendor, setSelectedVendor] =
    useState<VendorDetailsProps | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [globalComboFilter, setGlobalComboFilter] = useState("");
  const [selectedVendorCombo, setSelectedVendorCombo] =
    useState<VendorDetailsProps | null>(null);

  const getCategory = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/productCombo/foodList", {
        headers: { Authorization: localStorage.getItem("JWTtoken") },
      })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        if (data.success) {
          setProducts(data.FoodItem);
          setFilteredProducts(data.FoodItem);
          setComboProducts(data.comboList);
          setFilteredCombos(data.comboList);
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));
  };

  const getAllVendorDetails = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/admin/getAllVendor`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTtoken")}`,
        },
      })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        if (data.success) {
          setVendorDetails(data.result);
        }
      });
  };

  useEffect(() => {
    getCategory();
    getAllVendorDetails();
  }, []);

  useEffect(() => {
    let filtered = [...products];
    if (selectedVendor) {
      filtered = filtered.filter(
        (item) => item.restroName === selectedVendor.restroName
      );
    }
    if (globalFilter.trim()) {
      filtered = filtered.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(globalFilter.toLowerCase())
        )
      );
    }
    setFilteredProducts(filtered);
  }, [selectedVendor, globalFilter, products]);

  // ⬇️ Filter by vendor + global search for combos
  useEffect(() => {
    let filtered = [...comboProducts];
    if (selectedVendorCombo) {
      filtered = filtered.filter(
        (item) => item.restroName === selectedVendorCombo.restroName
      );
    }
    if (globalComboFilter.trim()) {
      filtered = filtered.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(globalComboFilter.toLowerCase())
        )
      );
    }
    setFilteredCombos(filtered);
  }, [selectedVendorCombo, globalComboFilter, comboProducts]);

  const imageBodyTemplate = (product: any) => {
    const file = product.profileFile?.filename
      ? product.profileFile.filename
      : "";
    return (
      <img
        src={`https://karmacuisine.ch/src/assets/FoodImage/${file}`}
        alt={product.refFoodName || product.refComboName}
        className="w-3rem shadow-2 border-round"
      />
    );
  };

  const handleDelete = (rowIndex: any) => {
    axios
      .post(
        import.meta.env.VITE_API_URL + "/productCombo/deleteFood",
        { foodId: rowIndex.refFoodId },
        { headers: { Authorization: localStorage.getItem("JWTtoken") } }
      )
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        if (data.success && data.status) getCategory();
      })
      .catch((err) => console.log("err", err));
  };

  const handleComboDelete = (rowIndex: any) => {
    axios
      .post(
        import.meta.env.VITE_API_URL + "/productCombo/deleteCombo",
        { comboId: rowIndex.refComboId },
        { headers: { Authorization: localStorage.getItem("JWTtoken") } }
      )
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        if (data.success) getCategory();
      })
      .catch((err) => console.log("err", err));
  };

  const deleteBodyTemplate = (rowIndex: any) => (
    <Button
      icon="pi pi-trash"
      className="p-button-danger"
      onClick={() => handleDelete(rowIndex)}
    />
  );

  const deleteComboTemplate = (rowIndex: any) => (
    <Button
      icon="pi pi-trash"
      className="p-button-danger"
      onClick={() => handleComboDelete(rowIndex)}
    />
  );

  return (
    <div className="">
      {/* =============== FOOD ITEM SECTION =============== */}
      <h3 className="mb-2 font-semibold text-xl">Food Items</h3>
      <div className="flex align-items-center gap-3 mb-3">
        <Dropdown
          options={vendorDetails}
          optionLabel="restroName"
          value={selectedVendor}
          onChange={(e) => setSelectedVendor(e.value)}
          className="w-14rem"
          placeholder="Filter by Restaurant"
          showClear
        />
        <span className="p-input-icon-left">
          <InputText
            placeholder="Search globally..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-14rem"
          />
        </span>
      </div>

      <DataTable
        value={filteredProducts}
        showGridlines
        stripedRows
        scrollable
        scrollHeight="600px"
        emptyMessage="No products found"
      >
        <Column
          field="sno"
          header="S.No"
          body={(_, { rowIndex }) => rowIndex + 1}
        ></Column>
        <Column
          field="restroName"
          header="Restaurant"
          style={{ minWidth: "200px" }}
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
        <Column
          header="Actions"
          body={deleteBodyTemplate}
          style={{ width: "100px" }}
        />
      </DataTable>

      {/* =============== COMBO SECTION =============== */}
      <h3 className="mt-6 mb-2 font-semibold text-xl">Combo Products</h3>
      <div className="flex align-items-center gap-3 mb-3">
        <Dropdown
          options={vendorDetails}
          optionLabel="restroName"
          value={selectedVendorCombo}
          onChange={(e) => setSelectedVendorCombo(e.value)}
          className="w-14rem"
          placeholder="Filter by Restaurant"
          showClear
        />
        <span className="p-input-icon-left">
          <InputText
            placeholder="Search globally..."
            value={globalComboFilter}
            onChange={(e) => setGlobalComboFilter(e.target.value)}
            className="w-14rem"
          />
        </span>
      </div>

      <DataTable
        value={filteredCombos}
        showGridlines
        stripedRows
        scrollable
        scrollHeight="600px"
        emptyMessage="No combo products found"
      >
        <Column
          field="sno"
          header="S.No"
          body={(_, { rowIndex }) => rowIndex + 1}
        ></Column>
        <Column
          field="restroName"
          header="Restaurant"
          style={{ minWidth: "200px" }}
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
        <Column
          header="Actions"
          body={deleteComboTemplate}
          style={{ width: "100px" }}
        />
      </DataTable>
    </div>
  );
};

export default ListProducts;
