import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const basePath = path.join(process.cwd(), 'public', 'img_port');

async function optimize() {
    console.log('Starting WebP conversion and image optimization...');

    if (!fs.existsSync(basePath)) {
        console.error(`Base directory does not exist: ${basePath}`);
        return;
    }

    const items = fs.readdirSync(basePath);
    let convertedCount = 0;
    let originalSize = 0;
    let newSize = 0;

    for (const item of items) {
        const itemPath = path.join(basePath, item);
        if (!fs.statSync(itemPath).isDirectory()) continue;

        const mediaFiles = fs.readdirSync(itemPath);
        for (const file of mediaFiles) {
            // Only target PNG, JPG, JPEG
            if (/\.(png|jpe?g)$/i.test(file)) {
                const filePath = path.join(itemPath, file);
                const ext = path.extname(file);
                const baseName = path.basename(file, ext);
                const webpPath = path.join(itemPath, `${baseName}.webp`);

                try {
                    const stats = fs.statSync(filePath);
                    originalSize += stats.size;

                    const image = sharp(filePath);
                    const metadata = await image.metadata();

                    // Resize if larger than 1920px (width or height)
                    if (metadata.width > 1920 || metadata.height > 1920) {
                        image.resize(1920, 1920, { fit: 'inside', withoutEnlargement: true });
                    }

                    // Convert to WebP
                    await image.webp({ quality: 80 }).toFile(webpPath);

                    const newStats = fs.statSync(webpPath);
                    newSize += newStats.size;

                    // Delete original file
                    fs.unlinkSync(filePath);

                    convertedCount++;
                    console.log(`Converted: ${file} -> ${baseName}.webp`);
                } catch (err) {
                    console.error(`Error processing ${filePath}:`, err);
                }
            }
        }
    }

    console.log(`\nFinished optimization!`);
    console.log(`Converted ${convertedCount} images to WebP.`);
    console.log(`Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`New size: ${(newSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Saved: ${((originalSize - newSize) / 1024 / 1024).toFixed(2)} MB (${Math.round((originalSize - newSize) / originalSize * 100)}%)`);
}

optimize();
