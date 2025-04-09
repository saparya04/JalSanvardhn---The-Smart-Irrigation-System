// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Form, Button, Container, Alert, Card, Row, Col } from "react-bootstrap";
// import { motion } from "framer-motion";
// import anime from "animejs";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import styled from "styled-components";
// import cropGif from "../assets/Gardening.gif"; // Your animated GIF
// import backgroundVideo from "../assets/background_vid.mp4"; // Add your 8-sec video
// import { useNavigate } from "react-router-dom";

// // Styled Components for Background Video
// const VideoBackground = styled.video`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   object-fit: cover;
//   opacity: 0.4;  // Reduce opacity to make content visible
//   z-index: -1;
// `;

// const Sun = styled.div`
//   position: absolute;
//   top: 10%;
//   left: 75%;
//   width: 100px;
//   height: 100px;
//   background: radial-gradient(circle, yellow 30%, orange 70%);
//   border-radius: 50%;
//   box-shadow: 0px 0px 50px rgba(255, 223, 0, 0.8);
// `;

// const Grain = styled.div`
//   position: absolute;
//   width: 10px;
//   height: 10px;
//   background: wheat;
//   border-radius: 50%;
//   opacity: 0.8;
// `;

// const CropData = () => {
//   const [form, setForm] = useState({ cropType: "", cropDays: "", area: ""});
//   const [report, setReport] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     AOS.init({ duration: 1000 });

//     anime({
//       targets: ".sun",
//       translateY: [-10, 10],
//       direction: "alternate",
//       loop: true,
//       easing: "easeInOutSine",
//       duration: 4000,
//     });

//     anime({
//       targets: ".grain",
//       translateY: [-30, 0],
//       translateX: [-10, 10],
//       direction: "alternate",
//       loop: true,
//       easing: "easeInOutQuad",
//       duration: 5000,
//       delay: anime.stagger(200),
//     });
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     const userId = localStorage.getItem("userId");

//     if (!userId) {
//       setError("User ID not found. Please log in.");
//       return;
//     }

//     try {
//       const { data } = await axios.post("http://localhost:5000/api/crop/save", { ...form, userId });
//       setReport(data);
//       localStorage.setItem("explanation", data.explanation); 
//       if (data.irrigationRequired) {
//         localStorage.setItem("cropType", data.cropType);
//         localStorage.setItem("temperature", data.temperature);
//         localStorage.setItem("humidity", data.humidity);
//         navigate("/water-flow");
//     }
//   } 
//     catch (err) {
//       setError(err.response?.data?.error || "Something went wrong.");
//     }
//   };


//   return (
//     <Container className="d-flex align-items-center justify-content-center min-vh-100 position-relative">
//       {/* Video Background */}
//       <VideoBackground autoPlay loop muted>
//         <source src={backgroundVideo} type="video/mp4" />
//       </VideoBackground>

//       {/* Animated Sun */}
//       <Sun className="sun" />

//       {/* Floating Grains */}
//       {[...Array(10)].map((_, i) => (
//         <Grain key={i} className="grain" style={{ top: `${Math.random() * 80 + 10}%`, left: `${Math.random() * 90}%` }} />
//       ))}

//       <Row className="w-100 justify-content-center">
//         <Col md={10} lg={8}>
//           <Card className="p-4 shadow-lg bg-secondary text-white rounded" data-aos="fade-up">
//             <Row>
//               <Col md={6} className="d-flex align-items-center justify-content-center">
//                 <motion.img
//                   src={cropGif}
//                   alt="Growing Crops"
//                   className="img-fluid"
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 1.5 }}
//                 />
//               </Col>
//               <Col md={6}>
//                 <motion.h2 
//                   className="text-center mb-4 fw-bold"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 1 }}
//                 >
//                   Enter Crop Details
//                 </motion.h2>

//                 {error && <Alert variant="danger">{error}</Alert>}

//                 <Form onSubmit={handleSubmit}>
//                   <Form.Group className="mb-3">
//                     <Form.Label className="fw-bold">Crop Type</Form.Label>
//                     <Form.Control type="text" name="cropType" placeholder="Enter crop type" value={form.cropType} onChange={handleChange} required />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label className="fw-bold">Crop Days</Form.Label>
//                     <Form.Control type="text" name="cropDays" placeholder="Enter Crop days" value={form.cropDays} onChange={handleChange} required />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label className="fw-bold">Location</Form.Label>
//                     <Form.Control type="text" name="area" placeholder="Enter location" value={form.area} onChange={handleChange} required />
//                   </Form.Group>
//                   {/* <Form.Group className="mb-3">
//                     <Form.Label className="fw-bold">Weather Condition</Form.Label>
//                     <Form.Control type="text" name="weatherCondition" placeholder="Enter weather condition" value={form.weatherCondition} onChange={handleChange} required />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label className="fw-bold">Location</Form.Label>
//                     <Form.Control type="text" name="area" placeholder="Enter location" value={form.area} onChange={handleChange} required />
//                   </Form.Group> */}

