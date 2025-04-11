// import { useState } from "react";
// import axios from "axios";

// const WaterFlowInput = () => {
//   const [form, setForm] = useState({
//     soilType: "", region: "", weatherCondition: ""
//   });
//   const [result, setResult] = useState(null);

//   const cropType = localStorage.getItem("cropType");
//   const temperature = parseInt(localStorage.getItem("temperature"));

//   const getTemperatureRange = (temp) => {
//     const lower = Math.floor(temp / 10) * 10;
//     const upper = lower + 10;
//     return `${lower}-${upper}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://127.0.0.1:5002/water-flow", {
//         ...form,
//         cropType,
//         temperatureRange: getTemperatureRange(temperature)
//       });
//       setResult(response.data);
//     } catch (error) {
//       setResult({ error: error.response?.data?.error || "Prediction failed" });
//     }
//   };

//   return (
//     <div>
//       <h2>Water Flow Prediction</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="soilType" placeholder="Soil Type" onChange={(e) => setForm({ ...form, soilType: e.target.value })} required />
//         <input name="region" placeholder="Region" onChange={(e) => setForm({ ...form, region: e.target.value })} required />
//         <input name="weatherCondition" placeholder="Weather Condition" onChange={(e) => setForm({ ...form, weatherCondition: e.target.value })} required />
//         <button type="submit">Predict</button>
//       </form>
//       {result && (
//         <div>
//           {result.error ? <p style={{ color: "red" }}>{result.error}</p> :
//             <p>Predicted Water Flow: {result.waterFlow}</p>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WaterFlowInput;



// import { useState } from "react";
// import axios from "axios";
// import GaugeChart from "../components/GaugeChart";

// const WaterFlowInput = () => {
//   const [form, setForm] = useState({
//     soilType: "", region: "", weatherCondition: ""
//   });
//   const [result, setResult] = useState(null);

//   const cropType = localStorage.getItem("cropType");
//   const temperature = parseInt(localStorage.getItem("temperature"));
//   const humidity = localStorage.getItem("humidity");
//   const explanation = localStorage.getItem("explanation");

//   const getTemperatureRange = (temp) => {
//     const lower = Math.floor(temp / 10) * 10;
//     const upper = lower + 10;
//     return `${lower}-${upper}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://127.0.0.1:5002/water-flow", {
//         ...form,
//         cropType,
//         temperatureRange: getTemperatureRange(temperature),
//         humidity
//       });
//       setResult(response.data);
//     } catch (error) {
//       setResult({ error: error.response?.data?.error || "Prediction failed" });
//     }
//   };

//   return (
//     <div>
//       <h1>Irrigation is required</h1>
//       <h2>Water Flow Prediction</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="soilType" placeholder="Soil Type" onChange={(e) => setForm({ ...form, soilType: e.target.value })} required />
//         <input name="region" placeholder="Region" onChange={(e) => setForm({ ...form, region: e.target.value })} required />
//         <input name="weatherCondition" placeholder="Weather Condition" onChange={(e) => setForm({ ...form, weatherCondition: e.target.value })} required />
//         <button type="submit">Predict</button>
//       </form>
//       {result && (
//         <div>
//           {result.error ? (
//             <p style={{ color: "red" }}>{result.error}</p>
//           ) : (
//             <>
//               <p>Predicted Water Flow: {result.waterFlow}L/h</p>
//               <p>Temperature: {temperature}°C</p>
//               <p>Humidity: {humidity}%</p>
//               <p> GAUGE CHART </p>
//                <GaugeChart value={parseFloat(result.waterFlow)} />
//               <h3>💡 Gemini Insights</h3>
//               <p style={{ whiteSpace: "pre-wrap" }}>{explanation}</p>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WaterFlowInput;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
// import { motion } from "framer-motion";
// import styled from "styled-components";
// import backgroundVideo from "../assets/background_vid.mp4";
// import GaugeChart from "../components/GaugeChart";

// // Styled Background Video
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

