import { motion } from "framer-motion";
import { useDeveloperMode } from "../context/DeveloperModeContext";
import { useTranslation } from "react-i18next";

interface CardProjetProps {
  title: string;
  description: string;
  image?: string;
  categoryId: string;
}

export default function CardProjet({ title, description, image, categoryId }: CardProjetProps) {
  const { isDeveloperMode } = useDeveloperMode();
  const { t } = useTranslation();

  if (isDeveloperMode) {
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.2 }}
        className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20 shadow-xl hover:shadow-purple-500/10 hover:border-purple-500/30 transition-all duration-300 relative h-[200px] flex flex-col"
      >
        <div className="p-4 flex-1">
          <pre className="text-sm font-mono text-purple-300 whitespace-pre-wrap break-words">
            <code>{`{
  id: '${categoryId}',
  title: '${t(`projects.categories.${categoryId}`)}',
  description: '${t('projects.description')}'
}`}</code>
          </pre>
        </div>
        <div className="absolute bottom-2 right-4">
          <span className="text-sm font-mono text-purple-300/70">Click me!</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 shadow-xl hover:shadow-purple-500/10 hover:border-purple-500/20 transition-all duration-300 relative h-[200px] flex flex-col"
    >
      {image && (
        <div className="relative h-28 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
        </div>
      )}

      <div className="p-4 flex-1">
        <h3 className="text-lg font-semibold text-white mb-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          {title}
        </h3>
        <p className="text-gray-300 text-sm line-clamp-2">{description}</p>
      </div>
    </motion.div>
  );
}