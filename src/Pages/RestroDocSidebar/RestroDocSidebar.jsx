import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { InputSwitch } from "primereact/inputswitch"; // Importing InputSwitch
import { useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";
import { InputText } from "primereact/inputtext";

export default function RestroDocSidebar() {
  const toast = useRef(null);

  const [products, setProducts] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);

  useEffect(() => {
    const restaurantData = [
      {
        id: 1,
        document: "Upload VAT Registration Certificate",
        visibility: true, // true means visible
      },
      {
        id: 2,
        document: "Upload Commercial Register Extract",
        visibility: false, // false means not visible
      },
      {
        id: 3,
        document: "Upload Alcohol License (if applicable)",
        visibility: true,
      },
      {
        id: 4,
        document: "Upload Food Safety and Hygiene Certificate",
        visibility: true,
      },
      {
        id: 5,
        document: "Upload Liability Insurance Certificate",
        visibility: false,
      },
    ];

    setProducts(restaurantData);
  }, []);

  // Method to handle visibility toggle
  const onVisibilityChange = (e, rowData) => {
    const updatedProducts = [...products];
    const index = updatedProducts.findIndex(
      (product) => product.id === rowData.id
    );
    if (index !== -1) {
      updatedProducts[index].visibility = e.value;
      setProducts(updatedProducts);
    }
  };

  // Method to handle edit action
  const onEdit = (rowData) => {
    toast.current.show({
      severity: "info",
      summary: "Edit Offer",
      detail: `Editing Offer: ${rowData.document}`,
      life: 3000,
    });
  };

  return (
    <div>
      <Toast ref={toast} />

      <div className="border-2 px-5 py-3 border-dashed surface-border border-round surface-ground align-items-center font-medium">
        <div className="flex justify-content-end mb-3">
          <Button severity="success" label="Add New" />
        </div>

        <div className="addNewDoc mb-3">
          <div className="flex gap-3">
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <FileText size={20} />
              </span>
              <InputText placeholder="Add New Document" />
            </div>
            <div className="p-inputgroup flex-1">
              <Button severity="success" outlined label="Add" />
            </div>
          </div>
        </div>

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
            body={(rowData, options) => options.rowIndex + 1} // Display the row index + 1
            style={{ width: "3rem", textAlign: "center" }}
          ></Column>
          <Column
            field="document"
            header="Document"
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