// const WaterFlowInput = () => {
//   const [form, setForm] = useState({ soilType: "", region: "", weatherCondition: "" });
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);

//   const cropType = localStorage.getItem("cropType");
//   const temperature = parseInt(localStorage.getItem("temperature"));
//   const humidity = localStorage.getItem("humidity");
//   const explanation = localStorage.getItem("explanation");

//   const getTemperatureRange = (temp) => {
//     const lower = Math.floor(temp / 10) * 10;
//     const upper = lower + 10;
//     return `${lower}-${upper}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setResult(null);
//     try {
//       const response = await axios.post("http://127.0.0.1:5002/water-flow", {
//         ...form,
//         cropType,
//         temperatureRange: getTemperatureRange(temperature),
//         humidity,
//       });
//       setResult(response.data);
//     } catch (error) {
//       setError(error.response?.data?.error || "Prediction failed");
//     }
//   };

//   return (
//     <Container className="min-vh-100 d-flex align-items-center justify-content-center position-relative">
//       <VideoBackground autoPlay loop muted>
//         <source src={backgroundVideo} type="video/mp4" />
//       </VideoBackground>

//       <Row className="w-100 justify-content-center">
//         <Col lg={10}>
//           <Card className="p-4 shadow-lg bg-light bg-opacity-75 rounded">
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
//               <h1 className="text-center text-success fw-bold mb-4">💧 Irrigation Required</h1>
//               <h3 className="text-center mb-4">Water Flow Prediction</h3>

//               {error && <Alert variant="danger">{error}</Alert>}

//               <Form onSubmit={handleSubmit}>
//                 <Row>
//                   <Col md={4} className="mb-3">
//                     <Form.Label>Soil Type</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="soilType"
//                       placeholder="e.g. Loamy"
//                       onChange={(e) => setForm({ ...form, soilType: e.target.value })}
//                       required
//                     />
//                   </Col>
//                   <Col md={4} className="mb-3">
//                     <Form.Label>Region</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="region"
//                       placeholder="e.g. Punjab"
//                       onChange={(e) => setForm({ ...form, region: e.target.value })}
//                       required
//                     />
//                   </Col>
//                   <Col md={4} className="mb-3">
//                     <Form.Label>Weather Condition</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="weatherCondition"
//                       placeholder="e.g. Sunny"
//                       onChange={(e) => setForm({ ...form, weatherCondition: e.target.value })}
//                       required
//                     />
//                   </Col>
//                 </Row>
//                 <motion.div whileHover={{ scale: 1.03 }} className="text-center mt-3">
//                   <Button type="submit" variant="primary" className="fw-bold px-4 py-2">
//                     Predict Water Flow
//                   </Button>
//                 </motion.div>
//               </Form>

//               {result && !result.error && (
//                 <motion.div
//                   className="mt-5 bg-white p-4 rounded shadow text-center"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 1 }}
//                 >
//                   <h4 className="fw-bold text-success">✅ Water Flow Prediction Result</h4>
//                   <p><strong>Predicted Flow:</strong> {result.waterFlow} L/h</p>
//                   <p><strong>Temperature:</strong> {temperature}°C</p>
//                   <p><strong>Humidity:</strong> {humidity}%</p>
//                   <div className="my-4">
//                     <GaugeChart value={parseFloat(result.waterFlow)} />
//                   </div>

//                   <h5 className="mt-4 text-info">💡 Gemini Insights</h5>
//                   <div style={{
//                     backgroundColor: "#f9f9f9",
//                     padding: "15px",
//                     borderRadius: "8px",
//                     textAlign: "left",
//                     whiteSpace: "pre-wrap",
//                     fontStyle: "italic",
//                     fontSize: "1rem",
//                   }}>
//                     {explanation}
//                   </div>
//                 </motion.div>
//               )}

//               {result?.error && (
//                 <Alert variant="danger" className="mt-4">
//                   {result.error}
//                 </Alert>
//               )}
//             </motion.div>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default WaterFlowInput;

