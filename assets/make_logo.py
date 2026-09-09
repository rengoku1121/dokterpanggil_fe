"""Generate a transparent white logo from page-08 (white logo on solid #772017)."""
import numpy as np
from PIL import Image

SRC = "assets/images/page-08.png"
OUT = "assets/images/logo-white.png"
BG = np.array([119, 32, 23], dtype=np.float32)  # #772017

img = Image.open(SRC).convert("RGB")
arr = np.asarray(img).astype(np.float32)

# The image is white foreground composited over solid BG:
#   P = alpha * 255 + (1 - alpha) * BG
# Solve per channel and average for a smooth anti-aliased alpha.
denom = (255.0 - BG)
alpha_c = (arr - BG) / denom
alpha = np.clip(alpha_c.mean(axis=2), 0.0, 1.0)
alpha255 = (alpha * 255.0).round().astype(np.uint8)

white = np.full(arr.shape, 255, dtype=np.uint8)
rgba = np.dstack([white, alpha255])
out = Image.fromarray(rgba, "RGBA")

# Crop to the logo's bounding box with a little padding.
mask = alpha255 > 12
ys, xs = np.where(mask)
pad = 24
left = max(int(xs.min()) - pad, 0)
top = max(int(ys.min()) - pad, 0)
right = min(int(xs.max()) + pad, out.width)
bottom = min(int(ys.max()) + pad, out.height)
out = out.crop((left, top, right, bottom))
out.save(OUT)
print("Saved", OUT, out.size)
