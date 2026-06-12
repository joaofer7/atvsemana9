
// Helper: obtém usuário logado do sessionStorage
function getUsuarioCorrente() {
    const dados = sessionStorage.getItem('usuarioCorrente');
    return dados ? JSON.parse(dados) : null;
}

const dadosIniciais = [
    { 
        id: 1, 
        nome: "Macbook Pro M3", 
        preco: 12499.00, 
        categoria: "Notebook", 
        imagem: "./assets/img/mac.webp", 
        descricao: "O MacBook Pro com chip M3 oferece uma velocidade absurda para fluxos de trabalho pesados.\nPossui uma tela Liquid Retina XDR de 14 polegadas com tecnologia ProMotion e cores vibrantes.\nIdeal para profissionais que buscam bateria para o dia todo e performance extrema em qualquer lugar.", 
        emEstoque: true 
    },
    { 
        id: 2, 
        nome: "iPhone 15 Pro Max", 
        preco: 8599.00, 
        categoria: "Celulares", 
        imagem: "./assets/img/iphone17.webp", 
        descricao: "Design em titânio aeroespacial que torna este o modelo Pro mais leve e resistente até hoje.\nEquipado com o chip A17 Pro, garantindo desempenho inigualável em jogos e multitarefa.\nSistema de câmera avançado com zoom óptico de 5x para capturas profissionais em alta resolução.", 
        emEstoque: false 
    },
    { 
        id: 3, 
        nome: "Sony WH-1000XM5", 
        preco: 2880.00, 
        categoria: "Acessórios", 
        imagem: "./assets/img/sony fone.webp", 
        descricao: "Líder mundial em cancelamento de ruído, transformando ambientes barulhentos em silêncio absoluto.\nConta com dois processadores que controlam oito microfones para uma clareza de áudio impecável.\nBateria de longa duração com até 30 horas de autonomia e carregamento ultra rápido via USB-C.", 
        emEstoque: true 
    },
    { 
        id: 4, 
        nome: "Samsung Galaxy S24 Ultra", 
        preco: 6999.00, 
        categoria: "Celulares", 
        imagem: "./assets/img/download.webp", 
        descricao: "O auge da inteligência artificial móvel com o Galaxy AI, permitindo traduções de chamadas em tempo real.\nEstrutura em titânio e tela plana de 6.8 polegadas com Gorilla Armor para máxima proteção.\nCâmera de 200MP que utiliza processamento por IA para fotos perfeitas mesmo em baixa luminosidade.", 
        emEstoque: true 
    },
    { 
        id: 5, 
        nome: "Apple Watch Series 9", 
        preco: 4900.00, 
        categoria: "Acessórios", 
        imagem: "./assets/img/aw.jpg", 
        descricao: "O relógio mais avançado da Apple com o novo chip S9, permitindo interações sem tocar na tela.\nSensores de saúde potentes para monitorar oxigênio no sangue, ECG e estágios do sono.\nTela Retina Sempre Ativa com o dobro de brilho para facilitar a leitura sob sol forte.", 
        emEstoque: true 
    },
    { 
        id: 6, 
        nome: "Nintendo Switch OLED", 
        preco: 2600.00, 
        categoria: "Games", 
        imagem: "./assets/img/ns.jpg", 
        descricao: "Console híbrido com tela OLED de 7 polegadas que proporciona cores vivas e contraste infinito.\nSuporte ajustável amplo para modo semiportátil e 64GB de armazenamento interno para seus jogos.\nÁudio aprimorado nos alto-falantes do console para uma experiência imersiva em qualquer lugar.", 
        emEstoque: false 
    },
    { 
        id: 7, 
        nome: "Kindle Paperwhite", 
        preco: 760.00, 
        categoria: "Acessórios", 
        imagem: "./assets/img/kindle.jpg", 
        descricao: "Leitor de livros digitais com tela de 6,8 polegadas e bordas mais finas para uma leitura confortável.\nTemperatura de luz ajustável e bateria que dura semanas, ideal para leitores ávidos.\nTotalmente à prova d'água, permitindo ler na praia, na piscina ou até dentro da banheira.", 
        emEstoque: true 
    },
    { 
        id: 8, 
        nome: "Dell XPS 13", 
        preco: 7449.00, 
        categoria: "Notebook", 
        imagem: "./assets/img/shopping.webp", 
        descricao: "O notebook premium mais compacto da Dell com tela InfinityEdge de bordas praticamente invisíveis.\nConstruído em alumínio usinado e fibra de carbono para máxima durabilidade com leveza.\nDesempenho potente com processadores Intel Core de última geração para produtividade sem limites.", 
        emEstoque: false 
    }
];



