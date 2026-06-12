/**
 * Módulo de Login - Little Commerce
 * Gerencia autenticação de usuários via sessionStorage
 */

const usuariosPadrao = [
    { id: 1, nome: "Administrador", login: "admin", senha: "123", email: "admin@littlecommerce.com" },
    { id: 2, nome: "Usuário", login: "user", senha: "123", email: "user@littlecommerce.com" }
];

/**
 * Inicializa o app de login.
 * Carrega usuários do localStorage (simulando fetch('/usuarios'))
 * e redireciona para login se não houver sessão ativa.
 */
function initLoginApp() {
    if (!localStorage.getItem('lc_usuarios')) {
        localStorage.setItem('lc_usuarios', JSON.stringify(usuariosPadrao));
    }

    const path = window.location.pathname;
    const isProtectedPage = path.endsWith('index.html') ||
                            path.endsWith('favoritos.html') ||
                            path === '/' ||
                            path.endsWith('/');

    if (isProtectedPage && !getUsuarioCorrente()) {
        window.location.href = './modulos/login/index.html';
        return;
    }

    atualizarUILogin();
}

/**
 * Retorna o objeto usuarioCorrente do sessionStorage, ou null.
 */
function getUsuarioCorrente() {
    const dados = sessionStorage.getItem('usuarioCorrente');
    return dados ? JSON.parse(dados) : null;
}

/**
 * Retorna a lista de usuários do localStorage.
 */
function getUsuarios() {
    const dados = localStorage.getItem('lc_usuarios');
    return dados ? JSON.parse(dados) : usuariosPadrao;
}

/**
 * Encerra a sessão e redireciona para o formulário de login.
 */
function logoutUser() {
    sessionStorage.removeItem('usuarioCorrente');
    window.location.href = './modulos/login/index.html';
}

/**
 * Atualiza a área de login na navbar.
 */
function atualizarUILogin() {
    const areaLogin = document.getElementById('area-login');
    if (!areaLogin) return;

    const usuario = getUsuarioCorrente();

    if (usuario) {
        areaLogin.innerHTML = `
            <span class="text-light me-2 d-flex align-items-center gap-1">
                <i class="fa-solid fa-circle-user"></i>
                Olá, <strong>${usuario.nome}</strong>
            </span>
            <a href="#" class="btn btn-outline-light btn-sm" onclick="logoutUser(); return false;">
                <i class="fa-solid fa-right-from-bracket me-1"></i>Sair
            </a>
        `;
    } else {
        areaLogin.innerHTML = `
            <a href="./modulos/login/index.html" class="btn btn-outline-light btn-sm">
                <i class="fa-solid fa-right-to-bracket me-1"></i>Entrar
            </a>
        `;
    }
}

document.addEventListener('DOMContentLoaded', initLoginApp);