// import { useState } from "react";
// import axios from "axios";
// import GaugeChart from "../components/GaugeChart";

// const WaterFlowInput = () => {
//   const [form, setForm] = useState({
//     soilType: "", region: "", weatherCondition: ""
//   });
//   const [result, setResult] = useState(null);

//   const cropType = localStorage.getItem("cropType");
//   const temperature = parseInt(localStorage.getItem("temperature"));
//   const humidity = localStorage.getItem("humidity");
//   const explanation = localStorage.getItem("explanation");

//   const getTemperatureRange = (temp) => {
//     const lower = Math.floor(temp / 10) * 10;
//     const upper = lower + 10;
//     return `${lower}-${upper}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://127.0.0.1:5002/water-flow", {
//         ...form,
//         cropType,
//         temperatureRange: getTemperatureRange(temperature),
//         humidity
//       });
//       setResult(response.data);
//     } catch (error) {
//       setResult({ error: error.response?.data?.error || "Prediction failed" });
//     }
//   };

//   return (
//     <div>
//       <h1>Irrigation is required</h1>
//       <h2>Water Flow Prediction</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="soilType" placeholder="Soil Type" onChange={(e) => setForm({ ...form, soilType: e.target.value })} required />
//         <input name="region" placeholder="Region" onChange={(e) => setForm({ ...form, region: e.target.value })} required />
//         <input name="weatherCondition" placeholder="Weather Condition" onChange={(e) => setForm({ ...form, weatherCondition: e.target.value })} required />
//         <button type="submit">Predict</button>
//       </form>
//       {result && (
//         <div>
//           {result.error ? (
//             <p style={{ color: "red" }}>{result.error}</p>
//           ) : (
//             <>
//               <p>Predicted Water Flow: {result.waterFlow}L/h</p>
//               <p>Temperature: {temperature}°C</p>
//               <p>Humidity: {humidity}%</p>
//               <p> GAUGE CHART </p>
//                <GaugeChart value={parseFloat(result.waterFlow)} />
//               <h3>💡 Gemini Insights</h3>
//               <p style={{ whiteSpace: "pre-wrap" }}>{explanation}</p>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WaterFlowInput;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import GaugeChart from "../components/GaugeChart";
// import styled from "styled-components";
// import { motion } from "framer-motion";
// import bgVideo from "../assets/background_vid.mp4"; // Update path accordingly

// const Container = styled.div`
//   position: relative;
//   height: 100vh;
//   overflow: hidden;
//   font-family: 'Poppins', sans-serif;
// `;

// const BackgroundVideo = styled.video`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   z-index: -1;
//   filter: brightness(0.7);
// `;

// const FormCard = styled(motion.div)`
//   background: rgba(255, 255, 255, 0.85);
//   border-radius: 20px;
//   padding: 2rem;
//   width: 500px;
//   max-width: 90%;
//   margin: 4rem auto;
//   box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
//   text-align: center;
// `;

// const Title = styled(motion.h1)`
//   color: #2e7d32;
//   font-size: 2.5rem;
//   text-align: center;
//   margin-top: 2rem;
//   text-shadow: 2px 2px 5px rgba(0,0,0,0.3);
// `;

// const SubTitle = styled.h2`
//   color: #388e3c;
//   margin-bottom: 1rem;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0.75rem;
//   margin: 0.5rem 0;
//   border: 2px solid #a5d6a7;
//   border-radius: 10px;
//   font-size: 1rem;
//   outline: none;
// `;

// const Button = styled.button`
//   background: #43a047;
//   color: white;
//   padding: 0.75rem 2rem;
//   margin-top: 1rem;
//   font-size: 1.1rem;
//   border: none;
//   border-radius: 12px;
//   cursor: pointer;
//   transition: background 0.3s ease;
//   &:hover {
//     background: #2e7d32;
//   }
// `;

// const ResultCard = styled.div`
//   background: rgba(255, 255, 255, 0.95);
//   border-radius: 16px;
//   padding: 2rem;
//   margin: 2rem auto;
//   width: 90%;
//   max-width: 600px;
//   box-shadow: 0 8px 16px rgba(0,0,0,0.2);
//   color: #1b5e20;
// `;

