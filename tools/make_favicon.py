"""Generate favicon + app icons from the white logo's speech-bubble mark.

Run from the project root:  python tools/make_favicon.py
Outputs favicon.ico, apple-touch-icon.png and site.webmanifest to the site root
(browsers look for them there), and the other icons to assets/icons/.
"""
import json

import numpy as np
from PIL import Image, ImageDraw

SRC = "assets/images/logo-white.png"
BRAND = (216, 48, 48, 255)  # #D83030
MASTER = 1024
PADDING = 0.18
RADIUS = 0.22


def crop_mark(logo):
    """Crop the leftmost opaque column run (the bubble mark, without the wordmark)."""
    alpha = np.asarray(logo)[:, :, 3]
    cols = (alpha > 40).any(axis=0)
    start = int(np.argmax(cols))
    end = start
    while end + 1 < len(cols) and cols[end + 1]:
        end += 1
    part = alpha[:, start:end + 1]
    rows = np.where((part > 40).any(axis=1))[0]
    return logo.crop((start, int(rows[0]), end + 1, int(rows[-1]) + 1))


def compose(mark, size, rounded, padding=PADDING):
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    bg = Image.new("RGBA", (size, size), BRAND)
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    if rounded:
        draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=int(size * RADIUS), fill=255)
    else:
        draw.rectangle((0, 0, size - 1, size - 1), fill=255)
    canvas.paste(bg, (0, 0), mask)

    inner = int(size * (1 - 2 * padding))
    scale = inner / max(mark.width, mark.height)
    m = mark.resize((max(1, round(mark.width * scale)), max(1, round(mark.height * scale))), Image.LANCZOS)
    canvas.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
    return canvas


def main():
    logo = Image.open(SRC).convert("RGBA")
    mark = crop_mark(logo)

    rounded = compose(mark, MASTER, rounded=True)
    square = compose(mark, MASTER, rounded=False)
    # Tab-sized icons need a larger mark to stay legible.
    tiny = compose(mark, MASTER, rounded=True, padding=0.08)

    def out(img, size, path):
        img.resize((size, size), Image.LANCZOS).save(path)
        print("Saved", path)

    out(tiny, 32, "assets/icons/favicon-32x32.png")
    out(rounded, 192, "assets/icons/icon-192.png")
    out(rounded, 512, "assets/icons/icon-512.png")
    out(square, 180, "apple-touch-icon.png")
    tiny.resize((256, 256), Image.LANCZOS).save("favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("Saved favicon.ico")

    manifest = {
        "name": "DokterPanggil.id",
        "short_name": "DokterPanggil",
        "start_url": "/",
        "display": "standalone",
        "theme_color": "#D83030",
        "background_color": "#FFFDFB",
        "icons": [
            {"src": "/assets/icons/icon-192.png", "sizes": "192x192", "type": "image/png"},
            {"src": "/assets/icons/icon-512.png", "sizes": "512x512", "type": "image/png"}
        ]
    }
    with open("site.webmanifest", "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
        f.write("\n")
    print("Saved site.webmanifest")


if __name__ == "__main__":
    main()
