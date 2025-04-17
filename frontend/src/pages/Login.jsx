// import React, { useState } from "react";
// import {
//   Form,
//   Button,
//   Container,
//   Row,
//   Col,
//   Card,
//   Navbar,
//   Nav,
// } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/LOGO.svg";
// import bg from "../assets/bg image.jpg";

// const styles = {
//   page: {
//     minHeight: "100vh",
//     backgroundImage: `url(${bg})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     display: "flex",
//     flexDirection: "column",
//   },
//   navbar: {
//     backgroundColor: "rgba(0, 0, 0, 0.6)",
//     padding: "0.3rem 0", // smaller vertical padding
//     height: "50px", // shrink navbar height
//   },
//   brandName: {
//     fontSize: "1.1rem", // slightly smaller brand text
//     fontWeight: 600,
//     color: "white",
//   },
//   navLink: {
//     color: "white",
//     marginLeft: "1rem",
//     fontSize: "0.9rem",
//     fontWeight: 500,
//   },
//   loginContainer: {
//     flexGrow: 1,
//     padding: "70px 15px", // ensure it clears the smaller navbar
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   loginCard: {
//     background: "rgba(255, 255, 255, 0.15)",
//     backdropFilter: "blur(15px)",
//     borderRadius: "20px",
//     padding: "30px",
//     color: "#fff",
//     maxWidth: "400px",
//     width: "100%",
//     border: "1px solid rgba(255, 255, 255, 0.3)",
//     boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
//   },
//   label: {
//     color: "#e6e6e6",
//   },
//   input: {
//     backgroundColor: "rgba(255, 255, 255, 0.85)",
//     border: "none",
//     borderRadius: "10px",
//   },
//   footer: {
//     backgroundColor: "rgba(0, 0, 0, 0.6)",
//     fontSize: "0.9rem",
//     color: "white",
//     textAlign: "center",
//     padding: "15px 0",
//     marginTop: "auto",
//   },
// };

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     localStorage.setItem("userId", "dummyUserId123");
//     navigate("/crop-data");
//   };

//   return (
//     <div style={styles.page}>
//       {/* Header */}
//       <Navbar expand="lg" style={styles.navbar} fixed="top">
//         <Container>
//           <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
//             <img src={logo} alt="Logo" height="28" /> {/* Reduced logo size */}
//             <span style={styles.brandName}>Jal Sanvardhan</span>
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="ms-auto">
//               {["/home", "/crop-data", "/water-flow", "/register", "/login", "/contact"].map((path, index) => (
//                 <Nav.Link
//                   key={index}
//                   href={path}
//                   style={{
//                     ...styles.navLink,
//                     fontWeight: path === "/login" ? "bold" : "500",
//                     textDecoration: path === "/login" ? "underline" : "none",
//                   }}
//                 >
//                   {["Home", "CropData", "WaterFlow", "Register", "Login", "Contact Us"][index]}
//                 </Nav.Link>
//               ))}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* Login Form Section */}
//       <div style={styles.loginContainer}>
//         <Row>
//           <Col>
//             <Card style={styles.loginCard}>
//               <Card.Body>
//                 <h2 className="text-center mb-4">Welcome Back 🌿</h2>
//                 <Form onSubmit={handleSubmit}>
//                   <Form.Group className="mb-3" controlId="formBasicEmail">
//                     <Form.Label style={styles.label}>Email address</Form.Label>
//                     <Form.Control
//                       type="email"
//                       placeholder="Enter email"
//                       style={styles.input}
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-4" controlId="formBasicPassword">
//                     <Form.Label style={styles.label}>Password</Form.Label>
//                     <Form.Control
//                       type="password"
//                       placeholder="Password"
//                       style={styles.input}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </Form.Group>

//                   <Button variant="success" type="submit" className="w-100">
//                     Login
//                   </Button>
//                 </Form>
//                 <div className="text-center mt-3">
//                   Don&apos;t have an account?{" "}
//                   <a href="/register" className="text-white text-decoration-underline">
//                     Register here
//                   </a>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </div>

//       {/* Footer */}
//       <footer style={styles.footer}>
//         <Container>
//           <div>Contact us: support@jalsanvardhan.com | +91-9967304451</div>
//           <div>© {new Date().getFullYear()} Jal Sanvardhan. All rights reserved.</div>
//         </Container>
//       </footer>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import {
//   Form,
//   Button,
//   Container,
//   Row,
//   Col,
//   Card,
//   Navbar,
//   Nav,
//   Alert,
//   InputGroup,
// } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import logo from "../assets/LOGO.svg";
// import bg from "../assets/bg image.jpg";

// const styles = {
//   page: {
//     minHeight: "100vh",
//     backgroundImage: `url(${bg})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     display: "flex",
//     flexDirection: "column",
//   },
//   navbar: {
//     backgroundColor: "rgba(0, 0, 0, 0.6)",
//     padding: "0.3rem 0",
//     height: "30px",
//   },
//   brandName: {
//     fontSize: "1.1rem",
//     fontWeight: 600,
//     color: "white",
//   },
//   navLink: {
//     color: "white",
//     marginLeft: "1rem",
//     fontSize: "0.9rem",
//     fontWeight: 500,
//   },
//   loginContainer: {
//     flexGrow: 1,
//     padding: "70px 15px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   loginCard: {
//     background: "rgba(255, 255, 255, 0.15)",
//     backdropFilter: "blur(15px)",
//     borderRadius: "20px",
//     padding: "30px",
//     color: "#fff",
//     maxWidth: "400px",
//     width: "100%",
//     border: "1px solid rgba(255, 255, 255, 0.3)",
//     boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
//   },
//   label: {
//     color: "#e6e6e6",
//   },
//   input: {
//     backgroundColor: "rgba(255, 255, 255, 0.85)",
//     border: "none",
//     borderRadius: "10px",
//   },
//   footer: {
//     backgroundColor: "rgba(0, 0, 0, 0.6)",
//     fontSize: "0.9rem",
//     color: "white",
//     textAlign: "center",
//     padding: "15px 0",
//     marginTop: "auto",
//   },
// };

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         formData,
//         { withCredentials: true }
//       );

//       localStorage.setItem("userId", data.userId);
//       alert("Login successful!");
//       navigate("/crop-data");
//     } catch (err) {
//       alert(err.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <div style={styles.page}>
//       {/* Header */}
//       <Navbar expand="lg" style={styles.navbar} fixed="top">
//         <Container>
//           <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
//             <img src={logo} alt="Logo" style={{ height: "40px", marginRight: "10px" }} />
//             <span style={styles.brandName}>Jal Sanvardhan</span>
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="ms-auto">
//               {["/home", "/crop-data", "/water-flow", "/register", "/login", "/contact"].map((path, index) => (
//                 <Nav.Link
//                   key={index}
//                   href={path}
//                   style={{
//                     ...styles.navLink,
//                     fontWeight: path === "/login" ? "bold" : "500",
//                     textDecoration: path === "/login" ? "underline" : "none",
//                   }}
//                 >
//                   {["Home", "CropData", "WaterFlow", "Register", "Login", "Contact Us"][index]}
//                 </Nav.Link>
//               ))}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* Login Form Section */}
//       <div style={styles.loginContainer}>
//         <Row>
//           <Col>
//             <Card style={styles.loginCard}>
//               <Card.Body>
//                 <h2 className="text-center mb-4">Welcome Back 🌿</h2>
//                 <Form onSubmit={handleSubmit}>
//                   <Form.Group className="mb-3" controlId="formBasicEmail">
//                     <Form.Label style={styles.label}>Email address</Form.Label>
//                     <Form.Control
//                       type="email"
//                       placeholder="Enter email"
//                       name="email"
//                       style={styles.input}
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-4" controlId="formBasicPassword">
//                     <Form.Label style={styles.label}>Password</Form.Label>
//                     <InputGroup>
//                       <Form.Control
//                         type={showPassword ? "text" : "password"}
//                         placeholder="Password"
//                         name="password"
//                         style={styles.input}
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                       />
//                       <Button
//                         variant="outline-light"
//                         onClick={() => setShowPassword(!showPassword)}
//                       >
//                         {showPassword ? <FaEyeSlash /> : <FaEye />}
//                       </Button>
//                     </InputGroup>
//                   </Form.Group>

//                   <Button variant="success" type="submit" className="w-100">
//                     Login
//                   </Button>
//                 </Form>
//                 <div className="text-center mt-3">
//                   Don&apos;t have an account?{" "}
//                   <a href="/register" className="text-white text-decoration-underline">
//                     Register here
//                   </a>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </div>

//       {/* Footer */}
//       <footer style={styles.footer}>
//         <Container>
//           <div>Contact us: support@jalsanvardhan.com | +91-9967304451</div>
//           <div>© {new Date().getFullYear()} Jal Sanvardhan. All rights reserved.</div>
//         </Container>
//       </footer>
//     </div>
//   );
// };

// export default Login;

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
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../assets/LOGO.svg";
import bg from "../assets/bg image.jpg";
import successBg from "../assets/farmbgg.png"; // 🆕 Add a dark/green themed bg

const styles = {
  page: (isLoggedIn) => ({
    minHeight: "100vh",
    backgroundImage: `url(${isLoggedIn ? successBg : bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    transition: "background-image 1s ease-in-out",
  }),
  navbar: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "0.3rem 0",
    height: "30px",
  },
  brandName: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "white",
  },
  navLink: {
    color: "white",
    marginLeft: "1rem",
    fontSize: "0.9rem",
    fontWeight: 500,
  },
  loginContainer: {
    flexGrow: 1,
    padding: "70px 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginCard: {
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

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        { withCredentials: true }
      );
      localStorage.setItem("userId", data.userId);
      alert("Login successful!");
      setIsLoggedIn(true);
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  const handleChoice = (type) => {
    if (type === "crop") navigate("/crop-data");
    else navigate("/pic-data");
  };

  return (
    <div style={styles.page(isLoggedIn)}>
      {/* Header */}
      <Navbar expand="lg" style={styles.navbar} fixed="top">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
            <img
              src={logo}
              alt="Logo"
              style={{ height: "40px", marginRight: "10px" }}
            />
            <span style={styles.brandName}>Jal Sanvardhan</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {["/home", "/crop-data","/pic-data", "/water-flow", "/register", "/login", "/contact"].map((path, index) => (
                <Nav.Link
                  key={index}
                  href={path}
                  style={{
                    ...styles.navLink,
                    fontWeight: path === "/login" ? "bold" : "500",
                    textDecoration: path === "/login" ? "underline" : "none",
                  }}
                >
                  {["Home", "CropData","Image-Upload", "WaterFlow", "Register", "Login", "Contact Us"][index]}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Section */}
      <div style={styles.loginContainer}>
        <Row>
          <Col>
            {!isLoggedIn ? (
              <Card style={styles.loginCard} as={motion.div} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
                <Card.Body>
                  <h2 className="text-center mb-4">Welcome Back 🌿</h2>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label style={styles.label}>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        style={styles.input}
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Label style={styles.label}>Password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          name="password"
                          style={styles.input}
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <Button
                          variant="outline-light"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                      </InputGroup>
                    </Form.Group>

                    <Button variant="success" type="submit" className="w-100">
                      Login
                    </Button>
                  </Form>

                  <div className="text-center mt-3">
                    Don&apos;t have an account?{" "}
                    <a href="/register" className="text-white text-decoration-underline">
                      Register here
                    </a>
                  </div>
                </Card.Body>
              </Card>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center text-light"
              >
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    color: "#ffffff",
                    marginBottom: "40px",
                    fontWeight: "700",
                    textShadow: "2px 2px 8px #000",
                  }}
                >
                  🌱 Choose Prediction Method 🌱
                </motion.h2>
                <div className="d-flex flex-column gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleChoice("crop")}
                    className="btn btn-success"
                    style={{
                      borderRadius: "50px 0 50px 0",
                      background: "#4CAF50",
                      padding: "18px 24px",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    🍀 Predict using Crop Data
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleChoice("pic")}
                    className="btn btn-info"
                    style={{
                      borderRadius: "0 50px 0 50px",
                      background: "#00796B",
                      padding: "18px 24px",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    📸 Predict using Crop Image
                  </motion.button>
                </div>
              </motion.div>
            )}
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

export default Login;
