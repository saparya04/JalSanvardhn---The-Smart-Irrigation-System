// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Form, Button, Container, Card, Row, Col, Alert } from "react-bootstrap";
// import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
// import { motion } from "framer-motion";
// import registerImage from "../assets/register-image.svg"; // Ensure this image exists

// const Register = () => {
//   const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
//   const [success, setSuccess] = useState(false);
//   const [emailExists, setEmailExists] = useState(false);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // setError(null);
//     // setSuccess(false);
//     // setEmailExists(false);
//     // setLoading(true);

//   //   if (form.password !== form.confirmPassword) {
//   //     setError("Passwords do not match!");
//   //     setLoading(false);
//   //     return;
//   //   }

//     try {
//       await axios.post("http://localhost:5000/api/auth/register", form);
//         alert("Registration successful!");
//         navigate("/login")
      
//     } catch (err) {
//       console.error("Registration Error:", err.response?.data || err.message);
//       if (err.response?.data?.error === "Email already exists") {
//         setEmailExists(true);
//       } else {
//         setError(err.response?.data?.error || "Unexpected error occurred.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
// //   try {
// //     await axios.post("http://localhost:5000/api/auth/register", form);
// //     alert("Registration successful!");
// //     navigate("/login");
// //   } catch (err) {
// //     alert(err.response.data.error);
// //   }
// // };


//   return (
//     <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-dark">
//       <Row className="w-100 justify-content-center position-relative">
//         <Col md={10} lg={8}>
//           <Card className="p-4 shadow-lg rounded" style={{ backgroundColor: "#838587", border: "none" }}>
//             <Row>
//               <Col md={6} className="d-flex align-items-center justify-content-center">
//                 <img src={registerImage} alt="Register" className="img-fluid" />
//               </Col>
//               <Col md={6}>
//                 <motion.h2
//                   className="text-center mb-4 text-success fw-bold"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 2 }}
//                 >
//                   Farmer Registration
//                 </motion.h2>

//                 {/* Success Message
//                 {success && (
//                   <Alert variant="success" className="text-center">
//                     Registration successful! Redirecting to login...
//                   </Alert>
//                 )} */}

      
//                 {emailExists && (
//                   <Alert variant="warning" className="text-center">
//                     Email already registered! <Button variant="link" onClick={() => navigate("/login")}>Go to Login</Button>
//                   </Alert>
//                 )}

//                 {/* Show generic error messages */}
//                 {error && <Alert variant="danger" className="text-center">{error}</Alert>}

//                 <Form onSubmit={handleSubmit}>
//                   <Form.Group className="mb-3">
//                     <Form.Label><FaUser /> Name</Form.Label>
//                     <Form.Control type="text" name="name" placeholder="Enter your name" onChange={handleChange} required />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label><FaEnvelope /> Email</Form.Label>
//                     <Form.Control type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label><FaLock /> Password</Form.Label>
//                     <Form.Control type="password" name="password" placeholder="Enter password" onChange={handleChange} required />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label><FaLock /> Confirm Password</Form.Label>
//                     <Form.Control type="password" name="confirmPassword" placeholder="Confirm password" onChange={handleChange} required />
//                   </Form.Group>

//                   <Button variant="success" type="submit" className="w-100" style={{ fontWeight: "bold", borderRadius: "5px" }} disabled={loading}>
//                     {loading ? "Registering..." : "Register"}
//                   </Button>
//                 </Form>
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Register;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Form, Button, Card, Alert } from "react-bootstrap";
// import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
// import { motion } from "framer-motion";

// // Assets
// import walkGif from "../assets/farmer-walking.gif";
// import plantGif from "../assets/farmer-plant-unscreen.gif";
// import farmBg from "../assets/farm-bg.png";

