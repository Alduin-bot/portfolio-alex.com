import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaReact, FaNodeJs, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiFramer, SiNextdotjs, SiPrisma, SiSupabase, SiStripe, SiFirebase, SiDocker } from "react-icons/si";
import CardProjet from "./CardProjet";
import { useNavbar } from "../context/NavbarContext";
import { useTranslation } from "react-i18next";
import { useDeveloperMode } from "../context/DeveloperModeContext";

interface Project {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  image: string;
  objective: string;
  duration: string;
  technologies: string[];
}

interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
}

const getTechIcon = (tech: string) => {
  switch (tech) {
    case "React": return <FaReact className="text-blue-500" />;
    case "Next.js": return <SiNextdotjs className="text-white" />;
    case "Node.js": return <FaNodeJs className="text-green-500" />;
    case "TailwindCSS": return <SiTailwindcss className="text-cyan-500" />;
    case "TypeScript": return <SiTypescript className="text-blue-600" />;
    case "Framer Motion": return <SiFramer className="text-purple-500" />;
    case "Prisma": return <SiPrisma className="text-teal-500" />;
    case "Supabase": return <SiSupabase className="text-green-500" />;
    case "Stripe": return <SiStripe className="text-purple-500" />;
    case "Firebase": return <SiFirebase className="text-yellow-500" />;
    case "Docker": return <SiDocker className="text-blue-500" />;
    default: return null;
  }
};

// ✅ transition compatible TypeScript stricte
const transition = { type: "tween" as const, duration: 0.4, ease: "easeInOut" as const };

// ✅ slideVariants compatible TypeScript
const slideVariants: Variants = {
  enterLeft: { x: 300, opacity: 0, transition },
  enterRight: { x: -300, opacity: 0, transition },
  center: { x: 0, opacity: 1, transition },
  exitLeft: { x: -300, opacity: 0, transition },
  exitRight: { x: 300, opacity: 0, transition },
};

