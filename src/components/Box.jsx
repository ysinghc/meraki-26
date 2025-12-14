import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Box({ question, answer, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [maxH, setMaxH] = useState("0px");

  useEffect(() => {
    if (!contentRef.current) return;
    if (isOpen) {
      const sh = contentRef.current.scrollHeight;
      setMaxH(`${sh}px`);
    } else {
      setMaxH("0px");
    }
  }, [isOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        scale: isOpen ? 1.05 : 1.02,
        boxShadow: "0 0 20px rgba(6,182,212,0.4)"
      }}
      className={`w-full font-minecraft bg-[#474747] border border-[#888] shadow-black-lg p-4 relative
      border-l-black border-l-[2px]
      border-b-black border-b-[2px]
        transition-all duration-300 ease-in-out transform ${isOpen ? "scale-105 z-20 shadow-[0_0_15px_rgba(6,182,212,0.3)]" : "scale-100"}
        self-start cursor-pointer`}
      onClick={onToggle}
    >
      <div>
        <p className="font-minecraft text-[11px] md:text-[12px] text-white leading-[20px] tracking-[0.5px]">{question}</p>
      </div>

      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.2, rotate: isOpen ? 45 : 0 }}
        whileTap={{ scale: 0.9 }}
        className={`absolute right-3 bottom-3 text-cyan-400 font-bold text-xl transition-all duration-300
          ${isOpen ? "rotate-45" : "rotate-0"}`}
      >
        +
      </motion.button>

      <motion.div
        ref={contentRef}
        initial={false}
        animate={{
          maxHeight: maxH,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="mt-4 overflow-hidden"
      >
        <p className="font-minecraft text-[11px] md:text-[12px] text-gray-300 leading-[16px] tracking-[0.5px]">{answer}</p>
      </motion.div>
    </motion.div>
  );
}

