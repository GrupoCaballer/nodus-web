// Captura una sección concreta: node scripts/shot-one.mjs <url> <selector> <salida.png>
import { chromium } from "playwright";
const [url, selector, out] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
await page.goto(url, { waitUntil: "networkidle" });
await page.addStyleTag({ content: `[data-reveal] { opacity: 1 !important; transform: none !important; clip-path: none !important; }` });
const el = page.locator(selector).first();
await el.scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await el.screenshot({ path: out });
await browser.close();
console.log("ok", out);
