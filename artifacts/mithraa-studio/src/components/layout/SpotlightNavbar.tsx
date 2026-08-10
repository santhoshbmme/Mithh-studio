"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
}

export interface SpotlightNavbarProps {
  items?: NavItem[];
  className?: string;
  isDarkSection?: boolean;
}

export function SpotlightNavbar({
  items = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/services" },
  ],
  className,
  isDarkSection: propIsDarkSection,
}: SpotlightNavbarProps) {
  const [location, setLocation] = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const [hoverX, setHoverX] = useState<number | null>(null);
  const [isDarkSection, setIsDarkSection] = useState(propIsDarkSection || false);

  useEffect(() => {
    if (propIsDarkSection !== undefined) {
      setIsDarkSection(propIsDarkSection);
      return;
    }
    const checkTheme = () => {
      setIsDarkSection(document.body.classList.contains("in-dark-section"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [propIsDarkSection]);

  // Active index state tracked by location and URL hash
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleHashAndLocationChange = () => {
      if (location === "/services") {
        setActiveIndex(2);
      } else {
        // We are on "/"
        if (window.location.hash === "#about") {
          setActiveIndex(1);
        } else {
          setActiveIndex(0);
        }
      }
    };

    handleHashAndLocationChange();
    window.addEventListener("hashchange", handleHashAndLocationChange);
    return () => window.removeEventListener("hashchange", handleHashAndLocationChange);
  }, [location]);

  // Scroll spy: auto-highlights Home, About, or Services tab when scrolling on "/"
  useEffect(() => {
    if (location !== "/") return;

    let isScrollingFromClick = false;

    const handleScroll = () => {
      if (isScrollingFromClick) return;

      const aboutEl = document.getElementById("about");
      const servicesEl = document.getElementById("services-preview");

      if (!aboutEl) return;

      const viewportMid = window.innerHeight * 0.45;

      const aboutRect = aboutEl.getBoundingClientRect();
      const servicesRect = servicesEl?.getBoundingClientRect();

      // Services zone: user has scrolled past the About section into the for-whom/services area
      if (servicesRect && servicesRect.top < viewportMid) {
        setActiveIndex(2);
      // About zone: About section is in view
      } else if (aboutRect.top < viewportMid && aboutRect.bottom > 0) {
        setActiveIndex(1);
      // Home zone: above the About section
      } else {
        setActiveIndex(0);
      }
    };

    const handleHashChangeForScroll = () => {
      isScrollingFromClick = true;
      setTimeout(() => {
        isScrollingFromClick = false;
        handleScroll();
      }, 900);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", handleHashChangeForScroll);
    handleScroll(); // initial evaluation

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChangeForScroll);
    };
  }, [location]);

  // Refs for the "light" positions so we can animate them imperatively
  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setHoverX(x);
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
    };

    const handleMouseLeave = () => {
      setHoverX(null);
      const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
      if (activeItem) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const targetX = itemRect.left - navRect.left + itemRect.width / 2;

        animate(spotlightX.current, targetX, {
          type: "spring",
          stiffness: 200,
          damping: 20,
          onUpdate: (v) => {
            spotlightX.current = v;
            nav.style.setProperty("--spotlight-x", `${v}px`);
          }
        });
      }
    };

    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeIndex]);

  // Handle the "Ambience" (Active Item) Movement
  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;
    const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);

    if (activeItem) {
      const navRect = nav.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const targetX = itemRect.left - navRect.left + itemRect.width / 2;

      animate(ambienceX.current, targetX, {
        type: "spring",
        stiffness: 200,
        damping: 20,
        onUpdate: (v) => {
          ambienceX.current = v;
          nav.style.setProperty("--ambience-x", `${v}px`);
        },
      });
    }
  }, [activeIndex]);

  return (
    <div className={cn("relative flex justify-center", className)}>
      <nav
        ref={navRef}
        style={{
          "--spotlight-color": isDarkSection ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)",
          "--ambience-color": isDarkSection ? "rgba(251,191,36,0.9)" : "rgba(217,119,6,0.95)",
        } as React.CSSProperties}
        className={cn(
          "relative h-12 rounded-full transition-all duration-500 overflow-hidden flex items-center border shadow-lg backdrop-blur-md",
          isDarkSection 
            ? "bg-[#07080A]/85 border-white/10 shadow-black/40" 
            : "bg-white/80 border-stone-200/50 shadow-stone-200/20"
        )}
      >
        {/* Content */}
        <ul className="relative flex items-center h-full px-3 gap-1 z-[10]">
          {items.map((item, idx) => (
            <li key={idx} className="relative h-full flex items-center justify-center">
              <a
                href={item.href}
                data-index={idx}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.href.startsWith("/#")) {
                    const hash = item.href.substring(2);
                    if (location !== "/") {
                      setLocation("/");
                      setActiveIndex(1);
                      setTimeout(() => {
                        window.location.hash = hash;
                        const element = document.getElementById(hash);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }, 150);
                    } else {
                      window.location.hash = hash;
                      const element = document.getElementById(hash);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                      setActiveIndex(1);
                    }
                  } else {
                    window.location.hash = ""; // Clear hash
                    if (location === "/" && item.href === "/") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setActiveIndex(0);
                    } else {
                      setLocation(item.href);
                    }
                  }
                }}
                className={cn(
                  "px-5 py-1.5 text-xs font-semibold uppercase tracking-widest transition-colors duration-300 rounded-full select-none",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500",
                  activeIndex === idx
                    ? isDarkSection ? "text-amber-400" : "text-amber-700"
                    : isDarkSection
                    ? "text-white/60 hover:text-white"
                    : "text-stone-600 hover:text-stone-900"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* 1. The Moving Spotlight (Follows Mouse) */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-[1] opacity-0 transition-opacity duration-300"
          style={{
            opacity: hoverX !== null ? 1 : 0,
            background: `
              radial-gradient(
                90px circle at var(--spotlight-x) 100%, 
                var(--spotlight-color) 0%, 
                transparent 50%
              )
            `
          }}
        />

        {/* 2. The Active State Ambience (Stays on Active) */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-[3px] z-[2]"
          style={{
            background: `
              radial-gradient(
                45px circle at var(--ambience-x) 100%, 
                var(--ambience-color) 0%, 
                transparent 100%
              )
            `
          }}
        />
      </nav>
    </div>
  );
}
