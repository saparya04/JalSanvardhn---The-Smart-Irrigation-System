import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login.jsx";
import CropData from "./pages/CropData";
import WaterFlowInput from "./pages/WaterFlowInput";
import PicData from "./pages/PicData";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Home from './pages/Home.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/crop-data" element={<CropData />} />
        <Route path="/water-flow" element={<WaterFlowInput />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pic-data" element={<PicData />} />
      </Routes>
    </Router>
  );
}

export default App;
//new change



