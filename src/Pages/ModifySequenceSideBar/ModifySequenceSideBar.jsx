import { useState, useEffect } from "react";
import templateImg from "../../assets/products/template.jpg";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function ModifySequenceSideBar() {
  const [products, setProducts] = useState([]);
  const columns = [
    { field: "name", header: "Name" },
    { field: "category", header: "Category" },
    { field: "rating", header: "Rating" },
    { field: "description", header: "Description" },
    { field: "price", header: "Price" },
  ];

  useEffect(() => {
    const data = [
      {
        id: 1,
        category: "Category",
        name: "Product Name",
        image: templateImg,
        rating: 5.0,
        description: "Enim nec dui nunc mattis enim ut tellus. Tincidunt arcu.",
        price: "CHF 140.00",
      },
      {
        id: 2,
        category: "Category",
        name: "Product Name",
        image: templateImg,
        rating: 5.0,
        description: "Enim nec dui nunc mattis enim ut tellus. Tincidunt arcu.",
        price: "CHF 82.00",
      },
      {
        id: 3,
        category: "Category",
        name: "Product Name",
        image: templateImg,
        rating: 5.0,
        description: "Enim nec dui nunc mattis enim ut tellus. Tincidunt arcu.",
        price: "CHF 54.00",
      },
      {
        id: 4,
        category: "Category",
        name: "Product Name",
        image: templateImg,
        rating: 5.0,
        description: "Enim nec dui nunc mattis enim ut tellus. Tincidunt arcu.",
        price: "CHF 72.00",
      },
      {
        id: 5,
        category: "Category",
        name: "Product Name",
        image: templateImg,
        rating: 5.0,
        description: "Enim nec dui nunc mattis enim ut tellus. Tincidunt arcu.",
        price: "CHF 99.00",
      },
      {
        id: 6,
        category: "Category",
        name: "Product Name",
        image: templateImg,
        rating: 5.0,
        description: "Enim nec dui nunc mattis enim ut tellus. Tincidunt arcu.",
        price: "CHF 89.00",
      },
    ];
    setProducts(data);
  }, []);

  const dynamicColumns = columns.map((col, i) => {
    console.log("i", i);
    return (
      <Column
        style={{ minWidth: "5rem" }}
        key={col.field}
        columnKey={col.field}
        field={col.field}
        header={col.header}
      />
    );
  });

  const serialNumberTemplate = (rowData, options) => {
    return options.rowIndex + 1;
  };

  return (
    <div>
      <DataTable
        value={products}
        reorderableColumns
        scrollable
        reorderableRows
        showGridlines
        onRowReorder={(e) => setProducts(e.value)}
      >
        <Column rowReorder style={{ width: "3rem" }} />
        <Column
          header="S.No"
          body={serialNumberTemplate}
          style={{ width: "3rem", textAlign: "center" }}
        />
        {dynamicColumns}
      </DataTable>
    </div>
  );
}
