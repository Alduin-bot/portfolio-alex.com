import { motion } from "framer-motion";
import { FaCode, FaServer, FaMobileAlt, FaDatabase } from "react-icons/fa";
import { SiTypescript, SiReact, SiNodedotjs, SiTailwindcss, SiJavascript, SiPython, SiSupabase, SiFigma, SiCanva, SiCss3, SiHtml5 } from "react-icons/si";
import { useTranslation } from "react-i18next";
import { useDeveloperMode } from "../context/DeveloperModeContext";

export default function About() {
  const { t } = useTranslation();
  const { isDeveloperMode } = useDeveloperMode();

  const skills = [
    { icon: <SiReact className="text-blue-400" size={24} />, name: "React" },
    { icon: <SiTypescript className="text-blue-600" size={24} />, name: "TypeScript" },
    { icon: <SiNodedotjs className="text-green-500" size={24} />, name: "Node.js" },
    { icon: <SiTailwindcss className="text-cyan-400" size={24} />, name: "Tailwind CSS" },
    { icon: <SiJavascript className="text-yellow-400" size={24} />, name: "JavaScript" },
    { icon: <SiPython className="text-blue-500" size={24} />, name: "Python" },
    { icon: <SiSupabase className="text-emerald-500" size={24} />, name: "Supabase" },
    { icon: <SiFigma className="text-purple-500" size={24} />, name: "Figma" },
    { icon: <SiCanva className="text-blue-400" size={24} />, name: "Canva" },
    { icon: <SiCss3 className="text-blue-500" size={24} />, name: "CSS" },
    { icon: <SiHtml5 className="text-orange-500" size={24} />, name: "HTML" },
  ];

  const services = [
    {
      icon: <FaCode className="text-purple-400" size={24} />,
      title: t('about.services.frontend'),
      description: t('about.services.frontendDesc'),
    },
    {
      icon: <FaServer className="text-blue-400" size={24} />,
      title: t('about.services.backend'),
      description: t('about.services.backendDesc'),
    },
    {
      icon: <FaMobileAlt className="text-green-400" size={24} />,
      title: t('about.services.responsive'),
      description: t('about.services.responsiveDesc'),
    },
    {
      icon: <FaDatabase className="text-red-400" size={24} />,
      title: t('about.services.database'),
      description: t('about.services.databaseDesc'),
    },
  ];

  const headerContent = isDeveloperMode ? (
    <div className="flex justify-center items-center mb-16">
      <pre className="text-sm font-mono bg-purple-500/10 p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm overflow-x-auto max-w-lg">
        <code className="text-purple-300 whitespace-pre-wrap break-words">
{`about: {
  title: '${t('about.title')}',
  description: '${t('about.description')}'
};`}
        </code>
      </pre>
    </div>
  ) : (
    <>
      <h2 className="text-4xl font-bold mb-6">{t('about.title')}</h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        {t('about.description')}
      </p>
    </>
  );

  const skillsTitle = isDeveloperMode ? (
    <pre className="text-sm font-mono bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 backdrop-blur-sm overflow-x-auto mb-6">
      <code className="text-purple-300 whitespace-pre-wrap break-words">
{`title: '${t('about.skills.title')}'`}
      </code>
    </pre>
  ) : (
    <h3 className="text-2xl font-semibold mb-6">{t('about.skills.title')}</h3>
  );

  const servicesTitle = isDeveloperMode ? (
    <pre className="text-sm font-mono bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 backdrop-blur-sm overflow-x-auto mb-6">
      <code className="text-purple-300 whitespace-pre-wrap break-words">
{`title: '${t('about.services.title')}'`}
      </code>
    </pre>
  ) : (
    <h3 className="text-2xl font-semibold mb-6">{t('about.services.title')}</h3>
  );

  const skillsContent = isDeveloperMode ? (
    <pre className="text-sm font-mono bg-purple-500/10 p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm overflow-x-auto">
      <code className="text-purple-300 whitespace-pre-wrap break-words">
{`skills: {
  items: [
    ${skills.map(skill => `{
      name: '${skill.name}',
      icon: '${skill.icon.type.name}',
      color: 'text-${skill.icon.props.className.split(' ')[1]}'
    }`).join(',\n    ')}
  ]
};`}
      </code>
    </pre>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {skills.map((skill) => (
        <div
          key={skill.name}
          className="flex items-center gap-3 p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition-colors"
        >
          {skill.icon}
          <span className="font-medium">{skill.name}</span>
        </div>
      ))}
    </div>
  );

  const servicesContent = isDeveloperMode ? (
    <pre className="text-sm font-mono bg-purple-500/10 p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm overflow-x-auto">
      <code className="text-purple-300 whitespace-pre-wrap break-words">
{`services: {
  items: [
    {
      title: '${t('about.services.frontend')}',
      description: '${t('about.services.frontendDesc')}',
      icon: 'FaCode',
      color: 'text-purple-400'
    },
    {
      title: '${t('about.services.backend')}',
      description: '${t('about.services.backendDesc')}',
      icon: 'FaServer',
      color: 'text-blue-400'
    },
    {
      title: '${t('about.services.responsive')}',
      description: '${t('about.services.responsiveDesc')}',
      icon: 'FaMobileAlt',
      color: 'text-green-400'
    },
    {
      title: '${t('about.services.database')}',
      description: '${t('about.services.databaseDesc')}',
      icon: 'FaDatabase',
      color: 'text-red-400'
    }
  ]
};`}
      </code>
    </pre>
  ) : (
    <div className="grid grid-cols-1 gap-6">
      {services.map((service) => (
        <div
          key={service.title}
          className="flex items-start gap-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition-colors"
        >
          <div className="mt-1">{service.icon}</div>
          <div>
            <h4 className="font-medium mb-1">{service.title}</h4>
            <p className="text-sm text-gray-400">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="about" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className={`${isDeveloperMode ? "pt-0" : "text-center mb-16"}`}
        >
          {headerContent}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            {skillsTitle}
            {skillsContent}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            {servicesTitle}
            {servicesContent}
          </motion.div>
        </div>
      </div>
    </section>
  );
}