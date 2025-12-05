import React from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  width?: "fit-content" | "100%";
}

export const TextReveal: React.FC<TextRevealProps> = ({ children, delay = 0, className = "", width = "fit-content" }) => {
  return (
    <div style={{ width, overflow: 'hidden' }} className={className}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: delay }}
        viewport={{ once: true, margin: "-10%" }}
      >
        {children}
      </motion.div>
    </div>
  );
};