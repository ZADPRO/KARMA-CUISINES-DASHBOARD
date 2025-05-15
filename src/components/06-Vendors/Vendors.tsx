import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { DataTable as PrimeDataTable } from "primereact/datatable"; // (only if name conflict arises)
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import React, { useEffect, useRef, useState } from "react";
import AddVendorSidebar from "../../pages/AddVendorSidebar/AddVendorSidebar";
import axios from "axios";
import decrypt from "../../helper";

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

const Vendors: React.FC = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const dt = useRef<PrimeDataTable<VendorDetailsProps[]>>(null);
  const [visibleRight, setVisibleRight] = useState<boolean>(false);
  const [vendorDetails, setVendorDetails] = useState<VendorDetailsProps[] | []>(
    []
  );
  const [selectedVendorToEdit, setSelectedVendorToEdit] =
    useState<VendorDetailsProps | null>(null);

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
        console.log("data", data);
        if (data.success) {
          setVendorDetails(data.result);
        }
      });
  };

  useEffect(() => {
    getAllVendorDetails();
  }, []);

  const exportCSV = (selectionOnly: any) => {
    dt.current?.exportCSV({ selectionOnly });
  };

  const handleEditVendor = (vendor: VendorDetailsProps) => {
    setSelectedVendorToEdit(vendor);
    setVisibleRight(true);
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
        <p className="">Logged in as: Admin</p>
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
          value={vendorDetails}
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
            field="vendorId"
            header="Vendor ID"
            body={(rowData) => (
              <span
                className="text-primary cursor-pointer"
                onClick={() => handleEditVendor(rowData)}
              >
                {rowData.vendorId}
              </span>
            )}
          ></Column>
          <Column
            field="restroName"
            header="Name"
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="mobile"
            header="Contact Number"
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="email"
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
        <AddVendorSidebar
          vendorToEdit={selectedVendorToEdit}
          onCloseSidebar={() => {
            setVisibleRight(false);
            getAllVendorDetails();
          }}
        />{" "}
      </Sidebar>
    </div>
  );
};

export default Vendors;
