import React from "react";
const Footer=()=>{
    return(
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

    );
};
export default Footer;