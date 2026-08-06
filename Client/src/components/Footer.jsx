import React, { useEffect, useRef, useState } from "react";
const Footer = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* =================================================================
          FOOTER
        ================================================================= */}
      <footer className="border-t border-slate-100 px-6 py-8">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
          <span>© {new Date().getFullYear()} Sandip Dolar</span>
          <button
            onClick={() => scrollTo("home")}
            className="hover:text-slate-700 transition-colors"
          >
            back to top ↑
          </button>
        </div>
      </footer>
    </>
  );
};

export default Footer;
