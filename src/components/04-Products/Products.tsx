import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import AddCategoriesProduct from "../../pages/AddCategoriesProduct/AddCategoriesProduct";
import AddProducts from "../../pages/AddProducts/AddProducts";
import CreateCombo from "../../pages/CreateCombo/CreateCombo";
import ListProducts from "../../pages/ListProducts/ListProducts";

const Products: React.FC = () => {
  return (
    <div className="m-3">
      <TabView>
        <TabPanel header="Product & Combo">
          <ListProducts />
        </TabPanel>

        <TabPanel header="New Products">
          <AddProducts />
        </TabPanel>

        <TabPanel header="Create Combo">
          <CreateCombo />
        </TabPanel>

        <TabPanel header="Create Categories">
          <AddCategoriesProduct />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default Products;
