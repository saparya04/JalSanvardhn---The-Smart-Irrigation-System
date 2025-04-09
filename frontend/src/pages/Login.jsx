// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Form, Button, Container, Alert, Card, Row, Col } from "react-bootstrap";
// import { FaEnvelope, FaLock } from "react-icons/fa";
// import { motion } from "framer-motion";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import loginImage from "../assets/login-image.svg"; // Ensure this exists
// import loadingGif from "../assets/plant.gif"; // Add a loading gif

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true); // Start loading animation

//     try {
//       const { data } = await axios.post("http://localhost:5000/api/auth/login", formData, { withCredentials: true });
//       localStorage.setItem("userId", data.userId);
//       setTimeout(() => {
//         navigate("/crop-data");
//       }, 2000); // Wait 2 seconds before navigation
//     } catch (err) {
//       setError(err.response?.data?.error || "Error");
//       setIsLoading(false);
//     }
//   };

//   // Show only the loading GIF inside a larger card when isLoading is true
//   if (isLoading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100 bg-secondary">
//         <Card className="p-5 shadow-lg bg-dark rounded d-flex justify-content-center align-items-center" style={{ width: "600px", height: "400px" }}>
//           <img src={loadingGif} alt="Loading..." className="img-fluid" style={{ width: "250px", height: "250px" }} />
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-dark">
//       <Row className="w-100 justify-content-center">
//         <Col md={10} lg={8}>
//           <Card className="p-4 shadow-lg text-dark bg-secondary rounded" data-aos="fade-up">
//             <Row>
//               <Col md={6} className="d-flex align-items-center justify-content-center">
//                 <motion.img 
//                   src={loginImage} 
//                   alt="Login" 
//                   className="img-fluid"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 2 }}
//                 />
//               </Col>
//               <Col md={6}>
//                 <motion.h2 
//                   className="text-center mb-4 text-white fw-bold"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 1 }}
//                 >
//                   Farmer Login
//                 </motion.h2>
//                 {error && <Alert variant="danger">{error}</Alert>}
                
//                 <Form onSubmit={handleSubmit}>
//                   <Form.Group className="mb-3">
//                     <Form.Label className="text-white fw-bold"><FaEnvelope /> Email</Form.Label>
//                     <Form.Control type="email" name="email" placeholder="Enter your email" onChange={handleChange} required className="p-2" />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label className="text-white fw-bold"><FaLock /> Password</Form.Label>
//                     <Form.Control type="password" name="password" placeholder="Enter password" onChange={handleChange} required className="p-2" />
//                   </Form.Group>
//                   <Button type="submit" className="w-100 fw-bold p-2">Login</Button>
//                 </Form>

//                 <div className="text-center mt-3">
//                   <span className="text-white">Don't have an account? </span>
//                   <Button variant="link" className="text-white fw-bold" onClick={() => navigate("/Register")}>Register</Button>
//                 </div>
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Login;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

import walkGif from "../assets/FARMER__WALKING.gif";
import cropGrowGif from "../assets/crop_growing.gif";
import farmBg from "../assets/farm-bg.png";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [farmerLeft, setFarmerLeft] = useState(0);
  const [showFarmer, setShowFarmer] = useState(true);
  const [cropPositions, setCropPositions] = useState([0]);
  const [cropFreeze, setCropFreeze] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let position = 0;
    const step = 8;
    const interval = setInterval(() => {
      setFarmerLeft(position);

      // Grow crops behind the farmer
      setCropPositions((prev) => [...prev, position]);

      position += step;

      if (position > 90) {
        clearInterval(interval);
        setShowFarmer(false); // hide farmer when he reaches end
        setCropFreeze(true); // freeze final crop state
      }
    }, 400);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", formData, {
        withCredentials: true,
      });
      localStorage.setItem("userId", data.userId);
      setTimeout(() => {
        navigate("/crop-data");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Error");
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${farmBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Single Farmer Walking */}
      {showFarmer && (
        <img
          src={walkGif}
          alt="Farmer Walk"
          style={{
            position: "absolute",
            bottom: "0",
            left: `${farmerLeft}%`,
            height: "580px",
            // transition: "left 2s linear",
            zIndex: 1,
          }}
        />
      )}

      {/* Crops Growing Behind */}
      {cropPositions.map((left, index) => (
        <motion.img
          key={`crop-${index}`}
          src={cropGrowGif}
          alt="Crop Growing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            position: "absolute",
            bottom: "0",
            left: `${left}%`,
            height: "200px",
            zIndex: 0,
            animation: cropFreeze ? "none" : undefined, // stop animation at end
          }}
        />
      ))}

      {/* Login Form Container */}
      <motion.div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh",
          width: "100%",
          zIndex: 2,
          position: "relative",
        }}
      >
        <Card
          className="p-5 shadow-lg bg-dark bg-opacity-75 text-white"
          style={{ width: "500px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-center mb-4 fw-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Farmer Login
          </motion.h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>
                <FaEnvelope /> Email
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <FaLock /> Password
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" className="w-100 fw-bold" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Form>

          <div className="text-center mt-3">
            <span>Don't have an account? </span>
            <Button variant="link" className="text-white fw-bold" onClick={() => navigate("/Register")}>
              Register
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;