// const WaterFlowInput = () => {
//   const [form, setForm] = useState({
//     soilType: "", region: "", weatherCondition: ""
//   });
//   const [result, setResult] = useState(null);

//   const cropType = localStorage.getItem("cropType");
//   const temperature = parseInt(localStorage.getItem("temperature"));
//   const humidity = localStorage.getItem("humidity");
//   const explanation = localStorage.getItem("explanation");

//   const getTemperatureRange = (temp) => {
//     const lower = Math.floor(temp / 10) * 10;
//     const upper = lower + 10;
//     return `${lower}-${upper}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://127.0.0.1:5002/water-flow", {
//         ...form,
//         cropType,
//         temperatureRange: getTemperatureRange(temperature),
//         humidity
//       });
//       setResult(response.data);
//     } catch (error) {
//       setResult({ error: error.response?.data?.error || "Prediction failed" });
//     }
//   };

//   return (
//     <Container>
//       <BackgroundVideo autoPlay loop muted>
//         <source src={bgVideo} type="video/mp4" />
//         Your browser does not support the video tag.
//       </BackgroundVideo>

//       <Title
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         💧 Irrigation Required
//       </Title>

//       <FormCard
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1, delay: 0.3 }}
//       >
//         <SubTitle>Water Flow Prediction</SubTitle>
//         <form onSubmit={handleSubmit}>
//           <Input
//             name="soilType"
//             placeholder="Soil Type"
//             onChange={(e) => setForm({ ...form, soilType: e.target.value })}
//             required
//           />
//           <Input
//             name="region"
//             placeholder="Region"
//             onChange={(e) => setForm({ ...form, region: e.target.value })}
//             required
//           />
//           <Input
//             name="weatherCondition"
//             placeholder="Weather Condition"
//             onChange={(e) => setForm({ ...form, weatherCondition: e.target.value })}
//             required
//           />
//           <Button type="submit">Predict</Button>
//         </form>
//       </FormCard>

//       {result && (
//         <ResultCard>
//           {result.error ? (
//             <p style={{ color: "red" }}>{result.error}</p>
//           ) : (
//             <>
//               <p><strong>Predicted Water Flow:</strong> {result.waterFlow} L/h</p>
//               <p><strong>Temperature:</strong> {temperature}°C</p>
//               <p><strong>Humidity:</strong> {humidity}%</p>
//               <GaugeChart value={parseFloat(result.waterFlow)} />
//               <h3>💡 Gemini Insights</h3>
//               <p style={{ whiteSpace: "pre-wrap" }}>{explanation}</p>
//             </>
//           )}
//         </ResultCard>
//       )}
//     </Container>
//   );
// };

// export default WaterFlowInput;


// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import GaugeChart from "../components/GaugeChart";
// import styled from "styled-components";
// import { motion } from "framer-motion";
// import bgVideo from "../assets/background_vid.mp4";

// const WaterFlowInput = () => {
//   const [form, setForm] = useState({
//     soilType: "",
//     region: "",
//     weatherCondition: "",
//   });
//   const [result, setResult] = useState(null);

//   const cropType = localStorage.getItem("cropType");
//   const temperature = parseInt(localStorage.getItem("temperature"));
//   const humidity = localStorage.getItem("humidity");
//   const explanation = localStorage.getItem("explanation");

//   const resultRef = useRef(null);

//   const getTemperatureRange = (temp) => {
//     const lower = Math.floor(temp / 10) * 10;
//     const upper = lower + 10;
//     return `${lower}-${upper}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://127.0.0.1:5002/water-flow", {
//         ...form,
//         cropType,
//         temperatureRange: getTemperatureRange(temperature),
//         humidity,
//       });
//       setResult(response.data);
//     } catch (error) {
//       setResult({ error: error.response?.data?.error || "Prediction failed" });
//     }
//   };

