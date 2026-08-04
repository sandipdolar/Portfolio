import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  ExternalLink,
  Download,
  ShoppingCart,
  LayoutDashboard,
  Globe,
  GraduationCap,
  Sparkles,
  Terminal as TerminalIcon,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa";

/* ----------------------------------------------------------------------- */
/*  DATA — edit this section to update your content, no need to touch JSX  */
/* ----------------------------------------------------------------------- */

const NAV_LINKS = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "projects", label: "PROJECTS" },
  { id: "skills", label: "SKILLS" },
  { id: "contact", label: "CONTACT" },
];

const STATS = [
  { value: "TYBCA", label: "Final year, BCA" },
  { value: "3+", label: "Real-world projects" },
  { value: "6", label: "Technologies used daily" },
  { value: "100%", label: "Hands-on, self-driven" },
];

const PROJECTS = [
  {
    title: "WooCommerce Store — Custom WordPress Theme",
    description:
      "A fully custom WordPress theme built from scratch and wired to WooCommerce — product catalog, cart, checkout, and an editable homepage, without relying on a page-builder plugin.",
    tags: ["WordPress", "WooCommerce", "PHP", "MySQL", "CSS"],
    icon: ShoppingCart,
    links: { demo: "#", code: "#" },
    // TODO: replace with a real screenshot, e.g. "/projects/woocommerce-store.png"
    image: null,
  },
  {
    title: "Admin Panel — PHP & MySQL CRUD Dashboard",
    description:
      "A secure admin dashboard with login authentication and full CRUD (Create, Read, Update, Delete) for managing records — built with core PHP and a normalized MySQL schema.",
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    icon: LayoutDashboard,
    links: { demo: "#", code: "#" },
    // TODO: replace with a real screenshot, e.g. "/projects/admin-panel.png"
    image: null,
  },
  {
    title: "This Portfolio — React + Tailwind CSS",
    description:
      "The site you're looking at right now. A responsive, component-based portfolio built with React and Tailwind CSS, focused on clean structure and subtle motion.",
    tags: ["React", "Tailwind CSS", "JavaScript"],
    icon: Globe,
    links: { demo: "#", code: "#" },
    image: null,
  },
];

