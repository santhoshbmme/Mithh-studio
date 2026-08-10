import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface ServiceItem {
  id: number;
  title: string;
  ghostText: string;
  desc: string;
  bg: string;
  isDark: boolean;
  frameColor: string;
  matColor: string;
  borderColor?: string;
  image: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 0,
    title: "Portrait Artwork",
    ghostText: "PORTRAIT",
    desc: "Transform meaningful photographs into timeless handcrafted artworks that preserve emotions for generations.",
    bg: "#FAF8F5", // Warm Ivory
    isDark: false,
    frameColor: "#D4AF37", // Gold Bezel
    matColor: "#FAF6F0",
    borderColor: "#C5A880",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 1,
    title: "Personalized Gifting",
    ghostText: "GIFTING",
    desc: "Bespoke creations and custom items crafted to speak directly from the giver to the recipient, celebrating life's connections.",
    bg: "#FAF2EE", // Soft Rose & Champagne
    isDark: false,
    frameColor: "#C9A090", // Champagne Rose
    matColor: "#FDFBF7",
    borderColor: "#D49A83",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Achievement Recognition",
    ghostText: "ACHIEVEMENTS",
    desc: "Celebrate graduations, retirements, and lifetime achievements with custom-designed plaques and gold-embossed certificate displays.",
    bg: "#0B1325", // Royal Blue
    isDark: true,
    frameColor: "#1C1613", // Dark walnut wood
    matColor: "#FAF6F0",
    borderColor: "#C49B55", // Gold trim
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Memory Preservation",
    ghostText: "MEMORIES",
    desc: "Safeguard your most treasured event photographs and milestones in custom collage prints and vintage-styled heirloom albums.",
    bg: "#F5F0EB", // Warm Beige
    isDark: false,
    frameColor: "#BEB0A2", // Vintage Light Oak
    matColor: "#FCFBF9",
    borderColor: "#A08260",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Premium Framing",
    ghostText: "FRAMING",
    desc: "Protect your artwork with solid wood profiles, museum-grade mats, and UV-resistant glass curated by professional framing artisans.",
    bg: "#1C120C", // Deep Walnut
    isDark: true,
    frameColor: "#322118", // Deep Walnut Wood
    matColor: "#FAF6F0",
    borderColor: "#D9C5B2",
    image: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=600&auto=format&fit=crop"
  }
];

/**
 * Services page reimagined as a premium, interactive luxury art exhibition.
 * 
 * DESIGN RATIONALE:
 * - Suspends 5 distinct service items on an elliptical 3D space path using Framer Motion.
 * - Dynamically matches background color and text themes (dark/light) to maintain visual hierarchy.
 * - Encloses artwork placeholders in customized gold, walnut, or oak picture frames featuring
 *   mat boards, inner drop shadows, and linear reflection sweeps.
 * - Restricts navigation actions during index changes to ensure smooth easing transitions.
 */
