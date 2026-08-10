import React, { useRef, useEffect } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Star, Heart, Award, Users, Image as ImageIcon, Frame } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import LuxuryServiceTransition from "@/components/layout/LuxuryServiceTransition";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const contentContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

/**
 * Home page component rendering the Mithraa Studio brand narrative.
 * Features a scroll-driven reveal animation that expands the atelier image
 * from right to left while morphing overlays and text colors for readability.
 */
const FLOATING_CARDS_DATA = [
  {
    id: 1,
    label: "CUSTOM PORTRAIT",
    text: "Made from your favourite moment",
    img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop",
    width: 210,
    height: 275,
    positionStyles: { left: "28%", top: "8%" },
    rotate: -2,
    parallaxFactor: 28,
    floatDelay: 0,
    zIndex: 30,
  },
  {
    id: 2,
    label: "PERSONALIZED GIFT",
    text: "Made especially for them",
    img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop",
    width: 170,
    height: 220,
    positionStyles: { left: "-2%", top: "34%" },
    rotate: 3,
    parallaxFactor: -18,
    floatDelay: 0.8,
    zIndex: 20,
  },
  {
    id: 3,
    label: "ACHIEVEMENT",
    text: "Celebrate every milestone",
    img: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=600&auto=format&fit=crop",
    width: 185,
    height: 235,
    positionStyles: { left: "62%", top: "42%" },
    rotate: 4,
    parallaxFactor: 22,
    floatDelay: 1.5,
    zIndex: 25,
  },
  {
    id: 4,
    label: "MEMORY PRESERVED",
    text: "Moments worth keeping",
    img: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=600&auto=format&fit=crop",
    width: 180,
    height: 230,
    positionStyles: { left: "10%", top: "60%" },
    rotate: -3,
    parallaxFactor: -12,
    floatDelay: 2.2,
    zIndex: 15,
  },
  {
    id: 5,
    label: "PREMIUM FINISH",
    text: "Acrylic / Glass / Canvas",
    img: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=600&auto=format&fit=crop",
    width: 140,
    height: 165,
    positionStyles: { left: "70%", top: "8%" },
    rotate: -5,
    parallaxFactor: 12,
    floatDelay: 0.4,
    zIndex: 10,
  },
  {
    id: 6,
    label: "CRAFTED BY HAND",
    text: "Artisan wood frames",
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop",
    width: 145,
    height: 175,
    positionStyles: { left: "50%", top: "14%" },
    rotate: 2,
    parallaxFactor: -8,
    floatDelay: 1.2,
    zIndex: 18,
  },
  {
    id: 7,
    isBadge: true,
    positionStyles: { left: "38%", top: "58%" },
    rotate: 6,
    parallaxFactor: 32,
    floatDelay: 2.8,
    zIndex: 35,
  }
];

const MOBILE_CARDS_DATA = [
  {
    id: 1,
    label: "CUSTOM PORTRAIT",
    text: "Made from your favourite moment",
    img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop",
    width: 150,
    height: 195,
    positionStyles: { left: "30%", top: "15%" },
    rotate: -2,
    parallaxFactor: 0,
    floatDelay: 0,
    zIndex: 30,
  },
  {
    id: 2,
    label: "PERSONALIZED GIFT",
    text: "Made especially for them",
    img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop",
    width: 120,
    height: 150,
    positionStyles: { left: "2%", top: "28%" },
    rotate: 3,
    parallaxFactor: 0,
    floatDelay: 0.8,
    zIndex: 20,
  },
  {
    id: 3,
    label: "ACHIEVEMENT",
    text: "Celebrate every milestone",
    img: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=600&auto=format&fit=crop",
    width: 130,
    height: 165,
    positionStyles: { left: "62%", top: "34%" },
    rotate: 4,
    parallaxFactor: 0,
    floatDelay: 1.5,
    zIndex: 25,
  },
  {
    id: 7,
    isBadge: true,
    positionStyles: { left: "38%", top: "66%" },
    rotate: 6,
    parallaxFactor: 0,
    floatDelay: 2.2,
    zIndex: 35,
  }
];

interface FloatingCardProps {
  card: any;
  springX: any;
  springY: any;
}

