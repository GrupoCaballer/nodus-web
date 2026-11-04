"""Genera las imágenes para compartir (WhatsApp, LinkedIn): 1200x630, JPG < 200 KB.
Uso: python3 scripts/og.py  →  public/og/<ruta-con-guiones>.jpg  (ver lib/og.ts)
Fuentes: todas las fotos de public/fotos y la primera foto de cada propiedad."""
import glob, io, os
from PIL import Image

W, H, LIMITE = 1200, 630, 200_000
fuentes = glob.glob("public/fotos/**/*.webp", recursive=True) + glob.glob("public/propiedades/*/01.webp")
os.makedirs("public/og", exist_ok=True)
for src in sorted(fuentes):
    rel = src.removeprefix("public/").rsplit(".", 1)[0].replace("/", "-")
    im = Image.open(src).convert("RGB")
    esc = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * esc), round(im.height * esc)), Image.LANCZOS)
    x, y = (im.width - W) // 2, (im.height - H) // 2
    im = im.crop((x, y, x + W, y + H))
    for q in range(82, 40, -6):
        buf = io.BytesIO()
        im.save(buf, "JPEG", quality=q, optimize=True, progressive=True)
        if buf.tell() < LIMITE:
            break
    open(f"public/og/{rel}.jpg", "wb").write(buf.getvalue())
    print(f"{rel}.jpg {buf.tell() // 1024} KB")
