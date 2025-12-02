import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

import steveRun from "../assets/about_image2.png";
import addonImage from "../assets/spn.png";
import pageBackground from "../assets/contact.png";
import avatarPixel from "../assets/iiitu.webp";
import motionimg from "../assets/collab.png";

export default function ContactMinecraft() {
  const containerRef = useRef(null);
  const formRef = useRef(null); 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const [isSent, setIsSent] = useState(false);

 
  
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
//   -----------------------------------------

  const onSubmit = async (data) => {
    if (!data.name || !data.email || !data.subject || !data.message) return;

    setIsSent(true);
    try {
      // 1) Send via EmailJS (uses the actual <form> DOM)
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        console.warn("EmailJS: missing env vars. Skipping sendForm.");
      } else {
        await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      }

      // 2) localStorage backup (keeps your current behavior)
      const existing = JSON.parse(localStorage.getItem("contacts") || "[]");
      existing.push({ ...data, createdAt: new Date().toISOString() });
      localStorage.setItem("contacts", JSON.stringify(existing));

      // small delay for ui feedback
      await new Promise((r) => setTimeout(r, 700));
      reset();
    } catch (e) {
      console.error(e);
      alert("Failed to send — check console.");
    } finally {
      setTimeout(() => setIsSent(false), 1100);
    }
  };

  const dragConstraintsSteve = { left: -120, right: 120, top: -40, bottom: 60 };

  return (
    <section ref={containerRef} className="relative min-h-screen w-full overflow-hidden text-white">
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-30"
        style={{
          backgroundImage: `url(${pageBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          filter: "grayscale(20%) brightness(0.90) contrast(1.05)",
        }}
      />

      <div
        aria-hidden="true"
        className="fixed inset-0 -z-28 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      <motion.img
        src={steveRun}
        alt="Steve"
        className="hidden md:block pointer-events-auto absolute left-6 bottom-6 md:left-10 md:bottom-12 w-28 md:w-40 z-20"
        drag
        dragConstraints={dragConstraintsSteve}
        dragElastic={0.12}
        whileTap={{ scale: 0.95 }}
        initial={{ x: -30, opacity: 0 }}
        animate={{
          x: [0, 18, 0, -18, 0],
          y: [0, -4, 0, 4, 0],
          opacity: [0, 1, 1],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        style={{ imageRendering: "pixelated", filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.45))" }}
      />

      <div className="relative z-40 pt-28 pb-12 px-4 md:px-8 max-w-6xl mx-auto flex flex-col items-center">
        <div className="relative w-full mb-4 flex items-start justify-center">
          <div className="text-center">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-minecraft text-[#ffeb3b]"
              style={{ textShadow: "3px 3px 0 #2b2b2b" }}
            >
              MERAKI <span className="text-white">• CONTACT</span>
            </h1>
            <p className="mt-2 text-gray-200 font-minecraft text-xs md:text-sm bg-black/30 inline-block px-3 py-1 rounded">
              /msg Meraki — let&apos;s build something awesome
            </p>
          </div>

          <motion.img
            src={motionimg}
            alt="decor addon"
            className="hidden md:block pointer-events-none absolute -right-6 -top-6 w-24 md:w-32 z-30 rounded-md"
            initial={{ scale: 0.95, rotate: -3, opacity: 0 }}
            animate={{ scale: 1, rotate: [-3, 3, -2], opacity: 1 }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            style={{ imageRendering: "pixelated", boxShadow: "0 6px 18px rgba(0,0,0,0.32)" }}
          />
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-6 items-start">
          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45 }}
            className="w-full lg:flex-1 rounded"
            style={{ boxShadow: "0 12px 28px rgba(0,0,0,0.28)" }}
          >
            <div className="bg-black/80 backdrop-blur-sm border-4 border-gray-600 rounded p-2" style={{ boxShadow: "0 0 0 2px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6)" }}>
              <div className="bg-black/60 p-5 md:p-6 rounded border border-gray-700">
                <h2 className="text-[#e6e6e6] font-minecraft text-lg mb-4">Write to Admin</h2>

                {/* == NOTE: formRef is used by EmailJS == */}
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
                  {/* hidden time field so your template's {{time}} is filled */}
                  <input type="hidden" name="time" value={new Date().toLocaleString()} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-minecraft text-[#ccc] mb-1">Username (Name)</label>
                      <input
                        {...register("name", { required: "Name is required", minLength: { value: 2, message: "Too short" } })}
                        placeholder="Steve"
                        className="w-full p-2.5 bg-[rgba(0,0,0,0.6)] border-2 border-[rgba(255,255,255,0.03)] rounded text-white outline-none text-sm"
                        name="name"
                      />
                      {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-minecraft text-[#ccc] mb-1">Redstone Address (Email)</label>
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                        })}
                        placeholder="steve@minecraft.net"
                        className="w-full p-2.5 bg-[rgba(0,0,0,0.6)] border-2 border-[rgba(255,255,255,0.03)] rounded text-white outline-none text-sm"
                        name="email"
                      />
                      {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-minecraft text-[#ccc] mb-1">Quest Title (Subject)</label>
                    <input
                      {...register("subject", { required: "Subject is required", minLength: { value: 3, message: "Too short" } })}
                      placeholder="Collab Request"
                      className="w-full p-2.5 bg-[rgba(0,0,0,0.6)] border-2 border-[rgba(255,255,255,0.03)] rounded text-white outline-none text-sm"
                      name="subject"
                    />
                    {errors.subject && <p className="text-red-400 text-[11px] mt-1">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-minecraft text-[#ccc] mb-1">Chat Log (Message)</label>
                    <textarea
                      {...register("message", { required: "Message is required", minLength: { value: 8, message: "Too short" } })}
                      rows={5}
                      placeholder="Type your message here..."
                      className="w-full p-2.5 bg-[rgba(0,0,0,0.6)] border-2 border-[rgba(255,255,255,0.03)] rounded text-white outline-none text-sm"
                      name="message"
                    />
                    {errors.message && <p className="text-red-400 text-[11px] mt-1">{errors.message.message}</p>}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <p className="text-[rgba(255,255,255,0.7)] text-xs font-minecraft max-w-[60%]">*Creepers may explode if fields are left empty.</p>
                    <div className="w-40">
                      <button
                        type="submit"
                        disabled={isSubmitting || isSent}
                        className={`w-full px-3 py-2 rounded font-minecraft text-sm ${isSent ? "bg-green-600" : "bg-[rgba(120,120,120,0.7)] hover:brightness-105"} text-white`}
                      >
                        {isSent ? "Command Sent!" : "Send Packet"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

          <motion.aside initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.08 }} className="w-full lg:w-80 flex flex-col gap-4">
            <div className="bg-black/40 backdrop-blur-sm border-4 border-gray-600 p-2 rounded" style={{ boxShadow: "0 0 0 2px rgba(0,0,0,0.6), 0 8px 18px rgba(0,0,0,0.45)" }}>
              <div className="bg-black/30 p-3 rounded border border-gray-700">
                <p className="text-xs font-minecraft text-[rgba(255,255,255,0.85)] mb-1">VISIT: IIIT UNA</p>

                <div className="w-full aspect-[4/3] overflow-hidden rounded">
                  <iframe
                    title="IIIT Una Map"
                    src="https://www.google.com/maps?q=IIIT%20Una%20Saloh%20Himachal%20Pradesh&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ minHeight: 140 }}
                  />
                </div>

                <div className="mt-1 text-xs font-minecraft text-[rgba(255,255,255,0.85)]">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=IIIT+Una+Saloh+Himachal+Pradesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border-4 border-gray-600 p-2 rounded" style={{ boxShadow: "0 0 0 2px rgba(0,0,0,0.6), 0 8px 18px rgba(0,0,0,0.45)" }}>
              <div className="p-3 rounded flex flex-col items-center text-center bg-black/30">
                <h4 className="sr-only">Sponsorships</h4>

                <div className="w-full flex justify-center mb-2">
                  <img
                    src={addonImage}
                    alt="sponsor logo"
                    className="w-36 md:w-40 object-contain rounded"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>

                <div className="flex gap-3 mt-2">
                  <a
                    href="https://in.linkedin.com/school/iiituna/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center w-9 h-9 rounded bg-[rgba(10,102,194,0.95)] text-white text-xs"
                    title="LinkedIn"
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="white">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.268h-3v-4.5c0-1.068-.932-1.5-1.5-1.5s-1.75.432-1.75 1.5v4.5h-3v-9h3v1.23c.416-.79 1.53-1.23 2.5-1.23 2.018 0 4 1.482 4 4.5v4.5z"/>
                    </svg>
                  </a>

                  <a
                    href="https://www.instagram.com/iiit.una_/?hl=en"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center w-9 h-9 rounded bg-[linear-gradient(45deg,#ff0080,#ffb347)] text-white text-xs"
                    title="Instagram"
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="white">
                      <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM18.5 6.25a.75.75 0 110 1.5.75.75 0 010-1.5z"/>
                    </svg>
                  </a>

                  <a
                    href="https://twitter.com/iiit_una"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center w-9 h-9 rounded bg-[rgba(29,161,242,0.95)] text-white text-xs"
                    title="Twitter"
                    aria-label="Twitter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="white">
                      <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.48A13.944 13.944 0 011.671 3.149a4.916 4.916 0 001.523 6.574 4.897 4.897 0 01-2.228-.616c-.054 2.28 1.581 4.415 3.95 4.89a4.935 4.935 0 01-2.224.084 4.918 4.918 0 004.588 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.212c9.058 0 14.009-7.514 14.009-14.02 0-.213-.004-.425-.014-.636A10.012 10.012 0 0024 4.557z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border-4 border-gray-600 p-2 rounded" style={{ boxShadow: "0 0 0 2px rgba(0,0,0,0.6), 0 8px 18px rgba(0,0,0,0.45)" }}>
              <div className="p-4 flex flex-col items-center text-center rounded border border-gray-700 bg-black/30">
                <img src={avatarPixel} alt="Avatar" className="w-16 h-16 mb-2 object-cover rounded" style={{ imageRendering: "pixelated" }} />
                <h3 className="text-[#c9a8ff] font-minecraft text-base mb-1">Server Info</h3>

                <ul className="text-xs font-minecraft text-gray-300 space-y-2 text-left w-full">
                  <li className="flex items-center gap-2 p-1 rounded bg-[rgba(0,0,0,0.12)]">📍 IIIT UNA, Saloh, Hamirpur Rd, Una, HP</li>
                  <li className="flex items-center gap-2 p-1 rounded bg-[rgba(0,0,0,0.12)]">✉️ hello@meraki.ex</li>
                  <li className="flex items-center gap-2 p-1 rounded bg-[rgba(0,0,0,0.12)]">⌚ Office: 10:00 - 18:00</li>
                </ul>
              </div>
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={{ y: 40 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-[rgba(0,0,0,0.36)] border-2 border-[rgba(255,255,255,0.03)] text-white p-3 flex items-center gap-3 max-w-sm rounded"
        >
          <div className="w-8 h-8 bg-green-600 border-2 border-[rgba(255,255,255,0.06)] flex items-center justify-center font-bold text-lg">!</div>
          <div>
            <h4 className="text-[#ffeb3b] font-minecraft text-xs">Achievement Unlocked</h4>
            <p className="text-white text-xs font-minecraft">Visited the Contact Page</p>
          </div>
        </motion.div>
      </div>

      <style>{`
        .font-minecraft {
          font-family: 'Press Start 2P', 'VT323', monospace;
          letter-spacing: 0.02em;
        }
      `}</style>
    </section>
  );
}
