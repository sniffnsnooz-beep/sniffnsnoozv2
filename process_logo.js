import sharp from 'sharp';
import fs from 'fs';

async function processLogo() {
  console.log('Processing logo image to extract clean circular emblem with transparent background...');

  const inputPath = 'public/assets/snifflogo.png';
  const meta = await sharp(inputPath).metadata();
  console.log('Input dimensions:', meta.width, 'x', meta.height);

  // The circular badge height is about 800px centered in 1248x832.
  // Center is x=624, y=416. Size = 780x780.
  const size = 780;
  const left = Math.round((meta.width - size) / 2);
  const top = Math.round((meta.height - size) / 2);

  // 1. Crop to central square
  const croppedBuffer = await sharp(inputPath)
    .extract({ left, top, width: size, height: size })
    .toBuffer();

  // 2. Create circular mask SVG
  const svgMask = Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 2}" fill="#ffffff" />
    </svg>`
  );

  // 3. Composite image with mask
  const circleLogoBuffer = await sharp(croppedBuffer)
    .composite([{ input: svgMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Save to outputs
  await sharp(circleLogoBuffer)
    .resize(512, 512)
    .webp({ quality: 90 })
    .toFile('public/assets/snifflogo.webp');

  await sharp(circleLogoBuffer)
    .resize(512, 512)
    .png()
    .toFile('public/assets/snifflogo.png');

  await sharp(circleLogoBuffer)
    .resize(512, 512)
    .png()
    .toFile('public/assets/snifflogo-circle.png');

  await sharp(circleLogoBuffer)
    .resize(192, 192)
    .png()
    .toFile('public/icon-192x192.png');

  await sharp(circleLogoBuffer)
    .resize(512, 512)
    .png()
    .toFile('public/icon-512x512.png');

  await sharp(circleLogoBuffer)
    .resize(64, 64)
    .png()
    .toFile('public/favicon.ico');

  console.log('Successfully generated clean transparent circular logos and icons!');
}

processLogo().catch(err => {
  console.error('Error processing logo:', err);
});
