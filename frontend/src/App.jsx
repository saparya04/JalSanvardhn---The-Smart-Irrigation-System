import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login.jsx";
import CropData from "./pages/CropData";
import WaterFlowInput from "./pages/WaterFlowInput";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import Home from './pages/Home.jsx';
// import '../src/global.css';
// import Layout from "./components/ui/layout.jsx";
import Claven from './pages/Claven.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/crop-data" element={<CropData />} />
        <Route path="/water-flow" element={<WaterFlowInput />} />
        <Route path="/home" element={<Home />} />
        <Route path='/Claven' element={<Claven />} />
      </Routes>
    </Router>
  );
}
export default App;
//new change