function getProdutos() {
    const salvo = localStorage.getItem('lc_produtos');
    if (salvo) {
        return JSON.parse(salvo);
    }
    // Primeira vez: inicializa com dados padrão
    localStorage.setItem('lc_produtos', JSON.stringify(dadosIniciais));
    return dadosIniciais;
}

function setProdutos(lista) {
    localStorage.setItem('lc_produtos', JSON.stringify(lista));
}

function getNextId() {
    const lista = getProdutos();
    if (lista.length === 0) return 1;
    return Math.max(...lista.map(p => p.id)) + 1;
}


const data = {
    get produtos() { return getProdutos(); }
};


const PALETTE = {
    accent:  '#007bff',
    accent2: '#dc3545',
    accent3: '#28a745',
    accent4: '#ffc107',
    muted:   '#6c757d',
    border:  '#e2e8f0',
    text:    '#212529',
};

const CAT_COLORS = {
    'Notebook':   PALETTE.accent,
    'Celulares':  '#6610f2',
    'Acessórios': '#fd7e14',
    'Games':      PALETTE.accent4,
};


function groupBy(arr, key) {
    return arr.reduce((acc, item) => {
        (acc[item[key]] = acc[item[key]] || []).push(item);
        return acc;
    }, {});
}

function avg(arr) { 
    return arr.reduce((s,v) => s+v, 0) / arr.length; 
}

function fmtBRL(v) { 
    return v.toLocaleString('pt-BR', {style:'currency', currency:'BRL'}); 
}


// ─── FAVORITOS ────────────────────────────────────────────────────────────────

/**
 * Retorna a chave localStorage para os favoritos do usuário logado.
 */
function getFavoritosKey() {
    const usuario = getUsuarioCorrente ? getUsuarioCorrente() : null;
    if (!usuario) return null;
    return `favoritos_${usuario.id}`;
}

/**
 * Retorna o array de IDs favoritados pelo usuário atual.
 */
function getFavoritos() {
    const key = getFavoritosKey();
    if (!key) return [];
    const dados = localStorage.getItem(key);
    return dados ? JSON.parse(dados) : [];
}

/**
 * Salva o array de favoritos no localStorage.
 */
function setFavoritos(lista) {
    const key = getFavoritosKey();
    if (!key) return;
    localStorage.setItem(key, JSON.stringify(lista));
}

/**
 * Alterna o estado de favorito de um produto.
 * Exige que o usuário esteja logado.
 */
function toggleFavorito(id) {
    const usuario = getUsuarioCorrente ? getUsuarioCorrente() : null;
    if (!usuario) {
        // Usuário não logado: bloqueia e redireciona
        if (confirm('Você precisa estar logado para favoritar produtos.\nDeseja ir para a tela de login?')) {
            window.location.href = './modulos/login/index.html';
        }
        return;
    }

    let favoritos = getFavoritos();
    const index = favoritos.indexOf(id);

    if (index === -1) {
        favoritos.push(id);
    } else {
        favoritos.splice(index, 1);
    }

    setFavoritos(favoritos);
    renderHome(); // Re-renderiza para atualizar ícones
}

// ─── RENDER HOME ──────────────────────────────────────────────────────────────