//   useEffect(() => {
//     if (result && resultRef.current) {
//       resultRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [result]);

//   return (
//     <Container>
//       <BackgroundVideo autoPlay loop muted>
//         <source src={bgVideo} type="video/mp4" />
//         Your browser does not support the video tag.
//       </BackgroundVideo>

//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         Irrigation is needed for the crop
//       </motion.h1>

//       <motion.h2
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5 }}
//       >
//         Predict Water Flow
//       </motion.h2>

//       <FormCard
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         <form onSubmit={handleSubmit}>
//           <input
//             name="soilType"
//             placeholder="Soil Type"
//             onChange={(e) =>
//               setForm({ ...form, soilType: e.target.value })
//             }
//             required
//           />
//           <input
//             name="region"
//             placeholder="Region"
//             onChange={(e) =>
//               setForm({ ...form, region: e.target.value })
//             }
//             required
//           />
//           <input
//             name="weatherCondition"
//             placeholder="Weather Condition"
//             onChange={(e) =>
//               setForm({ ...form, weatherCondition: e.target.value })
//             }
//             required
//           />
//           <button type="submit">🌿 Predict</button>
//         </form>
//       </FormCard>

//       {result && (
//         <motion.div
//           ref={resultRef}
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <ResultCard>
//             {result.error ? (
//               <p style={{ color: "red" }}>{result.error}</p>
//             ) : (
//               <>
//                 <motion.p
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   <strong>Predicted Water Flow:</strong> {result.waterFlow} L/h
//                 </motion.p>
//                 <p><strong>Temperature:</strong> {temperature}°C</p>
//                 <p><strong>Humidity:</strong> {humidity}%</p>

//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.5 }}
//                 >
//                   <GaugeChart value={parseFloat(result.waterFlow)} />
//                 </motion.div>

//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 1 }}
//                 >
//                   <h3>💡 Gemini Insights</h3>
//                   <p style={{ whiteSpace: "pre-wrap" }}>{explanation}</p>
//                 </motion.div>
//               </>
//             )}
//           </ResultCard>
//         </motion.div>
//       )}
//     </Container>
//   );
// };

// export default WaterFlowInput;

// // Styled Components
// const Container = styled.div`
//   position: relative;
//   z-index: 1;
//   color: white;
//   text-align: center;
//   padding: 4rem 2rem;
//   min-height: 100vh;
//   font-family: 'Segoe UI', sans-serif;
// `;

// const BackgroundVideo = styled.video`
//   position: fixed;
//   top: 0;
//   left: 0;
//   min-width: 100vw;
//   min-height: 100vh;
//   object-fit: cover;
//   z-index: -1;
// `;

// const FormCard = styled(motion.div)`
//   background: rgba(0, 0, 0, 0.6);
//   backdrop-filter: blur(6px);
//   padding: 2rem;
//   border-radius: 20px;
//   max-width: 500px;
//   margin: 2rem auto;
//   box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);

//   input {
//     display: block;
//     margin: 1rem auto;
//     padding: 0.8rem;
//     width: 80%;
//     border-radius: 10px;
//     border: none;
//     font-size: 1rem;
//   }

//   button {
//     margin-top: 1rem;
//     padding: 0.8rem 1.5rem;
//     font-size: 1.1rem;
//     background-color: #28a745;
//     color: white;
//     border: none;
//     border-radius: 10px;
//     cursor: pointer;
//     transition: all 0.3s ease;

//     &:hover {
//       background-color: #218838;
//       transform: scale(1.05);
//     }
//   }
// `;

// const ResultCard = styled.div`
//   background: rgba(0, 0, 0, 0.65);
//   backdrop-filter: blur(5px);
//   padding: 2rem;
//   border-radius: 20px;
//   max-width: 800px;
//   margin: 2rem auto;
//   color: #fff;
//   font-size: 1.1rem;
//   line-height: 1.6;
//   box-shadow: 0 0 20px rgba(255, 255, 255, 0.15);
// `;

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import GaugeChart from "../components/GaugeChart";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaInstagramSquare, FaLinkedin, FaGithub } from "react-icons/fa";
import bgVideo from "../assets/background_vid.mp4";

