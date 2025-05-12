import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { HiTerminal } from "react-icons/hi";
import { useDeveloperMode } from "../context/DeveloperModeContext";

export default function Hero() {
  const { t } = useTranslation();
  const { isDeveloperMode } = useDeveloperMode();

  const heroContent = isDeveloperMode ? (
    <div className="text-left">
      <pre className="text-sm font-mono bg-purple-500/10 p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm overflow-x-auto">
        <code className="text-purple-300 whitespace-pre-wrap break-words">
{`hero: {
  title: '${t('hero.title')}',
  subtitle: '${t('hero.subtitle')}',
  description: '${t('hero.description')}'
};`}
        </code>
      </pre>
    </div>
  ) : (
    <div className="text-left">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
        className="inline-block p-3 rounded-full bg-blue-500/10 mb-8"
      >
        <HiTerminal size={40} className="text-blue-400" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6"
      >
        <span className="block mb-2">{t('hero.subtitle')}</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          {t('hero.title')}
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg sm:text-xl text-gray-300 mb-12 max-w-2xl"
      >
        {t('hero.description')}
      </motion.p>
    </div>
  );

  return (
    <section id="hero" className="min-h-screen relative flex items-center justify-center px-4 sm:px-6">
      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            {heroContent}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="hidden md:block"
          >
            <div className="relative pointer-events-none">
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-blue-500/10 rounded-full animate-pulse" />
              <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-purple-500/10 rounded-full animate-pulse delay-500" />
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-xl">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap break-words">
                  <code>{`const Developer = {
  name: 'Alexandre Lefebvre',
  About me: "Développeur Web Français expatrié en croatie.",
  skills: [
    'React',
    'Node.js',
    'TypeScript',
    'Tailwind'
  ],
  passion: "${t('hero.description').replace('réalité', '**réalité**')}",
  coffee: true
};`}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}