import { useState, useEffect } from "react";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { classNames } from "primereact/utils";

export default function DashboardProducts() {
  const [products, setProducts] = useState([]);
  const [layout, setLayout] = useState("grid");

  useEffect(() => {
    const dataProducts = [
      // {
      //   id: "1000",
      //   code: "f230fh0g3",
      //   name: "Food 1",
      //   description: "Product Description",
      //   image: "bamboo-watch.jpg",
      //   price: 65,
      //   category: "Food",
      //   quantity: 24,
      //   inventoryStatus: "INSTOCK",
      //   rating: 5,
      // },
      // {
      //   id: "1000",
      //   code: "f230fh0g3",
      //   name: "Food 2",
      //   description: "Product Description",
      //   image: "bamboo-watch.jpg",
      //   price: 65,
      //   category: "Food",
      //   quantity: 24,
      //   inventoryStatus: "INSTOCK",
      //   rating: 5,
      // },
      // {
      //   id: "1000",
      //   code: "f230fh0g3",
      //   name: "Food 3",
      //   description: "Product Description",
      //   image: "bamboo-watch.jpg",
      //   price: 65,
      //   category: "Food",
      //   quantity: 24,
      //   inventoryStatus: "INSTOCK",
      //   rating: 5,
      // },
      // {
      //   id: "1000",
      //   code: "f230fh0g3",
      //   name: "Food 4",
      //   description: "Product Description",
      //   image: "bamboo-watch.jpg",
      //   price: 65,
      //   category: "Food",
      //   quantity: 24,
      //   inventoryStatus: "INSTOCK",
      //   rating: 5,
      // },
      // {
      //   id: "1000",
      //   code: "f230fh0g3",
      //   name: "Food 5",
      //   description: "Product Description",
      //   image: "bamboo-watch.jpg",
      //   price: 65,
      //   category: "Food",
      //   quantity: 24,
      //   inventoryStatus: "INSTOCK",
      //   rating: 5,
      // },
    ];

    setProducts(dataProducts);
  }, []);

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  const listItem = (product, index) => {
    return (
      <div className="col-12" key={product.id}>
        <div
          className={classNames(
            "flex flex-column xl:flex-row xl:align-items-start p-4 gap-4",
            { "border-top-1 surface-border": index !== 0 }
          )}
        >
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
            alt={product.name}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{product.name}</div>
              <Rating value={product.rating} readOnly cancel={false}></Rating>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{product.category}</span>
                </span>
                <Tag
                  value={product.inventoryStatus}
                  severity={getSeverity(product)}
                ></Tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const gridItem = (product) => {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product.id}>
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="flex align-items-center gap-2">
              <i className="pi pi-tag"></i>
              <span className="font-semibold">{product.category}</span>
            </div>
            <Tag
              value={product.inventoryStatus}
              severity={getSeverity(product)}
            ></Tag>
          </div>
          <div className="flex flex-column align-items-center gap-3 py-5">
            <img
              className="w-9 shadow-2 border-round"
              src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
              alt={product.name}
            />
            <div className="text-2xl font-bold">{product.name}</div>
            <Rating value={product.rating} readOnly cancel={false}></Rating>
          </div>
          {/* <div className="flex align-items-center justify-content-between">
            <span className="text-2xl font-semibold">${product.price}</span>
            <Button
              icon="pi pi-shopping-cart"
              className="p-button-rounded"
              disabled={product.inventoryStatus === "OUTOFSTOCK"}
            ></Button>
          </div> */}
        </div>
      </div>
    );
  };

  const itemTemplate = (product, layout, index) => {
    if (!product) {
      return;
    }

    if (layout === "list") return listItem(product, index);
    else if (layout === "grid") return gridItem(product);
  };

  const listTemplate = (products, layout) => {
    return (
      <div className="grid grid-nogutter">
        {products.map((product, index) => itemTemplate(product, layout, index))}
      </div>
    );
  };

  const header = () => {
    return (
      <div className="flex justify-content-end">
        <DataViewLayoutOptions
          layout={layout}
          onChange={(e) => setLayout(e.value)}
        />
      </div>
    );
  };

  return (
    <div>
      <div className="card">
        <DataView
          value={products}
          listTemplate={listTemplate}
          layout={layout}
          header={header()}
        />
      </div>
    </div>
  );
}
