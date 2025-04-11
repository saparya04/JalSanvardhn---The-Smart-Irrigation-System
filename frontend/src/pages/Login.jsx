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
    padding: "0.3rem 0", // smaller vertical padding
    height: "50px", // shrink navbar height
  },
  brandName: {
    fontSize: "1.1rem", // slightly smaller brand text
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
    padding: "70px 15px", // ensure it clears the smaller navbar
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userId", "dummyUserId123");
    navigate("/crop-data");
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <Navbar expand="lg" style={styles.navbar} fixed="top">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
            <img src={logo} alt="Logo" height="28" /> {/* Reduced logo size */}
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
                    fontWeight: path === "/login" ? "bold" : "500",
                    textDecoration: path === "/login" ? "underline" : "none",
                  }}
                >
                  {["Home", "CropData", "WaterFlow", "Register", "Login", "Contact Us"][index]}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login Form Section */}
      <div style={styles.loginContainer}>
        <Row>
          <Col>
            <Card style={styles.loginCard}>
              <Card.Body>
                <h2 className="text-center mb-4">Welcome Back 🌿</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={styles.label}>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      style={styles.input}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Label style={styles.label}>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      style={styles.input}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
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
