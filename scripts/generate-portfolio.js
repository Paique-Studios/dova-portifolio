import fs from 'fs';
import path from 'path';

const basePath = path.join(process.cwd(), 'public', 'img_port');
const outputPath = path.join(process.cwd(), 'src', 'data', 'portfolioData.js');

function generatePortfolio() {
    console.log('Scanning project directories in public/img_port...');

    if (!fs.existsSync(basePath)) {
        console.error(`Base directory does not exist: ${basePath}`);
        return;
    }

    const projects = [];
    let idCounter = 1;

    // Ler todos os itens dentro de img_port
    const items = fs.readdirSync(basePath);

    for (const item of items) {
        const itemPath = path.join(basePath, item);

        // Se não for uma pasta (por exemplo se tiver um arquivo solto lá), ignora
        if (!fs.statSync(itemPath).isDirectory()) {
            continue;
        }

        const projectFolder = item;
        let title = projectFolder.replace(/-/g, ' ');
        let tag = "Misc";
        let description = "";

        // Procura project.json
        const jsonPath = path.join(itemPath, 'project.json');
        let coverImage = "";
        let priority = 1000;
        let imageOrder = [];
        let imageDescriptions = {};

        if (fs.existsSync(jsonPath)) {
            try {
                const content = fs.readFileSync(jsonPath, 'utf-8');
                const data = JSON.parse(content);
                if (data.title) title = data.title;
                if (data.tag) tag = data.tag;
                if (data.description) description = data.description;
                if (data.coverImage) coverImage = data.coverImage;
                if (data.priority !== undefined) priority = data.priority;
                if (Array.isArray(data.imageOrder)) imageOrder = data.imageOrder;
                if (data.imageDescriptions && typeof data.imageDescriptions === 'object') imageDescriptions = data.imageDescriptions;
            } catch (err) {
                console.error(`Erro ao ler ${jsonPath}:`, err);
            }
        }

        // Lê imagens e vídeos do diretório do projeto
        const mediaFiles = fs.readdirSync(itemPath);

        // Imagens
        let imageFiles = mediaFiles.filter(f => /\.(png|jpe?g|webp)$/i.test(f));

        // Ordena imagens baseando-se no imageOrder e depois alfabeticamente
        imageFiles.sort((a, b) => {
            const indexA = imageOrder.indexOf(a);
            const indexB = imageOrder.indexOf(b);

            if (indexA !== -1 && indexB !== -1) return indexA - indexB; // Ambos na lista
            if (indexA !== -1) return -1; // Só A na lista
            if (indexB !== -1) return 1; // Só B na lista
            return a.localeCompare(b); // Nenhum na lista, alfabético natural
        });

        const images = imageFiles.map(f => `/img_port/${item}/${f}`);

        // Mapeia descrições completas par o formato webp
        const finalDescriptions = {};
        for (const [filename, text] of Object.entries(imageDescriptions)) {
            const webpName = filename.replace(/\.[^/.]+$/, ".webp");
            finalDescriptions[`/img_port/${item}/${webpName}`] = text;
        }

        // Gif
        const gifFile = mediaFiles.find(f => f.toLowerCase().endsWith('.gif'));
        const gif = gifFile ? `/img_port/${item}/${gifFile}` : null;

        // Video
        const videoFile = mediaFiles.find(f => /\.(mp4|webm)$/i.test(f));
        const video = videoFile ? `/img_port/${item}/${videoFile}` : null;

        // Lógica de "Capa": se coverImage estiver preenchido, preenche-la! 
        if (coverImage && images.length > 0) {
            const coverBase = coverImage.replace(/\.[^/.]+$/, "");
            const matchIndex = images.findIndex(img => img.includes(coverBase));
            if (matchIndex > -1) {
                const [cover] = images.splice(matchIndex, 1);
                images.unshift(cover);
            }
        }

        // Só adicionar se tiver alguma mídia
        if (images.length > 0 || gif || video) {
            projects.push({
                id: idCounter++,
                title,
                tag,
                priority,
                images,
                imageDescriptions: finalDescriptions,
                coverImage: coverImage ? coverImage.replace(/\.[^/.]+$/, ".webp") : coverImage,
                ...(gif && { gif }),
                ...(video && { video }),
                description
            });
        }
    }

    // Ordenar os projetos de acordo com a prioridade e ordem alfabética
    projects.sort((a, b) => {
        if (a.priority !== b.priority) {
            return a.priority - b.priority;
        }
        return a.title.localeCompare(b.title);
    });

    // Coleta as tags únicas
    const allTags = new Set(projects.map(p => p.tag));
    const sortedTags = ["All", ...Array.from(allTags).sort()];

    // Salva arquivo JSON na pasta public para o React fazer fetch em runtime
    const publicJsonPath = path.join(process.cwd(), 'public', 'portfolio.json');
    const jsonOutput = {
        items: projects,
        tags: sortedTags
    };
    fs.writeFileSync(publicJsonPath, JSON.stringify(jsonOutput, null, 2), 'utf-8');
    console.log(`Success: portfolio of ${projects.length} projects saved in public/portfolio.json for dynamic consumption.`);
}

generatePortfolio();
