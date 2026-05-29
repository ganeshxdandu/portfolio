export const siteConfig = {
  name: "Ganesh Dandu",
  title: "Ganesh Dandu — Freelance Web Designer & Developer",
  description:
    "I design and develop modern websites that are fast, clean, conversion-focused, and enjoyable to use.",
  url: "https://ganeshdandu.com",
};

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
] as const;

export const projects = [
  {
    name: "Meridian Health",
    industry: "Healthcare",
    description:
      "Complete website redesign for a healthcare platform, focusing on patient trust and conversion optimization.",
    outcome: "42% increase in appointment bookings",
    image: "/projects/meridian.jpg",
  },
  {
    name: "Artisan & Co.",
    industry: "E-commerce",
    description:
      "A minimal, fast-loading storefront for a premium artisan goods brand with seamless checkout flow.",
    outcome: "3.2s faster load time, 28% higher conversion",
    image: "/projects/artisan.jpg",
  },
  {
    name: "Nomad Studio",
    industry: "Creative Agency",
    description:
      "Portfolio and booking platform for a boutique photography studio with an editorial design language.",
    outcome: "65% more inquiries within first month",
    image: "/projects/nomad.jpg",
  },
  {
    name: "Greenfield Capital",
    industry: "Finance",
    description:
      "Corporate website for an investment firm, balancing professionalism with approachability.",
    outcome: "Launched in 3 weeks, fully responsive",
    image: "/projects/greenfield.jpg",
  },
] as const;

export const services = [
  {
    title: "Website Design",
    description:
      "Crafting visual identities and layouts that communicate your brand with clarity and elegance.",
  },
  {
    title: "Website Development",
    description:
      "Building performant, accessible websites with modern technologies and clean code.",
  },
  {
    title: "Landing Pages",
    description:
      "Conversion-focused pages designed to turn visitors into customers.",
  },
  {
    title: "Portfolio Websites",
    description:
      "Showcasing your work with intention, letting your craft speak for itself.",
  },
  {
    title: "Business Websites",
    description:
      "Professional online presence that builds trust and drives growth.",
  },
] as const;

export const articles = [
  {
    title: "Why Most Websites Fail at First Impressions",
    date: "2026-04-12",
    url: "#",
  },
  {
    title: "The Case for Minimal Design in 2026",
    date: "2026-03-28",
    url: "#",
  },
  {
    title: "Performance Is a Design Decision",
    date: "2026-02-15",
    url: "#",
  },
  {
    title: "Typography Alone Can Carry a Website",
    date: "2026-01-20",
    url: "#",
  },
  {
    title: "What Clients Actually Want from a Freelancer",
    date: "2025-12-08",
    url: "#",
  },
] as const;

export const socials = {
  email: "ganeshdandu.co@gmail.com",
  github: "https://github.com/ganeshxdandu",
  twitter: "https://x.com/ganeshxdandu",
} as const;
