import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCode, FaUserAstronaut, FaPaperPlane } from "react-icons/fa";
import { BiHomeAlt2 } from "react-icons/bi";
import { HiCode } from "react-icons/hi";
import { useNavbar } from "../context/NavbarContext";
import { useDeveloperMode } from "../context/DeveloperModeContext";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isNavbarVisible } = useNavbar();
  const { isDeveloperMode, toggleDeveloperMode } = useDeveloperMode();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const navItems = [
    { id: "hero", icon: <BiHomeAlt2 className="text-lg" />, label: t('nav.home') },
    { id: "projects", icon: <FaCode className="text-lg" />, label: t('nav.projects') },
    { id: "about", icon: <FaUserAstronaut className="text-lg" />, label: t('nav.about') },
    { id: "contact", icon: <FaPaperPlane className="text-lg" />, label: t('nav.contact') },
  ];

  if (!isNavbarVisible) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full top-6 z-50 flex justify-center px-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: isScrolled ? 1 : 0.9,
          scale: 1,
          backgroundColor: isScrolled ? "rgba(17, 24, 39, 0.9)" : "rgba(17, 24, 39, 0.7)"
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg shadow-black/10 flex items-center gap-6"
      >
        <ul className="flex items-center gap-6">
          {navItems.map((item) => (
            <motion.li
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => handleScroll(e, item.id)}
                className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-all duration-300"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="hidden md:block text-sm font-medium">{item.label}</span>
              </a>
            </motion.li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDeveloperMode}
            className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${
              isDeveloperMode 
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' 
                : 'bg-gray-800/50 text-gray-400 border border-gray-700/50'
            }`}
          >
            <HiCode className="text-lg" />
            <span className="hidden md:block text-sm font-medium">
              {isDeveloperMode ? 'Dev Mode: ON' : 'Dev Mode: OFF'}
            </span>
          </motion.button>
          <LanguageSelector />
        </div>
      </motion.div>
    </motion.nav>
  );
}