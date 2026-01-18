import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SOURCE_DIR = 'D:/Portfolio Santosh TR try 2/osmo-clone/Images/sroll images';
const DEST_DIR = 'D:/Portfolio Santosh TR try 2/osmo-clone/public/images';

// Ensure dest dir exists
if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
}

async function convert() {
    console.log('Starting conversion to AVIF (Best Compression)...');

    for (let i = 1; i <= 5; i++) {
        const srcPath = path.join(SOURCE_DIR, `${i}.png`);
        const destPath = path.join(DEST_DIR, `(${i}).avif`); // Changed to .avif

        try {
            if (fs.existsSync(srcPath)) {
                await sharp(srcPath)
                    .avif({ quality: 65, effort: 9 }) // High effort for best compression
                    .toFile(destPath);
                console.log(`✅ Converted: ${path.basename(srcPath)} -> ${path.basename(destPath)}`);
            } else {
                console.error(`❌ Source not found: ${srcPath}`);
            }
        } catch (error) {
            console.error(`Error converting ${srcPath}:`, error);
        }
    }
}

convert();
