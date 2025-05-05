import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { NavbarProvider } from "./context/NavbarContext";
import { DeveloperModeProvider } from "./context/DeveloperModeContext";
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';

function App() {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-visitor`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to track visitor');
        }
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    trackVisitor();
  }, []);

  return (
    <DeveloperModeProvider>
      <NavbarProvider>
        <div className="bg-gradient-to-br from-gray-900 via-[#0f172a] to-black min-h-screen relative">
          {/* Effets visuels */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-[800px] h-[800px] bg-purple-500/20 rounded-full filter blur-[120px] animate-pulse -top-[400px] -left-[400px]" />
            <div className="absolute w-[600px] h-[600px] bg-blue-500/20 rounded-full filter blur-[100px] animate-pulse delay-1000 top-[20%] -right-[300px]" />
            <div className="absolute w-[300px] h-[300px] bg-cyan-500/20 rounded-full filter blur-[80px] animate-pulse delay-2000 bottom-[30%] left-[20%]" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-[0.15]" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-30" />
          </div>

          <div className="relative z-10">
            <Navbar />
            <Hero />
            <Projects />
            <About />
            <Contact />

            {/* Section Projets Supabase */}
            <section className="px-4 py-8">
              <h2 className="text-2xl font-bold text-white text-center mb-4">Mes projets (connectés à Supabase)</h2>
              <ProjectForm />
              <ProjectList />
            </section>

            <Footer />
          </div>
        </div>
      </NavbarProvider>
    </DeveloperModeProvider>
  );
}

export default App;
