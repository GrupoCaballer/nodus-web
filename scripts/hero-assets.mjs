// Convierte los assets del hero a WebP. Uso: node scripts/hero-assets.mjs <carpeta-origen>
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
const src = process.argv[2];
await mkdir("public/hero", { recursive: true });
const jobs = [
  ["full/cielo.jpg", "cielo.webp", { width: 2400, quality: 72 }],
  ["out/villa.png", "edificio.webp", { width: 2200, quality: 80, alpha: true }],
  ["out/nube1.png", "nube-1.webp", { width: 1400, quality: 75, alpha: true }],
  ["out/nube2.png", "nube-2.webp", { width: 1400, quality: 75, alpha: true }],
  ["out/niebla.png", "niebla.webp", { width: 2400, quality: 70, alpha: true }],
];
for (const [from, to, o] of jobs) {
  try {
    const img = sharp(`${src}/${from}`).resize({ width: o.width, withoutEnlargement: true });
    const info = await img.webp({ quality: o.quality, alphaQuality: 80, effort: 5 }).toFile(`public/hero/${to}`);
    console.log(to, info.width + "x" + info.height, Math.round(info.size / 1024) + " KB");
  } catch (e) {
    console.log(to, "omitido:", e.message);
  }
}
