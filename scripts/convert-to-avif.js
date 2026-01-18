const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Convert PNG images to AVIF format
 * AVIF provides superior compression (90-95% smaller than PNG)
 */

const INPUT_DIR = path.join(__dirname, '..', 'public', 'images');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images');

// AVIF conversion settings
const AVIF_OPTIONS = {
    quality: 80,        // 80% quality (good balance)
    effort: 6,          // Compression effort (0-9, higher = smaller file)
    chromaSubsampling: '4:2:0'
};

async function convertPngToAvif(inputPath, outputPath) {
    try {
        console.log(`Converting: ${path.basename(inputPath)}`);

        const startTime = Date.now();

        await sharp(inputPath)
            .avif(AVIF_OPTIONS)
            .toFile(outputPath);

        const inputStats = fs.statSync(inputPath);
        const outputStats = fs.statSync(outputPath);
        const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
        const duration = Date.now() - startTime;

        console.log(`✓ ${path.basename(outputPath)}`);
        console.log(`  Original: ${(inputStats.size / 1024 / 1024).toFixed(2)} MB`);
        console.log(`  AVIF: ${(outputStats.size / 1024).toFixed(2)} KB`);
        console.log(`  Reduction: ${reduction}%`);
        console.log(`  Time: ${duration}ms\n`);

        return { success: true, reduction, outputSize: outputStats.size };
    } catch (error) {
        console.error(`✗ Failed to convert ${path.basename(inputPath)}: ${error.message}`);
        return { success: false, error: error.message };
    }
}

async function convertAllPngs() {
    console.log('🎨 PNG to AVIF Converter\n');
    console.log(`Input directory: ${INPUT_DIR}`);
    console.log(`Output directory: ${OUTPUT_DIR}\n`);

    if (!fs.existsSync(INPUT_DIR)) {
        console.error(`Error: Directory not found: ${INPUT_DIR}`);
        return;
    }

    const files = fs.readdirSync(INPUT_DIR)
        .filter(file => file.toLowerCase().endsWith('.png'))
        .sort();

    if (files.length === 0) {
        console.log('No PNG files found in directory.');
        return;
    }

    console.log(`Found ${files.length} PNG file(s) to convert:\n`);

    const results = [];

    for (const file of files) {
        const inputPath = path.join(INPUT_DIR, file);
        const outputPath = path.join(OUTPUT_DIR, file.replace('.png', '.avif'));

        const result = await convertPngToAvif(inputPath, outputPath);
        results.push(result);
    }

    // Summary
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    const totalReduction = results
        .filter(r => r.success)
        .reduce((sum, r) => sum + parseFloat(r.reduction), 0) / successful;

    console.log('─'.repeat(50));
    console.log('📊 Conversion Summary');
    console.log('─'.repeat(50));
    console.log(`✓ Successful: ${successful}`);
    console.log(`✗ Failed: ${failed}`);
    console.log(`📉 Average size reduction: ${totalReduction.toFixed(1)}%`);
    console.log('─'.repeat(50));
    console.log('\n✨ Done! Your AVIF images are ready to use.');
}

// Run conversion
convertAllPngs().catch(console.error);
