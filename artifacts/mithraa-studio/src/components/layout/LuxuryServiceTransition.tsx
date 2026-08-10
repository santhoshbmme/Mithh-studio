"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const STORY_PHASES = [
  {
    title: "The Raw Sketch",
    desc: "Every portrait begins as a delicate line in graphite, capturing raw emotion.",
    img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000",
  },
  {
    title: "Masterful Colors",
    desc: "Applying rich, hand-painted pigments that breathe life into light and shadow.",
    img: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?q=80&w=2000",
  },
  {
    title: "The Artisan Frame",
    desc: "Encasing memories in custom-cut solid walnut and premium gold profiles.",
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2000",
  },
  {
    title: "The Masterpiece",
    desc: "A timeless work of art hanging proudly, preserving your legacy for generations.",
    img: "https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?q=80&w=2000",
  }
];

export default function LuxuryServiceTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });

  const handleButtonMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setButtonOffset({ x: x * 0.3, y: y * 0.3 });
  };

  const handleButtonLeave = () => {
    setButtonOffset({ x: 0, y: 0 });
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  });

  // Track intersection for dark theme header adaptation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.body.classList.add("in-dark-section");
        } else {
          document.body.classList.remove("in-dark-section");
        }
      },
      {
        rootMargin: "-80px 0px 0px 0px",
        threshold: 0.05
      }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      observer.disconnect();
      document.body.classList.remove("in-dark-section");
    };
  }, []);

  // Move the lens across the screen in a Z-pattern
  const lensX = useTransform(smoothProgress,
    [0, 0.2, 0.5, 0.8, 1],
    ["50%", "80%", "20%", "50%", "50%"]
  );
  const lensY = useTransform(smoothProgress,
    [0, 0.2, 0.5, 0.8, 1],
    ["50%", "20%", "80%", "50%", "50%"]
  );

  // Map the lens size
  const lensSize = useTransform(smoothProgress,
    [0, 0.1, 0.2, 0.4, 0.5, 0.7, 0.8, 1],
    ["0%", "15%", "15%", "15%", "10%", "10%", "20%", "150%"]
  );

  const clipPath = useMotionTemplate`circle(${lensSize} at ${lensX} ${lensY})`;

  // Statically define transforms to avoid hook ordering violations in loop
  const opacity0 = useTransform(smoothProgress, [0, 0.25], [1, 0.5]);
  const opacity1 = useTransform(smoothProgress, [0.25, 0.5], [1, 0.5]);
  const opacity2 = useTransform(smoothProgress, [0.5, 0.75], [1, 0.5]);
  const opacity3 = useTransform(smoothProgress, [0.75, 1.0], [1, 0.5]);
  const opacities = [opacity0, opacity1, opacity2, opacity3];

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* --- THE WORLD UNDERNEATH (Hidden Story) --- */}
        <div className="absolute inset-0 z-0">
          {STORY_PHASES.map((phase, i) => (
            <motion.div
              key={i}
              style={{ opacity: opacities[i] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <img
                src={phase.img}
                className="w-full h-full object-cover"
                alt={phase.title}
              />
              {/* Story Content */}
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-10">
                <h2 className="text-white text-3xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 italic font-sans">
                  {phase.title}
                </h2>
                <p className="text-white/70 text-lg md:text-2xl max-w-xl font-light italic font-sans">
                  {phase.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- THE APERTURE SHUTTER (The Masking Layer) --- */}
        <motion.div
          style={{ clipPath }}
          className="absolute inset-0 z-10 bg-black flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Brand text visible inside the darkness */}
          <div className="text-sm font-mono tracking-[0.5em] uppercase select-none mb-12"
            style={{
              background: "linear-gradient(90deg, #92400e 0%, #d97706 30%, #fbbf24 55%, #f59e0b 75%, #92400e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              backgroundSize: "200% auto",
              animation: "gradientShift 4s linear infinite",
            }}
          >
            THE ART-N-DRAW
          </div>
          
          <div className="pointer-events-auto">
            <Link href="/services">
              <button
                onMouseMove={handleButtonMove}
                onMouseLeave={handleButtonLeave}
                className="button"
                style={{ "--clr": "#d97706" } as React.CSSProperties}
              >
                <motion.div
                  animate={{ x: buttonOffset.x, y: buttonOffset.y }}
                  transition={{ type: "spring", stiffness: 200, damping: 14 }}
                  className="flex items-center gap-3"
                >
                  <span className="font-sans text-xs uppercase tracking-[0.25em] font-semibold text-white">EXPLORE</span>
                  <div className="button__icon-wrapper">
                    <ArrowRight size={14} className="button__icon-svg" />
                    <ArrowRight size={14} className="button__icon-svg button__icon-svg--copy" />
                  </div>
                </motion.div>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
