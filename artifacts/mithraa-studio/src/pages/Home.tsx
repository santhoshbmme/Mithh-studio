import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Star, Heart, Award, Users, Image as ImageIcon, Frame } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
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

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
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

        <div className="container mx-auto px-6 relative z-30 text-center max-w-4xl pt-20">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.span variants={fadeIn} className="inline-block text-primary uppercase tracking-[0.3em] text-sm font-semibold mb-6">
              Welcome to Mithraa
            </motion.span>
            <motion.h1 variants={fadeIn} className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-foreground leading-[1.1] mb-8">
              Turning Memories <br/><span className="italic font-light text-primary/90">Into Timeless Art</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              We transform your most cherished moments, achievements, and relationships into heirloom-quality artwork and premium gifts.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button asChild className="h-14 px-8 rounded-none bg-foreground text-background hover:bg-primary text-sm uppercase tracking-widest font-medium transition-all duration-300">
                <Link href="/services">Explore Collections</Link>
              </Button>
              <Link href="/services" className="font-sans text-sm uppercase tracking-widest font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                Consult With Us <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are & Vision */}
      <section className="py-32 bg-background relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-medium mb-8">More than a studio.<br/>A guardian of your legacy.</h2>
              <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                At Mithraa Studio, we believe that life's profound moments deserve more than just a digital footprint. We are a premium atelier dedicated to the craft of physical memory preservation.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-10 font-light">
                Whether it's a family milestone, a graduation, or a corporate triumph, we hand-craft personalized artwork, bespoke gifts, and museum-quality framed keepsakes that resonate with emotional weight.
              </p>

              <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                <div>
                  <h3 className="font-sans text-sm uppercase tracking-widest font-bold mb-3 flex items-center gap-2 text-foreground">
                    <Star size={16} className="text-primary" /> Our Vision
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">To be the sanctuary where fleeting moments are immortalized into tangible art that spans generations.</p>
                </div>
                <div>
                  <h3 className="font-sans text-sm uppercase tracking-widest font-bold mb-3 flex items-center gap-2 text-foreground">
                    <Heart size={16} className="text-primary" /> Our Mission
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">To deliver unhurried, elevated, and deeply personal artistic solutions that honor the significance of every story.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-gray-100 p-4 shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=2080&auto=format&fit=crop" 
                  alt="Crafting Art" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-2/3 aspect-square bg-primary/10 z-0"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Target Audience & Pain Points */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span variants={fadeIn} className="text-primary uppercase tracking-widest text-xs font-bold mb-4 block">For Whom We Create</motion.span>
            <motion.h2 variants={fadeIn} className="font-serif text-3xl md:text-4xl font-medium mb-16">
              When ordinary gifts simply <span className="italic text-primary">aren't enough.</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-12 text-left">
              <motion.div variants={fadeIn} className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-50">
                <Users className="text-primary mb-6" size={32} strokeWidth={1.5} />
                <h3 className="font-serif text-xl font-medium mb-4">Families & Individuals</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Tired of generic gifts and digital photos gathering dust? We turn weddings, anniversaries, and family portraits into stunning centerpiece art.
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-50">
                <Award className="text-primary mb-6" size={32} strokeWidth={1.5} />
                <h3 className="font-serif text-xl font-medium mb-4">Students & Professionals</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Graduations and promotions deserve more than a paper certificate in a drawer. We elevate achievements into framed statements of pride.
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-50">
                <Star className="text-primary mb-6" size={32} strokeWidth={1.5} />
                <h3 className="font-serif text-xl font-medium mb-4">Corporates & Institutions</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Move beyond standard corporate swag. We craft branded artwork and recognition pieces that make teams and clients feel truly valued.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-primary uppercase tracking-widest text-xs font-bold mb-4 block">Our Offerings</span>
              <h2 className="font-serif text-4xl md:text-5xl font-medium">Curated Services</h2>
            </div>
            <Link href="/services" className="font-sans text-sm uppercase tracking-widest font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2 group">
              View All Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <ImageIcon size={24} />, title: "Portrait Artwork", desc: "Hand-crafted portraits from cherished photos." },
              { icon: <Heart size={24} />, title: "Personalized Gifting", desc: "Custom gifts that speak from the heart." },
              { icon: <Award size={24} />, title: "Achievement Recognition", desc: "Plaques, certificates, and recognition art." },
              { icon: <Users size={24} />, title: "Corporate Solutions", desc: "Branded artwork for offices and events." },
              { icon: <Frame size={24} />, title: "Premium Framing", desc: "Museum-quality frames for lasting impressions." },
              { icon: <Star size={24} />, title: "Memory Preservation", desc: "Transforming memories into timeless keepsakes." },
            ].map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group p-10 bg-white border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
                <div className="text-primary/70 group-hover:text-primary transition-colors mb-6">
                  {service.icon}
                </div>
                <h3 className="font-serif text-xl font-medium mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm font-light leading-relaxed mb-6">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1542044896530-05d3c8c566fb?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="font-serif text-4xl md:text-6xl font-medium mb-8">Ready to frame your legacy?</h2>
          <p className="text-gray-300 font-light max-w-2xl mx-auto mb-12 text-lg">
            Schedule a free consultation to discuss your vision. Let us help you turn a moment into a masterpiece.
          </p>
          <Button asChild className="h-14 px-10 bg-primary hover:bg-primary/90 text-white rounded-none text-sm uppercase tracking-widest font-medium transition-all">
            <Link href="/services">Start The Journey</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