//                   <motion.div whileHover={{ scale: 1.05 }}>
//                     <Button type="submit" className="w-100 fw-bold p-2">
//                       Save Details
//                     </Button>
//                   </motion.div>
//                 </Form>

//                 {report && (
//                   <motion.div 
//                     className="mt-4 p-3 bg-dark rounded text-center"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 1 }}
//                   >
//                     <h3>Report</h3>
//                     <p>Temperature: {report.temperature}°C</p>
//                     <p>Humidity: {report.humidity}%</p>
//                     <p><strong>{report.irrigationRequired ? "Irrigation is required" : "No irrigation required"}</strong></p>
//                     <h4>💡 Gemini Insights</h4>
//                     <p style={{ whiteSpace: "pre-wrap" }}>{report.explanation}</p>
//                   </motion.div>
//                 )}
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default CropData;


// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Form, Button, Container, Alert, Card, Row, Col } from "react-bootstrap";
// import { motion } from "framer-motion";
// import anime from "animejs";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import styled from "styled-components";
// import cropGif from "../assets/Gardening.gif";
// import backgroundVideo from "../assets/background_vid.mp4";
// import { useNavigate } from "react-router-dom";

// // Styled Components for Background Video
// const VideoBackground = styled.video`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   object-fit: cover;
//   opacity: 0.4;
//   z-index: -1;
// `;

// const Sun = styled.div`
//   position: absolute;
//   top: 10%;
//   left: 75%;
//   width: 100px;
//   height: 100px;
//   background: radial-gradient(circle, yellow 30%, orange 70%);
//   border-radius: 50%;
//   box-shadow: 0px 0px 50px rgba(255, 223, 0, 0.8);
// `;

// const Grain = styled.div`
//   position: absolute;
//   width: 10px;
//   height: 10px;
//   background: wheat;
//   border-radius: 50%;
//   opacity: 0.8;
// `;

// const CropData = () => {
//   const [form, setForm] = useState({ cropType: "", cropDays: "", area: "" });
//   const [report, setReport] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     AOS.init({ duration: 1000 });

//     anime({
//       targets: ".sun",
//       translateY: [-10, 10],
//       direction: "alternate",
//       loop: true,
//       easing: "easeInOutSine",
//       duration: 4000,
//     });

//     anime({
//       targets: ".grain",
//       translateY: [-30, 0],
//       translateX: [-10, 10],
//       direction: "alternate",
//       loop: true,
//       easing: "easeInOutQuad",
//       duration: 5000,
//       delay: anime.stagger(200),
//     });
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     const userId = localStorage.getItem("userId");

//     if (!userId) {
//       setError("User ID not found. Please log in.");
//       return;
//     }

//     try {
//       const { data } = await axios.post("http://localhost:5000/api/crop/save", { ...form, userId });
//       setReport(data);
//       localStorage.setItem("explanation", data.explanation);
//       if (data.irrigationRequired) {
//         localStorage.setItem("cropType", data.cropType);
//         localStorage.setItem("temperature", data.temperature);
//         localStorage.setItem("humidity", data.humidity);
//         navigate("/water-flow");
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || "Something went wrong.");
//     }
//   };

//   return (
//     <Container className="d-flex align-items-center justify-content-center min-vh-100 position-relative">
//       {/* Video Background */}
//       <VideoBackground autoPlay loop muted>
//         <source src={backgroundVideo} type="video/mp4" />
//       </VideoBackground>

//       {/* Animated Sun */}
//       <Sun className="sun" />

//       {/* Floating Grains */}
//       {[...Array(10)].map((_, i) => (
//         <Grain key={i} className="grain" style={{ top: `${Math.random() * 80 + 10}%`, left: `${Math.random() * 90}%` }} />
//       ))}

//       <Row className="w-100 justify-content-center">
//         <Col md={10} lg={8}>
//           <Card className="p-4 shadow-lg bg-secondary text-white rounded" data-aos="fade-up">
//             <Row>
//               <Col md={6} className="d-flex align-items-center justify-content-center">
//                 <motion.img
//                   src={cropGif}
//                   alt="Growing Crops"
//                   className="img-fluid"
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 1.5 }}
//                 />
//               </Col>
//               <Col md={6}>
//                 <motion.h2 
//                   className="text-center mb-4 fw-bold"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 1 }}
//                 >
//                   Enter Crop Details
//                 </motion.h2>

//                 {error && <Alert variant="danger">{error}</Alert>}

