import React from 'react';
import { motion } from 'framer-motion';
import aboutImage from '../assets/about_image3.webp';
import aboutImage1 from '../assets/about_image1.webp';
import aboutImage2 from '../assets/about_image2.webp';
import { ABOUT_IIIT_UNA, ABOUT_MERAKI } from '../constants/AboutData';

const About = () => {
    return (
        <section className="relative w-full overflow-x-hidden bg-black">
            {}
            <div
                className="absolute inset-0 z-0 w-full h-full bg-center"
                style={{
                    backgroundImage: `url(${aboutImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <style>{`
                    @media (min-width: 1024px) {
                        div[style*="about_image3"] {
                            background-size: 110% !important;
                        }
                    }
                `}</style>
            </div>

            {}
            <div className="relative mt-4 z-10 pt-28 md:pt-20 pb-16 px-4 md:px-8 lg:px-12 flex items-center">

                {}
                <div className="flex flex-col lg:flex-row gap-16 md:gap-20 lg:gap-8 max-w-7xl mx-auto w-full" style={{ height: 'auto', minHeight: 'calc((100vh - 8rem) * 0.8)' }}>
                    <style>{`
                        @media (min-width: 1024px) {
                            .about-container {
                                height: calc((100vh - 8rem) * 0.8) !important;
                            }
                        }
                    `}</style>

                    {}
                    <motion.div
                        className="about-container flex-1 bg-black/80 backdrop-blur-sm border-4 border-gray-600 shadow-2xl p-6 md:p-8 relative h-auto flex flex-col justify-start"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        style={{
                            boxShadow: '0 0 0 2px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6)',
                            paddingTop: '40px'
                        }}
                    >
                        {}
                        <div className="absolute -top-11 -left-4 md:-top-22 md:-left-6 w-24 h-32 md:w-32 md:h-40 z-10">
                            <img
                                src={aboutImage1}
                                alt="Minecraft Steve"
                                className="w-full h-full object-contain"
                                style={{
                                    imageRendering: 'pixelated',
                                    filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.8))'
                                }}
                            />
                        </div>

                        <h2 className="font-terminal text-white tracking-wider uppercase text-center text-lg md:text-2xl lg:text-3xl" style={{ marginBottom: 0 }}>
                            ABOUT
                        </h2>
                        <h3 className="font-minecraft text-center leading-tight mb-4 md:mb-6"
                            style={{
                                fontSize: 'clamp(1.5rem, 5vw, calc(3rem * 1.1))',
                                background: 'linear-gradient(180deg, #e0e0e0 0%, #808080 50%, #606060 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                textShadow: 'none',
                                filter: 'drop-shadow(3px 3px 0px rgba(0,0,0,0.8)) drop-shadow(1px 1px 0px rgba(150,150,150,0.5))',
                                letterSpacing: '0.05em',
                                wordSpacing: '-20px',
                                transform: 'perspective(500px) rotateX(40deg)',
                                transformStyle: 'preserve-3d'
                            }}>
                            IIIT UNA
                        </h3>
                        <div className="space-y-3">
                            <p className="text-white font-terminal leading-relaxed" style={{ fontSize: 'calc(1rem * 1.1)' }}>
                                {ABOUT_IIIT_UNA}
                            </p>
                        </div>
                    </motion.div>

                    {}
                    <motion.div
                        className="about-container flex-1 bg-black/80 backdrop-blur-sm border-4 border-gray-600 shadow-2xl p-6 md:p-8 relative h-auto flex flex-col justify-start"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        style={{
                            boxShadow: '0 0 0 2px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6)',
                            paddingTop: '40px'
                        }}
                    >
                        {}
                        <div className="absolute -top-12 -right-4 md:-top-16 md:-right-6 w-24 h-32 md:w-32 md:h-40 z-10">
                            <img
                                src={aboutImage2}
                                alt="Minecraft Creeper"
                                className="w-full h-full object-contain"
                                style={{
                                    imageRendering: 'pixelated',
                                    filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.8))'
                                }}
                            />
                        </div>

                        <h2 className="font-terminal text-white tracking-wider uppercase text-center text-lg md:text-2xl lg:text-3xl" style={{ marginBottom: 0 }}>
                            ABOUT
                        </h2>
                        <h3 className="font-minecraft text-center leading-tight mb-4 md:mb-6"
                            style={{
                                fontSize: 'clamp(1.5rem, 5vw, calc(3rem * 1.1))',
                                background: 'linear-gradient(180deg, #e0e0e0 0%, #808080 50%, #606060 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                textShadow: 'none',
                                filter: 'drop-shadow(3px 3px 0px rgba(0,0,0,0.8)) drop-shadow(1px 1px 0px rgba(150,150,150,0.5))',
                                letterSpacing: '0.05em',
                                transform: 'perspective(500px) rotateX(40deg)',
                                transformStyle: 'preserve-3d'
                            }}>
                            MERAKI
                        </h3>
                        <div className="space-y-3">
                            <p className="text-white font-terminal leading-relaxed" style={{ fontSize: 'calc(1rem * 1.1)' }}>
                                {ABOUT_MERAKI}
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
