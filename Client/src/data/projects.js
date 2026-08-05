import { ShoppingCart, LayoutDashboard, Globe} from "lucide-react";

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
    links: { demo: "#", code: "#" },
    image: null,
  },
];