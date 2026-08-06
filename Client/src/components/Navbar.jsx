import React, { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "../data/navigation";
import {
  Menu,
  Download,
  X,
} from "lucide-react";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  
  return (
    <>
      {/* =================================================================
          NAVIGATION
         ================================================================= */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <nav className="mx-auto  px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("home")}
            className="font-display font-semibold text-2xl md:text-[20px] lg:text-2xl tracking-tight flex items-center gap-2 cursor-pointer"
          >
            Sandip Dolar
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1  text-[12px]">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeSection === link.id
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <a
            href="/Resume.pdf"
            target="_blank"
            className="select-none hidden md:flex  items-center gap-1.5 rounded-md bg-slate-900 text-white px-4 py-2 text-[16px] font-sans font-medium hover:bg-slate-700 transition-colors"
          >
            <Download size={20} /> Resume
          </a>

          {/* Mobile toggle */}
          <button
            className="md:hidden cursor-pointer text-slate-700"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-6 py-4 flex flex-col gap-1 font-mono text-sm">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`cursor-pointer text-left px-3 py-2 rounded-md ${
                  activeSection === link.id
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-slate-600"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
