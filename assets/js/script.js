const data = {
    produtos: [
        { id: 1, nome: "Macbook-Pro", preco: 12000, categoria: "Notebook", imagem: "img/mac.webp", descricao: "O MacBook Pro é o notebook de alto desempenho da Apple.", emEstoque: true },
        { id: 2, nome: "Iphone 17 PRO MAX", preco: 6500, categoria: "Celulares", imagem: "img/iphone17.webp", descricao: "Smartphone premium com acabamento em titânio.", emEstoque: false },
        { id: 3, nome: "Sony WH-1000XM5", preco: 2880, categoria: "Acessórios", imagem: "img/sony fone.webp", descricao: "Headphones com cancelamento de ruído líder.", emEstoque: true },
        { id: 4, nome: "Samsung Galaxy S24 Ultra", preco: 6000, categoria: "Celulares", imagem: "img/download.webp", descricao: "Celular com inteligência artificial integrada.", emEstoque: true },
        { id: 5, nome: "Apple Watch Series 9", preco: 4900, categoria: "Acessórios", imagem: "img/aw.jpg", descricao: "Relógio inteligente avançado.", emEstoque: true },
        { id: 6, nome: "Nintendo Switch OLED", preco: 2600, categoria: "Games", imagem: "img/ns.jpg", descricao: "Console híbrido com tela vibrante.", emEstoque: false },
        { id: 7, nome: "Kindle Paperwhite", preco: 760, categoria: "Acessórios", imagem: "img/kindle.jpg", descricao: "Leitor de e-books à prova de água.", emEstoque: true },
        { id: 8, nome: "Dell XPS 13", preco: 7449, categoria: "Notebook", imagem: "img/shopping.webp", descricao: "Ultrabook premium ultrafino.", emEstoque: false }
    ]
};

// B.2 Seleção de Elementos
const productList = document.getElementById('product-list');
const productDetails = document.getElementById('product-details');
const searchInput = document.querySelector('#src');
const categorySelect = document.querySelector('#category');
const btnRender = document.getElementById('btnRender');

// B.3 Funções Obrigatórias

function formatPrice(preco) {
    return `R$ ${preco.toFixed(2)}`;
}

function createProductCard(produto) {
    const card = document.createElement('div');
    card.classList.add('product-card'); // Exigência B.3 (classList)
    card.setAttribute('data-id', produto.id); // Exigência B.3 (setAttribute)
    
    // Ajuste visual via style (Exigência B.3)
    card.style.border = "1px solid #ccc";
    card.style.padding = "15px";
    card.style.borderRadius = "8px";

    card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" style="width: 100%">
        <h3 class="card-title">${produto.nome}</h3>
        <p>${formatPrice(produto.preco)}</p>
        <p><strong>${produto.categoria}</strong></p>
        <button class="btn-details">Ver Detalhes</button>
        <button class="btn-highlight">Destacar</button>
    `;

    // Eventos nos botões do card (B.4)
    card.querySelector('.btn-details').addEventListener('click', () => showProductDetails(produto));
    card.querySelector('.btn-highlight').addEventListener('click', () => {
        card.classList.toggle('highlight'); // Alterna o destaque visual
    });

    return card;
}

function renderProducts(lista) {
    productList.innerHTML = ""; // Limpa a lista
    lista.forEach(produto => {
        const card = createProductCard(produto);
        productList.appendChild(card); // Exigência B.3 (appendChild)
    });

    // B.5 Uso de querySelectorAll
    const allCards = document.querySelectorAll('.product-card');
    allCards.forEach(c => {
        console.log("Card renderizado ID:", c.getAttribute('data-id'));
    });
}

function renderCategories() {
    const categorias = ["Todas", ...new Set(data.produtos.map(p => p.categoria))];
    categorySelect.innerHTML = ""; // Limpa o select
    
    categorias.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });
}

function showProductDetails(produto) {
    productDetails.innerHTML = `
        <div style="background: #f4f4f4; padding: 20px; margin-top: 20px; border: 2px solid #333">
            <h2>Detalhes: ${produto.nome}</h2>
            <p><strong>Descrição:</strong> ${produto.descricao}</p>
            <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
            <p><strong>Estoque:</strong> ${produto.emEstoque ? "Disponível" : "Esgotado"}</p>
            <p><strong>Categoria:</strong> ${produto.categoria}</p>
        </div>
    `;
}

function filterProducts() {
    const termo = searchInput.value.toLowerCase();
    const categoria = categorySelect.value;

    const filtrados = data.produtos.filter(p => {
        const bateNome = p.nome.toLowerCase().includes(termo);
        const bateCategoria = (categoria === "Todas" || p.categoria === categoria);
        return bateNome && bateCategoria;
    });

    renderProducts(filtrados);
}

// B.4 Adicionar EventListeners Globais
searchInput.addEventListener('input', filterProducts);
categorySelect.addEventListener('change', filterProducts);
btnRender.addEventListener('click', () => renderProducts(data.produtos));

// Inicialização
renderCategories();
renderProducts(data.produtos);