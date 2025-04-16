import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Blocks, BringToFront } from "lucide-react";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Axios from "axios";
import decrypt from "../../helper";

export default function FoodCategorySidebar() {
  const [products, setProducts] = useState([]);
  const [subProducts, setSubProducts] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [subCategoryInput, setSubCategoryInput] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;
  const headers = {
    Authorization: localStorage.getItem("JWTtoken"),
  };

  const getAllProductDetails = () => {
    Axios.get(`${API_URL}/settingsRoutes/getFoodCategory`, { headers })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("data", data);
        setProducts(data.data);
      })
      .catch((err) => console.error("Error fetching food categories", err));
  };

  const getAllSubProductDetails = () => {
    Axios.get(`${API_URL}/settingsRoutes/getSubFoodCategory`, { headers })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        setSubProducts(data);
      })
      .catch((err) => console.error("Error fetching sub-food categories", err));
  };

  const handleAddCategory = () => {
    if (!categoryInput.trim()) return;
    console.log("categoryInput", categoryInput);
    Axios.post(
      `${API_URL}/settingsRoutes/addFoodCategory`,
      { category: categoryInput },
      { headers }
    )
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("data ====== ", data);
        setSubProducts(data);
        setCategoryInput("");
        getAllProductDetails();
      })
      .catch((err) => console.error("Error adding category", err));
  };

  const handleAddSubCategory = () => {
    if (!subCategoryInput.trim()) return;
    Axios.post(
      `${API_URL}/settingsRoutes/addSubFoodCategory`,
      { subCategory: subCategoryInput },
      { headers }
    )
      .then(() => {
        setSubCategoryInput("");
        getAllSubProductDetails();
      })
      .catch((err) => console.error("Error adding sub category", err));
  };

  useEffect(() => {
    getAllProductDetails();
    getAllSubProductDetails();
  }, []);

  return (
    <div>
      <h2>Food Category</h2>
      <TabView>
        <TabPanel header="Products">
          <div className="card flex flex-column md:flex-row gap-3 mt-3">
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <Blocks />
              </span>
              <InputText
                placeholder="Category"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
              />
            </div>
            <div className="flex-1 flex gap-3">
              <Button
                label="Add"
                className="flex-1"
                severity="success"
                onClick={handleAddCategory}
              />
              <Button
                label="Clear"
                className="flex-1"
                severity="danger"
                onClick={() => setCategoryInput("")}
              />
            </div>
          </div>
          <DataTable value={products} className="mt-3" showGridlines>
            <Column
              header="S.No"
              body={(_, { rowIndex }) => rowIndex + 1}
              style={{ width: "80px" }}
            />
            <Column field="categoryName" header="Category name" />
            <Column
              header="Edit"
              body={(rowData) => (
                <Button
                  icon="pi pi-pencil"
                  severity="info"
                  rounded
                  onClick={() => console.log("Edit clicked", rowData)}
                />
              )}
              style={{ width: "100px", textAlign: "center" }}
            />
            <Column
              header="Delete"
              body={(rowData) => (
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  rounded
                  onClick={() => console.log("Delete clicked", rowData)}
                />
              )}
              style={{ width: "100px", textAlign: "center" }}
            />
          </DataTable>
        </TabPanel>

        <TabPanel header="Sub Products">
          <div className="card flex flex-column md:flex-row gap-3 mt-3">
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <BringToFront />
              </span>
              <InputText
                placeholder="Sub Category"
                value={subCategoryInput}
                onChange={(e) => setSubCategoryInput(e.target.value)}
              />
            </div>
            <div className="flex-1 flex gap-3">
              <Button
                label="Add"
                className="flex-1"
                severity="success"
                onClick={handleAddSubCategory}
              />
              <Button
                label="Clear"
                className="flex-1"
                severity="danger"
                onClick={() => setSubCategoryInput("")}
              />
            </div>
          </div>
          <DataTable
            value={subProducts}
            tableStyle={{ minWidth: "50rem" }}
            className="mt-3"
            showGridlines
          >
            <Column field="code" header="S.No"></Column>
            <Column field="name" header="Sub Category"></Column>
            <Column header="Edit"></Column>
            <Column header="Delete"></Column>
          </DataTable>
        </TabPanel>
      </TabView>
    </div>
  );
}
