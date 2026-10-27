// Canonical origin for metadata, sitemap and JSON-LD. Set SITE_URL in each
// environment once the production domain is confirmed; on Vercel we fall back
// to the project's production URL.
const vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = new URL(
  process.env.SITE_URL ??
    (vercelProductionHost ? `https://${vercelProductionHost}` : "http://localhost:3000"),
);

export const site = {
  name: "Destination Drifters",
  title: "Destination Drifters | Travel Journal & Outdoor Exploration",
  description:
    "A living travel journal for explorers, wanderers, and outdoor enthusiasts. Discover destinations, read travel stories, and find your next adventure.",
  ogImage: "/about/hero2.jpeg",
  logo: "/drifters-logo-web.svg",
};