//                 <Form onSubmit={handleSubmit}>
//                   <Form.Group className="mb-3">
//                     <Form.Label className="fw-bold">Crop Type</Form.Label>
//                     <Form.Control type="text" name="cropType" placeholder="Enter crop type" value={form.cropType} onChange={handleChange} required />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label className="fw-bold">Crop Days</Form.Label>
//                     <Form.Control type="number" name="cropDays" placeholder="Enter Crop days" value={form.cropDays} onChange={handleChange} required />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label className="fw-bold">Location</Form.Label>
//                     <Form.Control type="text" name="area" placeholder="Enter location" value={form.area} onChange={handleChange} required />
//                   </Form.Group>

//                   <motion.div whileHover={{ scale: 1.05 }}>
//                     <Button type="submit" className="w-100 fw-bold p-2">
//                       Save Details
//                     </Button>
//                   </motion.div>
//                 </Form>

//                 {report && (
//                   <motion.div 
//                     className="mt-4 p-3 bg-dark rounded text-center"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 1 }}
//                   >
//                     <h3>{report.irrigationRequired ? "Irrigation is required" : "No Irrigation Required"}</h3>

//                     <p>Temperature: {report.temperature}°C</p>
//                     <p>Humidity: {report.humidity}%</p>
//                     <h4>💡 Gemini Insights</h4>
//                     <p style={{ whiteSpace: "pre-wrap" }}>{report.explanation}</p>
//                   </motion.div>
//                 )}
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default CropData;


// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Form, Button, Container, Alert, Card, Row, Col } from "react-bootstrap";
// import { motion } from "framer-motion";
// import anime from "animejs";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import styled from "styled-components";
// import cropGif from "../assets/Gardening.gif";
// import backgroundVideo from "../assets/background_vid.mp4";
// import { useNavigate } from "react-router-dom";

// // Styled Components for Background Video
// const VideoBackground = styled.video`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   object-fit: cover;
//   opacity: 0.4;
//   z-index: -1;
// `;

// const Sun = styled.div`
//   position: absolute;
//   top: 10%;
//   left: 75%;
//   width: 100px;
//   height: 100px;
//   background: radial-gradient(circle, yellow 30%, orange 70%);
//   border-radius: 50%;
//   box-shadow: 0px 0px 50px rgba(255, 223, 0, 0.8);
// `;

// const Grain = styled.div`
//   position: absolute;
//   width: 10px;
//   height: 10px;
//   background: wheat;
//   border-radius: 50%;
//   opacity: 0.8;
// `;

// const CropData = () => {
//   const [form, setForm] = useState({ cropType: "", cropDays: "", area: "" });
//   const [report, setReport] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     AOS.init({ duration: 1000 });

//     anime({
//       targets: ".sun",
//       translateY: [-10, 10],
//       direction: "alternate",
//       loop: true,
//       easing: "easeInOutSine",
//       duration: 4000,
//     });

//     anime({
//       targets: ".grain",
//       translateY: [-30, 0],
//       translateX: [-10, 10],
//       direction: "alternate",
//       loop: true,
//       easing: "easeInOutQuad",
//       duration: 5000,
//       delay: anime.stagger(200),
//     });
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     const userId = localStorage.getItem("userId");
//     if (!userId) return setError("Login required");

//     try {
//       const { data } = await axios.post("http://localhost:5000/api/crop/save", { ...form, userId });
//       setReport(data);
//       localStorage.setItem("explanation", data.explanation);

//       if (data.irrigationRequired) {
//         localStorage.setItem("cropType", data.cropType);
//         localStorage.setItem("temperature", data.temperature);
//         localStorage.setItem("humidity", data.humidity);
//         navigate("/water-flow");
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || "Something went wrong.");
//     }
//   };

//   return (
//     <Container className="d-flex align-items-center justify-content-center min-vh-100 position-relative">
//       {/* Background Video */}
//       <VideoBackground autoPlay loop muted>
//         <source src={backgroundVideo} type="video/mp4" />
//       </VideoBackground>

//       {/* Animated Sun and Grains */}
//       <Sun className="sun" />
//       {[...Array(10)].map((_, i) => (
//         <Grain key={i} className="grain" style={{ top: `${Math.random() * 80 + 10}%`, left: `${Math.random() * 90}%` }} />
//       ))}

//       <Row className="w-100 justify-content-center">
//         <Col md={10} lg={8}>
//           <Card className="p-4 shadow-lg bg-secondary text-white rounded" data-aos="fade-up">
//             <Row>
//               <Col md={6} className="d-flex align-items-center justify-content-center">
//                 <motion.img
//                   src={cropGif}
//                   alt="Growing Crops"
//                   className="img-fluid"
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 1.5 }}
//                 />
//               </Col>
//               <Col md={6}>
//                 <motion.h2 
//                   className="text-center mb-4 fw-bold"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 1 }}
//                 >
//                   Enter Crop Details
//                 </motion.h2>

//                 {error && <Alert variant="danger">{error}</Alert>}

