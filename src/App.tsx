/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PawPrint, Loader2 } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Initial delay to show background first if needed, or just start staggered entrance
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    setLoading(true);
    const targetUrl = "https://funilpro.com.br/funil.php?id=laa2Gn";
    
    // As suggested by the user, updated the link. 
    // We navigate after a short delay to allow the animation to show, 
    // but we use a more direct approach to ensure compatibility.
    setTimeout(() => {
      window.open(targetUrl, '_top');
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 font-sans overflow-hidden">
      {/* Background Watermark Pattern */}
      <div className="watermark-pattern" />

      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-md rounded-[48px] m-4"
            id="loading-overlay"
          >
            <div className="custom-spinner mb-4" />
            <p className="text-brand-orange font-bold text-xl">Carregando...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="w-[420px] h-[720px] glass-theme rounded-[48px] p-10 flex flex-col items-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={showContent ? "visible" : "hidden"}
        id="landing-card"
      >
        {/* Logo Section */}
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-4">
          <div className="w-[100px] h-[100px] rounded-full border-4 border-brand-yellow shadow-[0_0_15px_rgba(245,166,35,0.4)] overflow-hidden bg-white flex items-center justify-center mb-4">
            <img 
              src="https://i.imgur.com/AG6lzFS.jpeg" 
              alt="PetCare Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-center">
            <h1 className="text-[32px] font-extrabold tracking-tight mb-1">
              <span className="text-brand-blue">Pet</span>
              <span className="text-brand-orange">Care</span>
            </h1>
            <p className="text-[#6b7280] text-sm font-medium">
              Cuidando do seu melhor amigo 🐾
            </p>
          </div>
        </motion.div>

        {/* Hero Image Section */}
        <motion.div variants={itemVariants} className="w-full h-[280px] mb-10 flex justify-center items-center">
          <div className="w-full h-full rounded-[24px] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.1)] relative group">
            <img 
              src="https://i.imgur.com/p8s2BY8.jpeg" 
              alt="Happy dog being cared for" 
              className="w-full h-full object-cover object-[35%_50%]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-[15px] left-1/2 -translate-x-1/2 text-brand-orange font-bold text-xs bg-white/85 backdrop-blur-sm px-3 py-1.5 rounded-[12px] whitespace-nowrap shadow-sm">
              Unidade Jardins • Aberto
            </div>
          </div>
        </motion.div>

        {/* CTA Button Section */}
        <motion.div variants={itemVariants} className="w-full">
          <button
            onClick={handleStart}
            id="start-button"
            className="w-full py-5 px-5 rounded-[50px] bg-gradient-to-r from-brand-orange to-brand-yellow text-white font-bold text-lg shadow-[0_10px_20px_rgba(232,101,26,0.3)] transition-all hover:brightness-110 active:scale-95 animate-pulse-cta flex items-center justify-center gap-2"
          >
            Iniciar Atendimento 🐾
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
