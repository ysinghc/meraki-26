import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import bgImage from '../assets/sponsor_section_bg.webp';
import charArt from '../assets/sponsors_character_art.webp';

const sponsorImages = [
    {
        x: 154,
        y: 56,
        url: `https://picsum.photos/seed/hi/200`,
        size: "200px",
        name: "Director",
        leftAnchored: true,
    }, {
        x: 563,
        y: 174,
        url: `https://picsum.photos/seed/hii/200`,
        size: "200px",
        name: "Director",
        leftAnchored: true,
    }, {
        x: 90,
        y: 401,
        url: `https://picsum.photos/seed/hiii/200`,
        size: "200px",
        name: "Director",
        leftAnchored: true,
    }, {
        x: 539,
        y: 500,
        url: `https://picsum.photos/seed/hiiii/200`,
        size: "200px",
        name: "Director",
        leftAnchored: false,
    }, {
        x: 120,
        y: 401,
        url: `https://picsum.photos/seed/hiiiii/200`,
        size: "200px",
        name: "Director",
        leftAnchored: false,
    },
]

// Base dimensions for responsive positioning
const BaseWidth = 1311;
const BaseHeight = 750;

export default function Sponsors() {
    const [smallDevice, setSmallDevice] = useState(false);

    useEffect(() => {
        function onResize() {
            const w = window.innerWidth;
            setSmallDevice(w < 768);
        }
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <div
            id="sponsors"
            className="w-full min-h-screen flex flex-col pt-24 pb-12"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>

            <div className="flex items-center gap-3 ml-10 relative">
                {/* Section Title */}
                <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-cyan-400 text-2xl md:text-3xl">▶</span>
                    <h2 className="font-minecraft text-white text-2xl md:text-4xl tracking-widest uppercase">
                        SPONSORS
                    </h2>
                </motion.div>

                {/* Decorative Character */}
                <motion.div
                    className="absolute hidden -top-25 right-10 sm:block sm:w-30 sm:h-40 md:w-60 md:h-80 z-10"
                    initial={{ opacity: 0, y: -20, rotate: -5 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <img
                        src={charArt}
                        alt="Minecraft Creeper"
                        className="w-full h-full object-contain"
                        style={{ filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.5))' }}
                    />
                </motion.div>
            </div>

            {/* Sponsor Logos Grid */}
            <div className="grid pt-[70px] place-items-center gap-10 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] md:flex md:flex-1 overflow-hidden md:relative">
                {sponsorImages.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        whileHover={{
                            scale: 1.1,
                            boxShadow: "0 0 25px rgba(6,182,212,0.6)",
                            transition: { duration: 0.2 }
                        }}
                        style={{
                            width: item.size,
                            borderRadius: "50%",
                            overflow: "hidden",
                            backgroundColor: "#FFF",
                            top: `${(item.y / BaseHeight) * 100}%`,
                            position: smallDevice ? "static" : "absolute",
                            cursor: "pointer",
                            ...(item.leftAnchored
                                ? { left: `${(item.x / BaseWidth) * 100}%` }
                                : { right: `${(item.x / BaseWidth) * 100}%` })
                        }}>
                        <img src={item.url}
                            alt={item.name}
                            style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%"
                            }} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
