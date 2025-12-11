const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// QR Code configurations
const qrCodes = [
  {
    url: 'https://www.theserenityliving.com/',
    filename: 'serenity-living.png',
    label: 'Serenity Living'
  },
  {
    url: 'https://www.theserenityliving.com/book-tour',
    filename: 'serenity-living-book-tour.png',
    label: 'Serenity Living - Book Tour'
  }
];

// Generate QR codes
async function generateQRCodes() {
  for (const qr of qrCodes) {
    try {
      const outputPath = path.join(publicDir, qr.filename);
      await QRCode.toFile(outputPath, qr.url, {
        errorCorrectionLevel: 'H',
        type: 'png',
        quality: 0.95,
        margin: 1,
        width: 512,
        color: {
          dark: '#1e3a5f',  // Primary dark blue from your brand
          light: '#ffffff'
        }
      });
      console.log(`✓ Generated QR code for ${qr.label}: ${outputPath}`);
    } catch (error) {
      console.error(`✗ Error generating QR code for ${qr.label}:`, error);
    }
  }
  console.log('\n✓ All QR codes generated successfully!');
}

generateQRCodes();