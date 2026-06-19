import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Check, Mail, Phone, Instagram, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function Services() {
  return (
    <div className="min-h-screen bg-background font-sans pt-24">
      <Navbar />

      {/* Header */}
      <section className="py-20 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.span variants={fadeIn} className="text-primary uppercase tracking-widest text-xs font-bold mb-6 block">The Atelier</motion.span>
            <motion.h1 variants={fadeIn} className="font-serif text-4xl md:text-6xl font-medium mb-6">Our Services & Pricing</motion.h1>
            <motion.p variants={fadeIn} className="text-muted-foreground font-light text-lg leading-relaxed">
              Every offering is executed with meticulous attention to detail, premium materials, and an unwavering commitment to emotional resonance.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Detailed Services List */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 max-w-6xl mx-auto">
            {[
              { num: "01", title: "Portrait Artwork", desc: "We take your cherished photographs and elevate them through expert retouching, artistic filters, or hand-painted styles, printed on archival canvas or fine-art paper." },
              { num: "02", title: "Personalized Gifting", desc: "Beyond standard engraving. We create bespoke gifts—from custom journals to artistic home decor—that speak directly from the heart of the giver to the receiver." },
              { num: "03", title: "Achievement Recognition", desc: "For graduations, retirements, and awards. We design elegant plaques, stylized certificates, and artistic summaries of an individual's journey." },
              { num: "04", title: "Corporate Solutions", desc: "Bulk orders with soul. From branded office artwork that inspires teams, to premium client gifts that leave a lasting impression of quality." },
              { num: "05", title: "Premium Framing", desc: "The final touch. We use museum-quality, acid-free mats, UV-protective glass, and solid wood or metallic frames to protect and showcase your art." },
              { num: "06", title: "Memory Preservation", desc: "Curating scattered photos and mementos from events (weddings, baby showers) into cohesive, beautifully bound albums or collage art." },
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="flex gap-6 group"
              >
                <div className="font-serif text-3xl text-primary/30 font-light group-hover:text-primary transition-colors">{service.num}</div>
                <div>
                  <h3 className="font-serif text-2xl font-medium mb-3">{service.title}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Covered Banner */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-6 text-center max-w-5xl">
          <span className="text-primary uppercase tracking-widest text-xs font-bold mb-6 block">Moments We Capture</span>
          <h2 className="font-serif text-3xl md:text-5xl font-medium mb-16">Life's Milestones, Elevated.</h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-sans text-lg uppercase tracking-wider text-primary mb-6 border-b border-gray-800 pb-4">Family</h3>
              <ul className="space-y-3 font-light text-gray-400">
                <li>Birthdays & Anniversaries</li>
                <li>Family Reunions</li>
                <li>Baby Showers</li>
                <li>Memorials</li>
              </ul>
            </div>
            <div>
              <h3 className="font-sans text-lg uppercase tracking-wider text-primary mb-6 border-b border-gray-800 pb-4">Achievement</h3>
              <ul className="space-y-3 font-light text-gray-400">
                <li>Graduations</li>
                <li>Promotions</li>
                <li>Retirements</li>
                <li>Special Awards</li>
              </ul>
            </div>
            <div>
              <h3 className="font-sans text-lg uppercase tracking-wider text-primary mb-6 border-b border-gray-800 pb-4">Corporate</h3>
              <ul className="space-y-3 font-light text-gray-400">
                <li>Product Launches</li>
                <li>Company Milestones</li>
                <li>Annual Awards</li>
                <li>Team Recognition</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">Investment in Quality</h2>
            <p className="text-muted-foreground font-light max-w-2xl mx-auto">Transparent, structured packages designed to meet you where you are, whether you're gifting a loved one or outfitting a corporate office.</p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Free Consultation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 border border-gray-200 hover:border-primary/50 transition-colors flex flex-col"
            >
              <h3 className="font-serif text-xl font-medium mb-2">Discovery</h3>
              <div className="text-3xl font-light mb-6">Free</div>
              <p className="text-sm text-muted-foreground mb-8 flex-grow">Initial discovery session to understand your vision and requirements.</p>
              <ul className="space-y-4 mb-8 text-sm text-muted-foreground font-light">
                <li className="flex gap-3"><Check size={16} className="text-primary shrink-0" /> 30-min consultation</li>
                <li className="flex gap-3"><Check size={16} className="text-primary shrink-0" /> Style matching</li>
                <li className="flex gap-3"><Check size={16} className="text-primary shrink-0" /> Custom quote generation</li>
              </ul>
              <Button variant="outline" className="w-full rounded-none font-sans uppercase tracking-widest text-xs">Book Now</Button>
            </motion.div>

            {/* Personal */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 border border-gray-200 hover:border-primary/50 transition-colors flex flex-col"
            >
              <h3 className="font-serif text-xl font-medium mb-2">Personal</h3>
              <div className="text-sm uppercase tracking-widest text-primary mb-6">Starts at ₹4,999</div>
              <p className="text-sm text-muted-foreground mb-8 flex-grow">For individuals and families looking for entry-level artwork and beautiful gifts.</p>
              <ul className="space-y-4 mb-8 text-sm text-muted-foreground font-light">
                <li className="flex gap-3"><Check size={16} className="text-primary shrink-0" /> Standard framing options</li>
                <li className="flex gap-3"><Check size={16} className="text-primary shrink-0" /> 2 design revisions</li>
                <li className="flex gap-3"><Check size={16} className="text-primary shrink-0" /> Standard delivery (7-10 days)</li>
                <li className="flex gap-3"><Check size={16} className="text-primary shrink-0" /> Digital proof included</li>
              </ul>
              <Button variant="outline" className="w-full rounded-none font-sans uppercase tracking-widest text-xs">Inquire</Button>
            </motion.div>

            {/* Premium */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-foreground text-background p-8 relative flex flex-col transform md:-translate-y-4 shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <h3 className="font-serif text-xl font-medium mb-2">Premium</h3>
              <div className="text-sm uppercase tracking-widest text-primary mb-6">Bespoke Pricing</div>
              <p className="text-sm text-gray-400 mb-8 flex-grow">Highest quality materials, completely bespoke experience for heirloom pieces.</p>
              <ul className="space-y-4 mb-8 text-sm text-gray-300 font-light">
                <li className="flex gap-3"><Check size={16} className="text-primary shrink-0" /> Museum-grade materials</li>
                <li className="flex gap-3"><Check size={16} className="text-primary shrink-0" /> Unlimited design revisions</li>
                <li className="flex gap-3"><Check size={16} className="text-primary shrink-0" /> Priority rush available</li>
                <li className="flex gap-3"><Check size={16} className="text-primary shrink-0" /> Dedicated artisan assigned</li>
              </ul>
              <Button className="w-full rounded-none bg-primary hover:bg-primary/90 text-white font-sans uppercase tracking-widest text-xs">Select Premium</Button>
            </motion.div>

            {/* Corporate */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 border border-gray-200 hover:border-primary/50 transition-colors flex flex-col"
            >
              <h3 className="font-serif text-xl font-medium mb-2">Corporate</h3>
              <div className="text-sm uppercase tracking-widest text-primary mb-6">Volume Pricing</div>
              <p className="text-sm text-muted-foreground mb-8 flex-grow">Bulk orders, branded artwork, and comprehensive event coverage.</p>
              <ul className="space-y-4 mb-8 text-sm text-muted-foreground font-light">
                <li className="flex gap-3"><Check size={16} className="text-primary shrink-0" /> Dedicated account manager</li>
                <li className="flex gap-3"><Check size={16} className="text-primary shrink-0" /> Brand guideline integration</li>
                <li className="flex gap-3"><Check size={16} className="text-primary shrink-0" /> Volume discounts</li>
                <li className="flex gap-3"><Check size={16} className="text-primary shrink-0" /> White-label shipping options</li>
              </ul>
              <Button variant="outline" className="w-full rounded-none font-sans uppercase tracking-widest text-xs">Contact Sales</Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Promise & Contact */}
      <section className="py-24 border-t border-gray-100 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-4xl font-medium mb-8">Our Promise to You</h2>
              <div className="space-y-6">
                <p className="text-muted-foreground font-light leading-relaxed">
                  We don't mass-produce. We don't compromise on materials. Every piece that leaves Mithraa Studio carries our name and our reputation.
                </p>
                <p className="text-muted-foreground font-light leading-relaxed">
                  If you are not moved by the final piece, we have not done our job. We work with you until the artwork reflects the exact emotional tenor of the moment it represents.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-10 lg:p-16">
              <h3 className="font-serif text-2xl font-medium mb-8">Start the Conversation</h3>
              <div className="space-y-6 font-sans">
                <a href="#" className="flex items-center gap-4 group text-muted-foreground hover:text-foreground transition-colors">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-primary font-bold mb-1">WhatsApp / Call</div>
                    <div className="text-lg">+91 XXXXX XXXXX</div>
                  </div>
                </a>

                <a href="#" className="flex items-center gap-4 group text-muted-foreground hover:text-foreground transition-colors">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-primary font-bold mb-1">Email</div>
                    <div className="text-lg">hello@mithraastudio.com</div>
                  </div>
                </a>

                <a href="#" className="flex items-center gap-4 group text-muted-foreground hover:text-foreground transition-colors">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                    <Instagram size={20} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-primary font-bold mb-1">Instagram</div>
                    <div className="text-lg">@mithraastudio</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