// const Register = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [gifStage, setGifStage] = useState("walk"); // walk or plant
//   const [error, setError] = useState(null);
//   const [emailExists, setEmailExists] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => setGifStage("plant"), 1500); 
//     return () => clearTimeout(timer);
//   }, []);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (form.password !== form.confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:5000/api/auth/register", form);
//       alert("Registration successful!");
//       navigate("/login");
//     } catch (err) {
//       if (err.response?.data?.error === "Email already exists") {
//         setEmailExists(true);
//       } else {
//         setError(err.response?.data?.error || "Unexpected error occurred.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${farmBg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: "100vh",
//         width: "100%",
//         overflow: "hidden",
//         position: "relative",
//       }}
//     >
//       {/* Farmer GIF */}
//       <img
//         src={gifStage === "walk" ? walkGif : plantGif}
//         alt="Farmer"
//         style={{
//           // position: "absolute",
//           height: "600px",
//           left: gifStage === "walk" ? "0%" : "45%",
//           bottom: "0",
//           // transition: "left 3.5s ease-in-out",
//           zIndex: 2,
//           objectFit: "contain",
//         }}
//       />

//       {/* Registration Form */}
//       <motion.div
//   initial={{ opacity: 0 }}
//   animate={{ opacity: 1 }}
//   transition={{ delay: 2, duration: 2 }}
//   style={{
//     position: "absolute",
//     top: "50%",
//     left: "65%",
//     transform: "translate(-50%, -50%)",
//     zIndex: 3,
//     width: "500px",
//     maxWidth: "90%",
//     background: "rgba(255, 255, 255, 0.9)",
//     borderRadius: "20px",
//     padding: "40px 30px",
//     boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
//     backdropFilter: "blur(18px)",
//   }}
// >

//         <h3 className="text-center text-success mb-4 fw-bold">
//           Farmer Registration
//         </h3>

//         {emailExists && (
//           <Alert variant="warning" className="text-center">
//             Email already registered!{" "}
//             <Button variant="link" onClick={() => navigate("/login")}>
//               Go to Login
//             </Button>
//           </Alert>
//         )}

//         {error && (
//           <Alert variant="danger" className="text-center">
//             {error}
//           </Alert>
//         )}

//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>
//               <FaUser /> Name
//             </Form.Label>
//             <Form.Control
//               type="text"
//               name="name"
//               placeholder="Enter your name"
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>
//               <FaEnvelope /> Email
//             </Form.Label>
//             <Form.Control
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>
//               <FaLock /> Password
//             </Form.Label>
//             <Form.Control
//               type="password"
//               name="password"
//               placeholder="Enter password"
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>
//               <FaLock /> Confirm Password
//             </Form.Label>
//             <Form.Control
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm password"
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Button
//             variant="success"
//             type="submit"
//             className="w-100 fw-bold"
//             disabled={loading}
//           >
//             {loading ? "Registering..." : "Register"}
//           </Button>
//         </Form>
//       </motion.div>
//     </div>
//   );
// };

// export default Register;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Form, Button, Alert } from "react-bootstrap";
// import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
// import { motion } from "framer-motion";

// // Assets
// import walkGif from "../assets/farmer-walking.gif";
// import plantGif from "../assets/farmer-plant-unscreen.gif";
// import farmBg from "../assets/farm-bg.png";
// import formTopImg from "../assets/register-image.svg"; // NEW image for container top

// const Register = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [gifStage, setGifStage] = useState("walk"); // walk or plant
//   const [error, setError] = useState(null);
//   const [emailExists, setEmailExists] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => setGifStage("plant"), 1500); 
//     return () => clearTimeout(timer);
//   }, []);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (form.password !== form.confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:5000/api/auth/register", form);
//       alert("Registration successful!");
//       navigate("/login");
//     } catch (err) {
//       if (err.response?.data?.error === "Email already exists") {
//         setEmailExists(true);
//       } else {
//         setError(err.response?.data?.error || "Unexpected error occurred.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${farmBg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: "100vh",
//         width: "100%",
//         overflow: "hidden",
//         position: "relative",
//       }}
//     >
//       {/* Farmer GIF */}
//       <img
//         src={gifStage === "walk" ? walkGif : plantGif}
//         alt="Farmer"
//         style={{
//           height: "600px",
//           left: gifStage === "walk" ? "0%" : "45%",
//           bottom: "0",
//           zIndex: 2,
//           objectFit: "contain",
//         }}
//       />