function FloatingCard({ card, springX, springY }: FloatingCardProps) {
  const xVal = useTransform(springX, (x: number) => x * card.parallaxFactor);
  const yVal = useTransform(springY, (y: number) => y * card.parallaxFactor);

  if (card.isBadge) {
    return (
      <motion.div
        style={{
          position: "absolute",
          ...card.positionStyles,
          x: xVal,
          y: yVal,
          zIndex: card.zIndex,
        }}
        className="pointer-events-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: card.rotate }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: card.floatDelay * 0.15 + 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [card.rotate, card.rotate + 2, card.rotate] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: card.floatDelay }}
            className="w-[110px] h-[110px] rounded-full bg-foreground text-background flex flex-col items-center justify-center text-center p-3 shadow-2xl border border-white/10"
            style={{
              boxShadow: "0 15px 35px -5px rgba(0,0,0,0.25)"
            }}
          >
            <span className="text-[8px] font-sans tracking-[0.2em] text-primary uppercase font-bold mb-1">Mithraa</span>
            <div className="w-5 h-[1px] bg-primary/30 my-0.5"></div>
            <span className="text-[9px] font-serif tracking-[0.1em] text-white uppercase leading-none font-semibold">100% Crafted</span>
            <span className="text-[7px] font-sans tracking-[0.1em] text-muted-foreground uppercase mt-1">By Hand</span>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      style={{
        position: "absolute",
        ...card.positionStyles,
        x: xVal,
        y: yVal,
        zIndex: card.zIndex,
      }}
      className="pointer-events-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 35, rotate: card.rotate }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: card.floatDelay * 0.15 + 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5.5 + card.floatDelay, ease: "easeInOut", delay: card.floatDelay }}
          className="bg-white/80 backdrop-blur-[8px] border border-stone-200/50 rounded-2xl p-3 shadow-2xl hover:shadow-primary/5 transition-shadow duration-500 flex flex-col gap-2.5 text-left"
          style={{
            width: card.width,
            height: card.height,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.8)"
          }}
        >
          <div className="w-full flex-1 overflow-hidden rounded-lg relative">
            <img
              src={card.img}
              alt={card.label}
              className="w-full h-full object-cover select-none pointer-events-none"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent mix-blend-overlay pointer-events-none" />
          </div>
          <div className="flex flex-col select-none">
            <span className="text-[9px] tracking-[0.2em] font-semibold text-primary uppercase mb-0.5 block">{card.label}</span>
            <span className="text-[10px] text-stone-500 font-sans tracking-wide leading-tight">{card.text}</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const [hoveredArtwork, setHoveredArtwork] = React.useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize values between -1 and 1 relative to center of screen
      mouseX.set((e.clientX - window.innerWidth / 2) / (window.innerWidth / 2));
      mouseY.set((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const artworkImages = [
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576016770956-debb63d900ee?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580136579312-94651dfd596d?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?q=80&w=600&auto=format&fit=crop"
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.location.hash === "#about") {
      setTimeout(() => {
        const element = document.getElementById("about");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const cardWidth = useTransform(scrollYProgress, [0, 0.6], [isMobile ? "90%" : "48%", "100%"], { clamp: true });
  const cardHeight = useTransform(scrollYProgress, [0, 0.6], [isMobile ? "60vh" : "70vh", "100vh"], { clamp: true });
  const cardRadius = useTransform(scrollYProgress, [0, 0.6], ["24px", "0px"], { clamp: true });
  const cardRight = useTransform(scrollYProgress, [0, 0.6], [isMobile ? "5%" : "4%", "0%"], { clamp: true });
  const imgScale = useTransform(scrollYProgress, [0, 0.6], [1.0, 1.15], { clamp: true });
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.75], { clamp: true });

  // Theme-appropriate color morphing variables for stable text on left
  const titleColor = useTransform(scrollYProgress, [0.1, 0.5], ["#171717", "#ffffff"], { clamp: true });
  const quoteColor = useTransform(scrollYProgress, [0.1, 0.5], ["#9a3412", "#fbbf24"], { clamp: true });
  const bodyColor = useTransform(scrollYProgress, [0.1, 0.5], ["#4b5563", "#ffffff"], { clamp: true });

  const forWhomRef = useRef<HTMLDivElement>(null);

  // Scroll-driven animation triggers for "For Whom We Create" section (overlapping fan card effect)
  const { scrollYProgress: forWhomScroll } = useScroll({
    target: forWhomRef,
    offset: ["start end", "end start"]
  });

  const rotateLeft = useTransform(forWhomScroll, [0.15, 0.55], [-12, 0]);
  const rotateRight = useTransform(forWhomScroll, [0.15, 0.55], [12, 0]);
  const xLeft = useTransform(forWhomScroll, [0.15, 0.55], [55, 0]);
  const xRight = useTransform(forWhomScroll, [0.15, 0.55], [-55, 0]);
  const yMiddle = useTransform(forWhomScroll, [0.15, 0.55], [-8, 0]);


  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative lg:h-screen min-h-screen flex items-center justify-center overflow-hidden py-24 lg:py-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white/70 z-10"></div>
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-40 mix-blend-overlay z-20 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
          <img
            src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop"
            alt="Artistic Atelier"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-30 pt-16 lg:pt-24 flex items-center w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full relative">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left items-center lg:items-start max-w-2xl mx-auto lg:mx-0">
              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="w-full flex flex-col items-center lg:items-start">
                <motion.span variants={fadeIn} className="inline-block text-primary uppercase tracking-[0.3em] text-[10px] sm:text-xs font-semibold mb-6">
                  CREATIVE ART • PERSONALIZED MEMORIES
                </motion.span>
                <motion.h1 variants={fadeIn} className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-foreground leading-[1.15] mb-8 text-center lg:text-left flex flex-col gap-1 sm:gap-2">
                  <span className="whitespace-nowrap block">Turn Your Moments</span>
                  <span className="whitespace-nowrap block italic font-light text-primary">Into Timeless Art.</span>
                </motion.h1>
                <motion.p variants={fadeIn} className="text-sm sm:text-base md:text-lg text-muted-foreground font-light mb-10 max-w-xl leading-relaxed text-center lg:text-left">
                  From custom portraits and personalized gifts to premium frames and meaningful achievements, we transform your memories into art worth keeping forever.
                </motion.p>
                <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
                  <Button asChild className="h-14 px-8 rounded-full bg-foreground text-background hover:bg-primary text-xs uppercase tracking-widest font-semibold transition-all duration-300 w-full sm:w-auto">
                    <Link href="/services">Make Your Art &rarr;</Link>
                  </Button>
                  <Button asChild variant="ghost" className="h-14 px-8 rounded-full border border-stone-200/50 hover:bg-stone-50/50 text-xs uppercase tracking-widest font-semibold transition-all duration-300 w-full sm:w-auto">
                    <Link href="/services">Explore Our Work</Link>
                  </Button>
                </motion.div>
                <motion.div variants={fadeIn} className="mt-8 text-[10px] uppercase tracking-wider text-stone-400 font-medium">
                  Crafted with care &bull; Made to be remembered
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column - Desktop Floating Cards Composition */}
            <div className="lg:col-span-7 relative h-[600px] w-full hidden lg:block overflow-visible select-none pointer-events-none">
              {FLOATING_CARDS_DATA.map((card) => (
                <FloatingCard key={card.id} card={card} springX={springX} springY={springY} />
              ))}
            </div>

            {/* Mobile/Tablet Card Composition (Stacked below) */}
            <div className="relative w-full max-w-[420px] h-[340px] mt-8 mx-auto lg:hidden select-none overflow-visible pointer-events-none">
              {MOBILE_CARDS_DATA.map((card) => (
                <FloatingCard key={card.id} card={card} springX={springX} springY={springY} />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Scroll-Driven Brand Narrative Section */}
      <section id="about" ref={sectionRef} key={isMobile ? "mobile" : "desktop"} className="relative h-[200vh] bg-background">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Expanding Card (Background image animation) */}
          <motion.div
            style={{
              width: cardWidth,
              height: cardHeight,
              borderRadius: cardRadius,
              right: cardRight,
            }}
            className="absolute inset-y-0 my-auto overflow-hidden shadow-2xl z-10"
          >
            {/* The Image inside the expanding card */}
            <motion.img
              src="/about-artist.png"
              alt="Crafting Art"
              style={{ scale: imgScale }}
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
            {/* Dark Velvet Overlay on top of the image */}
            <motion.div
              style={{ opacity: overlayOpacity, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
              className="absolute inset-0 z-10"
            />
          </motion.div>

          {/* Overlaid content (Stable on the left side, z-20) */}
          <div className="absolute left-6 md:left-12 lg:left-24 inset-y-0 my-auto h-fit max-w-[85%] md:max-w-[40%] lg:max-w-[35vw] z-20 text-left flex flex-col justify-center pointer-events-auto">
            <motion.span
              style={{ color: titleColor }}
              className="inline-block uppercase tracking-[0.3em] text-xs font-semibold mb-6"
            >
              About Mithraa Studio
            </motion.span>

            <motion.p
              style={{ color: quoteColor }}
              className="font-serif text-lg md:text-xl lg:text-2xl italic font-light mb-8 leading-relaxed"
            >
              "Some moments deserve more than a place in your camera roll. They deserve a place in your life."
            </motion.p>

            <motion.p
              style={{ color: bodyColor }}
              className="text-sm md:text-base font-light leading-relaxed mb-6"
            >
              Life's most meaningful moments and your core memories are meant to be treasured for years to come.
            </motion.p>

            <motion.p
              style={{ color: bodyColor }}
              className="text-sm md:text-base font-light leading-relaxed"
            >
              At Mithraa Studio, we transform photographs, milestones, and achievements into timeless artworks that become a part of your home and your story.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Target Audience & Pain Points */}
      <section id="services-preview" ref={forWhomRef} className="py-24 bg-gray-50 border-y border-gray-100 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span variants={fadeIn} className="text-primary uppercase tracking-widest text-xs font-bold mb-4 block">For Whom We Create</motion.span>
            <motion.h2 variants={fadeIn} className="font-serif text-3xl md:text-4xl font-medium mb-16 text-foreground">
              When memories deserve more than <span className="italic text-primary">a photograph.</span>
            </motion.h2>

            <div className="flex flex-col lg:flex-row items-center justify-center -space-y-6 lg:space-y-0 lg:-space-x-12 px-6 max-w-6xl mx-auto mt-16 pb-12 relative min-h-[400px]">
              {/* Card 1 */}
              <motion.div
                style={{ rotate: rotateLeft, x: isMobile ? 0 : xLeft }}
                whileHover={{ y: -10, scale: 1.02, zIndex: 10 }}
                data-text="01 / INDIVIDUALS"
                className="glass-fan-card p-8 lg:p-10 shadow-2xl hover:shadow-primary/5 transition-all duration-300 rounded-2xl max-w-sm w-full lg:w-[320px] min-h-[350px] pb-20 flex flex-col justify-between text-left"
              >
                <div>
                  <Users className="text-primary mb-6" size={32} strokeWidth={1.5} />
                  <h3 className="font-serif text-xl font-medium mb-4 text-foreground">Families & Individuals</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Tired of generic gifts and digital photos gathering dust? We turn weddings, anniversaries, and family portraits into stunning centerpiece art.
                  </p>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                style={{ y: isMobile ? 0 : yMiddle }}
                whileHover={{ y: -15, scale: 1.02, zIndex: 10 }}
                data-text="02 / ACHIEVEMENTS"
                className="glass-fan-card p-8 lg:p-10 shadow-2xl hover:shadow-primary/5 transition-all duration-300 rounded-2xl max-w-sm w-full lg:w-[320px] min-h-[350px] pb-20 flex flex-col justify-between text-left z-2"
              >
                <div>
                  <Award className="text-primary mb-6" size={32} strokeWidth={1.5} />
                  <h3 className="font-serif text-xl font-medium mb-4 text-foreground">Students & Professionals</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Graduations and promotions deserve more than a paper certificate in a drawer. We elevate achievements into framed statements of pride.
                  </p>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                style={{ rotate: rotateRight, x: isMobile ? 0 : xRight }}
                whileHover={{ y: -10, scale: 1.02, zIndex: 10 }}
                data-text="03 / CORPORATES"
                className="glass-fan-card p-8 lg:p-10 shadow-2xl hover:shadow-primary/5 transition-all duration-300 rounded-2xl max-w-sm w-full lg:w-[320px] min-h-[350px] pb-20 flex flex-col justify-between text-left"
              >
                <div>
                  <Star className="text-primary mb-6" size={32} strokeWidth={1.5} />
                  <h3 className="font-serif text-xl font-medium mb-4 text-foreground">Corporates & Institutions</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Move beyond standard corporate swag. We craft branded artwork and recognition pieces that make teams and clients feel truly valued.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Luxury Service Transition Section */}
      <LuxuryServiceTransition />

      {/* CTA */}
      <section className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
        {/* CSS Keyframes for circular carousel */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin-carousel {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes unspin-carousel {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
          .animate-spin-carousel {
            animation: spin-carousel 80s infinite linear;
          }
          .animate-unspin-carousel {
            animation: unspin-carousel 80s infinite linear;
          }
        `}} />

        <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1542044896530-05d3c8c566fb?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start">
              <span className="text-primary uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">
                Start Today
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-8 leading-[1.15]">
                Ready to frame <br />your legacy?
              </h2>
              <p className="text-gray-300 font-light mb-10 text-base md:text-lg leading-relaxed max-w-xl">
                Schedule a free consultation to discuss your vision. Let us help you turn a moment, a milestone, or an achievement into an heirloom-quality masterpiece.
              </p>
              <Button asChild className="h-14 px-10 bg-primary hover:bg-primary/95 text-white rounded-none text-sm uppercase tracking-widest font-medium transition-all duration-300">
                <Link href="/services">Start The Journey</Link>
              </Button>
            </div>

            {/* Right Circular Carousel Column */}
            <div className="lg:col-span-6 flex items-center justify-center relative min-h-[360px] md:min-h-[500px]">
              <div className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px] flex items-center justify-center select-none">
                
                {/* Carousel Wheel */}
                <div className="absolute w-full h-full rounded-full border border-white/5 flex items-center justify-center animate-spin-carousel">
                  {artworkImages.map((src, index) => {
                    const angle = (index * 360) / artworkImages.length;
                    
                    const hasHovered = hoveredArtwork !== null;
                    const dist = hoveredArtwork !== null ? Math.min(
                      Math.abs(index - hoveredArtwork),
                      artworkImages.length - Math.abs(index - hoveredArtwork)
                    ) : 0;
                    
                    const scale = hasHovered ? 1 + 0.3 * Math.exp(-0.8 * dist) : 1;
                    const opacity = hasHovered ? (dist === 0 ? 1 : 0.35 + 0.15 * Math.exp(-0.5 * dist)) : 0.85;
                    const blur = hasHovered ? (dist === 0 ? 0 : dist * 1.5) : 0;
                    
                    return (
                      <div
                        key={index}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center pointer-events-none"
                        style={{
                          transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                        }}
                      >
                        <div className="translate-y-[-110px] md:translate-y-[-185px]">
                          <div style={{ transform: `rotate(${-angle}deg)` }}>
                            <div className="animate-unspin-carousel pointer-events-auto">
                              <motion.div
                                animate={{
                                  scale: scale,
                                  opacity: opacity,
                                  filter: `blur(${blur}px)`,
                                }}
                                transition={{
                                  type: "spring",
                                  stiffness: 180,
                                  damping: 18,
                                }}
                                onMouseEnter={() => setHoveredArtwork(index)}
                                onMouseLeave={() => setHoveredArtwork(null)}
                                className="w-[70px] h-[70px] md:w-[115px] md:h-[115px] bg-white p-1.5 md:p-2.5 shadow-xl hover:shadow-2xl hover:z-50 cursor-pointer border border-white/10 group transition-shadow duration-300 relative overflow-hidden"
                                style={{
                                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3), 0 8px 10px -6px rgba(0,0,0,0.3)"
                                }}
                              >
                                <div className="w-full h-full overflow-hidden relative">
                                  <img
                                    src={src}
                                    alt={`Artwork ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                </div>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Central brand badge */}
                <div className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full bg-foreground/90 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center p-2 z-20 pointer-events-none">
                  <span className="font-serif text-[10px] md:text-[12px] tracking-[0.2em] text-primary uppercase font-semibold">Mithraa</span>
                  <div className="w-6 h-[1px] bg-primary/40 my-1"></div>
                  <span className="font-sans text-[8px] md:text-[9px] tracking-[0.15em] text-muted-foreground uppercase">Studio</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