function renderHome() {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    productList.innerHTML = ""; 
    const favoritos = getFavoritos();

    getProdutos().forEach(produto => {
        const isFav = favoritos.includes(produto.id);
        const card = document.createElement('div');
        
        // Grid do Bootstrap estruturado
        card.className = 'col-12 col-sm-6 col-md-4 col-lg-3';
        
        card.innerHTML = `
            <div class="card h-100 shadow-sm position-relative border-0 bg-white rounded-3 overflow-hidden">
                
                <button class="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm" 
                        style="width: 36px; height: 36px; z-index: 10; display: flex; align-items: center; justify-content: center; border: none; background-color: rgba(255,255,255,0.9);"
                        onclick="toggleFavorito(${produto.id})" 
                        title="${isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}">
                    <i class="fa-${isFav ? 'solid text-danger' : 'regular text-muted'} fa-heart" style="font-size: 1.1rem; transition: transform 0.2s;"></i>
                </button>
                
                <div class="d-flex align-items-center justify-content-center bg-white p-3" style="height: 200px;">
                    <img src="${produto.imagem}" alt="${produto.nome}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
                </div>
                
                <div class="card-body d-flex flex-column bg-blue p-3 border-top">
                    <h3 class="fs-6 fw-bold text-dark text-truncate mb-2" title="${produto.nome}">${produto.nome}</h3>
                    <p class="fw-bold text-primary fs-5 mb-3">R$ ${produto.preco.toFixed(2)}</p>
                    
                    <div class="d-flex gap-2 mt-auto">
                        <a href="detalhes.html?id=${produto.id}" class="btn btn-outline-secondary btn-sm flex-grow-1 d-flex align-items-center justify-content-center" style="font-size: 0.8rem;">
                            Ver Detalhes
                        </a>
                        <button class="btn btn-primary btn-sm flex-grow-1" style="font-size: 0.8rem;" onclick="comprar(${produto.id})">
                            Comprar
                        </button>
                    </div>
                </div>
            </div>
        `;
        productList.appendChild(card);
    });
}


function renderDetails() {
    const detailsContainer = document.getElementById('product-details-container');
    if (!detailsContainer) return; 

    const params = new URLSearchParams(window.location.search);
    const idParam = parseInt(params.get('id'));
    const produto = getProdutos().find(p => p.id === idParam);

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
    const produto = getProdutos().find(p => p.id === id);
    alert(`Sucesso! "${produto.nome}" foi adicionado ao carrinho.`);
}


function buildKPIs() {
    const grid = document.getElementById('kpi-grid');
    if (!grid) return;

    const produtos = getProdutos();
    const total = produtos.length;
    const emEstoque = produtos.filter(p => p.emEstoque).length;
    const totalValor = produtos.reduce((s,p) => s+p.preco, 0);
    const mediaPreco = totalValor / total;
    const maisValioso = [...produtos].sort((a,b)=>b.preco-a.preco)[0];

    const kpis = [
        { icon:'fa-boxes-stacked', value: total,               label:'Total de Produtos',  color: PALETTE.accent,  fmt: v=>v },
        { icon:'fa-check-circle',  value: emEstoque,            label:'Em Estoque',         color: PALETTE.accent3, fmt: v=>v },
        { icon:'fa-chart-line',    value: mediaPreco,           label:'Preço Médio',        color: '#6f42c1',       fmt: fmtBRL },
        { icon:'fa-crown',         value: maisValioso.preco,    label:'Produto Top',        color: PALETTE.accent4, fmt: fmtBRL },
    ];

    grid.innerHTML = "";
    
    kpis.forEach(k => {
        const card = document.createElement('div');
        card.className = 'kpi-card';
        card.style.setProperty('--accent-color', k.color);
        card.innerHTML = `
            <div class="kpi-icon"><i class="fa-solid ${k.icon}"></i></div>
            <div class="kpi-value">${k.fmt(k.value)}</div>
            <div class="kpi-label">${k.label}</div>
        `;
        grid.appendChild(card);
    });
}


function buildChartPizza() {
    const canvas = document.getElementById('chartPizza');
    if (!canvas) return;
    if (typeof Chart === 'undefined') return;

    Chart.defaults.font = { family: "'Syne', sans-serif", size: 12 };
    Chart.defaults.color = PALETTE.muted;

    const por = groupBy(getProdutos(), 'categoria');
    const labels = Object.keys(por);
    const values = labels.map(l => por[l].length);
    const colors = labels.map(l => CAT_COLORS[l] || PALETTE.muted);

    new Chart(canvas, {
        type: 'pie',
        data: {
            labels,
            datasets: [{
                data: values,
                backgroundColor: colors.map(c => c + 'cc'),
                borderColor: colors,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { usePointStyle: true, padding: 16 }
                }
            }
        }
    });
}


