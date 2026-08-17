import { ShoppingCart, LayoutDashboard, Globe, Tv} from "lucide-react";
import IT_EXHIBITION from "/IT_EXHIBITION.png"; 
import Portfolio from "/Portfolio.png"; 
import CRUNCHYROLL_CLONE from "/crunchyroll-clone.png"; 

export const PROJECTS = [
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
    links: {
      demo: "https://sandipdolar.vercel.app/", 
      code: "Portfolio" 
    },
    image: Portfolio,
  },
  {
    title: "IT Exhibition — Technology Showcase Website",
    description:
      "My first college project website, developed for an IT Exhibition to showcase innovative student projects, exhibition details, schedules, registration, and feedback. This project gave me my first hands-on experience in building a complete website.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    icon: Globe,
    links: {
      demo: "https://sandipdolar.github.io/IT_EXHIBITION/index.html",
      code: "IT_EXHIBITION",
    },
    image: IT_EXHIBITION,
  },

  {
  title: "Crunchyroll Clone — Anime Streaming Platform",
  description:
    "A responsive Crunchyroll-inspired anime streaming website built with React and Tailwind CSS. The project features a modern hero section, premium subscription plans, anime collection with responsive cards, membership sections, genre and popular-series navigation, language options, and a fully responsive layout for desktop and mobile devices.",
  tags: ["React", "Tailwind CSS", "Vite", "Responsive Design"],
  icon: Tv,
  links: {
    demo: "https://crunchyroll-clone-sandip.vercel.app/",
    code: "Crunchyroll_clone",
  },
  image: CRUNCHYROLL_CLONE,
},
];