import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/00-Header/Header";
import Dashboard from "./components/01-Dashboard/Dashboard";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Header>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Header>
      </Router>
    </>
  );
}

export default App;