const SKILL_GROUPS = [
  {
    category: "frontend",
    items: [
      { name: "HTML & CSS", level: 90 },
      { name: "JavaScript", level: 80 },
      { name: "React", level: 75 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    category: "backend",
    items: [
      { name: "PHP", level: 80 },
      { name: "MySQL", level: 78 },
      { name: "MongoDB", level: 65 },
      { name: "Node.js (basics)", level: 55 },
    ],
  },
  {
    category: "cms",
    items: [
      { name: "WordPress (Theme Dev)", level: 82 },
      { name: "WooCommerce", level: 75 },
    ],
  },
];

const TOOLS = [
  "Git & GitHub",
  "VS Code",
  "Figma",
  "Postman",
  "phpMyAdmin",
  "Chrome DevTools",
];

/* ----------------------------------------------------------------------- */
/*  REVEAL — small scroll-into-view animation wrapper (no external libs)   */
/* ----------------------------------------------------------------------- */

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/*  SKILL BAR — animates its width in when scrolled into view              */
/* ----------------------------------------------------------------------- */

function SkillBar({ name, level }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-4 last:mb-0">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm font-medium text-slate-800">{name}</span>
        <span className="font-mono text-xs text-slate-400">{level}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-emerald-600 transition-all duration-[1200ms] ease-out"
          style={{ width: visible ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/*  MAIN COMPONENT                                                         */
/* ----------------------------------------------------------------------- */

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  // Highlight the active nav tab as the user scrolls
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

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) return;

    try {
      setStatus("sending");

      const response = await axios.post(
        "https://portfolio-backend-2kq3.onrender.com/api/contact",
        form,
      );

      if (response.data.success) {
        setStatus("sent");

        setForm({
          name: "",
          email: "",
          message: "",
        });

        // Optional: change button back after 3 seconds
        setTimeout(() => {
          setStatus("");
        }, 3000);
      }
    } catch (error) {
      console.error(error);

      alert("Something went wrong!");

      setStatus("");
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* Google Fonts + a couple of custom keyframes not covered by core Tailwind */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        html { scroll-behavior: smooth; }
        @keyframes blink { 0%, 45% { opacity: 1; } 50%, 95% { opacity: 0; } 100% { opacity: 1; } }
        .cursor-blink { animation: blink 1.1s step-end infinite; }
        @keyframes dash-move { to { background-position: 40px 0; } }
      `}</style>

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
          <div className="hidden md:flex items-center gap-1  text-[14px]">
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
            className="md:hidden text-slate-700"
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
                className={`text-left px-3 py-2 rounded-md ${
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
                  {"\n"}
                  {"\n"}
                  <span className="text-purple-400">if</span>{" "}
                  <span className="text-slate-400">{"("}</span>{" "}
                  <span className="text-sky-300">{"name"}</span>{" "}
                  <span className="text-slate-400">{"=="}</span>{" "}
                  <span className="text-amber-200">"Sandip Dolar"</span>{" "}
                  <span className="text-slate-400">{")"}</span>{" "}
                  <span className="text-slate-400">{"{"}</span>
                  {"\n  "}
                  <span className="text-sky-300">{"error"}</span>{" "}
                  <span className="text-slate-400">{"="}</span>{" "}
                  <span className="text-sky-500">{"false"}</span>
                  <span className="text-slate-400">{";"}</span> {"\n"}
                  <span className="text-slate-400">{"}"}</span>
                  <span className="cursor-blink text-slate-400">▍</span>
                </code>
              </pre>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =================================================================
          ABOUT
      ================================================================= */}
      <section
        id="about"
        className="px-6 py-24 border-t border-slate-100 bg-slate-50/60"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="font-mono text-xs text-emerald-600">
              // 01 — about
            </span>
          </Reveal>

          <div className="mt-4 grid md:grid-cols-5 gap-12 items-start">
            <Reveal className="md:col-span-3" delay={80}>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                Turning coursework into real, working software.
              </h2>
              <p className="mt-5 text-slate-600 leading-relaxed">
                I'm currently in my final year of BCA, and I learn best by
                shipping — not just studying syntax. Over the past couple of
                years that's meant building a WooCommerce store from a custom
                WordPress theme, an admin dashboard in PHP and MySQL with full
                CRUD, and interfaces in React styled with Tailwind CSS. I've
                also started exploring MongoDB to round out the stack for full
                JavaScript-based apps.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                I care about clean structure and code that's easy to hand off —
                the same way I've tried to write this portfolio. I'm looking for
                an internship or freelance work where I can keep building things
                that are actually used.
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                <GraduationCap size={20} className="text-emerald-600" />
                TYBCA — Final Year, India
              </div>
            </Reveal>

            <Reveal className="md:col-span-2" delay={160}>
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-slate-200 bg-white p-5"
                  >
                    <div className="font-display text-2xl font-semibold text-slate-900">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs text-slate-500 leading-snug">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =================================================================
          PROJECTS
      ================================================================= */}
      <section id="projects" className="px-6 py-24 border-t border-slate-100">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="font-mono text-xs text-emerald-600">
              // 02 — projects
            </span>
            <h2 className="mt-4 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
              Things I've built
            </h2>
            <p className="mt-3 text-slate-600 max-w-xl">
              A mix of CMS, backend, and frontend work — each one solving a
              different kind of problem.
            </p>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {PROJECTS.map((project, i) => {
              const Icon = project.icon;
              return (
                <Reveal key={project.title} delay={i * 100}>
                  <div className="group h-full flex flex-col rounded-xl border border-slate-200 bg-white overflow-hidden hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/70 hover:-translate-y-1 transition-all duration-300">
                    {/* Image placeholder — swap for a real screenshot via project.image */}
                    <div className="relative h-40 bg-slate-900 flex items-center justify-center overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 1px, transparent 12px)",
                        }}
                      />
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Icon
                          className="relative text-emerald-400"
                          size={34}
                          strokeWidth={1.5}
                        />
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-display font-semibold text-slate-900 leading-snug">
                        {project.title}
                      </h3>
                      <p className="mt-2.5 text-sm text-slate-600 leading-relaxed flex-1">
                        {project.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-mono text-slate-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 flex items-center gap-4 pt-4 border-t border-slate-100 text-sm">
                        <a
                          href={project.links.demo}
                          className="inline-flex items-center gap-1.5 font-medium text-slate-900 hover:text-emerald-600 transition-colors"
                        >
                          Live Demo <ExternalLink size={20} />
                        </a>
                        <a
                          href={project.links.code}
                          className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors"
                        >
                          {/* <Github size={13} /> Source */}
                        </a>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================================
          SKILLS
      ================================================================= */}
      <section
        id="skills"
        className="px-6 py-24 border-t border-slate-100 bg-slate-50/60"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="font-mono text-xs text-emerald-600">
              // 03 — skills
            </span>
            <h2 className="mt-4 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
              What I work with
            </h2>
          </Reveal>

          <div className="mt-12 grid lg:grid-cols-3 gap-6">
            {SKILL_GROUPS.map((group, i) => (
              <Reveal key={group.category} delay={i * 100}>
                <div className="h-full rounded-xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center gap-2 mb-5 font-mono text-xs text-slate-400">
                    <TerminalIcon size={20} />
                    /skills/{group.category}
                  </div>
                  {group.items.map((skill) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                    />
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Tools — shown terminal-style, as a flat "$ cat tools.json" output */}
          <Reveal delay={300}>
            <div className="mt-6 rounded-xl border border-slate-200 bg-[#0d1117] p-6 font-mono text-[13px] overflow-x-auto">
              <div className="text-slate-500 mb-3">$ cat tools.json</div>
              <div className="flex flex-wrap gap-2">
                {TOOLS.map((tool) => (
                  <span
                    key={tool}
                    className="select-none rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-slate-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =================================================================
          CONTACT
      ================================================================= */}
      <section id="contact" className="px-6 py-24 border-t border-slate-100">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="font-mono text-xs text-emerald-600">
              // 04 — contact
            </span>
            <h2 className="mt-4 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
              Let's work together
            </h2>
            <p className="mt-3 text-slate-600 max-w-xl">
              Have an internship opening, freelance project, or just want to say
              hi? My inbox is open.
            </p>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-5 gap-8">
            {/* Info column */}
            <Reveal className="md:col-span-2" delay={80}>
              <div className="h-full rounded-xl border border-slate-200 bg-slate-900 text-white p-5 sm:p-6 md:p-7 flex flex-col justify-between">
                <div>
                  <Sparkles size={20} className="text-emerald-400" />
                  <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                    Based in India, open to remote internships and freelance
                    projects worldwide.
                  </p>
                </div>
                <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 text-sm">
                  {/* TODO: replace placeholders with your real details */}
                  <a
                    href="mailto:sandipdolar221@gmail.com"
                    className="flex items-center gap-3 hover:text-emerald-300 transition-colors"
                  >
                    <FaEnvelope size={20} /> sandipdolar221@gmail.com
                  </a>
                  <a
                    href="tel:+917567628465"
                    className="flex items-center gap-3 hover:text-emerald-300 transition-colors"
                  >
                    <Phone size={20} /> +91 7567628465
                  </a>
                  <div className="flex items-center gap-3 text-slate-400">
                    <MapPin size={20} /> India
                  </div>
                </div>
                <div className="mt-8 flex items-center gap-4 pt-6 border-t border-white/10">
                  <a
                    href="https://github.com/sandipdolar"
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    <FaGithub size={19} color="white" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sandip-dolar-94b28633b/"
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {/* <Linkedin size={18} /> */}
                    <BsLinkedin size={19} color="white" />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Form column */}
            <Reveal className="md:col-span-3" delay={160}>
              <form
                onSubmit={handleSubmit}
                className="rounded-xl border border-slate-200 p-7 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Drop your message here..."
                    className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="select-none inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 text-white px-6 py-3 text-sm font-medium hover:bg-slate-700 transition-colors disabled:opacity-60 w-full sm:w-auto"
                >
                  {status === "sending" ? (
                    "Sending..."
                  ) : status === "sent" ? (
                    <>
                      <CheckCircle2 size={16} /> Message sent
                    </>
                  ) : (
                    <>
                      Send Message <Send size={15} />
                    </>
                  )}
                </button>

                {status === "sent" && (
                  <p className="text-xs text-emerald-600">
                    Thanks for reaching out — I'll get back to you soon.
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>

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
    </div>
  );
}
