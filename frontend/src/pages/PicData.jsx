// import React, { useState } from "react";

// const PicData = () => {
//   const [image, setImage] = useState(null);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!image) return setError("Please select an image");

//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       const res = await fetch("http://localhost:5002/predict-disease", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       if (data.error) throw new Error(data.error);
//       setResult(data);
//     } catch (err) {
//       setError("Upload or prediction failed");
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h2>Upload Image for Prediction</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <input type="file" accept="image/*" onChange={handleImageChange} />
//       <button onClick={handleUpload}>Upload & Predict</button>

//       {result && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>Prediction Result</h3>
//           <p><strong>Disease:</strong> {result.disease}</p>
//           <p><strong>Gemini Suggestions:</strong><br />{result.suggestions}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PicData;

import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Alert,
  Navbar,
  Nav,
} from "react-bootstrap";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import backgroundVideo from "../assets/background_vid.mp4";
import logo from "../assets/Logo.svg";

const PicData = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!image) return setError("Please select an image");
    setError("");
    setResult(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch("https://jalsanvardhn-flask.onrender.com/predict-disease", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setError("Upload or prediction failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="position-relative min-vh-100 d-flex flex-column text-white">
      {/* 🎥 Background Video */}
      <video autoPlay loop muted className="position-absolute w-100 h-100 object-fit-cover z-n1 opacity-75">
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      {/* 🌞 Sun */}
      <motion.div
        className="position-absolute rounded-circle"
        style={{
          width: "100px",
          height: "100px",
          background: "radial-gradient(circle, yellow 30%, orange 70%)",
          boxShadow: "0 0 50px rgba(255, 223, 0, 0.8)",
          top: "10%",
          left: "75%",
          zIndex: 2,
        }}
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ✨ Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="position-absolute bg-warning rounded-circle"
          style={{
            width: "10px",
            height: "10px",
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 90}%`,
            opacity: 0.7,
            zIndex: 2,
          }}
          animate={{ y: [0, -30, 0], x: [0, 10, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      {/* 🌿 Navbar from Login */}
      <Navbar expand="lg" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", padding: "0.3rem 0" }} fixed="top">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
            <img src={logo} alt="Logo" style={{ height: "40px", marginRight: "10px" }} />
            <span style={{ fontSize: "1.1rem", fontWeight: 600, color: "white" }}>Jal Sanvardhan</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {["/home", "/crop-data","/pic-data", "/water-flow", "/register", "/login", "/contact"].map((path, index) => (
                <Nav.Link
                  key={index}
                  href={path}
                  style={{
                    color: "white",
                    marginLeft: "1rem",
                    fontSize: "0.9rem",
                    fontWeight: path === "/login" ? "bold" : "500",
                    textDecoration: path === "/login" ? "underline" : "none",
                  }}
                >
                  {["Home", "CropData","Upload-Image", "WaterFlow", "Register", "Login", "Contact Us"][index]}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 📸 Main Section */}
      <Container className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Row className="justify-content-center w-100">
          <Col md={8}>
            <motion.div
              className="bg-dark bg-opacity-75 p-4 rounded-4 shadow-lg mt-5"
              data-aos="zoom-in"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-4 text-center">Upload Crop Image for Disease Prediction</h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-control mb-3"
              />

              {/* 🖼️ Centered Preview */}
              {preview && (
                <motion.div className="text-center">
                  <motion.img
                    src={preview}
                    alt="Preview"
                    className="img-fluid rounded mb-3 shadow"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                  />
                </motion.div>
              )}

              <div className="d-flex gap-3 justify-content-center mt-3">
                <Button variant="success" onClick={handleUpload} disabled={loading}>
                  Upload & Predict
                </Button>
                <Button variant="outline-light" onClick={() => navigate("/login")}>
                  ⬅ Back
                </Button>
              </div>

              {/* ✅ Gemini Result Display */}
              {result && (
  <motion.div
    className="mt-5 p-4 rounded-4 shadow-lg"
    style={{
      background: "linear-gradient(145deg, #f0fff4, #e6f9ec)",
      border: "1px solid #c3e6cb",
    }}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    {/* 🎯 Prediction Summary */}
    <motion.h4
      className="text-center fw-bold mb-4"
      style={{ color: "#155724", fontSize: "1.8rem" }}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      Disease Prediction Result:
    </motion.h4>

    <div className="text-center mb-4">
      <motion.p
        style={{ fontSize: "1.5rem", fontWeight: "600", color: "#c82333" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <span className="me-2">🦠</span> {result.disease}
      </motion.p>
    </div>

    {/* 🌱 Gemini Suggestions */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h5
        className="fw-bold mb-3 text-center"
        style={{ color: "#218838", fontSize: "1.3rem" }}
      >
        🌿 Personalized Care & Irrigation Advice
      </h5>

      <div
        className="p-3 rounded"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          fontSize: "1rem",
          lineHeight: "1.8",
          color: "#212529",
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        {result.suggestions?.split("\n").map((line, index) =>
          line.trim() !== "" ? (
            <motion.div
              key={index}
              className="d-flex align-items-start mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <span className="me-2">🔹</span>
              <span>{line.trim()}</span>
            </motion.div>
          ) : null
        )}
      </div>
    </motion.div>
  </motion.div>
)}


            </motion.div>
          </Col>
        </Row>
      </Container>


      {/* 🌱 Footer from Login */}
      <footer style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        fontSize: "0.9rem",
        color: "white",
        textAlign: "center",
        padding: "15px 0",
        marginTop: "auto",
        zIndex: 2,
      }}>
        <Container>
          <div>Contact us: support@jalsanvardhan.com | +91-9967304451</div>
          <div>© {new Date().getFullYear()} Jal Sanvardhan. All rights reserved.</div>
        </Container>
      </footer>
    </div>
  );
};

export default PicData;