//       {/* Registration Form */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 2, duration: 2 }}
//         style={{
//           position: "absolute",
//           top: "50%",
//           left: "65%",
//           transform: "translate(-50%, -50%)",
//           zIndex: 3,
//           width: "500px",
//           maxWidth: "90%",
//           background: "#ffffffee",
//           borderRadius: "20px",
//           padding: "40px 30px",
//           boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
//           backdropFilter: "blur(18px)",
//         }}
//       >
//         {/* Top Image inside container */}
//         <div className="text-center mb-3">
//           <img
//             src={formTopImg}
//             alt="Plant Decoration"
//             style={{ width: "100px", height: "auto" }}
//           />
//         </div>

//         <h3 className="text-center text-success mb-4 fw-bold">
//           Farmer Registration
//         </h3>

//         {emailExists && (
//           <Alert variant="warning" className="text-center">
//             Email already registered!{" "}
//             <Button variant="link" onClick={() => navigate("/login")}>
//               Go to Login
//             </Button>
//           </Alert>
//         )}

//         {error && (
//           <Alert variant="danger" className="text-center">
//             {error}
//           </Alert>
//         )}

//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>
//               <FaUser /> Name
//             </Form.Label>
//             <Form.Control
//               type="text"
//               name="name"
//               placeholder="Enter your name"
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>
//               <FaEnvelope /> Email
//             </Form.Label>
//             <Form.Control
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>
//               <FaLock /> Password
//             </Form.Label>
//             <Form.Control
//               type="password"
//               name="password"
//               placeholder="Enter password"
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>
//               <FaLock /> Confirm Password
//             </Form.Label>
//             <Form.Control
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm password"
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Button
//             variant="success"
//             type="submit"
//             className="w-100 fw-bold"
//             disabled={loading}
//           >
//             {loading ? "Registering..." : "Register"}
//           </Button>
//         </Form>
//       </motion.div>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Navbar,
  Nav,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LOGO.svg";
import bg from "../assets/bg image.jpg";

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
  },
  navbar: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "1rem 0",
  },
  brandName: {
    fontSize: "1.3rem",
    fontWeight: 600,
    color: "white",
  },
  navLink: {
    color: "white",
    marginLeft: "1rem",
    fontWeight: 500,
  },
  registerContainer: {
    flexGrow: 1,
    padding: "60px 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  registerCard: {
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(15px)",
    borderRadius: "20px",
    padding: "30px",
    color: "#fff",
    maxWidth: "400px",
    width: "100%",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  },
  label: {
    color: "#e6e6e6",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    border: "none",
    borderRadius: "10px",
  },
  footer: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    fontSize: "0.9rem",
    color: "white",
    textAlign: "center",
    padding: "15px 0",
    marginTop: "auto",
  },
};

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy logic: Check if user is already registered
    if (form.email === "test@example.com") {
      alert("You are already registered. Please login.");
      navigate("/login");
    } else if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
    } else {
      alert("Registration successful! Please login.");
      navigate("/login");
    }
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <Navbar expand="lg" style={styles.navbar}>
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
            <img src={logo} alt="Logo" height="40" />
            <span style={styles.brandName}>Jal Sanvardhan</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {["/", "/cropdata", "/waterflow", "/register", "/login", "/contact"].map((path, index) => (
                <Nav.Link
                  key={index}
                  href={path}
                  style={{
                    ...styles.navLink,
                    fontWeight: path === "/register" ? "bold" : "500",
                    textDecoration: path === "/register" ? "underline" : "none",
                  }}
                >
                  {["Home", "CropData", "WaterFlow", "Register", "Login", "Contact Us"][index]}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Register Form Section */}
      <div style={styles.registerContainer}>
        <Row>
          <Col>
            <Card style={styles.registerCard}>
              <Card.Body>
                <h2 className="text-center mb-4">Create an Account 🌱</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label style={styles.label}>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label style={styles.label}>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label style={styles.label}>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formConfirmPassword">
                    <Form.Label style={styles.label}>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    />
                  </Form.Group>

                  <Button variant="success" type="submit" className="w-100">
                    Register
                  </Button>
                </Form>
                <div className="text-center mt-3">
                  Already have an account?{" "}
                  <a href="/login" className="text-white text-decoration-underline">Login here</a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <Container>
          <div>Contact us: support@jalsanvardhan.com | +91-9967304451</div>
          <div>© {new Date().getFullYear()} Jal Sanvardhan. All rights reserved.</div>
        </Container>
      </footer>
    </div>
  );
};

export default Register;