function buildChartBarras() {
    const canvas = document.getElementById('chartBarras');
    if (!canvas) return;
    if (typeof Chart === 'undefined') return;

    const por = groupBy(getProdutos(), 'categoria');
    const labels = Object.keys(por);
    const values = labels.map(l => Math.round(avg(por[l].map(p => p.preco))));
    const colors = labels.map(l => CAT_COLORS[l] || PALETTE.muted);

    new Chart(canvas, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Preço Médio (R$)',
                data: values,
                backgroundColor: colors.map(c => c + '33'),
                borderColor: colors,
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: PALETTE.border } },
                y: {
                    grid: { color: PALETTE.border },
                    ticks: { callback: v => 'R$ ' + v.toLocaleString('pt-BR') }
                }
            }
        }
    });
}

function buildChartEstoque() {
    const canvas = document.getElementById('chartEstoque');
    if (!canvas) return;
    if (typeof Chart === 'undefined') return;

    const produtos = getProdutos();
    const emEstoque  = produtos.filter(p => p.emEstoque).length;
    const esgotado   = produtos.length - emEstoque;

    new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: ['Em Estoque', 'Esgotado'],
            datasets: [{
                data: [emEstoque, esgotado],
                backgroundColor: [PALETTE.accent3 + 'cc', PALETTE.accent2 + 'cc'],
                borderColor:     [PALETTE.accent3, PALETTE.accent2],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: { position: 'bottom', labels: { usePointStyle: true, padding: 16 } }
            }
        }
    });
}


function buildChartPrecos() {
    const canvas = document.getElementById('chartPrecos');
    if (!canvas) return;
    if (typeof Chart === 'undefined') return;

    const sorted = [...getProdutos()].sort((a,b) => b.preco - a.preco);
    const labels = sorted.map(p => p.nome.length > 15 ? p.nome.slice(0,15)+'…' : p.nome);
    const values = sorted.map(p => p.preco);
    const colors = sorted.map(p => CAT_COLORS[p.categoria] || PALETTE.muted);

    new Chart(canvas, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                data: values,
                backgroundColor: colors.map(c => c + '33'),
                borderColor: colors,
                borderWidth: 2,
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: PALETTE.border } },
                y: { grid: { display: false } }
            }
        }
    });
}


