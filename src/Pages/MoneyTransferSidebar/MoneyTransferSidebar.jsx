import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { InputSwitch } from "primereact/inputswitch";
import { useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";
import { InputText } from "primereact/inputtext";
import axios from "axios";

export default function MoneyTransferSidebar() {
  const toast = useRef(null);

  const [products, setProducts] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editDocData, setEditDocData] = useState(null);

  useEffect(() => {
    const paymentMethods = [
      {
        id: 1,
        document: "Weekly Once",
        day: "Saturday",
        visibility: true, // Active payment schedule
        expectedDate: "2025-01-27", // Example next payment date (Saturday)
      },
      {
        id: 2,
        document: "Twice a Week",
        day: "Wednesday and Saturday",
        visibility: true,
        expectedDate: "2025-01-22 and 2025-01-27", // Example dates for next payment
      },
      {
        id: 3,
        document: "Biweekly (Every 2 Weeks)",
        day: "Friday",
        visibility: true,
        expectedDate: "2025-02-02", // Example next payment date
      },
      {
        id: 4,
        document: "Monthly Once",
        day: "1st of the Month",
        visibility: false, // Inactive payment schedule
        expectedDate: "2025-02-01", // Example next payment date
      },
      {
        id: 5,
        document: "Every 15 Days",
        day: "Thursday",
        visibility: true,
        expectedDate: "2025-02-08", // Example next payment date
      },
      {
        id: 6,
        document: "Weekly Once",
        day: "Sunday",
        visibility: true,
        expectedDate: "2025-01-28", // Example next payment date (Sunday)
      },
      {
        id: 7,
        document: "Daily",
        day: "Every Day",
        visibility: false, // Inactive for now
        expectedDate: "2025-01-21", // Example date (today)
      },
      {
        id: 8,
        document: "Quarterly (Every 3 Months)",
        day: "1st of the Quarter",
        visibility: true,
        expectedDate: "2025-04-01", // Next payment date for quarterly
      },
      {
        id: 9,
        document: "Annual (Yearly Once)",
        day: "1st of January",
        visibility: false, // Inactive
        expectedDate: "2026-01-01", // Example next payment date
      },
      {
        id: 10,
        document: "Bi-Monthly (Every 2 Months)",
        day: "15th of the Month",
        visibility: true,
        expectedDate: "2025-03-15", // Example next payment date
      },
    ];

    setProducts(paymentMethods);
  }, []);

  // Send visibility update to backend
  const onVisibilityChange = async (e, rowData) => {
    const updatedProducts = [...products];
    const index = updatedProducts.findIndex(
      (product) => product.id === rowData.id
    );
    if (index !== -1) {
      updatedProducts[index].visibility = e.value;
      setProducts(updatedProducts);

      try {
        await axios.post("/api/updateVisibility", {
          id: rowData.id,
          document: rowData.document,
          paymentdate: rowData.day,
          expectedDate: rowData.expectedDate,
          visibility: e.value,
        });
        toast.current.show({
          severity: "success",
          summary: "Visibility Updated",
          detail: "Changes saved successfully.",
        });
      } catch (error) {
        console.error("Error updating visibility", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to update visibility.",
        });
      }
    }
  };

  // Handle save (for both adding and editing)
  const handleSave = async () => {
    if (editMode) {
      // Update existing document
      const updatedProducts = [...products];
      const index = updatedProducts.findIndex(
        (product) => product.id === editDocData.id
      );
      if (index !== -1) {
        updatedProducts[index] = { ...editDocData };
        setProducts(updatedProducts);

        try {
          await axios.post("/api/updateDocument", {
            id: editDocData.id,
            document: editDocData.document,
            paymentdate: editDocData.day,
            expectedDate: editDocData.expectedDate,
            visibility: editDocData.visibility,
          });
          toast.current.show({
            severity: "success",
            summary: "Document Updated",
            detail: "Changes saved successfully.",
          });
        } catch (error) {
          console.error("Error updating document", error);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Failed to update document.",
          });
        }
      }
    } else {
      // Add new document
      const newDoc = {
        id: products.length + 1,
        document: editDocData?.document || "Untitled Document",
        visibility: true, // Default visibility
      };
      setProducts([...products, newDoc]);

      try {
        await axios.post("/api/addDocument", newDoc);
        toast.current.show({
          severity: "success",
          summary: "Document Added",
          detail: "New document added successfully.",
        });
      } catch (error) {
        console.error("Error adding new document", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to add new document.",
        });
      }
    }

    // Reset states
    setShowForm(false);
    setEditMode(false);
    setEditDocData(null);
  };

  // Handle edit action
  const onEdit = (rowData) => {
    setEditMode(true);
    setShowForm(true);
    setEditDocData(rowData);
  };

  return (
    <div>
      <Toast ref={toast} />

      <div className="border-2 px-5 py-3 border-dashed surface-border border-round surface-ground align-items-center font-medium">
        <div className="flex justify-content-end mb-3">
          <Button
            severity="success"
            label="Add New"
            onClick={() => {
              setShowForm(true);
              setEditMode(false);
              setEditDocData(null);
            }}
          />
        </div>

        {/* Add/Edit Document Form */}
        {showForm && (
          <div className="addNewDoc mb-3">
            <div className="flex gap-3">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <FileText size={20} />
                </span>
                <InputText
                  value={editDocData?.document || ""}
                  onChange={(e) =>
                    setEditDocData({ ...editDocData, document: e.target.value })
                  }
                  placeholder={
                    editMode ? "Edit Payment Method" : "Add New Payment Method"
                  }
                />
              </div>
              <div className="p-inputgroup flex-1">
                <Button
                  severity="success"
                  outlined
                  label={editMode ? "Save Changes" : "Add"}
                  onClick={handleSave}
                />
                <Button
                  severity="danger"
                  outlined
                  label="Cancel"
                  onClick={() => {
                    setShowForm(false);
                    setEditMode(false);
                    setEditDocData(null);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Data Table */}
        <DataTable
          value={products}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
          paginator
          stripedRows
          showGridlines
          className="restroDocTable"
          scrollable
          style={{ fontSize: "1rem" }}
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        >
          <Column
            header="S.No"
            body={(rowData, options) => options.rowIndex + 1}
            style={{ width: "3rem", textAlign: "center" }}
          ></Column>
          <Column
            field="document"
            header="Payment Frequency"
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            field="day"
            header="Payment Day"
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            field="visibility"
            header="Visibility"
            body={(rowData) => (
              <InputSwitch
                checked={rowData.visibility}
                style={{ transform: "scale(0.8)" }}
                onChange={(e) => onVisibilityChange(e, rowData)}
              />
            )}
            style={{ width: "8rem" }}
          ></Column>
          <Column
            field="day"
            header="Expected payment date"
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            body={(rowData) => (
              <Button
                icon="pi pi-pencil"
                severity="warning"
                outlined
                rounded
                style={{ transform: "scale(0.8)" }}
                onClick={() => onEdit(rowData)}
              />
            )}
            header="Edit"
            style={{ width: "5rem" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