const WaterFlowInput = () => {
  const [form, setForm] = useState({
    soilType: "",
    region: "",
    weatherCondition: "",
  });
  const [result, setResult] = useState(null);

  const cropType = localStorage.getItem("cropType");
  const temperature = parseInt(localStorage.getItem("temperature"));
  const humidity = localStorage.getItem("humidity");
  const explanation = localStorage.getItem("explanation");

  const resultRef = useRef(null);

  const getTemperatureRange = (temp) => {
    const lower = Math.floor(temp / 10) * 10;
    const upper = lower + 10;
    return `${lower}-${upper}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5002/water-flow", {
        ...form,
        cropType,
        temperatureRange: getTemperatureRange(temperature),
        humidity,
      });
      setResult(response.data);
    } catch (error) {
      setResult({ error: error.response?.data?.error || "Prediction failed" });
    }
  };

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result]);

  const explanationItems = explanation?.split("\n").filter(Boolean);

  return (
    <Container>
      <BackgroundVideo autoPlay loop muted>
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>

      {/* ✅ Header with Extended Nav */}
      <motion.header
        className="flex items-center justify-between mb-8 py-2 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <img src="../src/assets/Logo.svg" alt="Organic Farm Logo" width={80} height={100} className="object-contain" />
          <span className="font-semibold text-white text-xl">Jal Sanvardhan</span>
        </motion.div>
        <div className="hidden md:flex items-center gap-6">
          {["home", "crop-Data", "water-flow", "register", "login", "Contact Us"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <a
                href={`/${item === "Home" ? "" : item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-white hover:text-[#b7e4c7] font-medium relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#b7e4c7] transition-all group-hover:w-full duration-300"></span>
              </a>
            </motion.div>
          ))}
        </div>
      </motion.header>

      <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        🌾 Irrigation Required for the Crop
      </motion.h1>

      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        💧 Water Flow Prediction
      </motion.h2>

      <FormCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <form onSubmit={handleSubmit}>
          <input name="soilType" placeholder="Soil Type" onChange={(e) => setForm({ ...form, soilType: e.target.value })} required />
          <input name="region" placeholder="Region" onChange={(e) => setForm({ ...form, region: e.target.value })} required />
          <input name="weatherCondition" placeholder="Weather Condition" onChange={(e) => setForm({ ...form, weatherCondition: e.target.value })} required />
          <button type="submit">🌿 Predict</button>
        </form>
      </FormCard>

      {result && (
        <motion.div ref={resultRef} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <ResultCard>
            {result.error ? (
              <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ color: "red" }}>
                {result.error}
              </motion.p>
            ) : (
              <>
                <InfoGaugeRow>
                  <GroupedInfo initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <h3>📊 Summary</h3>
                    <p>🚿 <strong>Predicted Water Flow:</strong> {result.waterFlow} L/h</p>
                    <p>🌡 <strong>Temperature:</strong> {temperature}°C</p>
                    <p>💧 <strong>Humidity:</strong> {humidity}%</p>
                  </GroupedInfo>

                  <GaugeWrapper
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 120, damping: 10, delay: 0.6 }}
                  >
                    <GaugeValue>{result.waterFlow} L/h</GaugeValue>
                    <GaugeChart value={parseFloat(result.waterFlow)} width={300} height={200} />
                  </GaugeWrapper>
                </InfoGaugeRow>

                <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
                  💡 Facts about your Crop!!
                </motion.h3>

                <QAWrapper>
                  {explanationItems?.slice(0, -1).reduce((acc, item, i, arr) => {
                    if (i % 2 === 0 && arr[i + 1]) {
                      acc.push(
                        <QADiv key={i}>
                          <div className="question">{arr[i]}</div>
                          <div className="answer">{arr[i + 1]}</div>
                        </QADiv>
                      );
                    }
                    return acc;
                  }, [])}
                </QAWrapper>

                {explanationItems?.length % 2 === 1 && (
                  <FinalNote initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
                    <p>{explanationItems[explanationItems.length - 1]}</p>
                  </FinalNote>
                )}
              </>
            )}
          </ResultCard>
        </motion.div>
      )}

      {/* ✅ Footer Section */}
      <footer className="mt-20 pt-8 pb-4 border-t border-[#333] text-center text-sm text-white flex flex-col gap-4 items-center">
        <div className="flex gap-4">
          <a href="https://www.instagram.com/clavenncoutinho/" target="_blank" rel="noopener noreferrer">
            <FaInstagramSquare className="w-6 h-6 text-white hover:scale-110 transition-transform" />
          </a>
          <a href="https://www.linkedin.com/in/claven-coutinho/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="w-6 h-6 text-white hover:scale-110 transition-transform" />
          </a>
          <a href="https://github.com/saparya04/JalSanvardhn-The-Smart-Irrigation-system-" target="_blank" rel="noopener noreferrer">
            <FaGithub className="w-6 h-6 text-white hover:scale-110 transition-transform" />
          </a>
        </div>
        <div>Contact us: support@jalsanvardhan.com | +91-9967304451</div>
        <div>© {new Date().getFullYear()} Jal Sanvardhan. All rights reserved.</div>
      </footer>
    </Container>
  );
};

