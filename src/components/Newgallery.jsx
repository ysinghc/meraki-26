import React, { useState, useRef, useEffect } from "react";
import "./border.css";
import Background from "../assets/gallery_bg.webp";
import Bleach from "../assets/wp.webp";
import {
  motion,
  AnimatePresence,
  useInView,
  useAnimation,
} from "framer-motion";

const galleryItems = [
  { id: 1, className: "lg:row-span-2" },
  { id: 2, className: "" },
  { id: 3, className: "" },
  { id: 4, className: "lg:col-span-2" },
  { id: 5, className: "lg:col-span-2" },
  { id: 6, className: "" },
];

const IMAGE_URL = "https://www.gstatic.com/webp/gallery/1.webp";

// 30 images, alternating (UNCHANGED)
const viewerImages = Array.from({ length: 30 }, (_, i) =>
  i % 2 === 0 ? Bleach : IMAGE_URL
);

export default function Newgallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [direction, setDirection] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-150px 0px -150px 0px" });

  const bgControls = useAnimation();
  const contentControls = useAnimation();
  const hasAnimatedRef = useRef(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 0) setHasScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!hasAnimatedRef.current && hasScrolled && isInView) {
      bgControls.start({
        scale: 1,
        transition: { duration: 1.2, ease: "easeOut" },
      });
      contentControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" },
      });
      hasAnimatedRef.current = true;
    }
  }, [hasScrolled, isInView]);

  // ✅ ONLY CHANGE IS HERE
  const goNext = () => {
    setDirection(1);
    setSelectedIndex((i) => {
      if (i === viewerImages.length - 1) {
        // last image → close viewer
        return null;
      }
      return i + 1;
    });
  };

  const goPrev = () => {
    setDirection(-1);
    setSelectedIndex((i) => (i > 0 ? i - 1 : i));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 overflow-hidden bg-black"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundColor: "rgba(0,0,0,0.6)",
          backgroundBlendMode: "multiply",
        }}
        initial={{ scale: 1.5 }}
        animate={bgControls}
      />

      {/* Main container */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 80 }}
        animate={contentControls}
      >
        {/* Frame corners (UNCHANGED) */}
        <span className="absolute top-0 left-0 w-6 h-6 bg-white z-10" />
        <span className="absolute top-0 right-0 w-6 h-6 bg-white z-10" />
        <span className="absolute bottom-0 left-0 w-6 h-6 bg-white z-10" />
        <span className="absolute bottom-0 right-0 w-6 h-6 bg-white z-10" />

        <div
          id="container"
          className="relative bg-[rgba(71,71,71,1)] p-6 pb-14 md:p-10 md:pb-16 shadow-2xl border border-black/40 w-full z-8"
        >
          <AnimatePresence mode="wait">
            {!showMore ? (
              <motion.div
                key="mosaic"
                className="
                  p-2 sm:p-4
                  grid gap-4
                  grid-cols-1 sm:grid-cols-2
                  lg:grid-cols-[0.34fr_0.38fr_0.28fr]
                  lg:grid-rows-[232px_219px_221px]
                "
              >
                {galleryItems.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setDirection(0);
                      setSelectedIndex(i);
                    }}
                    className={`relative overflow-hidden h-40 lg:h-full ${item.className}`}
                  >
                    <img
                      src={viewerImages[i]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                className="
                  p-2 sm:p-4
                  grid gap-4
                  grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
                "
              >
                {viewerImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(0);
                      setSelectedIndex(i);
                    }}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full aspect-square object-cover"
                    />
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* SHOW MORE (UNCHANGED) */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowMore((p) => !p)}
              className="
                px-6 py-2 sm:px-8 sm:py-3
                border border-white/40 bg-black/60
                text-white tracking-widest uppercase
                font-minecraft
              "
            >
              {showMore ? "HIDE" : "SHOW MORE"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* FULLSCREEN VIEWER */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setSelectedIndex(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="
                w-full max-w-7xl
                flex sm:grid
                sm:grid-cols-[80px_minmax(0,1fr)_80px]
                items-center
                px-4 sm:px-6
              "
            >
              {/* LEFT BUTTON */}
              <div className="hidden sm:flex justify-center">
                {selectedIndex > 0 && (
                  <button
                    onClick={goPrev}
                    className="w-12 h-12 border border-white/40 rounded-md text-white text-3xl"
                  >
                    &lt;
                  </button>
                )}
              </div>

              {/* IMAGE */}
              <div className="flex justify-center overflow-hidden">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.img
                    key={selectedIndex}
                    src={viewerImages[selectedIndex]}
                    custom={direction}
                    variants={{
                      enter: (d) => ({
                        x: d > 0 ? 120 : -120,
                        opacity: 0,
                      }),
                      center: { x: 0, opacity: 1 },
                      exit: (d) => ({
                        x: d > 0 ? -120 : 120,
                        opacity: 0,
                      }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, info) => {
                      if (info.offset.x < -100) goNext();
                      if (info.offset.x > 100) goPrev();
                    }}
                    className="max-w-full max-h-[90vh] object-contain"
                  />
                </AnimatePresence>
              </div>

              {/* RIGHT BUTTON */}
              <div className="hidden sm:flex justify-center">
                {selectedIndex < viewerImages.length - 1 && (
                  <button
                    onClick={goNext}
                    className="w-12 h-12 border border-white/40 rounded-md text-white text-3xl"
                  >
                    &gt;
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