//                 <Form onSubmit={handleSubmit}>
//                   <Form.Group className="mb-3">
//                     <Form.Label className="fw-bold">Crop Type</Form.Label>
//                     <Form.Control type="text" name="cropType" placeholder="Enter crop type" value={form.cropType} onChange={handleChange} required />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label className="fw-bold">Crop Days</Form.Label>
//                     <Form.Control type="number" name="cropDays" placeholder="Enter Crop days" value={form.cropDays} onChange={handleChange} required />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label className="fw-bold">Location</Form.Label>
//                     <Form.Control type="text" name="area" placeholder="Enter location" value={form.area} onChange={handleChange} required />
//                   </Form.Group>

//                   <motion.div whileHover={{ scale: 1.05 }}>
//                     <Button type="submit" className="w-100 fw-bold p-2">
//                       Save Details
//                     </Button>
//                   </motion.div>
//                 </Form>

//                 {report && !report.irrigationRequired && (
//                   <motion.div 
//                     className="mt-4 p-3 bg-dark rounded text-center"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 1 }}
//                   >
//                     <h3>No Irrigation Required</h3>
//                     <p>Temperature: {report.temperature}°C</p>
//                     <p>Humidity: {report.humidity}%</p>
//                     <h4>💡 Gemini Insights</h4>
//                     <p style={{ whiteSpace: "pre-wrap" }}>{report.explanation}</p>
//                   </motion.div>
//                 )}
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default CropData;


import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Alert, Card, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import anime from "animejs";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components";
import cropGif from "../assets/Gardening.gif";
import backgroundVideo from "../assets/background_vid.mp4";
import { useNavigate } from "react-router-dom";

// Styled Components
const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  opacity: 0.4;
  z-index: -1;
`;

const Sun = styled.div`
  position: absolute;
  top: 10%;
  left: 75%;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, yellow 30%, orange 70%);
  border-radius: 50%;
  box-shadow: 0px 0px 50px rgba(255, 223, 0, 0.8);
`;

const Grain = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: wheat;
  border-radius: 50%;
  opacity: 0.8;
`;

const CropData = () => {
  const [form, setForm] = useState({ cropType: "", cropDays: "", area: "" });
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });

    anime({
      targets: ".sun",
      translateY: [-10, 10],
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
      duration: 4000,
    });

    anime({
      targets: ".grain",
      translateY: [-30, 0],
      translateX: [-10, 10],
      direction: "alternate",
      loop: true,
      easing: "easeInOutQuad",
      duration: 5000,
      delay: anime.stagger(200),
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) return setError("Login required");

    try {
      const { data } = await axios.post("http://localhost:5000/api/crop/save", { ...form, userId });
      setReport(data);
      localStorage.setItem("explanation", data.explanation);
      if (data.irrigationRequired) {
        localStorage.setItem("cropType", data.cropType);
        localStorage.setItem("temperature", data.temperature);
        localStorage.setItem("humidity", data.humidity);
        navigate("/water-flow");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 position-relative">
      {/* Background Video */}
      <VideoBackground autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </VideoBackground>

      {/* Sun and Grains */}
      <Sun className="sun" />
      {[...Array(10)].map((_, i) => (
        <Grain key={i} className="grain" style={{ top: `${Math.random() * 80 + 10}%`, left: `${Math.random() * 90}%` }} />
      ))}

      <Row className="w-100 justify-content-center">
        <Col md={10} lg={8}>
          <Card className="p-4 shadow-lg bg-secondary text-white rounded" data-aos="fade-up">
            <Row>
              <Col md={6} className="d-flex align-items-center justify-content-center">
                <motion.img
                  src={cropGif}
                  alt="Growing Crops"
                  className="img-fluid"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5 }}
                />
              </Col>

              <Col md={6}>
                <motion.h2
                  className="text-center mb-4 fw-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  Enter Crop Details
                </motion.h2>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Crop Type</Form.Label>
                    <Form.Control
                      type="text"
                      name="cropType"
                      placeholder="Enter crop type"
                      value={form.cropType}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Crop Days</Form.Label>
                    <Form.Control
                      type="number"
                      name="cropDays"
                      placeholder="Enter crop days"
                      value={form.cropDays}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="area"
                      placeholder="Enter location"
                      value={form.area}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button type="submit" className="w-100 fw-bold p-2">
                      Submit
                    </Button>
                  </motion.div>
                </Form>

                {report && !report.irrigationRequired && (
                  <motion.div
                    className="mt-4 p-3 bg-dark rounded text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <h3>No Irrigation Required</h3>
                    <p>Temperature: {report.temperature}°C</p>
                    <p>Humidity: {report.humidity}%</p>
                    <h4>💡 Gemini Insights</h4>
                    <p style={{ whiteSpace: "pre-wrap" }}>{report.explanation}</p>
                  </motion.div>
                )}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CropData;
