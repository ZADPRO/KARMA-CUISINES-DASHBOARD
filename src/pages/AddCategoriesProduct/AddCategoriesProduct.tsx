import axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import decrypt from "../../helper";

interface Categories {
  refFoodCategoryId: number;
  refFoodCategoryName: string;
}

const AddCategoriesProduct: React.FC = () => {
  const [categoriesData, setCategoriesData] = useState<Categories[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Categories | null>(
    null
  );
  const [updatedName, setUpdatedName] = useState("");

  useEffect(() => {
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
      });
  }, [refresh]);

  const openEditDialog = (rowData: Categories) => {
    setSelectedCategory(rowData);
    setUpdatedName(rowData.refFoodCategoryName);
    setEditDialogVisible(true);
  };

  const saveCategoryUpdate = () => {
    if (!selectedCategory) return;
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/productCombo/updateCategory`,
        {
          categoryId: selectedCategory.refFoodCategoryId,
          categoryName: updatedName,
        },
        {
          headers: {
            Authorization: localStorage.getItem("JWTtoken"),
          },
        }
      )
      .then(() => {
        setEditDialogVisible(false);
        setRefresh((prev) => !prev);
      })
      .catch((err) => {
        console.error("Update failed:", err);
      });
  };

  const handleDelete = (rowData: Categories) => {
    confirmDialog({
      message: `Are you sure you want to delete "${rowData.refFoodCategoryName}"?`,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/productCombo/deleteCategory`,
            {
              categoryId: rowData.refFoodCategoryId,
            },
            {
              headers: {
                Authorization: localStorage.getItem("JWTtoken"),
              },
            }
          )
          .then(() => {
            setRefresh((prev) => !prev);
          })
          .catch((err) => {
            console.error("Delete failed:", err);
          });
      },
    });
  };

  const serialNumberTemplate = (_rowData: Categories, options: any) => {
    return <span>{options.rowIndex + 1}</span>;
  };

  const editTemplate = (rowData: Categories) => {
    return (
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-text"
        onClick={() => openEditDialog(rowData)}
      />
    );
  };

  const deleteTemplate = (rowData: Categories) => {
    return (
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger p-button-text"
        onClick={() => handleDelete(rowData)}
      />
    );
  };

  return (
    <div className="p-4">
      <ConfirmDialog />
      <DataTable
        value={categoriesData}
        showGridlines
        stripedRows
        paginator
        rows={10}
        responsiveLayout="scroll"
      >
        <Column
          header="S.No"
          body={serialNumberTemplate}
          style={{ width: "5%" }}
        />
        <Column
          field="refFoodCategoryName"
          header="Category Name"
          style={{ width: "60%" }}
        />
        <Column
          header="Edit"
          body={editTemplate}
          style={{ width: "15%", textAlign: "center" }}
        />
        <Column
          header="Delete"
          body={deleteTemplate}
          style={{ width: "15%", textAlign: "center" }}
        />
      </DataTable>

      {/* Edit Dialog */}
      <Dialog
        header="Edit Category"
        visible={editDialogVisible}
        onHide={() => setEditDialogVisible(false)}
        footer={
          <div>
            <Button
              label="Cancel"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() => setEditDialogVisible(false)}
            />
            <Button
              label="Save"
              icon="pi pi-check"
              className="p-button-text"
              onClick={saveCategoryUpdate}
            />
          </div>
        }
      >
        <div className="p-field">
          <label htmlFor="categoryName">Category Name</label>
          <InputText
            id="categoryName"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            className="w-full"
          />
        </div>
      </Dialog>
    </div>
  );
};

export default AddCategoriesProduct;
