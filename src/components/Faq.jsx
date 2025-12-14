import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import faq from "../assets/faq.webp";
import Box from "./Box";

const questions = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    q: `Question ${i + 1}: Is Meraki hosting any technical workshop?`,
    a:
        "This is the detailed answer for the technical workshop. Replace with real content. It will open/close inside the box without disturbing other columns."
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
            className="w-full min-h-fit pb-12"
            style={{
                backgroundImage: `url(${faq})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>

            <motion.div
                className="flex items-center gap-4 ml-10 pt-20"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                {}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 blur-md opacity-50"></div>
                    <div className="relative bg-black/80 border-4 border-cyan-400 px-6 py-3"
                        style={{
                            boxShadow: '0 0 20px rgba(6,182,212,0.5), inset 0 0 10px rgba(6,182,212,0.2)',
                            borderImage: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6) 1'
                        }}
                    >
                        <h2
                            className="font-minecraft text-4xl tracking-[3px] relative"
                            style={{
                                background: 'linear-gradient(180deg, #ffffff 0%, #06b6d4 50%, #0891b2 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                filter: 'drop-shadow(0 0 15px rgba(6,182,212,0.8)) drop-shadow(2px 2px 0px rgba(0,0,0,0.8))',
                            }}
                        >
                            FAQs
                        </h2>
                    </div>
                </div>
            </motion.div>

            <div
                className=" flex items-start justify-center py-12"
            >
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