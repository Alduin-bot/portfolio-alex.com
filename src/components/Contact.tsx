import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaSignal, FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useDeveloperMode } from "../context/DeveloperModeContext";

export default function Contact() {
  const { t } = useTranslation();
  const { isDeveloperMode } = useDeveloperMode();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus(t('contact.form.success'));
        setFormData({ name: "", email: "", company: "", phone: "", subject: "", message: "" });
      } else {
        setStatus(`${t('contact.form.error')} ${data.error}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus(t('contact.form.serverError'));
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    { icon: <FaEnvelope />, text: "aalexandre.lefebvre@gmail.com" },
    { icon: <FaMapMarkerAlt />, text: "Split, Croatie" },
    { icon: <FaSignal />, text: "NOMDUSITE.WWW" },
    { icon: <FaWhatsapp />, text: "+385 91 608 5569" },
  ];

  const headerContent = isDeveloperMode ? (
    <div className="flex justify-center items-center mb-16">
      <pre className="text-sm font-mono bg-purple-500/10 p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm overflow-x-auto max-w-lg">
        <code className="text-purple-300 whitespace-pre-wrap break-words">
{`contact: {
  title: '${t('contact.title')}',
  description: '${t('contact.description')}'
};`}
        </code>
      </pre>
    </div>
  ) : (
    <>
      <h2 className="text-4xl font-bold text-white mb-4">{t('contact.title')}</h2>
      <p className="text-gray-400">{t('contact.description')}</p>
    </>
  );

  const contactInfoContent = isDeveloperMode ? (
    <div className="space-y-6">
      <pre className="text-sm font-mono bg-purple-500/10 p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm overflow-x-auto">
        <code className="text-purple-300 whitespace-pre-wrap break-words">
{`contactInfo: {
  title: '${t('contact.info.title')}',
  items: [
    {
      type: 'email',
      value: 'aalexandre.lefebvre@gmail.com'
    },
    {
      type: 'location',
      value: 'Split, Croatie'
    },
    {
      type: 'website',
      value: 'NOMDUSITE.WWW'
    },
    {
      type: 'phone',
      value: '+385 91 608 5569'
    }
  ]
};`}
        </code>
      </pre>
    </div>
  ) : (
    <div className="space-y-6">
      {contactInfo.map((info, index) => (
        <div key={index} className="flex items-center gap-4 text-gray-300">
          <span className="text-purple-400">{info.icon}</span>
          <span>{info.text}</span>
        </div>
      ))}
    </div>
  );

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className={isDeveloperMode ? "bg-purple-500/10 rounded-xl border border-purple-500/20 backdrop-blur-sm" : ""}>
          <input
            type="text"
            name="name"
            placeholder={t('contact.form.name')}
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg ${
              isDeveloperMode 
                ? "bg-transparent text-white placeholder-gray-400 focus:outline-none" 
                : "bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            } transition-colors`}
            required
            disabled={isLoading}
          />
        </div>
        <div className={isDeveloperMode ? "bg-purple-500/10 rounded-xl border border-purple-500/20 backdrop-blur-sm" : ""}>
          <input
            type="email"
            name="email"
            placeholder={t('contact.form.email')}
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg ${
              isDeveloperMode 
                ? "bg-transparent text-white placeholder-gray-400 focus:outline-none" 
                : "bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            } transition-colors`}
            required
            disabled={isLoading}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className={isDeveloperMode ? "bg-purple-500/10 rounded-xl border border-purple-500/20 backdrop-blur-sm" : ""}>
          <input
            type="text"
            name="company"
            placeholder={t('contact.form.company')}
            value={formData.company}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg ${
              isDeveloperMode 
                ? "bg-transparent text-white placeholder-gray-400 focus:outline-none" 
                : "bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            } transition-colors`}
            disabled={isLoading}
          />
        </div>
        <div className={isDeveloperMode ? "bg-purple-500/10 rounded-xl border border-purple-500/20 backdrop-blur-sm" : ""}>
          <input
            type="tel"
            name="phone"
            placeholder={t('contact.form.phone')}
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg ${
              isDeveloperMode 
                ? "bg-transparent text-white placeholder-gray-400 focus:outline-none" 
                : "bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            } transition-colors`}
            disabled={isLoading}
          />
        </div>
      </div>
      <div className={isDeveloperMode ? "bg-purple-500/10 rounded-xl border border-purple-500/20 backdrop-blur-sm" : ""}>
        <input
          type="text"
          name="subject"
          placeholder={t('contact.form.subject')}
          value={formData.subject}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg ${
            isDeveloperMode 
              ? "bg-transparent text-white placeholder-gray-400 focus:outline-none" 
              : "bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          } transition-colors`}
          required
          disabled={isLoading}
        />
      </div>
      <div className={isDeveloperMode ? "bg-purple-500/10 rounded-xl border border-purple-500/20 backdrop-blur-sm" : ""}>
        <textarea
          name="message"
          placeholder={t('contact.form.message')}
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`w-full px-4 py-3 rounded-lg ${
            isDeveloperMode 
              ? "bg-transparent text-white placeholder-gray-400 focus:outline-none" 
              : "bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          } transition-colors resize-none`}
          required
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 ${
          isLoading ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? t('contact.form.sending') : t('contact.form.send')}
      </button>
      {status && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center mt-4 ${
            status === t('contact.form.success') ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {status}
        </motion.p>
      )}
    </form>
  );

  return (
    <section id="contact" className="py-20 bg-gray-900">
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

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <div className={`${isDeveloperMode ? "" : "bg-gray-800 p-8 rounded-2xl"}`}>
              {!isDeveloperMode && (
                <h3 className="text-2xl font-semibold text-white mb-6">{t('contact.info.title')}</h3>
              )}
              {contactInfoContent}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {formContent}
          </motion.div>
        </div>
      </div>
    </section>
  );
}