function buildTable() {
    const tbody = document.getElementById('product-table-body');
    if (!tbody) return;

    tbody.innerHTML = "";
    
    const badge = document.getElementById('total-badge');
    const produtos = getProdutos();
    if (badge) badge.textContent = produtos.length + ' itens';

    produtos.forEach((p, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="font-family:'Space Mono',monospace;font-size:0.75rem;color:var(--muted)">${String(i+1).padStart(2,'0')}</td>
            <td style="font-weight:600">${p.nome}</td>
            <td>
                <span style="font-size:0.75rem;padding:4px 10px;border-radius:20px;
                    background:${CAT_COLORS[p.categoria]}15;
                    color:${CAT_COLORS[p.categoria]};
                    border:1px solid ${CAT_COLORS[p.categoria]}44">
                    ${p.categoria}
                </span>
            </td>
            <td><span class="price-pill">${fmtBRL(p.preco)}</span></td>
            <td>
                <span class="status-badge ${p.emEstoque ? 'status-in' : 'status-out'}">
                    ${p.emEstoque ? '● Disponível' : '○ Esgotado'}
                </span>
            </td>
        `;
        tbody.appendChild(tr);
    });
}


function renderCrudTable() {
    const tbody = document.getElementById('crud-table-body');
    if (!tbody) return;

    const produtos = getProdutos();
    const badge = document.getElementById('crud-total-badge');
    if (badge) badge.textContent = produtos.length + ' itens';

    tbody.innerHTML = "";
    produtos.forEach((p) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="font-family:'Space Mono',monospace;font-size:0.75rem;color:var(--muted)">${String(p.id).padStart(2,'0')}</td>
            <td style="font-weight:600">${p.nome}</td>
            <td>
                <span style="font-size:0.75rem;padding:4px 10px;border-radius:20px;
                    background:${CAT_COLORS[p.categoria] || PALETTE.muted}15;
                    color:${CAT_COLORS[p.categoria] || PALETTE.muted};
                    border:1px solid ${CAT_COLORS[p.categoria] || PALETTE.muted}44">
                    ${p.categoria}
                </span>
            </td>
            <td><span class="price-pill">${fmtBRL(p.preco)}</span></td>
            <td>
                <span class="status-badge ${p.emEstoque ? 'status-in' : 'status-out'}">
                    ${p.emEstoque ? '● Disponível' : '○ Esgotado'}
                </span>
            </td>
            <td>
                <div class="d-flex gap-2">
                    <button class="btn-crud btn-edit" onclick="openEditModal(${p.id})">
                        <i class="fa-solid fa-pen"></i> Editar
                    </button>
                    <button class="btn-crud btn-delete" onclick="deleteProduto(${p.id})">
                        <i class="fa-solid fa-trash"></i> Excluir
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}


function openNewModal() {
    document.getElementById('modal-title').textContent = 'Novo Produto';
    document.getElementById('form-id').value = '';
    document.getElementById('form-nome').value = '';
    document.getElementById('form-preco').value = '';
    document.getElementById('form-categoria').value = 'Notebook';
    document.getElementById('form-imagem').value = '';
    document.getElementById('form-descricao').value = '';
    document.getElementById('form-estoque').checked = true;

    const modal = new bootstrap.Modal(document.getElementById('produtoModal'));
    modal.show();
}


function openEditModal(id) {
    const produto = getProdutos().find(p => p.id === id);
    if (!produto) return;

    document.getElementById('modal-title').textContent = 'Editar Produto';
    document.getElementById('form-id').value = produto.id;
    document.getElementById('form-nome').value = produto.nome;
    document.getElementById('form-preco').value = produto.preco;
    document.getElementById('form-categoria').value = produto.categoria;
    document.getElementById('form-imagem').value = produto.imagem;
    document.getElementById('form-descricao').value = produto.descricao;
    document.getElementById('form-estoque').checked = produto.emEstoque;

    const modal = new bootstrap.Modal(document.getElementById('produtoModal'));
    modal.show();
}


function salvarProduto() {
    const id       = document.getElementById('form-id').value;
    const nome     = document.getElementById('form-nome').value.trim();
    const preco    = parseFloat(document.getElementById('form-preco').value);
    const categoria = document.getElementById('form-categoria').value;
    const imagem   = document.getElementById('form-imagem').value.trim() || './assets/img/shopping.webp';
    const descricao = document.getElementById('form-descricao').value.trim();
    const emEstoque = document.getElementById('form-estoque').checked;

    if (!nome || isNaN(preco) || preco <= 0) {
        alert('Preencha nome e preço corretamente.');
        return;
    }

    let lista = getProdutos();

    if (id) {
        // EDITAR
        lista = lista.map(p => p.id === parseInt(id) 
            ? { ...p, nome, preco, categoria, imagem, descricao, emEstoque } 
            : p
        );
        mostrarToast('Produto atualizado com sucesso!', 'success');
    } else {
        // CRIAR
        const novoProduto = {
            id: getNextId(),
            nome, preco, categoria, imagem, descricao, emEstoque
        };
        lista.push(novoProduto);
        mostrarToast('Produto criado com sucesso!', 'success');
    }

    setProdutos(lista);

    // Fechar modal
    const modalEl = document.getElementById('produtoModal');
    bootstrap.Modal.getInstance(modalEl).hide();

    renderCrudTable();
}


function deleteProduto(id) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    let lista = getProdutos().filter(p => p.id !== id);
    setProdutos(lista);
    mostrarToast('Produto excluído.', 'danger');
    renderCrudTable();
}


function resetarDados() {
    if (!confirm('Isso irá restaurar todos os produtos originais. Continuar?')) return;
    localStorage.removeItem('lc_produtos');
    mostrarToast('Dados restaurados com sucesso!', 'success');
    renderCrudTable();
}


function mostrarToast(mensagem, tipo) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `crud-toast crud-toast-${tipo}`;
    toast.innerHTML = `<i class="fa-solid ${tipo === 'success' ? 'fa-check-circle' : 'fa-trash'}"></i> ${mensagem}`;
    container.appendChild(toast);

    setTimeout(() => { toast.classList.add('show'); }, 10);
    setTimeout(() => { 
        toast.classList.remove('show'); 
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}


document.addEventListener('DOMContentLoaded', () => {
    renderHome();
    renderDetails();
    buildKPIs();
    buildChartPizza();
    buildChartBarras();
    buildChartEstoque();
    buildChartPrecos();
    buildTable();
    renderCrudTable();

    // Botão salvar do modal
    const btnSalvar = document.getElementById('btn-salvar-produto');
    if (btnSalvar) {
        btnSalvar.addEventListener('click', salvarProduto);
    }
});
