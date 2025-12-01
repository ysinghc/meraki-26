import React, { useEffect, useMemo, useState } from "react";
import faq from "../assets/faq.png";
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
            className="min-h-screen w-full "
            style={{ backgroundImage: `url(${faq})` }}>

            <div className="flex items-center gap-3 ml-10">
               
                <div className="w-0 h-0 border-t-[10px] border-b-[10px] border-l-[14px] border-t-transparent border-b-transparent border-l-[#1ec0d0]"></div>

               
                <h2 className="font-minecraft text-white text-3xl tracking-[2px]">
                    FAQs
                </h2>
            </div>

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
