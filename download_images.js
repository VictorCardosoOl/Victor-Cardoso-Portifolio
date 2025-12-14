import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
    { name: 'footer_office.jpg', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600&h=900' },
    { name: 'profile_main.jpg', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800' },
    { name: 'lab_liquid.jpg', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=600' },
    { name: 'lab_kinetics.jpg', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800&h=800' },
    { name: 'lab_raymarching.jpg', url: 'https://images.unsplash.com/photo-1614850523060-8da1d56ae167?auto=format&fit=crop&q=80&w=800&h=800' },
    { name: 'lab_grid.jpg', url: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=800&h=600' },
    { name: 'lab_noise.jpg', url: 'https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&q=80&w=800&h=600' }
];

const targetDir = path.join(process.cwd(), 'public', 'images');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded: ${path.basename(filepath)}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            console.error(`Error downloading ${url}: ${err.message}`);
            reject(err);
        });
    });
};

async function downloadAll() {
    console.log('Starting download...');
    for (const img of images) {
        await downloadImage(img.url, path.join(targetDir, img.name));
    }
    console.log('All downloads completed.');
}

downloadAll();
