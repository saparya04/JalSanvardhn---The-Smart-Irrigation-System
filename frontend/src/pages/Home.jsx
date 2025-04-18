import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { FlipWords } from "../components/ui/flip-words";
import {
  TextRevealCard
} from "../components/ui/text-reveal-card";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import BubbleBackground from "../components/ui/BubbleBackground";
import img from "../assets/Logo.svg";
import sap from "../assets/backg.jpg";
import bas from "../assets/backg3.jpg";
import backg1 from "../assets/backg1.jpg";
import backg2 from "../assets/backg2.jpg";
export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  const words = ["smarter", "greener", "efficient", "automated", "productive", "sustainable"];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BubbleBackground />

      <div className="relative z-10 container mx-auto p-4">

        {/* ✅ Header with Extended Nav */}
        <motion.header
          className="flex items-center justify-between mb-8 py-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img src={img} alt="Organic Farm Logo" width={80} height={100} className="object-contain" />
            <span className="font-semibold text-white text-xl">Jal Sanvardhan</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-6">
            {["home", "crop-data","pic-data", "water-flow", "register", "login", "Contact Us"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <a
                  //href={`/${item === "Home" ? "" : item.toLowerCase().replace(/\s+/g, "-")}`}
                  href={item === "Contact Us" ? "#contact-us" : `/${item === "Home" ? "" : item.toLowerCase().replace(/\s+/g, "-")}`}

                  className="text-white hover:text-[#b7e4c7] font-medium relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#b7e4c7] transition-all group-hover:w-full duration-300"></span>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.header>

        {/* Hero Section */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mt-12"
          variants={container}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
        >
          <motion.div className="flex flex-col justify-center" variants={item}>
            <div className="text-5xl font-bold text-white my-6">
              Grow <FlipWords words={words} /> <br />
              farms with AI
            </div>
            <motion.p
              className="text-[#b7e4c7] mb-8 max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Jal Sanvardhan is a smart irrigation platform that uses AI and live weather data to guide farmers on when and how much to irrigate—ensuring water efficiency, healthier crops, and smarter, data-driven farming decisions.
            </motion.p>
          </motion.div>

          <motion.div
            className="relative"
            variants={item}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="rounded-3xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={sap}
                alt="Farm Field"
                className="w-full h-full object-cover rounded-3xl"
              />
            </motion.div>

            <motion.div
              className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              const images = [backg1, backg2];

                  {images.map((img, i) => (
                    <motion.div
                      key={i}
                      className="w-32 h-24 md:w-40 md:h-32 rounded-2xl overflow-hidden border-4 border-black relative"
                      whileHover={{ scale: 1.1, rotate: i === 0 ? 2 : -2 }}
                      transition={{ duration: 0.3 }}
                    >
                  <img
                    src={`/${img}`}
                    alt="Farm"
                    className="w-full h-full object-cover"
                  />
                  {i === 1 && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="bg-white/80 rounded-full p-2"
                        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
                        whileTap={{ scale: 0.9 }}
                        animate={{
                          scale: [1, 1.1, 1],
                          transition: {
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 1.5,
                          },
                        }}
                      >
                        <Play className="w-6 h-6 text-[#344e41]" />
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="absolute -top-4 -left-4 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-black"
              initial={{ opacity: 0, scale: 0, x: -20, y: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <img
                src={bas}
                alt="Vegetables"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.section
          className="py-16 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Why Choose Our Service ?
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-[#b7e4c7] mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            ></motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "100% Authentic",
                icon: "🌱",
                desc: "AI may be wrong,but our predictions can never be!",  
              },
              {
                title: "AI-Based Water Requirement Prediction",
                icon: "🤖 ",
                desc: "AI/ML models analyze crop data to predict the exact amount of water needed for efficient irrigation.",
              },
              {
                title: "Sustainable",
                icon: "♻️",
                desc: "Our farming practices are environmentally friendly and sustainable.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
                whileHover={{ y: -10, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              >
                <motion.div
                  className="text-4xl mb-4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.2 + index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-[#b7e4c7]">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <div className="flex items-center justify-center h-[15rem] my-5 rounded-2xl w-full">
          <TextRevealCard
            text="You sow the tiny seed"
            revealText="We will nuture the crop"
          />
        </div>

        {/* ✅ Footer Section */}
        
        <footer id="contact-us" className="mt-20 pt-8 pb-4 border-t border-[#333] text-center text-sm text-white flex flex-col gap-4 items-center">
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
    </main>
  );
}
