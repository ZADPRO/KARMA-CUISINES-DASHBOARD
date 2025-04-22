import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import AddCategoriesProduct from "../../pages/AddCategoriesProduct/AddCategoriesProduct";
import AddProducts from "../../pages/AddProducts/AddProducts";
import CreateCombo from "../../pages/CreateCombo/CreateCombo";

const Products: React.FC = () => {
  return (
    <div className="m-3">
      <TabView>
        <TabPanel header="Product & Combo">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
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
