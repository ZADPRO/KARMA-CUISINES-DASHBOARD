import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Header>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/users" element={<Users />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Header>
      </Router>
    </>
  );
}

export default App;
