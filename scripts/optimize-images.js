const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, '../public/images');

fs.readdir(directory, (err, files) => {
    if (err) {
        console.error('Could not list the directory.', err);
        process.exit(1);
    }

    files.forEach((file, index) => {
        if (file.endsWith('.png')) {
            const inputPath = path.join(directory, file);
            const outputPath = path.join(directory, file.replace('.png', '.webp'));

            sharp(inputPath)
                .resize({ width: 1920, withoutEnlargement: true }) // Limit width for web
                .webp({ quality: 80 })
                .toFile(outputPath)
                .then(() => {
                    console.log(`Converted: ${file} -> ${path.basename(outputPath)}`);
                })
                .catch(err => {
                    console.error(`Error converting ${file}:`, err);
                });
        }
    });
});
