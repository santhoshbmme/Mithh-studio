import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Dynamically observe class mutations on body tag for target section tracking
    const observer = new MutationObserver(() => {
      setIsDarkSection(document.body.classList.contains("in-dark-section"));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    // Initial check
    setIsDarkSection(document.body.classList.contains("in-dark-section"));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isDarkSection
          ? "bg-[#07080A]/75 backdrop-blur-md border-b border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_30px_rgba(0,0,0,0.3)] py-3.5"
          : isScrolled
          ? "bg-white/75 backdrop-blur-md border-b border-stone-200/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_4px_30px_rgba(0,0,0,0.02)] py-3.5"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <span
            className={`font-serif text-2xl font-bold tracking-tight transition-colors duration-500 ${
              isDarkSection ? "text-white group-hover:text-amber-500" : "text-foreground group-hover:text-primary"
            }`}
          >
            Mithraa
          </span>
          <span
            className={`font-sans text-sm tracking-[0.2em] uppercase mt-1 transition-colors duration-500 ${
              isDarkSection ? "text-white/60" : "text-muted-foreground"
            }`}
          >
            Studio
          </span>
        </Link>
 
        {/* Top Header Actions */}
        <div className="flex items-center gap-4">
          <Button
            className={`font-sans text-xs uppercase tracking-widest px-6 rounded-full transition-all duration-300 backdrop-blur-md ${
              isDarkSection
                ? "bg-gradient-to-b from-white/15 to-white/5 text-white border border-white/25 hover:from-white hover:to-white hover:text-neutral-950 hover:border-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_12px_rgba(0,0,0,0.2)]"
                : "bg-gradient-to-b from-stone-50/80 to-stone-200/40 text-stone-800 border border-stone-900/15 hover:from-stone-900 hover:to-stone-950 hover:text-white hover:border-transparent shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_4px_12px_rgba(0,0,0,0.03)]"
            }`}
          >
            Book Consultation
          </Button>
        </div>
      </div>
    </header>
  );
}

