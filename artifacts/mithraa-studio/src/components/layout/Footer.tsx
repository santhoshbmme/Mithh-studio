import React from "react";
import { Link } from "wouter";
import { Instagram, Mail, Phone, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex flex-col group mb-6">
              <span className="font-serif text-3xl font-bold tracking-tight text-foreground">
                Mithraa
              </span>
              <span className="font-sans text-xs tracking-[0.3em] text-primary uppercase mt-1">Studio</span>
            </Link>
            <p className="text-muted-foreground font-sans max-w-sm leading-relaxed">
              Turning life's most meaningful moments into heirlooms. A premium art, gifting, and recognition brand.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 font-sans text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight size={14} /> Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight size={14} /> Services
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight size={14} /> Portfolio
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4 font-sans text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-primary mt-0.5" />
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-primary mt-0.5" />
                <span>hello@mithraastudio.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Instagram size={18} className="text-primary mt-0.5" />
                <span>@mithraastudio</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Mithraa Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
