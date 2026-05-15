const data = {
    produtos: [
        { 
            id: 1, 
            nome: "Macbook Pro M3", 
            preco: 12499.00, 
            categoria: "Notebook", 
            imagem: "img/mac.webp", 
            descricao: "O MacBook Pro com chip M3 oferece uma velocidade absurda para fluxos de trabalho pesados.\nPossui uma tela Liquid Retina XDR de 14 polegadas com tecnologia ProMotion e cores vibrantes.\nIdeal para profissionais que buscam bateria para o dia todo e performance extrema em qualquer lugar.", 
            emEstoque: true 
        },
        { 
            id: 2, 
            nome: "iPhone 15 Pro Max", 
            preco: 8599.00, 
            categoria: "Celulares", 
            imagem: "img/iphone17.webp", 
            descricao: "Design em titânio aeroespacial que torna este o modelo Pro mais leve e resistente até hoje.\nEquipado com o chip A17 Pro, garantindo desempenho inigualável em jogos e multitarefa.\nSistema de câmera avançado com zoom óptico de 5x para capturas profissionais em alta resolução.", 
            emEstoque: false 
        },
        { 
            id: 3, 
            nome: "Sony WH-1000XM5", 
            preco: 2880.00, 
            categoria: "Acessórios", 
            imagem: "img/sony fone.webp", 
            descricao: "Líder mundial em cancelamento de ruído, transformando ambientes barulhentos em silêncio absoluto.\nConta com dois processadores que controlam oito microfones para uma clareza de áudio impecável.\nBateria de longa duração com até 30 horas de autonomia e carregamento ultra rápido via USB-C.", 
            emEstoque: true 
        },
        { 
            id: 4, 
            nome: "Samsung Galaxy S24 Ultra", 
            preco: 6999.00, 
            categoria: "Celulares", 
            imagem: "img/download.webp", 
            descricao: "O auge da inteligência artificial móvel com o Galaxy AI, permitindo traduções de chamadas em tempo real.\nEstrutura em titânio e tela plana de 6.8 polegadas com Gorilla Armor para máxima proteção.\nCâmera de 200MP que utiliza processamento por IA para fotos perfeitas mesmo em baixa luminosidade.", 
            emEstoque: true 
        },
        { 
            id: 5, 
            nome: "Apple Watch Series 9", 
            preco: 4900.00, 
            categoria: "Acessórios", 
            imagem: "img/aw.jpg", 
            descricao: "O relógio mais avançado da Apple com o novo chip S9, permitindo interações sem tocar na tela.\nSensores de saúde potentes para monitorar oxigênio no sangue, ECG e estágios do sono.\nTela Retina Sempre Ativa com o dobro de brilho para facilitar a leitura sob sol forte.", 
            emEstoque: true 
        },
        { 
            id: 6, 
            nome: "Nintendo Switch OLED", 
            preco: 2600.00, 
            categoria: "Games", 
            imagem: "img/ns.jpg", 
            descricao: "Console híbrido com tela OLED de 7 polegadas que proporciona cores vivas e contraste infinito.\nSuporte ajustável amplo para modo semiportátil e 64GB de armazenamento interno para seus jogos.\nÁudio aprimorado nos alto-falantes do console para uma experiência imersiva em qualquer lugar.", 
            emEstoque: false 
        },
        { 
            id: 7, 
            nome: "Kindle Paperwhite", 
            preco: 760.00, 
            categoria: "Acessórios", 
            imagem: "img/kindle.jpg", 
            descricao: "Leitor de livros digitais com tela de 6,8 polegadas e bordas mais finas para uma leitura confortável.\nTemperatura de luz ajustável e bateria que dura semanas, ideal para leitores ávidos.\nTotalmente à prova d'água, permitindo ler na praia, na piscina ou até dentro da banheira.", 
            emEstoque: true 
        },
        { 
            id: 8, 
            nome: "Dell XPS 13", 
            preco: 7449.00, 
            categoria: "Notebook", 
            imagem: "img/shopping.webp", 
            descricao: "O notebook premium mais compacto da Dell com tela InfinityEdge de bordas praticamente invisíveis.\nConstruído em alumínio usinado e fibra de carbono para máxima durabilidade com leveza.\nDesempenho potente com processadores Intel Core de última geração para produtividade sem limites.", 
            emEstoque: false 
        }
    ]
};

// --- RENDERIZAR HOME ---
function renderHome() {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    productList.innerHTML = ""; 

    data.produtos.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        
        card.innerHTML = `
            <div class="image-container">
                <img src="${produto.imagem}" alt="${produto.nome}">
            </div>
            <h3>${produto.nome}</h3>
            <p class="price">R$ ${produto.preco.toFixed(2)}</p>
            <div class="card-buttons">
                <a href="detalhes.html?id=${produto.id}" class="btn-link">Ver Detalhes</a>
                <button class="btn-buy-home" onclick="comprar(${produto.id})">Comprar</button>
            </div>
        `;
        productList.appendChild(card);
    });
}

// --- RENDERIZAR DETALHES ---
function renderDetails() {
    const detailsContainer = document.getElementById('product-details-container');
    if (!detailsContainer) return; 

    const params = new URLSearchParams(window.location.search);
    const idParam = parseInt(params.get('id'));
    const produto = data.produtos.find(p => p.id === idParam);

    if (produto) {
        detailsContainer.innerHTML = `
            <div class="main-info-box">
                <div class="image-wrapper">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                </div>
                <h2>${produto.nome}</h2>
            </div>
            <div class="extra-info-box">
                <h3>Outras informações</h3>
                <p class="description">${produto.descricao}</p>
                <div class="specs">
                    <p><strong>Preço:</strong> R$ ${produto.preco.toFixed(2)}</p>
                    <p><strong>Categoria:</strong> ${produto.categoria}</p>
                    <p><strong>Status:</strong> ${produto.emEstoque ? "● Em estoque" : "○ Esgotado"}</p>
                </div>
                <button class="btn-buy" onclick="comprar(${produto.id})">Finalizar Compra</button>
                <br>
                <a href="index.html" class="back-link">← Voltar para a Home</a>
            </div>
        `;
    }
}

function comprar(id) {
    const produto = data.produtos.find(p => p.id === id);
    alert(`Sucesso! "${produto.nome}" foi adicionado ao carrinho.`);
}

document.addEventListener('DOMContentLoaded', () => {
    renderHome();
    renderDetails();
});