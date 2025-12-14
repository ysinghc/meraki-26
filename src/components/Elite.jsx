import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import chatgptbg from "../assets/ChatGPT Image Nov 29, 2025, 12_38_45 AM.webp";
import { events } from "../constants";

function Elite() {
  const [activeTab, setActiveTab] = useState(events[0].id);
  const navigate = useNavigate();

  const activeEvent = events.find((event) => event.id === activeTab);

  return (<>
    <div id="events" className="relative w-full min-h-screen text-white m-t-[5px] pt-0 px-8 pb-8 overflow-hidden flex flex-col">

      {}
      <div className="absolute inset-0 z-0">
        <img src={chatgptbg} alt="Background" className="w-full h-full object-cover" />
      </div>

      {}
      <motion.div
        className="relative z-10 y-0 w-full max-w-6xl mb-8 flex justify-start pt-12 pl-8 mt-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 blur-md opacity-50"></div>
          <div className="relative bg-black/80 border-4 border-purple-400 px-6 py-3"
            style={{
              boxShadow: '0 0 20px rgba(168,85,247,0.5), inset 0 0 10px rgba(168,85,247,0.2)',
              borderImage: 'linear-gradient(135deg, #a855f7, #ec4899, #ef4444) 1'
            }}
          >
            <h2
              className="font-minecraft text-2xl md:text-4xl tracking-[3px] relative"
              style={{
                background: 'linear-gradient(180deg, #fae8ff 0%, #d946ef 50%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 15px rgba(168,85,247,0.8)) drop-shadow(2px 2px 0px rgba(0,0,0,0.8))',
              }}
            >
              ELITE EVENTS
            </h2>
          </div>
        </div>
      </motion.div>

      {}
      <div className="flex-1 flex justify-center items-center w-full">
        <div className="relative z-10 flex flex-col-reverse md:flex-row w-full max-w-6xl gap-0 md:gap-0 overflow-visible">

          {}
          <div className="w-full md:w-1/3 flex flex-col overflow-visible z-10">
            {events.map((event, index) => (
              <motion.button
                key={event.id}
                onClick={() => setActiveTab(event.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`
    group flex items-center gap-4 p-4 md:pr-6 text-left transition-all duration-300 
    ${activeTab === event.id
                    ? `bg-[rgba(71,71,71,1)] md:pr-12 md:mr-[-16px] md:translate-x-[-6px)] shadow-[0_0_15px_rgba(6,182,212,0.3)]
           ${event.id === 1
                      ? "border-l-[5px] border-t-[5px] border-[rgba(48,48,48,1)]"
                      : event.id === 4
                        ? "border-l-[5px] border-b-[5px] border-[rgba(48,48,48,1)] "
                        : "border-l-[5px] border-[rgba(48,48,48,1)]"
                    }`
                    : "bg-[rgba(48,48,48,1)] hover:bg-[rgba(60,60,60,1)]"
                  }
  `}
              >

                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded flex items-center justify-center shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-110">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-80" />
                </div>
                <span className={`font-minecraft text-sm md:text-base transition-colors duration-300 ${activeTab === event.id ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                  {event.title}
                </span>
              </motion.button>
            ))}
          </div>

          {}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-20 md:translate-x-[-4px] w-full bg-[rgba(71,71,71,1)] md:w-2/3 backdrop-blur-sm
p-6 md:p-8 border-b-[8px] border-t-[5px] border-r-[5px] border-[rgba(48,48,48,1)]
flex flex-col gap-6 items-center
h-auto md:h-[650px] lg:h-[750px] xl:h-[620px]"
          >

            {}
            <div className="w-full h-full relative group rounded-lg aspect-video overflow-hidden">
              <motion.img
                src={activeEvent.image}
                alt={activeEvent.title}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {}
            <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between h-full">
              <div className="lg:w-2/3">
                <p className="font-minecraft text-gray-300 text-xsm leading-relaxed mb-6 lg:mb-0">
                  {activeEvent.description}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(215,153,40,0.6)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/event/${activeEvent.slug}`)}
                className="self-start md:absolute md:bottom-8 md:right-8 lg:static lg:self-center px-6 py-3 bg-gradient-to-r from-[#D79928] to-[#C57135] border-2 border-white text-black font-minecraft text-sm hover:from-[#E5A935] hover:to-[#D17E42] transition-all shadow-lg shadow-orange-500/20 rounded-sm cursor-pointer"
              >
                VIEW DETAILS →
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div></>
  );
}

export default Elite;