const fs = require("fs");
const path = require("path");
const base = (process.env.SITE_URL || "").replace(/\/+$/, "");
if (!/^https:\/\/[a-z0-9.-]+(?::\d+)?$/i.test(base)) {
  console.error("Set SITE_URL to the final HTTPS domain, for example SITE_URL=https://example.com");
  process.exit(1);
}
const pages = [
  "", "about.html", "expertise.html", "experience.html", "projects.html",
  "project-mevapay.html", "project-navirado.html", "resume.html", "contact.html"
];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(page => `  <url><loc>${base}/${page}</loc></url>`).join("\n")}\n</urlset>\n`;
fs.writeFileSync(path.join(__dirname, "..", "sitemap.xml"), xml);
console.log("Updated sitemap.xml for", base);
