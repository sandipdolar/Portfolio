import React, { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

import { ArrowUpRight, Download } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      {/* =================================================================
          HERO
        ================================================================= */}
      <section
        id="home"
        className="relative pt-36 pb-24 md:pt-44 md:pb-32 px-6 overflow-hidden"
      >
        {/* subtle dot-grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 80%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-mono text-emerald-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                available for internships &amp; freelance work
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="font-display mt-6 text-3xl sm:text-5xl lg:text-[3.4rem] font-semibold tracking-tight leading-[1.08]">
                Hi, I'm Sandip Dolar.
                <br />
                <span className="text-emerald-600">Full Stack Developer</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 text-slate-600 text-[14px]  sm:text-lg leading-relaxed max-w-md ">
                A BCA final-year student who builds fast, functional products
                end to end — from React interfaces to PHP/MySQL admin panels and
                custom WordPress storefronts.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => scrollTo("projects")}
                  className="hidden select-none md:inline-flex items-center gap-2 rounded-lg bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:bg-slate-700 transition-colors"
                >
                  View Projects <ArrowUpRight size={20} />
                </button>
                <a
                  href="/Resume.pdf"
                  target="_blank"
                  className="md:hidden select-none inline-flex items-center gap-2 rounded-lg bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:bg-slate-700 transition-colors"
                >
                  <Download size={20} /> Resume
                </a>
                <button
                  onClick={() => scrollTo("contact")}
                  className="select-none inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  Get in Touch
                </button>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-6 flex items-center gap-5 text-slate-400">
                {/* TODO: replace # with your real profile URLs */}
                <a
                  href="https://github.com/sandipdolar"
                  aria-label="GitHub"
                  target="_blank"
                >
                  <FaGithub size={20} color="#333" />
                </a>
                <a
                  href="https://www.linkedin.com/in/sandip-dolar-94b28633b/"
                  aria-label="LinkedIn"
                  target="_blank"
                >
                  <BsLinkedin size={20} color="#0A66C2" />
                </a>
                <a
                  href="mailto:sandipdolar221@gmail.com"
                  aria-label="Email"
                  target="_blank"
                >
                  <FaEnvelope size={20} color="#333" />
                </a>
                <a
                  href="https://www.instagram.com/sandip._.ahir._.212/"
                  aria-label="FaInstagram"
                  target="_blank"
                >
                  <FaInstagram size={20} color="#E4405F" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Signature element: a fake "code editor" card introducing Sandip */}
          <Reveal delay={200}>
            <div className="rounded-lg border border-slate-200 shadow-xl shadow-slate-200/60 bg-[#0d1117] w-full max-w-full overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 bg-[#161b22] border-b border-black/30">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-3 text-[11px] font-mono text-slate-400">
                  developer.js
                </span>
              </div>
              <pre className="p-6 text-[13px] leading-relaxed font-mono overflow-auto">
                <code>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-sky-300">developer</span>{" "}
                  <span className="text-slate-400">=</span>
                  <span className="text-slate-400">{" {"}</span>
                  {"\n  "}
                  <span className="text-emerald-300">name</span>
                  <span className="text-slate-400">:</span>{" "}
                  <span className="text-amber-200">"Sandip Dolar"</span>
                  <span className="text-slate-400">,</span>
                  {"\n  "}
                  <span className="text-emerald-300">role</span>
                  <span className="text-slate-400">:</span>{" "}
                  <span className="text-amber-200">"Full Stack Developer"</span>
                  <span className="text-slate-400">,</span>
                  {"\n  "}
                  <span className="text-emerald-300">education</span>
                  <span className="text-slate-400">:</span>{" "}
                  <span className="text-amber-200">"BCA — Final Year"</span>
                  <span className="text-slate-400">,</span>
                  {"\n  "}
                  <span className="text-emerald-300">stack</span>
                  <span className="text-slate-400">:</span>{" "}
                  <span className="text-slate-400">[</span>
                  <span className="text-amber-200">"React"</span>
                  <span className="text-slate-400">, </span>
                  <span className="text-amber-200">"PHP"</span>
                  <span className="text-slate-400">, </span>
                  <span className="text-amber-200">"WordPress"</span>
                  <span className="text-slate-400">, </span>
                  <span className="text-amber-200">"MongoDB"</span>
                  <span className="text-slate-400">],</span>
                  {"\n  "}
                  <span className="text-emerald-300">status</span>
                  <span className="text-slate-400">:</span>{" "}
                  <span className="text-amber-200">"Open to work"</span>
                  <span className="text-slate-400">,</span>
                  {"\n"}
                  <span className="text-slate-400">{" }"}</span>     
                  <span className="cursor-blink text-slate-400">▍</span>
                </code>
              </pre>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Hero;
