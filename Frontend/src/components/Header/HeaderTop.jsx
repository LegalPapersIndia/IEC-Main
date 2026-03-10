// src/components/Header/HeaderTop.jsx
import { Link } from 'react-router-dom';
import Logo from "../../Assest/logo.png";
import Swach from "../../Assest/swach.png";

export default function HeaderTop({ handleScroll }) {
  return (
    <div className="bg-gradient-to-b from-orange-300 via-orange-200 to-blue-400 text-gray-900 shadow-xl">
      <div className="bg-gradient-to-r from-orange-400 to-blue-500 text-xs py-1 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span>📧 info@iecregistration-india.org</span>
            <span className="hidden sm:inline">|</span>
            <span>📞 +91-9315247392</span>
          </div>
          <div className="flex gap-3 text-orange-100">
            <Link to="#benefits" onClick={(e) => handleScroll(e, "#benefits")} className="hover:text-white transition">Benefits</Link>
            <Link to="#faq" onClick={(e) => handleScroll(e, "#faq")} className="hover:text-white transition">FAQs</Link>
            <Link to="/contact" className="hover:text-white transition">Contact Us</Link>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-200 to-blue-300 text-gray-800 shadow-sm overflow-hidden">
        <div className="marquee-container relative w-full">
          <div className="marquee inline-flex whitespace-nowrap text-sm font-medium tracking-wide">
            <span className="mx-16">
              ◆ Mandatory IEC updation every year between 1st April – 30th June ◆ 
              Keep your code active – verify & update even if no changes ◆ 
              Visit DGFT portal to avoid deactivation ◆
            </span>
            <span className="mx-16">
              ◆ Mandatory IEC updation every year between 1st April – 30th June ◆ 
              Keep your code active – verify & update even if no changes ◆ 
              Visit DGFT portal to avoid deactivation ◆
            </span>
          </div>
        </div>
      </div>

      {/* Logo + Title + Swach Image */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          {/* Left: Logo + Text */}
          <div className="flex items-center gap-4 md:gap-5">
            <Link to="/">
              <div className="relative group">
                <img
                  src={Logo}
                  alt="IEC - Import Export Code India"
                  className="w-36 h-20 sm:w-40 sm:h-24 md:w-48 md:h-28 lg:w-52 lg:h-32 object-contain transition-all duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-200/30 to-blue-200/30 opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-lg"></div>
              </div>
            </Link>

            <div className="text-center md:text-left">
              <h1 className="text-2xl sm:text-2.5xl md:text-3xl lg:text-3.5xl font-extrabold tracking-tight drop-shadow-md">
                INDIA'S IEC REGISTRATION PORTAL
              </h1>
              <p className="text-xs sm:text-sm md:text-base opacity-90 font-medium mt-0.5">
                भारतीय आयात निर्यात कोड पंजीकरण
              </p>
            </div>
          </div>

          {/* Right: Swach Image */}
          <div className="hidden lg:block relative group">
            <img
              src={Swach}
              alt="Swachh Bharat - Global Trade India"
              className="w-36 h-36 lg:w-44 lg:h-44 xl:w-48 xl:h-48 object-contain drop-shadow-2xl transition-all duration-400 group-hover:scale-105 group-hover:rotate-2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-orange-300/20 via-transparent rounded-full opacity-40 group-hover:opacity-65 transition-opacity"></div>
          </div>
        </div>
      </div>
    </div>
  );
}