export default WaterFlowInput;




// Styled Components
const Container = styled.div`
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
  padding: 4rem 2rem;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
`;

const BackgroundVideo = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  object-fit: cover;
  z-index: -1;
`;

const FormCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
  padding: 2rem;
  border-radius: 20px;
  max-width: 700px;
  margin: 4rem auto;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);

  input {
    display: block;
    margin: 1rem auto;
    padding: 0.8rem;
    width: 80%;
    border-radius: 10px;
    border: none;
    font-size: 1rem;
  }

  button {
    margin-top: 1rem;
    padding: 0.8rem 1.5rem;
    font-size: 1.1rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: #218838;
      transform: scale(1.05);
    }
  }
`;

const ResultCard = styled.div`
  background: rgba(77, 83, 97, 0.68);
  color: #000;
  backdrop-filter: blur(8px);
  padding: 2rem;
  border-radius: 70px;
  max-width: 1100px;
  margin: 2rem auto;
  font-size: 2rem;
  line-height: 1.8;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);

  h3 {
    margin-top: 1.5rem;
    font-weight: bold;
    font-size: 1.9rem;
  }

  span {
    color:rgb(132, 197, 243);
    font-weight: bold;
  }
`;

const GroupedInfo = styled(motion.div)`
  background: rgb(197, 229, 244);
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 1.6rem;
  color: #000;
  flex: 1;

  p {
    margin: 0.5rem 0;
    font-size: 1.4rem;
  }

  h3 {
    margin-bottom: 2rem;
    font-size: 1.8rem;
  }
`;

const GaugeWrapper = styled(motion.div)`
  padding: 2rem 1rem;
  background: #FFFFFF;
  border-radius: 70px;
  flex: 1;
  box-shadow: 0 0 30px rgba(0, 123, 255, 0.2);

  svg {
    // width: 100% !important;
    height: auto !important;
  }
`;

const GaugeValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color:rgb(1, 24, 47);
  margin-bottom: 1rem;
`;

const InfoGaugeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: stretch;
  margin-bottom: 2rem;
`;

const QAWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
`;

const QADiv = styled.div`
  background: rgba(245, 245, 245, 0.85);
  padding: 1rem 1.5rem;
  border-left: 5px solid #28a745;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
  color: #333;

  .question {
    font-weight: 600;
    margin-bottom: 0.4rem;
    font-size: 1rem;
  }

  .answer {
    font-style: italic;
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const FinalNote = styled(motion.div)`
  margin-top: 2rem;
  background: #e9f7fe;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  color: #004080;
  font-size: 0.95rem;
  font-weight: 500;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`;