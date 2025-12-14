import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import bgImage from '../assets/about_image3.webp';
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

export default function Sponsors() {
    
    const BaseWidth = 1311;
    const BaseHeight = 750;

    const [smallDevice, setSmallDevice] = useState(false);
    useEffect(() => {
        function onResize() {
            const w = window.innerWidth;
            if (w < 768) setSmallDevice(true);
            else setSmallDevice(false);
        }
        onResize(); 
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <div
            id="sponsors"
            className="w-full min-h-screen flex flex-col pb-12"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>

            <div className="flex items-center gap-3 ml-10 relative mt-8 pt-12">
                <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 blur-md opacity-50"></div>
                        <div className="relative bg-black/80 border-4 border-yellow-400 px-6 py-3"
                            style={{
                                boxShadow: '0 0 20px rgba(234,179,8,0.5), inset 0 0 10px rgba(234,179,8,0.2)',
                                borderImage: 'linear-gradient(135deg, #eab308, #f97316, #ef4444) 1'
                            }}
                        >
                            <h2
                                className="font-minecraft text-4xl tracking-[3px] relative"
                                style={{
                                    background: 'linear-gradient(180deg, #fef08a 0%, #fbbf24 50%, #f59e0b 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    filter: 'drop-shadow(0 0 15px rgba(234,179,8,0.8)) drop-shadow(2px 2px 0px rgba(0,0,0,0.8))',
                                }}
                            >
                                SPONSORS
                            </h2>
                        </div>
                    </div>
                </motion.div>

                {}
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
                        style={{
                            filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.5))',
                        }}
                    />
                </motion.div>

            </div>

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

        </div >
    );
}

