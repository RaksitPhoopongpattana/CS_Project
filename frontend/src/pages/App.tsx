import React from "react";
import Main from "../components/Home";
import { Route, Routes } from "react-router-dom";
import { DoubleNavbar } from "../components/Navbar";
import { Settings } from "../components/Settings";
import { DataLogs } from "../components/DataLogs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/Dashboard" element={<DoubleNavbar />} />
      <Route path="/Settings" element={<Settings />} />
      <Route path="/Logs" element={<DataLogs />} />
    </Routes>
  );
}

export default App;
