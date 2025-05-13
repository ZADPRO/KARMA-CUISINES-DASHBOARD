import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import React, { useRef, useState } from "react";
import AddVendorSidebar from "../../pages/AddVendorSidebar/AddVendorSidebar";

const Vendors: React.FC = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const dt = useRef<DataTable<[]>>(null);
  const [visibleRight, setVisibleRight] = useState<boolean>(false);

  const exportCSV = (selectionOnly: any) => {
    dt.current?.exportCSV({ selectionOnly });
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between flex-wrap gap-2 align-items-center py-3">
        <div className="flex align-items-center gap-2"></div>
        <div className="flex gap-3">
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search Here"
          />
          <Button
            type="button"
            icon="pi pi-file"
            // rounded
            severity="success"
            onClick={() => exportCSV(false)}
            data-pr-tooltip="CSV"
          />
          <Button
            type="button"
            icon="pi pi-plus"
            // rounded
            onClick={() => setVisibleRight(true)}
            data-pr-tooltip="CSV"
          />
        </div>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div>
      <div className="primaryNav">
        <p>Vendors</p>
        <p className="">Logged in as:</p>
      </div>
      <div className="m-3">
        <DataTable
          showGridlines
          stripedRows
          paginator
          scrollable
          ref={dt}
          header={header}
          className="mt-3"
          rows={5}
          globalFilter={globalFilter}
          filters={{ global: { value: globalFilter, matchMode: "contains" } }}
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          rowsPerPageOptions={[5, 10, 25, 50]}
        >
          <Column
            field="sno"
            header="S.No"
            frozen
            body={(_, { rowIndex }) => rowIndex + 1}
          ></Column>
          <Column
            field=""
            header="Vendor ID"
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column field="" header="Name" style={{ minWidth: "10rem" }}></Column>
          <Column
            field=""
            header="Contact Number"
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field=""
            header="Email ID"
            style={{ minWidth: "10rem" }}
          ></Column>
        </DataTable>
      </div>
      <Sidebar
        visible={visibleRight}
        position="right"
        style={{ width: "60vw" }}
        onHide={() => setVisibleRight(false)}
      >
        <AddVendorSidebar />
      </Sidebar>
    </div>
  );
};

export default Vendors;
