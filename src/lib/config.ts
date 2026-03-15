// ─────────────────────────────────────────────────────────────────────────────
// SITE CONFIG — Edit this file to customise the site for each restaurant demo
// ─────────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  // ── Identity ──────────────────────────────────────────────────────────────
  /** The restaurant name — used in header, footer, WhatsApp message, etc. */
  name: "Healthy Hub",
  /** Second word / location shown below brand name in header */
  nameAccent: "Kuliyapitiya",
  /** Short tagline shown in hero badge and footer */
  tagline: "Fresh · Healthy · Daily",

  // ── Logo ──────────────────────────────────────────────────────────────────
  logo: {
    /** Path relative to /public — e.g. "/kitchen-lanka-logo.png" */
    src: "/kitchen-lanka-logo.png",
    alt: "Healthy Hub Logo",
  },

  // ── Meta (SEO) ────────────────────────────────────────────────────────────
  meta: {
    title: "Healthy Hub Kuliyapitiya — Fresh Daily Meals",
    description:
      "Authentic healthy daily meals delivered to your doorstep in Kuliyapitiya. Pre-order your weekly meals Monday to Saturday.",
  },

  // ── Contact ───────────────────────────────────────────────────────────────
  contact: {
    phone: "070 606 8114",
    /** Full international format, no spaces/+: for wa.me links */
    whatsapp: "94706068114",
    address: "Kuliyapitiya, Sri Lanka",
    email: "",
  },

  // ── Location & Establishment ──────────────────────────────────────────────
  location: "Kuliyapitiya, SL",
  established: "2024",

  // ── Social Links (set "#" to hide) ────────────────────────────────────────
  socials: {
    instagram: "#",
    facebook: "#",
    tiktok: "#",
  },

  // ── Currency ──────────────────────────────────────────────────────────────
  currency: "LKR",

  // ── Navigation Links ─────────────────────────────────────────────────────
  navLinks: [
    { label: "Our Story", href: "#" },
    { label: "Weekly Menu", href: "#" },
    { label: "Catering", href: "#" },
    { label: "Contact", href: "#" },
  ],

  // ── Hero Section ─────────────────────────────────────────────────────────
  hero: {
    /** Left-aligned title word (spreads on scroll) */
    titleLine1: "Healthy",
    /** Centre italic accent word */
    titleAccent: "Daily",
    /** Right-aligned title word (spreads on scroll) */
    titleLine2: "Meals",
    /** Small badge text above the main title */
    subtitle: "Healthy Hub Kuliyapitiya",
    /** Paragraph below the title */
    description:
      "Experience the true essence of healthy eating with our hand-crafted daily meals. Pre-order your weekly selection from Monday to Saturday.",
    /** CTA button text */
    ctaText: "Explore This Week's Menu",
  },

  // ── Menu Section ─────────────────────────────────────────────────────────
  menu: {
    /** Days available in the day-selector tabs */
    days: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"],
    sectionTitle1: "Our",
    sectionTitleAccent: "Menu",
    sectionSubtitle: "FRESH · WHOLESOME · SEASONAL",
  },

  // ── Food Card ─────────────────────────────────────────────────────────────
  foodCard: {
    recipeLabel: "Daily Special",
    portionLabel: "Hand-prepared",
  },

  // ── Footer ───────────────────────────────────────────────────────────────
  footer: {
    links: [
      { label: "Delivery Info", href: "#" },
      { label: "Bulk Orders", href: "#" },
      { label: "Contact", href: "#" },
    ],
    copyright: "© 2024 Healthy Hub Kuliyapitiya. Proudly Sri Lankan.",
    developerBrand: "INT8LIGEN AI",
    developerLink: "https://tharushika-portfolio.vercel.app",
  },

  // ── Theme (for future parameterisation) ───────────────────────────────────
  theme: {
    /** Primary accent — amber amber-600 equivalent */
    accent: "#d97706",
    accentLight: "#f59e0b",
    accentDark: "#b45309",
    background: "#0a0a0a",
    cardBg: "#141414",
  },
}
