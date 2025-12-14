import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import faq from "../assets/faq_section_bg.webp";
import Box from "./Box";

const questions = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    q: `Question ${i + 1}: Is Meraki hosting any technical workshop?`,
    a: "This is the detailed answer for the technical workshop. Replace with real content. It will open/close inside the box without disturbing other columns."
}));

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(null);
    const [cols, setCols] = useState(() => {
        if (typeof window === "undefined") return 1;
        const w = window.innerWidth;
        if (w >= 1024) return 3;
        if (w >= 640) return 2;
        return 1;
    });

    useEffect(() => {
        function onResize() {
            const w = window.innerWidth;
            if (w >= 1024) setCols(3);
            else if (w >= 640) setCols(2);
            else setCols(1);
        }
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // Distribute questions into columns for masonry layout
    const columns = useMemo(() => {
        const arr = Array.from({ length: cols }, () => []);
        questions.forEach((item, idx) => {
            arr[idx % cols].push({ ...item, index: idx });
        });
        return arr;
    }, [cols]);

    return (
        <div
            id="faq"
            className="w-full min-h-screen pt-24 pb-12"
            style={{
                backgroundImage: `url(${faq})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>

            {/* Section Title */}
            <motion.div
                className="flex items-center gap-4 ml-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span className="text-cyan-400 text-2xl md:text-3xl">▶</span>
                <h2 className="font-minecraft text-white text-2xl md:text-4xl tracking-widest uppercase">
                    FAQs
                </h2>
            </motion.div>

            {/* FAQ Grid */}
            <div className="flex items-start justify-center py-12">
                <div className="w-full max-w-6xl px-6">
                    <div className="flex gap-6">
                        {columns.map((colItems, colIdx) => (
                            <div key={colIdx} className="flex-1 flex flex-col gap-6">
                                {colItems.map((item) => (
                                    <Box
                                        key={item.index}
                                        question={item.q}
                                        answer={item.a}
                                        isOpen={openIndex === item.index}
                                        onToggle={() =>
                                            setOpenIndex((prev) => (prev === item.index ? null : item.index))
                                        }
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}