export default function Projects() {
  const { t } = useTranslation();
  const { isDeveloperMode } = useDeveloperMode();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { setNavbarVisible } = useNavbar();
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  const projects: Project[] = [
    // Site Vitrine
    {
      id: "site-vitrine-1",
      categoryId: "site-vitrine",
      title: t('projects.showcase.project1.title'),
      description: t('projects.showcase.project1.description'),
      image: "/startup.png",
      objective: t('projects.showcase.project1.objective'),
      duration: t('projects.showcase.project1.duration'),
      technologies: ["React", "TailwindCSS", "TypeScript", "Framer Motion"]
    },
    {
      id: "site-vitrine-2",
      categoryId: "site-vitrine",
      title: t('projects.showcase.project2.title'),
      description: t('projects.showcase.project2.description'),
      image: "/photo.png",
      objective: t('projects.showcase.project2.objective'),
      duration: t('projects.showcase.project2.duration'),
      technologies: ["Next.js", "TailwindCSS", "TypeScript", "Framer Motion"]
    },
    {
      id: "site-vitrine-3",
      categoryId: "site-vitrine",
      title: t('projects.showcase.project3.title'),
      description: t('projects.showcase.project3.description'),
      image: "/estate.png",
      objective: t('projects.showcase.project3.objective'),
      duration: t('projects.showcase.project3.duration'),
      technologies: ["React", "TailwindCSS", "TypeScript", "Framer Motion"]
    },
    // E-commerce
    {
      id: "e-commerce-1",
      categoryId: "e-commerce",
      title: t('projects.ecommerce.project1.title'),
      description: t('projects.ecommerce.project1.description'),
      image: "/Boutique.png",
      objective: t('projects.ecommerce.project1.objective'),
      duration: t('projects.ecommerce.project1.duration'),
      technologies: ["Next.js", "Node.js", "TypeScript", "Stripe"]
    },
    {
      id: "e-commerce-2",
      categoryId: "e-commerce",
      title: t('projects.ecommerce.project2.title'),
      description: t('projects.ecommerce.project2.description'),
      image: "/open.png",
      objective: t('projects.ecommerce.project2.objective'),
      duration: t('projects.ecommerce.project2.duration'),
      technologies: ["Next.js", "Prisma", "TypeScript", "Stripe"]
    },
    {
      id: "e-commerce-3",
      categoryId: "e-commerce",
      title: t('projects.ecommerce.project3.title'),
      description: t('projects.ecommerce.project3.description'),
      image: "/epi.png",
      objective: t('projects.ecommerce.project3.objective'),
      duration: t('projects.ecommerce.project3.duration'),
      technologies: ["Next.js", "Supabase", "TypeScript", "Stripe"]
    },
    // Logiciel Métier
    {
      id: "logiciel-metier-1",
      categoryId: "logiciel-metier",
      title: t('projects.business.project1.title'),
      description: t('projects.business.project1.description'),
      image: "/CRM.png",
      objective: t('projects.business.project1.objective'),
      duration: t('projects.business.project1.duration'),
      technologies: ["React", "Node.js", "TypeScript", "Docker"]
    },
    {
      id: "logiciel-metier-2",
      categoryId: "logiciel-metier",
      title: t('projects.business.project2.title'),
      description: t('projects.business.project2.description'),
      image: "/stock.png",
      objective: t('projects.business.project2.objective'),
      duration: t('projects.business.project2.duration'),
      technologies: ["Next.js", "Prisma", "TypeScript", "Docker"]
    },
    {
      id: "logiciel-metier-3",
      categoryId: "logiciel-metier",
      title: t('projects.business.project3.title'),
      description: t('projects.business.project3.description'),
      image: "/dash.png",
      objective: t('projects.business.project3.objective'),
      duration: t('projects.business.project3.duration'),
      technologies: ["React", "Firebase", "TypeScript", "Docker"]
    }
  ];

  const categories: Category[] = [
    {
      id: "site-vitrine",
      title: t('projects.categories.showcase'),
      description: t('projects.description'),
      image: "/startup.png"
    },
    {
      id: "e-commerce",
      title: t('projects.categories.ecommerce'),
      description: t('projects.description'),
      image: "/Boutique.png"
    },
    {
      id: "logiciel-metier",
      title: t('projects.categories.business'),
      description: t('projects.description'),
      image: "/CRM.png"
    }
  ];

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "unset";
    setNavbarVisible(!selectedProject);
    return () => {
      document.body.style.overflow = "unset";
      setNavbarVisible(true);
    };
  }, [selectedProject, setNavbarVisible]);

  const handleCategoryClick = (categoryId: string) => {
    const firstProject = projects.find(p => p.categoryId === categoryId);
    if (firstProject) {
      setSelectedProject(firstProject);
      setSlideDirection(null);
    }
  };

  const handleClose = () => {
    setSelectedProject(null);
    setSlideDirection(null);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const handleNavigateProject = (direction: 'prev' | 'next') => {
    if (!selectedProject) return;
    
    const categoryProjects = projects.filter(p => p.categoryId === selectedProject.categoryId);
    const currentIndex = categoryProjects.findIndex(p => p.id === selectedProject.id);
    
    if (direction === 'prev') {
      setSlideDirection('right');
      setSelectedProject(categoryProjects[(currentIndex - 1 + categoryProjects.length) % categoryProjects.length]);
    } else {
      setSlideDirection('left');
      setSelectedProject(categoryProjects[(currentIndex + 1) % categoryProjects.length]);
    }
  };

  return (
    <section id="projects" className="container mx-auto px-6 relative z-10 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
        className={`${isDeveloperMode ? "pt-0" : "text-center mb-16"}`}
      >
        {isDeveloperMode ? (
          <div className="flex justify-center items-center mb-16">
            <pre className="text-sm font-mono bg-purple-500/10 p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm overflow-x-auto max-w-lg">
              <code className="text-purple-300 whitespace-pre-wrap break-words">
                {`projects: { title: '${t('projects.title')}', description: '${t('projects.description')}' }`}
              </code>
            </pre>
          </div>
        ) : (
          <>
            <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              {t('projects.title')}
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">{t('projects.description')}</p>
          </>
        )}
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => handleCategoryClick(category.id)}
          >
            <CardProjet
              title={category.title}
              description={category.description}
              image={category.image}
              categoryId={category.id}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {(() => {
              const categoryProjects = projects.filter(p => p.categoryId === selectedProject.categoryId);
              return categoryProjects.length > 1 && (
                <>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigateProject('prev');
                    }}
                    className="absolute left-4 md:left-[25%] top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:bg-purple-500/50 z-10"
                  >
                    <FaChevronLeft size={20} />
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigateProject('next');
                    }}
                    className="absolute right-4 md:right-[25%] top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:bg-purple-500/50 z-10"
                  >
                    <FaChevronRight size={20} />
                  </motion.button>
                </>
              );
            })()}

            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={handleClose}
              className="absolute top-4 right-4 p-3 rounded-full text-white bg-black/50 hover:bg-black/70 hover:bg-purple-500/50"
            >
              <IoClose size={24} />
            </motion.button>

            <motion.div
              key={selectedProject.id}
              initial={slideDirection === 'left' ? 'enterRight' : 'enterLeft'}
              animate="center"
              exit={slideDirection === 'left' ? 'exitLeft' : 'exitRight'}
              variants={slideVariants}
              className="max-w-lg w-full max-h-[80vh] overflow-y-auto relative bg-gray-800/90 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-40 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                {selectedProject.title}
              </h3>
              
              {(() => {
                const categoryProjects = projects.filter(p => p.categoryId === selectedProject.categoryId);
                const currentIndex = categoryProjects.findIndex(p => p.id === selectedProject.id);
                return categoryProjects.length > 1 && (
                  <div className="flex justify-center mb-4">
                    <div className="flex gap-2">
                      {categoryProjects.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentIndex ? 'bg-purple-400' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })()}
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-semibold mb-1 text-white">{t('projects.details.objective')}</h4>
                  <p className="text-sm text-gray-300">{selectedProject.objective}</p>
                </div>
                <div>
                  <h4 className="text-base font-semibold mb-1 text-white">{t('projects.details.duration')}</h4>
                  <p className="text-sm text-gray-300">{selectedProject.duration}</p>
                </div>
                <div>
                  <h4 className="text-base font-semibold mb-2 text-white">{t('projects.details.technologies')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-1.5 bg-gray-700/50 px-3 py-1.5 rounded-full border border-gray-600/50"
                      >
                        {getTechIcon(tech)}
                        <span className="text-sm text-gray-200">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
