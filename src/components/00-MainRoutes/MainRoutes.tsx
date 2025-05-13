import React, { ReactNode } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "../01-Login/Login";
// import Dashboard from "../03-Dashboard/Dashboard";
import Products from "../04-Products/Products";
import Orders from "../06-Orders/Orders";
import Vendors from "../06-Vendors/Vendors";
import Transactions from "../08-Transactions/Transactions";
import Reports from "../09-Reports/Reports";
import BeOurPartners from "../10-BeOurPartners/BeOurPartners";
import Careers from "../11-Careers/Careers";
import Messages from "../12-Messages/Messages";
import Settings from "../13-Settings/Settings";
import Header from "../02-Header/Header";

type ConditionalHeaderProps = {
  children: ReactNode;
};

const MainRoutes: React.FC = () => {
  return (
    <Router>
      <ConditionalHeader>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
      </ConditionalHeader>
    </Router>
  );
};

// Function to check if user is logged in
const isAuthenticated = () => {
  return localStorage.getItem("loginStatus") === "true"; // Assuming "isLoggedIn" key is used
};

function ProtectedRoutes() {
  return isAuthenticated() ? (
    <Routes>
      <Route path="/" element={<Orders />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/products" element={<Products />} />
      <Route path="/vendors" element={<Vendors />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/beOurPartners" element={<BeOurPartners />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  ) : (
    <Navigate to="/login" replace />
  );
}

function ConditionalHeader({ children }: ConditionalHeaderProps) {
  const location = useLocation();
  const excludedRoutes = ["/login"];
  const isExcluded = excludedRoutes.includes(location.pathname);

  return isExcluded ? children : <Header>{children}</Header>;
}

export default MainRoutes;
