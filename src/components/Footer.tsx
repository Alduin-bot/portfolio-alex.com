import { FaHeart, FaCode } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <FaCode className="text-purple-400" />
            <span className="text-white font-semibold">Portfolio</span>
          </div>

          <p className="flex items-center gap-2 text-sm">
            Créé avec le <FaHeart className="text-red-500" /> en 2022
          </p>
        </div>
      </div>
    </footer>
  );
}