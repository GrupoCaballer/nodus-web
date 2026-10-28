// Captura cada <section> de cada página a 1440 px de ancho, con todo revelado (sin animaciones).
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = "http://localhost:3000";
const OUT = process.argv[2];
const PAGES = [
  ["home", "/"],
  ["vender", "/vender"],
  ["comprar", "/comprar"],
  ["servicios", "/servicios"],
  ["nosotros", "/nosotros"],
  ["alquilar", "/alquilar"],
  ["zonas", "/zonas"],
  ["godella", "/zonas/godella"],
  ["rocafort", "/zonas/rocafort"],
  ["propiedades", "/propiedades"],
  ["ficha", "/propiedades/chalet-en-campolivar"],
  ["blog", "/blog"],
  ["contacto", "/contacto"],
];

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce", deviceScaleFactor: 1 });
const page = await ctx.newPage();
const report = [];

for (const [name, url] of PAGES) {
  await page.goto(BASE + url, { waitUntil: "networkidle" });
  // aceptar cookies para que no tape nada
  await page.evaluate(() => {
    try { localStorage.setItem("nodus-consent", JSON.stringify({ analytics: false, ts: Date.now() })); } catch {}
  });
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  // forzar visibilidad de todo lo que revela GSAP
  await page.addStyleTag({ content: `[data-reveal], [data-text], [data-chevron], [data-row] { opacity: 1 !important; transform: none !important; clip-path: none !important; } .swiper-slide { opacity: 1 !important; }` });
  // scroll lento hasta el final para disparar lazy y triggers
  const total = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < total; y += 700) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(120); }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  const sections = await page.$$("main section, body > section, article > section, section");
  const seen = new Set();
  let i = 0;
  const rows = [];
  for (const s of sections) {
    const box = await s.boundingBox();
    if (!box || box.height < 80) continue;
    const key = `${Math.round(box.y)}-${Math.round(box.height)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    i++;
    const label = await s.evaluate((el) => (el.querySelector('[class*="_label"], [class*="eyebrow"]')?.textContent || el.id || el.getAttribute("aria-label") || el.querySelector("h1,h2,h3")?.textContent || "").trim().slice(0, 40));
    const file = `${name}-${String(i).padStart(2, "0")}.png`;
    const ok = await s.screenshot({ path: path.join(OUT, file), timeout: 8000 }).then(() => true).catch(() => false);
    if (!ok) { i--; continue; }
    rows.push({ file, label, h: Math.round(box.height), w: Math.round(box.width) });
  }
  await page.screenshot({ path: path.join(OUT, `${name}-full.png`), fullPage: true });
  report.push({ name, url, total, sections: rows });
  console.log(name, total, rows.map((r) => `${r.file}:${r.label}(${r.h})`).join(" | "));
}
fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));
await browser.close();
