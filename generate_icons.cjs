const sharp = require('sharp');

async function generate() {
  await sharp('public/assets/snifflogo.png')
    .resize({
      width: 512,
      height: 512,
      fit: 'contain',
      background: { r: 250, g: 246, b: 240, alpha: 1 } // #faf6f0
    })
    .toFile('public/icon-512x512.png');

  await sharp('public/assets/snifflogo.png')
    .resize({
      width: 192,
      height: 192,
      fit: 'contain',
      background: { r: 250, g: 246, b: 240, alpha: 1 } // #faf6f0
    })
    .toFile('public/icon-192x192.png');
    
  console.log("Icons generated!");
}

generate();
