import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import cropGif from "../assets/Gardening.gif";
import backgroundVideo from "../assets/background_vid.mp4";
import loadingGif from "../assets/plant_loading_gif.gif";
import Logo from "../assets/Logo.svg";
import { useNavigate } from "react-router-dom";
import { FaInstagramSquare, FaLinkedin, FaGithub } from "react-icons/fa";

const CropData = () => {
  const [form, setForm] = useState({ cropType: "", cropDays: "", area: "" });
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) return setError("Login required");

    setLoading(true);

    try {
      const { data } = await axios.post("https://jalsanvardhn-backend.onrender.com/api/crop/save", { ...form, userId });
      // localStorage.setItem("userId", data.user._id);
      setReport(data);
      localStorage.setItem("explanation", data.explanation);

      if (data.irrigationRequired) {
        localStorage.setItem("cropType", data.cropType);
        localStorage.setItem("temperature", data.temperature);
        localStorage.setItem("humidity", data.humidity);
        navigate("/water-flow");
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || "Error");
    }
  };

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 flex items-center justify-center z-50">
        <img src={loadingGif} alt="Loading..." className="w-64 h-64" />
      </div>
    );
  }
  

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-10">
      {/* ✅ Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover opacity-90 -z-10"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      {/* ✅ Header with Extended Nav */}
      <motion.header
        className="w-full max-w-7xl mx-auto px-4 flex items-center justify-between mb-10 py-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <img src={Logo} alt="Organic Farm Logo" width={80} height={100} className="object-contain" />
          <span className="font-semibold text-white text-xl">Jal Sanvardhan</span>
        </motion.div>
        <div className="hidden md:flex items-center gap-6">
          {["home", "crop-data", "water-flow", "register", "login", "Contact Us"].map((item, index) => (
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

      {/* ☀️ Sun + Grain Particles */}
      <motion.div
        className="absolute top-[10%] left-[75%] w-[100px] h-[100px] rounded-full z-10"
        style={{
          background: "radial-gradient(circle, yellow 30%, orange 70%)",
          boxShadow: "0px 0px 50px rgba(255, 223, 0, 0.8)",
        }}
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[10px] h-[10px] bg-yellow-200 rounded-full opacity-80 z-10"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 90}%`,
          }}
          animate={{ y: [0, -30, 0], x: [0, 10, -10, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}

      {/* ✅ Form + Animation Box */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl p-8 gap-6 max-w-5xl w-full"
        data-aos="fade-up"
      >
        <div className="relative bg-grey p-4 rounded-xl shadow-lg self-start">
          <motion.img
            src={cropGif}
            alt="Growing Crops"
            className="w-full h-full object-contain rounded-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          />
        </div>

        <div className="flex flex-col justify-center text-white">
          <motion.h2
            className="text-3xl font-bold text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            🌱 Enter Crop Details
          </motion.h2>

          {error && (
            <p className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4 text-sm font-medium">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-semibold mb-1">Crop Type</label>
              <input
                type="text"
                name="cropType"
                
                value={form.cropType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-400 bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="e.g., Wheat, Rice"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Crop Days</label>
              <input
                type="number"
                name="cropDays"
                value={form.cropDays}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-400 bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="e.g., 120"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Location</label>
              <input
                type="text"
                name="area"
                value={form.area}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-400 bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="e.g., Pune, Mumbai"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg shadow-lg transition"
            >
              🚀 Submit
            </motion.button>
          </form>

          {report && !report.irrigationRequired && (
            <motion.div
              className="mt-6 bg-black/30 p-4 rounded-xl text-white shadow backdrop-blur"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-xl font-semibold mb-2">✅ No Irrigation Required</h3>
              <p>🌡️ Temperature: {report.temperature}°C</p>
              <p>💧 Humidity: {report.humidity}%</p>
              <h4 className="mt-3 font-bold">💡 Gemini Insights:</h4>
              <p className="whitespace-pre-wrap">{report.explanation}</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* ✅ Footer */}
      <footer className="mt-20 pt-8 pb-4 border-t border-[#333] text-center text-sm text-white flex flex-col gap-4 items-center z-20 relative">
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
    </div>
  );
};

export default CropData;