export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Stagger reveal layout elements progressive loading on mount.
  useEffect(() => {
    setIsMounted(true);
    const list: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      list.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 12 + 10,
        delay: Math.random() * -15,
      });
    }
    setParticles(list);
  }, []);

  // Listen to screen sizing updates to balance card scale layouts.
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Shift the active carousel focus forward or backward.
   * Lock logic restricts overlapping transitions.
   * 
   * @param direction - Navigation direction
   */
  const navigate = (direction: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (direction === "next") {
      setActiveIndex((prev) => (prev + 1) % 5);
    } else {
      setActiveIndex((prev) => (prev + 4) % 5);
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };



  const grainDataUri = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E";

  const currentService = SERVICES_DATA[activeIndex];

  useEffect(() => {
    if (currentService.isDark) {
      document.body.classList.add("in-dark-section");
    } else {
      document.body.classList.remove("in-dark-section");
    }
    return () => {
      document.body.classList.remove("in-dark-section");
    };
  }, [currentService.isDark]);

  return (
    <div
      className="relative w-full overflow-hidden transition-colors duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        backgroundColor: currentService.bg,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="relative w-full h-[100vh] overflow-hidden">
        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[50] opacity-35"
          style={{
            backgroundImage: `url("${grainDataUri}")`,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
          }}
        />

        {/* Ambient Volumetric Lighting Overlay */}
        <div className="absolute inset-0 pointer-events-none z-[1] mix-blend-screen opacity-70 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.18)_0%,transparent_60%)]" />
        <div className="absolute inset-0 pointer-events-none z-[1] mix-blend-overlay opacity-25 bg-[radial-gradient(circle_at_15%_75%,rgba(0,0,0,0.3)_0%,transparent_75%)]" />

        {/* Floating Particles Layer */}
        <div className="absolute inset-0 pointer-events-none z-[2] overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-white/20 pointer-events-none"
              style={{
                width: p.size,
                height: p.size,
                left: `${p.x}%`,
                top: `${p.y}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.sin(p.id) * 35, 0],
                opacity: [p.size / 7, p.size / 3, p.size / 7],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Top-Left Branding Label "MITHRA STUDIO" */}
        <Link href="/">
          <span
            className={`absolute top-6 left-4 sm:left-8 z-[60] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] cursor-pointer hover:opacity-100 transition-all duration-500 ${
              currentService.isDark ? "text-white/80" : "text-stone-900/80"
            }`}
          >
            MITHRA STUDIO
          </span>
        </Link>

        {/* Giant Ghost Typography Layer */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[2] overflow-hidden">
          <AnimatePresence mode="wait">
            {isMounted && (
              <motion.span
                key={activeIndex}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: currentService.isDark ? 0.05 : 0.07, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 1.04 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className={`uppercase font-normal leading-none tracking-[-0.03em] whitespace-nowrap block text-center transition-colors duration-500 ${
                  currentService.isDark ? "text-white" : "text-stone-900"
                }`}
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: "clamp(100px, 24vw, 420px)",
                  marginTop: "-3%",
                }}
              >
                {currentService.ghostText}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Orbiting Art Gallery Carousel */}
        <div className="absolute inset-0 flex items-center justify-center z-[3]">
          <div className="relative w-full max-w-7xl h-full flex items-center justify-center">
            {SERVICES_DATA.map((service, index) => {
              // Calculate relative spacing roles for 5-item ellipse path
              let role: "center" | "left1" | "right1" | "left2" | "right2";
              if (index === activeIndex) {
                role = "center";
              } else if (index === (activeIndex + 4) % 5) {
                role = "left1";
              } else if (index === (activeIndex + 1) % 5) {
                role = "right1";
              } else if (index === (activeIndex + 3) % 5) {
                role = "left2";
              } else {
                role = "right2";
              }

              // Mapping orbital positions
              let xVal = "0%";
              let yVal = "0%";
              let scaleVal = 1;
              let opacityVal = 1;
              let blurVal = 0;
              let zIndexVal = 30;

              const isSmallMobile = window.innerWidth < 480;
              const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;

              if (role === "center") {
                xVal = "0%";
                yVal = isSmallMobile ? "-4%" : isMobile ? "-2%" : isTablet ? "0%" : "3%";
                scaleVal = isSmallMobile ? 0.65 : isMobile ? 0.72 : isTablet ? 0.95 : 1.05;
                opacityVal = 1;
                blurVal = 0;
                zIndexVal = 30;
              } else if (role === "left1") {
                xVal = isSmallMobile ? "-36%" : isMobile ? "-42%" : isTablet ? "-32%" : "-35%";
                yVal = isSmallMobile ? "-6%" : isMobile ? "-5%" : isTablet ? "-3%" : "-2%";
                scaleVal = isSmallMobile ? 0.32 : isMobile ? 0.4 : isTablet ? 0.55 : 0.65;
                opacityVal = 0.45;
                blurVal = 2;
                zIndexVal = 20;
              } else if (role === "right1") {
                xVal = isSmallMobile ? "36%" : isMobile ? "42%" : isTablet ? "32%" : "35%";
                yVal = isSmallMobile ? "-6%" : isMobile ? "-5%" : isTablet ? "-3%" : "-2%";
                scaleVal = isSmallMobile ? 0.32 : isMobile ? 0.4 : isTablet ? 0.55 : 0.65;
                opacityVal = 0.45;
                blurVal = 2;
                zIndexVal = 20;
              } else if (role === "left2") {
                xVal = isSmallMobile ? "-18%" : isMobile ? "-22%" : isTablet ? "-16%" : "-18%";
                yVal = isSmallMobile ? "-18%" : isMobile ? "-18%" : isTablet ? "-16%" : "-15%";
                scaleVal = isSmallMobile ? 0.22 : isMobile ? 0.26 : isTablet ? 0.36 : 0.42;
                opacityVal = 0.12;
                blurVal = 6;
                zIndexVal = 10;
              } else {
                // right2
                xVal = isSmallMobile ? "18%" : isMobile ? "22%" : isTablet ? "16%" : "18%";
                yVal = isSmallMobile ? "-18%" : isMobile ? "-18%" : isTablet ? "-16%" : "-15%";
                scaleVal = isSmallMobile ? 0.22 : isMobile ? 0.26 : isTablet ? 0.36 : 0.42;
                opacityVal = 0.12;
                blurVal = 6;
                zIndexVal = 10;
              }

              // Dynamic drift amplitude matching active role
              const driftYRange = role === "center" ? [-10, 10] : [-4, 4];
              const rotateRange = role === "center" ? [-1, 1] : [-0.5, 0.5];
              const scaleRange = role === "center" ? [1, 1.02, 1] : [1, 1.005, 1];
              const floatingDuration = 5 + (index % 3) * 1.5;

              return (
                <motion.div
                  key={service.id}
                  className="absolute flex flex-col items-center justify-center pointer-events-none"
                  initial={
                    isMounted
                      ? false
                      : {
                          x: xVal,
                          y: "50%",
                          scale: 0.2,
                          opacity: 0,
                          filter: "blur(10px)",
                        }
                  }
                  animate={
                    isMounted
                      ? {
                          x: xVal,
                          y: yVal,
                          scale: scaleVal,
                          opacity: opacityVal,
                          filter: `blur(${blurVal}px)`,
                        }
                      : {}
                  }
                  style={{
                    zIndex: zIndexVal,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Masterpiece Exhibition Picture Frame */}
                  <motion.div
                    className="relative w-[280px] h-[360px] md:w-[350px] md:h-[450px] flex items-center justify-center p-6 md:p-8 rounded shadow-[0_30px_70px_-20px_rgba(0,0,0,0.65)] relative overflow-hidden group select-none pointer-events-auto border cursor-pointer"
                    style={{
                      backgroundColor: service.frameColor,
                      borderColor: service.borderColor || "transparent",
                      borderWidth: service.borderColor ? "2px" : "1px",
                    }}
                    animate={{
                      y: driftYRange,
                      rotate: rotateRange,
                      scale: scaleRange,
                    }}
                    transition={{
                      y: { repeat: Infinity, duration: floatingDuration, ease: "easeInOut" },
                      rotate: { repeat: Infinity, duration: floatingDuration + 1, ease: "easeInOut" },
                      scale: { repeat: Infinity, duration: floatingDuration - 1, ease: "easeInOut" },
                    }}
                  >
                    {/* Bevel highlights & shadow borders */}
                    <div className="absolute inset-0 border border-white/20 pointer-events-none rounded" />
                    <div className="absolute inset-1 border border-black/40 pointer-events-none rounded" />

                    {/* Inner Mat Board */}
                    <div
                      className="w-full h-full p-4 md:p-6 flex items-center justify-center shadow-[inset_0_4px_12px_rgba(0,0,0,0.3)] border border-black/10 relative"
                      style={{
                        backgroundColor: service.matColor,
                      }}
                    >
                      {/* Beveled cutout shadow */}
                      <div className="absolute inset-4 md:inset-6 border border-stone-400/30 pointer-events-none" />

                      {/* Image Canvas */}
                      <div className="w-full h-full relative overflow-hidden shadow-md border border-stone-900/10">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover scale-100 transition-transform duration-700 ease-out select-none pointer-events-none"
                          draggable={false}
                        />
                        {/* Glass Glare Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-70 mix-blend-overlay pointer-events-none" />
                      </div>
                    </div>

                    {/* Shadow overlay under frame bezel */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Section - Responsive Layout */}
        <div className="absolute bottom-16 sm:bottom-12 md:bottom-16 left-0 w-full px-6 sm:px-12 md:px-20 z-[60] flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 pointer-events-none select-none">
          
          {/* Bottom-Left Description & Nav Triggers */}
          <div
            className={`flex flex-col items-center sm:items-start text-center sm:text-left max-w-sm w-full transition-colors duration-500 pointer-events-auto ${
              currentService.isDark ? "text-white" : "text-stone-900"
            }`}
          >
            <div className="overflow-hidden mb-3">
              <AnimatePresence mode="wait">
                {isMounted && (
                  <motion.h2
                    key={activeIndex}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="font-serif text-xl sm:text-2xl md:text-3xl font-medium tracking-wide uppercase"
                  >
                    {currentService.title}
                  </motion.h2>
                )}
              </AnimatePresence>
            </div>
            
            <div className="overflow-hidden mb-6">
              <AnimatePresence mode="wait">
                {isMounted && (
                  <motion.p
                    key={activeIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={`text-xs sm:text-sm font-light leading-relaxed transition-colors duration-500 ${
                      currentService.isDark ? "text-stone-300" : "text-stone-600"
                    }`}
                  >
                    {currentService.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex gap-4"
            >
              <button
                onClick={() => navigate("prev")}
                className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border bg-transparent cursor-pointer transition-all duration-300 hover:scale-108 active:scale-95 ${
                  currentService.isDark
                    ? "border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                    : "border-stone-900/20 text-stone-900 hover:bg-stone-900/5 hover:border-stone-900/40"
                }`}
                aria-label="Previous artwork"
              >
                <ArrowLeft size={18} strokeWidth={1.75} />
              </button>
              <button
                onClick={() => navigate("next")}
                className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border bg-transparent cursor-pointer transition-all duration-300 hover:scale-108 active:scale-95 ${
                  currentService.isDark
                    ? "border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                    : "border-stone-900/20 text-stone-900 hover:bg-stone-900/5 hover:border-stone-900/40"
                }`}
                aria-label="Next artwork"
              >
                <ArrowRight size={18} strokeWidth={1.75} />
              </button>
            </motion.div>
          </div>


        </div>

      </div>
    </div>
  );
}
