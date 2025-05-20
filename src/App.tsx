import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { NavbarProvider } from "./context/NavbarContext";
import { DeveloperModeProvider } from "./context/DeveloperModeContext";

export default function App() {
  return (
    <DeveloperModeProvider>
      <NavbarProvider>
        <div className="bg-gradient-to-br from-gray-900 via-[#0f172a] to-black min-h-screen relative">
          <div className="absolute inset-0 overflow-hidden">
            {/* Gradient Orbs */}
            <div className="absolute w-[800px] h-[800px] bg-purple-500/20 rounded-full filter blur-[120px] animate-pulse -top-[400px] -left-[400px]" />
            <div className="absolute w-[600px] h-[600px] bg-blue-500/20 rounded-full filter blur-[100px] animate-pulse delay-1000 top-[20%] -right-[300px]" />
            <div className="absolute w-[300px] h-[300px] bg-cyan-500/20 rounded-full filter blur-[80px] animate-pulse delay-2000 bottom-[30%] left-[20%]" />
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjkyNTI0IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-[0.15]" />
            
            {/* Noise Texture */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] opacity-30" />
          </div>
          <div className="relative z-10">
            <Navbar />
            <Hero />
            <Projects />
            <About />
            <Contact />
            <Footer />
          </div>
        </div>
      </NavbarProvider>
    </DeveloperModeProvider>
  );
}