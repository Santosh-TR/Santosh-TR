#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// AVIF conversion settings
const AVIF_OPTIONS = {
    quality: 80,
    effort: 6,
    chromaSubsampling: '4:2:0'
};

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function convertImage(inputPath, outputPath) {
    const startTime = Date.now();

    await sharp(inputPath)
        .avif(AVIF_OPTIONS)
        .toFile(outputPath);

    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

    return {
        inputSize: inputStats.size,
        outputSize: outputStats.size,
        reduction,
        duration: Date.now() - startTime
    };
}

async function main() {
    console.log('\n🎨 PNG to AVIF Converter (Interactive)\n');
    console.log('━'.repeat(50));

    // Get input directory
    const inputDir = await question('\n📂 Paste the full path to your images folder:\n> ');
    const cleanInputDir = inputDir.trim().replace(/['"]/g, '');

    if (!fs.existsSync(cleanInputDir)) {
        console.error(`\n❌ Error: Directory not found: ${cleanInputDir}`);
        rl.close();
        return;
    }

    // Get output directory (default: input_avif)
    const defaultOutputDir = path.join(path.dirname(cleanInputDir), path.basename(cleanInputDir) + '_avif');
    const outputDirInput = await question(`\n📁 Output folder (press Enter for: ${defaultOutputDir}):\n> `);
    const outputDir = outputDirInput.trim() || defaultOutputDir;

    // Create output directory
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log(`\n✓ Created output folder: ${outputDir}`);
    }

    // Find PNG files
    const files = fs.readdirSync(cleanInputDir)
        .filter(file => file.toLowerCase().endsWith('.png'))
        .sort();

    if (files.length === 0) {
        console.log('\n⚠️  No PNG files found in the directory.');
        rl.close();
        return;
    }

    console.log(`\n📸 Found ${files.length} PNG file(s) to convert\n`);
    console.log('━'.repeat(50));

    // Convert files
    let totalInputSize = 0;
    let totalOutputSize = 0;
    let successCount = 0;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const inputPath = path.join(cleanInputDir, file);
        const outputPath = path.join(outputDir, file.replace('.png', '.avif'));

        try {
            console.log(`\n[${i + 1}/${files.length}] ${file}`);

            const result = await convertImage(inputPath, outputPath);

            totalInputSize += result.inputSize;
            totalOutputSize += result.outputSize;
            successCount++;

            console.log(`  ✓ ${(result.inputSize / 1024 / 1024).toFixed(2)} MB → ${(result.outputSize / 1024).toFixed(2)} KB (-${result.reduction}%)`);
            console.log(`  ⏱  ${result.duration}ms`);

        } catch (error) {
            console.error(`  ✗ Failed: ${error.message}`);
        }
    }

    // Summary
    const avgReduction = ((1 - totalOutputSize / totalInputSize) * 100).toFixed(1);

    console.log('\n' + '━'.repeat(50));
    console.log('✨ Conversion Complete!\n');
    console.log(`✓ Converted: ${successCount}/${files.length} files`);
    console.log(`📉 Total size: ${(totalInputSize / 1024 / 1024).toFixed(2)} MB → ${(totalOutputSize / 1024).toFixed(2)} KB`);
    console.log(`💾 Saved: ${avgReduction}% (${((totalInputSize - totalOutputSize) / 1024 / 1024).toFixed(2)} MB)`);
    console.log(`📁 Output: ${outputDir}`);
    console.log('━'.repeat(50) + '\n');

    rl.close();
}

main().catch(error => {
    console.error('\n❌ Error:', error.message);
    rl.close();
    process.exit(1);
});
