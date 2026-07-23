import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const source = path.join(
  root,
  "..",
  "..",
  "..",
  ".cursor",
  "projects",
  "c-Users-Yajat-Documents-RJT-Website",
  "assets",
  "c__Users_Yajat_AppData_Roaming_Cursor_User_workspaceStorage_98e031b0acb4ea3a24cf55d82875f19e_images_image-346871d0-b8be-4e7f-a815-10cb4b536334.png"
);

const output = path.join(root, "public", "images", "logo.png");
const favicon = path.join(root, "app", "icon.png");

function isNearBlack(r, g, b) {
  return Math.max(r, g, b) <= 25;
}

const { data, info } = await sharp(source)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const total = width * height;
const bg = new Uint8Array(total);
const queue = [];

function tryPush(x, y) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const idx = y * width + x;
  if (bg[idx]) return;
  const i = idx * channels;
  if (!isNearBlack(data[i], data[i + 1], data[i + 2])) return;
  bg[idx] = 1;
  queue.push(idx);
}

for (let x = 0; x < width; x++) {
  tryPush(x, 0);
  tryPush(x, height - 1);
}
for (let y = 0; y < height; y++) {
  tryPush(0, y);
  tryPush(width - 1, y);
}

while (queue.length) {
  const idx = queue.pop();
  const x = idx % width;
  const y = (idx - x) / width;
  tryPush(x - 1, y);
  tryPush(x + 1, y);
  tryPush(x, y - 1);
  tryPush(x, y + 1);
}

for (let idx = 0; idx < total; idx++) {
  const i = idx * channels;
  if (bg[idx]) {
    data[i + 3] = 0;
    continue;
  }
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const max = Math.max(r, g, b);
  if (max <= 25) {
    data[i + 3] = 0;
  } else if (max <= 50 && r < 60 && g < 60 && b < 60) {
    data[i + 3] = Math.round(((max - 25) / 25) * 255);
  }
}

const png = await sharp(data, { raw: { width, height, channels } })
  .png()
  .toBuffer();

await sharp(png).toFile(output);
await sharp(png)
  .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toFile(favicon);

console.log("Transparent logo saved:", output);
