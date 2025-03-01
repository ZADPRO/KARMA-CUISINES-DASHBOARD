import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { Sidebar } from "primereact/sidebar";
import templateImg from "../../assets/products/template.jpg";
import AddProductSideBar from "../../Pages/AddProductSideBar/AddProductSideBar";
import ModifySequenceSideBar from "../../Pages/ModifySequenceSideBar/ModifySequenceSideBar";
import { useState } from "react";

const productsData = [];

export default function Products() {
  const [checked, setChecked] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [sequence, setSequence] = useState(false);
  const [products, setProducts] = useState(
    productsData.map((product) => ({ ...product, visible: true }))
  );

  const toggleVisibility = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, visible: !product.visible } : product
      )
    );
  };

  return (
    <div>
      <div className="primaryNav">
        <p>Products</p>
        <p className="">Logged in as: Admin</p>
      </div>
      <div className="card flex justify-content-between align-items-center p-4">
        <div className="flex align-items-center gap-2">
          <InputSwitch
            checked={checked}
            onChange={(e) => setChecked(e.value)}
          />
          <p>Show Products</p>
        </div>
        <div className="flex gap-5">
          {/* <Button
            label="View Sequence"
            raised
            severity="success"
            onClick={() => setSequence(true)}
          /> */}
          <Button
            icon="pi pi-plus"
            rounded
            raised
            className="mr-2"
            style={{ background: "#00052e" }}
            onClick={() => setAddNew(true)}
          />
        </div>
      </div>
      <div className="grid m-0">
        {products.map((product) => (
          <div
            key={product.id}
            className={`col-12 md:col-6 lg:col-3 ${
              !checked ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <div className="p-2">
              <div className="shadow-1 p-4 surface-card border-round">
                <div className="relative mb-3">
                  <div className="flex absolute justify-content-end w-full">
                    <Button
                      icon={`pi ${product.visible ? "pi-eye" : "pi-eye-slash"}`}
                      className="p-button-rounded shadow-3 p-button p-button-danger"
                      onClick={() => toggleVisibility(product.id)}
                      disabled={!checked}
                    />
                  </div>
                  <img
                    src={product.image}
                    className={`w-full ${
                      !checked || !product.visible ? "grayscale" : ""
                    }`}
                    alt={`Product ${product.id}`}
                    style={{ borderRadius: "5px" }}
                  />
                </div>
                <div className="flex justify-content-between align-items-center mb-3">
                  <span
                    className={`text-900 font-medium text-xl ${
                      !checked || !product.visible ? "text-500" : ""
                    }`}
                  >
                    {product.name}
                  </span>
                  <span>
                    <i
                      className={`pi pi-star-fill ${
                        !checked || !product.visible
                          ? "text-500"
                          : "text-yellow-500"
                      } mr-1`}
                    ></i>
                    <span
                      className={`font-medium ${
                        !checked || !product.visible ? "text-500" : ""
                      }`}
                    >
                      {product.rating}
                    </span>
                  </span>
                </div>
                <p
                  className={`mt-0 mb-3 text-700 line-height-3 ${
                    !checked || !product.visible ? "text-500" : ""
                  }`}
                >
                  {product.description}
                </p>
                <span
                  className={`text-primary text-xl font-medium ${
                    !checked || !product.visible ? "text-500" : ""
                  }`}
                >
                  {product.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Sidebar
        visible={addNew}
        position="right"
        style={{ inlineSize: "1000px" }}
        onHide={() => setAddNew(false)}
      >
        <AddProductSideBar />
      </Sidebar>
      <Sidebar
        visible={sequence}
        position="right"
        style={{ inlineSize: "1000px" }}
        onHide={() => setSequence(false)}
      >
        <ModifySequenceSideBar />
      </Sidebar>
    </div>
  );
}
