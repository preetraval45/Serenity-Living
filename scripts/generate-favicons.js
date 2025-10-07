const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

async function generateFavicons() {
  const logoPath = path.join(__dirname, '..', 'public', 'logo.jpg')
  const publicDir = path.join(__dirname, '..', 'public')

  try {
    console.log('🎨 Generating favicons from logo.jpg...\n')

    // Generate favicon.ico (32x32)
    await sharp(logoPath)
      .resize(32, 32)
      .toFile(path.join(publicDir, 'favicon.ico'))
    console.log('✅ favicon.ico (32x32) created')

    // Generate favicon-16x16.png
    await sharp(logoPath)
      .resize(16, 16)
      .toFile(path.join(publicDir, 'favicon-16x16.png'))
    console.log('✅ favicon-16x16.png created')

    // Generate favicon-32x32.png
    await sharp(logoPath)
      .resize(32, 32)
      .toFile(path.join(publicDir, 'favicon-32x32.png'))
    console.log('✅ favicon-32x32.png created')

    // Generate apple-touch-icon.png (180x180)
    await sharp(logoPath)
      .resize(180, 180)
      .toFile(path.join(publicDir, 'apple-touch-icon.png'))
    console.log('✅ apple-touch-icon.png (180x180) created')

    // Generate android-chrome-192x192.png
    await sharp(logoPath)
      .resize(192, 192)
      .toFile(path.join(publicDir, 'android-chrome-192x192.png'))
    console.log('✅ android-chrome-192x192.png created')

    // Generate android-chrome-512x512.png
    await sharp(logoPath)
      .resize(512, 512)
      .toFile(path.join(publicDir, 'android-chrome-512x512.png'))
    console.log('✅ android-chrome-512x512.png created')

    // Generate og-image.jpg for social sharing (1200x630)
    await sharp(logoPath)
      .resize(1200, 630, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toFile(path.join(publicDir, 'og-image.jpg'))
    console.log('✅ og-image.jpg (1200x630) created')

    console.log('\n🎉 All favicons generated successfully!')

  } catch (error) {
    console.error('❌ Error generating favicons:', error)
    process.exit(1)
  }
}

generateFavicons()
