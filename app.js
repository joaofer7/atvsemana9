// Estrutura de dados JSON 
const data = {
    produtos: [
        { id: 1, nome: "Macbook-Pro", preco: 12000, categoria: "Notebook", imagem: "img/mac.webp", descricao: "O MacBook Pro é o notebook de alto desempenho da Apple com chip M3.", emEstoque: true },
        { id: 2, nome: "Iphone 17 PRO MAX", preco: 6500, categoria: "Celulares", imagem: "img/iphone17.webp", descricao: "Smartphone premium com acabamento em titânio e câmera de última geração.", emEstoque: false },
        { id: 3, nome: "Sony WH-1000XM5", preco: 2880, categoria: "Acessórios", imagem: "img/sony fone.webp", descricao: "Headphones com cancelamento de ruído líder de mercado.", emEstoque: true },
        { id: 4, nome: "Samsung Galaxy S24 Ultra", preco: 6000, categoria: "Celulares", imagem: "img/download.webp", descricao: "Celular com inteligência artificial integrada e tela de 120Hz.", emEstoque: true },
        { id: 5, nome: "Apple Watch Series 9", preco: 4900, categoria: "Acessórios", imagem: "img/aw.jpg", descricao: "Relógio inteligente avançado com sensores de saúde.", emEstoque: true },
        { id: 6, nome: "Nintendo Switch OLED", preco: 2600, categoria: "Games", imagem: "img/ns.jpg", descricao: "Console híbrido com tela OLED vibrante e cores intensas.", emEstoque: false },
        { id: 7, nome: "Kindle Paperwhite", preco: 760, categoria: "Acessórios", imagem: "img/kindle.jpg", descricao: "Leitor de e-books à prova de água com tela antirreflexo.", emEstoque: true },
        { id: 8, nome: "Dell XPS 13", preco: 7449, categoria: "Notebook", imagem: "img/shopping.webp", descricao: "Ultrabook premium ultrafino, ideal para produtividade.", emEstoque: false }
    ]
};

// --- FUNÇÃO PARA RENDERIZAR A HOME-PAGE ---
function renderHome() {
    const productList = document.getElementById('product-list');
    if (!productList) return; // Garante que só roda na index.html

    productList.innerHTML = ""; 

    data.produtos.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        
        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3 class="card-title">${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <p><strong>${produto.categoria}</strong></p>
            <button class="btn-buy" onclick="comprar(${produto.id})">Comprar</button>
            <a href="detalhes.html?id=${produto.id}" class="btn-link">Ver Detalhes</a>
        `;
        productList.appendChild(card);
    });
}

// --- FUNÇÃO PARA RENDERIZAR A PÁGINA DE DETALHES ---
function renderDetails() {
    const detailsContainer = document.getElementById('product-details-container');
    if (!detailsContainer) return; 

    const params = new URLSearchParams(window.location.search);
    const idParam = parseInt(params.get('id'));

    const produto = data.produtos.find(p => p.id === idParam);

    if (produto) {
        // Aqui adicionamos a 'product-info-column' para organizar o layout
        detailsContainer.innerHTML = `
            <div class="product-detail-view">
                <div class="product-image-column">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                </div>
                
                <div class="product-info-column">
                    <span class="category-tag">${produto.categoria}</span>
                    <h1>${produto.nome}</h1>
                    <p class="price">R$ ${produto.preco.toFixed(2)}</p>
                    <p class="status-badge ${produto.emEstoque ? 'status-disponivel' : 'status-esgotado'}">
                        ${produto.emEstoque ? "● Em estoque" : "○ Esgotado"}
                    </p>
                    <hr>
                    <p class="description">${produto.descricao}</p>
                    
                    <button class="btn-buy" onclick="comprar(${produto.id})">
                        <i class="fas fa-shopping-cart"></i> Comprar Agora
                    </button>
                    
                    <a href="index.html" class="btn-back">← Voltar para a Loja</a>
                </div>
            </div>
        `;
    } else {
        detailsContainer.innerHTML = "<h2>Produto não encontrado!</h2><a href='index.html'>Voltar</a>";
    }
}

// Função para o botão comprar
function comprar(id) {
    const produto = data.produtos.find(p => p.id === id);
    alert(`O item "${produto.nome}" foi adicionado ao carrinho!`);
}

// Executa as funções assim que o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    renderHome();
    renderDetails();
});