const data = {
    produtos: [
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
    ]
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

function buildKPIs() {
    const grid = document.getElementById('kpi-grid');
    if (!grid) return;

    const produtos = data.produtos;
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

    const por = groupBy(data.produtos, 'categoria');
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

    const por = groupBy(data.produtos, 'categoria');
    const labels = Object.keys(por);
    const values = labels.map(l => Math.round(avg(por[l].map(p => p.preco))));
    const colors = labels.map(l => CAT_COLORS[l] || PALETTE.muted);

    new Chart(canvas, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
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
                    ticks: { callback: v => 'R$ ' + v }
                }
            }
        }
    });
}

function buildChartEstoque() {
    const canvas = document.getElementById('chartEstoque');
    if (!canvas) return;

    if (typeof Chart === 'undefined') return;

    const emEstoque  = data.produtos.filter(p => p.emEstoque).length;
    const esgotado   = data.produtos.length - emEstoque;

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

    const sorted = [...data.produtos].sort((a,b) => b.preco - a.preco);
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
    if (badge) badge.textContent = data.produtos.length + ' itens';

    data.produtos.forEach((p, i) => {
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

document.addEventListener('DOMContentLoaded', () => {
    renderHome();
    renderDetails();
    buildKPIs();
    buildChartPizza();
    buildChartBarras();
    buildChartEstoque();
    buildChartPrecos();
    buildTable();
});