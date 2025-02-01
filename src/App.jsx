import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import PropTypes from "prop-types";

import Header from "./components/00-Header/Header";
import Dashboard from "./components/01-Dashboard/Dashboard";
import Products from "./components/02-Products/Products";
import Orders from "./components/03-Orders/Orders";
import Vendors from "./components/04-Vendors/Vendors";
import Users from "./components/05-Users/Users";
import Transactions from "./components/06-Transactions/Transactions";
import Reports from "./components/07-Reports/Reports";
import Messages from "./components/08-Messages/Messages";
import Profile from "./components/09-Profile/Profile";
import Settings from "./components/10-Settings/Settings";

import Login from "./components/Login/Login";

import "./App.css";

function App() {
  return (
    <Router>
      <ConditionalHeader>
        <Routes>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/vendors" element={<Vendors />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/transactions" element={<Transactions />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/messages" element={<Messages />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/login" element={<Login />} />
        </Routes>
      </ConditionalHeader>
    </Router>
  );
}

function ConditionalHeader({ children }) {
  const location = useLocation();

  const excludedRoutes = ["/login"];
  const isExcluded = excludedRoutes.includes(location.pathname);

  return isExcluded ? children : <Header>{children}</Header>;
}

export default App;

ConditionalHeader.propTypes = {
  children: PropTypes.node,
};
