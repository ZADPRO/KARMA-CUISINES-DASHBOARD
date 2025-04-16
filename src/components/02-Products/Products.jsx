import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import AddProductSideBar from "../../Pages/AddProductSideBar/AddProductSideBar";
import ModifySequenceSideBar from "../../Pages/ModifySequenceSideBar/ModifySequenceSideBar";
import { useEffect, useState } from "react";
import Axios from "axios";
import decrypt from "../../helper";
import AddSubProducts from "../../Pages/AddSubProducts/AddSubProducts";

const productsData = [];

export default function Products() {
  const [addNew, setAddNew] = useState(false);
  const [addSubProd, setAddSubProd] = useState(false);
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

  useEffect(() => {
    Axios.get(import.meta.env.VITE_API_URL + "/userRoutes/viewProducts", {
      headers: {
        Authorization: localStorage.getItem("JWTtoken"),
      },
    }).then((res) => {
      const data = decrypt(
        res.data[1],
        res.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );
      console.log("get products data --- line 40", data);
    });
  }, []);

  return (
    <div>
      <div className="primaryNav">
        <p>Products</p>
        <p className="">Logged in as: Admin</p>
      </div>
      <div className="card flex justify-content-between align-items-center p-4">
        <div className="flex align-items-center gap-2">
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>Products</p>
        </div>
        <div className="flex gap-5">
          <Button
            label="View Sequence"
            raised
            severity="success"
            onClick={() => setSequence(true)}
          />
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
          <>
            <div className="p-2">
              <div className="shadow-1 p-4 surface-card border-round">
                <div className="relative mb-3">
                  <div className="flex absolute justify-content-end w-full">
                    <Button
                      icon={`pi ${product.visible ? "pi-eye" : "pi-eye-slash"}`}
                      className="p-button-rounded shadow-3 p-button p-button-danger"
                      onClick={() => toggleVisibility(product.id)}
                    />
                  </div>
                  <img
                    src={product.image}
                    className={`w-full ${!product.visible ? "grayscale" : ""}`}
                    alt={`Product ${product.id}`}
                    style={{ borderRadius: "5px" }}
                  />
                </div>
                <div className="flex justify-content-between align-items-center mb-3">
                  <span
                    className={`text-900 font-medium text-xl ${
                      !product.visible ? "text-500" : ""
                    }`}
                  >
                    {product.name}
                  </span>
                  <span>
                    <i
                      className={`pi pi-star-fill ${
                        !product.visible ? "text-500" : "text-yellow-500"
                      } mr-1`}
                    ></i>
                    <span
                      className={`font-medium ${
                        !product.visible ? "text-500" : ""
                      }`}
                    >
                      {product.rating}
                    </span>
                  </span>
                </div>
                <p
                  className={`mt-0 mb-3 text-700 line-height-3 ${
                    !product.visible ? "text-500" : ""
                  }`}
                >
                  {product.description}
                </p>
                <span
                  className={`text-primary text-xl font-medium ${
                    !product.visible ? "text-500" : ""
                  }`}
                >
                  {product.price}
                </span>
              </div>
            </div>
          </>
        ))}
      </div>

      <div className="card flex justify-content-between align-items-center p-4">
        <div className="flex align-items-center gap-2">
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>Sub Products</p>
        </div>
        <div className="flex gap-5">
          <Button
            label="View Sequence"
            raised
            severity="success"
            onClick={() => setSequence(true)}
          />
          <Button
            icon="pi pi-plus"
            rounded
            raised
            className="mr-2"
            style={{ background: "#00052e" }}
            onClick={() => setAddSubProd(true)}
          />
        </div>
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
        visible={addSubProd}
        position="right"
        style={{ inlineSize: "1000px" }}
        onHide={() => setAddSubProd(false)}
      >
        <AddSubProducts />
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
