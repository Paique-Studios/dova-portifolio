import fs from 'fs';
import path from 'path';

// Current portfolio data
const portfolioItems = [
    {
        title: "Arthos",
        tag: "Personagens",
        images: ["/img_port/Arthos.png", "/img_port/Arthos2.png", "/img_port/Arthos3.png"],
        description: "Personagem original modelado com alto nível de detalhamento.",
    },
    {
        title: "Arthos Grapes",
        tag: "Personagens",
        images: ["/img_port/ArthosGrapes.png"],
        description: "Cena estilizada com uvas e iluminação suave.",
    },
    {
        title: "Arthos Wine Glass",
        tag: "Personagens",
        images: ["/img_port/ArthosWineGlass.png", "/img_port/ArthosWineGlass2.png"],
        description: "Render de personagem com taça de vinho.",
    },
    {
        title: "Bear",
        tag: "Personagens",
        images: ["/img_port/Bear.png"],
        description: "Modelo estilizado de urso low-poly.",
    },
    {
        title: "Eevee",
        tag: "Personagens",
        images: ["/img_port/Eeve.png"],
        description: "Modelo fan-art do Pokémon Eevee.",
    },
    {
        title: "Poseidon",
        tag: "Personagens",
        images: ["/img_port/Poseidon.png"],
        description: "Estátua de Poseidon com detalhes clássicos.",
    },
    {
        title: "Skull",
        tag: "Personagens",
        images: ["/img_port/Skull.png"],
        description: "Crânio 3D com texturização realista.",
    },
    {
        title: "Skyrim Dragon",
        tag: "Personagens",
        images: ["/img_port/SkyrimDragon.png"],
        description: "Fan-art do dragão de Skyrim.",
    },
    {
        title: "Weird Monster",
        tag: "Personagens",
        images: ["/img_port/WeirdMonster.png"],
        description: "Criatura original com design grotesco.",
    },
    {
        title: "Hummingbird",
        tag: "Personagens",
        images: ["/img_port/HummingBird.png", "/img_port/HummingBird2.png"],
        description: "Beija-flor 3D com detalhes refinados.",
    },
    {
        title: "Mascote",
        tag: "Personagens",
        images: ["/img_port/mascote.png"],
        description: "Design de mascote estilizado.",
    },
    {
        title: "Statue",
        tag: "Personagens",
        images: ["/img_port/statue.png"],
        description: "Estátua modelada com acabamento clássico.",
    },
    {
        title: "House",
        tag: "Cenários",
        images: ["/img_port/House.png", "/img_port/House2.png", "/img_port/House3.png"],
        description: "Casa estilizada com iluminação aconchegante.",
    },
    {
        title: "House 3D",
        tag: "Cenários",
        images: ["/img_port/House3D.png", "/img_port/House3D_2.png"],
        description: "Projeto arquitetônico em 3D isométrico.",
    },
    {
        title: "Town",
        tag: "Cenários",
        images: ["/img_port/town.png"],
        description: "Cidade em miniatura com várias construções.",
    },
    {
        title: "Houses Village",
        tag: "Cenários",
        images: ["/img_port/houses.png", "/img_port/houses2.png", "/img_port/houses3.png"],
        description: "Vila de casas estilizadas com telhados coloridos.",
    },
    {
        title: "Tangled Tower",
        tag: "Cenários",
        images: ["/img_port/TangledTower.png"],
        description: "Torre inspirada na torre de Rapunzel.",
    },
    {
        title: "Naboo Star Wars",
        tag: "Cenários",
        images: ["/img_port/Naboo.png"],
        description: "Cenário épico inspirado no planeta Naboo.",
    },
    {
        title: "Lareira",
        tag: "Cenários",
        images: ["/img_port/Lareira.png"],
        description: "Cena aconchegante com lareira acesa.",
    },
    {
        title: "Porto",
        tag: "Cenários",
        images: ["/img_port/Porto.png"],
        description: "Cenário costeiro inspirado em Porto, Portugal.",
    },
    {
        title: "God Rays",
        tag: "Cenários",
        images: ["/img_port/godrays.png", "/img_port/godrays2.png"],
        description: "Cena com iluminação volumétrica e raios de luz.",
    },
    {
        title: "Render Agua",
        tag: "Cenários",
        images: ["/img_port/renderagua.png"],
        description: "Cena com simulação realista de água.",
    },
    {
        title: "Steampunk Table",
        tag: "Objetos",
        images: ["/img_port/SteampunkTable.png", "/img_port/SteampunkTable2.png"],
        description: "Mesa steampunk com engrenagens e detalhes em latão.",
    },
    {
        title: "Crowbar",
        tag: "Objetos",
        images: ["/img_port/Crowbar.png", "/img_port/Crowbar2.png"],
        description: "Pé-de-cabra com textura PBR realista.",
    },
    {
        title: "Glass Cups",
        tag: "Objetos",
        images: ["/img_port/GlassCups.png", "/img_port/GlassCups2.png"],
        description: "Copos de vidro com refração e transparência.",
    },
    {
        title: "Stones",
        tag: "Objetos",
        images: ["/img_port/Stones.png"],
        description: "Conjunto de pedras com texturas orgânicas.",
    },
    {
        title: "Cannon",
        tag: "Objetos",
        images: ["/img_port/cannon.png"],
        description: "Canhão estilizado low-poly.",
    },
    {
        title: "NFT Art",
        tag: "Objetos",
        images: ["/img_port/NFT.png"],
        description: "Arte 3D para coleção digital.",
    },
    {
        title: "GTA Oppressor",
        tag: "Objetos",
        images: ["/img_port/gtaopressor.png"],
        description: "Recreação do veículo do GTA V.",
    },
    {
        title: "Mushroom",
        tag: "Objetos",
        images: ["/img_port/mushroom.png", "/img_port/mushroom2.png", "/img_port/mushroom3.png", "/img_port/mushroom4.png"],
        video: "/img_port/mushroom.mp4",
        description: "Cogumelo estilizado com animação.",
    },
    {
        title: "Base",
        tag: "Objetos",
        images: ["/img_port/base.png"],
        description: "Base/pedestal para exibição de modelos.",
    },
    {
        title: "Sorvete",
        tag: "Comida",
        images: ["/img_port/sorvete.png", "/img_port/sorvete2.png", "/img_port/sorvete3.png", "/img_port/sorvete4.png", "/img_port/sorvete5.png", "/img_port/sorvete6.png"],
        description: "Sorvete 3D com texturas apetitosas e render realista.",
    },
    {
        title: "Coca Cola",
        tag: "Comida",
        images: ["/img_port/coca.png"],
        description: "Lata de Coca-Cola com render estilo publicitário.",
    },
    {
        title: "Burger Board",
        tag: "Comida",
        images: ["/img_port/burger_board.png"],
        description: "Cardápio estilizado de hamburguer.",
    },
    {
        title: "Pizza",
        tag: "Comida",
        images: ["/img_port/pizza.png"],
        description: "Fatia de pizza 3D estilizada.",
    },
    {
        title: "Hotdog Board",
        tag: "Comida",
        images: ["/img_port/hotdog_board.png"],
        description: "Cardápio temático de cachorro-quente.",
    },
    {
        title: "Fries",
        tag: "Comida",
        images: ["/img_port/fries.png"],
        description: "Batatas fritas 3D estilizadas.",
    },
    {
        title: "Milkshake Board",
        tag: "Comida",
        images: ["/img_port/milkshake_board.png"],
        description: "Cardápio de milkshake com design fofo.",
    },
    {
        title: "Kombi VW",
        tag: "Veículos",
        images: ["/img_port/Kombi.png", "/img_port/Kombi2.png", "/img_port/Kombi3.jpg"],
        description: "Kombi Volkswagen clássica modelada em 3D.",
    },
    {
        title: "Truck",
        tag: "Veículos",
        images: ["/img_port/truck.png"],
        description: "Caminhão estilizado low-poly.",
    },
    {
        title: "Ruffles Moto",
        tag: "Veículos",
        images: ["/img_port/Ruffles_Moto.gif"],
        description: "Moto temática Ruffles com animação.",
    },
    {
        title: "Halloween 2021",
        tag: "Temáticos",
        images: ["/img_port/Halloween2021.png", "/img_port/Halloween2021_2.png", "/img_port/Halloween2021_3.png"],
        gif: "/img_port/Halloween2021.gif",
        description: "Cena temática de Halloween com animação.",
    },
    {
        title: "Halloween Scene",
        tag: "Temáticos",
        images: ["/img_port/halloween.jpg", "/img_port/Halloween2.png", "/img_port/halloween3.png", "/img_port/Halloween4.png"],
        description: "Cenários de Halloween com atmosfera sombria.",
    },
    {
        title: "Easter",
        tag: "Temáticos",
        images: ["/img_port/Easter.png", "/img_port/Easter2.png"],
        description: "Cena de Páscoa com detalhes encantadores.",
    },
    {
        title: "Christmas",
        tag: "Temáticos",
        images: ["/img_port/xmas3.png", "/img_port/xmastree.png"],
        video: "/img_port/xmas.mp4",
        description: "Cena de Natal com árvore e decorações.",
    },
    {
        title: "Roblox Egg",
        tag: "Temáticos",
        images: ["/img_port/RobloxEgg.png"],
        description: "Ovo temático para evento do Roblox.",
    },
    {
        title: "Roblox Maps",
        tag: "Jogos",
        images: [
            "/img_port/RobloxScreenShot20230218_191100005.png",
            "/img_port/RobloxScreenShot20230323_103308637.png",
            "/img_port/RobloxScreenShot20230326_145419237.png",
            "/img_port/RobloxScreenShot20230326_145818977.png",
            "/img_port/RobloxScreenShot20230419_143702604.png",
        ],
        description: "Mapas e cenários desenvolvidos para jogos no Roblox.",
    },
    {
        title: "Harry Potter Chess",
        tag: "Jogos",
        images: ["/img_port/HarryPotter Chess.png", "/img_port/HarryPotter Chess2.png", "/img_port/HarryPotterselo.png"],
        description: "Xadrez de bruxo inspirado em Harry Potter.",
    },
    {
        title: "Cardboard Contest",
        tag: "Jogos",
        images: ["/img_port/carbbcontest.png", "/img_port/crdads.jpg", "/img_port/crdads2.jpg"],
        gif: "/img_port/cardboard.gif",
        description: "Projeto vencedor de contest com estilo cardboard.",
    },
    {
        title: "1o Lugar BlockBench Train",
        tag: "Conquistas",
        images: ["/img_port/Primeirolugar BlockBench ContestTrain.png", "/img_port/Primeirolugar BlockBench ContestTrain2.png"],
        description: "Primeiro lugar no concurso de criação de trens no Blockbench!",
    },
    {
        title: "2o Lugar Blockbench Sci-Fi",
        tag: "Conquistas",
        images: ["/img_port/Segundolugar Blockbench Contest SCIFI.png"],
        description: "Segundo lugar no concurso de ficção científica no Blockbench.",
    },
    {
        title: "Mia Studios",
        tag: "Profissional",
        images: ["/img_port/MiaStudios_9.png", "/img_port/miaversary.jpg"],
        description: "Trabalho desenvolvido para a Mia Studios.",
    },
    {
        title: "Site LUP",
        tag: "Profissional",
        images: ["/img_port/sitelup.png"],
        description: "Elementos 3D criados para o site da LUP.",
    },
    {
        title: "Misc Renders",
        tag: "Profissional",
        images: ["/img_port/image.png", "/img_port/image5.png", "/img_port/image6.png", "/img_port/image7.png", "/img_port/image8.png", "/img_port/image9.png", "/img_port/image10.png", "/img_port/image11.png", "/img_port/image12.png"],
        description: "Conjunto de renders diversos para projetos variados.",
    },
];

const basePath = path.join(process.cwd(), 'public', 'img_port');

portfolioItems.forEach((project) => {
    // Sanitize folder name
    const folderName = project.title.replace(/[^a-zA-Z0-9 -]/g, '').trim().replace(/ +/g, '-');
    const folderPath = path.join(basePath, folderName);

    // Create folder
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    // Move images
    const allMedia = [...(project.images || []), ...(project.gif ? [project.gif] : []), ...(project.video ? [project.video] : [])];

    allMedia.forEach((mediaPath) => {
        const oldFilePath = path.join(process.cwd(), 'public', mediaPath);
        const fileName = path.basename(mediaPath);
        const newFilePath = path.join(folderPath, fileName);

        if (fs.existsSync(oldFilePath)) {
            fs.renameSync(oldFilePath, newFilePath);
            console.log(`Moved ${fileName} to ${folderName}`);
        } else if (!fs.existsSync(newFilePath)) {
            console.warn(`File not found: ${oldFilePath}`);
        }
    });

    // Write text file
    const txtContent = `Título: ${project.title}\nCategoria: ${project.tag}\n\n${project.description}`;
    fs.writeFileSync(path.join(folderPath, 'sobre.txt'), txtContent, 'utf-8');
});

console.log('Organização concluída!');
