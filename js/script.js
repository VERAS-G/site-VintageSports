/* ==========================================================================
   VARIÁVEIS GLOBAIS E FUNÇÃO MESTRA
   ========================================================================== */

// 🔥 FUNÇÃO MESTRA: Unifica o visual de todos os produtos do site
function criarHTMLCard(produto) {
    // 1. Configurações de exibição de desconto (Valores fictícios conforme sua foto)
    const precoOriginal = produto.preco * 1.15; // Gera preço riscado 15% maior
    const descontoPercentual = 15;

    // 2. Detecção Inteligente de Oferta
    // Checa se a pasta da imagem contém "ofertas" (sem importar se é Maiúsculo ou Minúsculo)
    // OU se o produto tem a propriedade isPromo: true no banco de dados
    const imagemCaminho = produto.imagem.toLowerCase();
    const mostrarOferta = imagemCaminho.includes('ofertas') || produto.isPromo === true;

    // 3. Define o Bloco de Preço baseado no status de oferta
    let blocoPreco = "";

    if (mostrarOferta) {
        blocoPreco = `
            <div class="price-container">
                <span class="price-main">R$ ${produto.preco.toFixed(2).replace(".", ",")} <small>no Pix</small></span>
                <span class="price-old">R$ ${precoOriginal.toFixed(2).replace(".", ",")}</span>
                <span class="discount-percent">${descontoPercentual}% off</span>
            </div>`;
    } else {
        // Preço padrão para produtos que não são oferta
        blocoPreco = `<p class="price">R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>`;
    }

    // 4. Retorno do HTML do Card Padronizado
    return `
      <div class="card" data-nome="${produto.nome}">
        ${mostrarOferta ? '<span class="badge-oferta">OFERTA</span>' : ''}
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <div class="stars">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
        </div>
        
        ${blocoPreco}

        <div class="buttons">
          <button class="btn-adicionar" onclick="abrirModal('${produto.nome}', ${produto.preco}, '${produto.imagem}', false, this)">
            🛒 Adicionar
          </button>
          <button class="buy-btn" onclick="abrirModal('${produto.nome}', ${produto.preco}, '${produto.imagem}', true, this)">
            Comprar
          </button>
        </div>
      </div>
    `;
}


let cart = JSON.parse(localStorage.getItem("cart")) || [];
let overlay, cartPanel;

document.addEventListener("DOMContentLoaded", () => {
    // Seletores Principais (com verificação de existência)
    overlay = document.getElementById("overlay");
    cartPanel = document.getElementById("cart");
    const input = document.getElementById("searchInput");
    const cartBtn = document.getElementById("cart-btn");
    const searchIcon = document.querySelector(".search-icon");
    const searchBox = document.querySelector(".search-box");

    // Inicializa o carrinho com dados salvos
    if (typeof updateCart === "function") updateCart();

    // 🔥 ACORDEÃO DE FILTROS
    document.querySelectorAll(".filtro button").forEach(btn => {
        btn.onclick = () => {
            const conteudo = btn.nextElementSibling;
            if (conteudo) {
                conteudo.style.display = conteudo.style.display === "block" ? "none" : "block";
            }
        };
    });

    // 🔥 BUSCA EM TEMPO REAL
    if (searchIcon && searchBox) {
        searchIcon.onclick = () => {
            searchBox.classList.toggle("active");
            if (input) input.focus();
        };
    }

    if (input) {
        input.oninput = () => {
            const val = input.value.toLowerCase();
            document.querySelectorAll(".card").forEach(card => {
                const title = card.querySelector("h3").innerText.toLowerCase();
                card.style.display = title.includes(val) ? "block" : "none";
            });
        };
    }

    // 🔥 CONTROLE DO CARRINHO (Abrir/Fechar)
    if (cartBtn && cartPanel) {
        cartBtn.onclick = (e) => {
            e.stopPropagation();
            cartPanel.classList.contains("active") ? closeCart() : openCart();
        };

        overlay.onclick = closeCart;
        cartPanel.onclick = (e) => e.stopPropagation();

        document.onclick = (e) => {
            if (!cartPanel.contains(e.target) && !cartBtn.contains(e.target)) {
                if (typeof closeCart === "function") closeCart();
            }
        };
    }
});
/* ==========================================================================
   FUNÇÕES DE AÇÃO (CARRINHO E INTERAÇÃO)
   ========================================================================== */

function openCart() {
    if (!cartPanel || !overlay) return;
    cartPanel.classList.add("active");
    overlay.classList.add("active");
    
    // Evita que a página "pule" ao esconder a barra de rolagem
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.classList.add("no-scroll");
}

function closeCart() {
    if (!cartPanel || !overlay) return;
    cartPanel.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
    document.body.style.paddingRight = "0px";
}

function addToCart(name, price, image, btn, abrirImediato = false) {
    // 1. LÓGICA DO CARRINHO (Garante que o array exista)
    if (typeof cart === 'undefined') cart = [];

    const itemExistente = cart.find(item => item.name === name);

    if (itemExistente) {
        itemExistente.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1,
            selected: true
        });
    }

    // 2. ATUALIZAÇÃO DA INTERFACE
    if (typeof updateCart === "function") {
        updateCart();
    }
    
    // 3. NOTIFICAÇÃO (Toast)
    if (typeof showToast === "function") {
        showToast(abrirImediato ? "Pronto para comprar!" : "Adicionado ao carrinho");
    }

    // 4. ABERTURA OU EFEITO VISUAL NO BOTÃO
    if (abrirImediato) {
        setTimeout(openCart, 100);
    } else if (btn) {
        // Pequeno efeito de feedback no botão clicado (escala leve)
        btn.style.transform = "scale(0.95)";
        setTimeout(() => btn.style.transform = "scale(1)", 100);
    }

    // Salva no LocalStorage para não perder ao atualizar a página
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Nota: A função animateToCart foi removida para manter o código limpo,
// conforme solicitado anteriormente.
/* ==========================================================================
   SISTEMA DE NOTIFICAÇÃO (TOAST)
   ========================================================================== */
function showToast(message) {
    let container = document.querySelector(".toast-container");
    if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "nike-toast";

    toast.innerHTML = `
        <div class="toast-main-content">
            <i class="fa-solid fa-circle-check toast-icon"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close-btn" onclick="this.parentElement.classList.remove('show'); setTimeout(()=>this.parentElement.remove(), 500)">✕</button>
        <div class="toast-timer-bar"></div>
    `;

    container.appendChild(toast);
    
    // Pequeno delay para a animação de entrada funcionar
    setTimeout(() => toast.classList.add("show"), 10);

    // Auto-remove após 3 segundos
    setTimeout(() => {
        if (toast && toast.parentNode) {
            toast.classList.remove("show");
            setTimeout(() => { if (toast.parentNode) toast.remove(); }, 600);
        }
    }, 3000);
}

/* ==========================================================================
   LÓGICA DO CARRINHO (ATUALIZAÇÃO E INTERFACE)
   ========================================================================== */
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");
    const countElement = document.getElementById("cart-count");

    if (!cartItems) return;
    cartItems.innerHTML = "";

    let total = 0, totalItens = 0;

    cart.forEach((item, index) => {
        // Soma valor apenas se estiver selecionado
        if (item.selected) total += item.price * item.quantity;
        
        // Quantidade total para o ícone da Navbar
        totalItens += item.quantity;

        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
            <input type="checkbox" ${item.selected ? "checked" : ""} onchange="toggleItem(${index})">
            <img src="${item.image}" class="cart-img" onerror="this.src='/assets/img/logo.png'">
            <div class="cart-info">
                <p class="cart-name">${item.name}</p>
                <div class="qtd-control">
                    <button onclick="diminuirQtd(${index})">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="aumentarQtd(${index})">+</button>
                </div>
                <p class="cart-price">R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}</p>
            </div>
            <button class="delete-btn" onclick="removeItem(${index})">
                <i class="fa-solid fa-trash"></i>
            </button>`;
        cartItems.appendChild(li);
    });

    if (totalElement) totalElement.textContent = total.toFixed(2).replace(".", ",");

    // Contador dinâmico da Navbar (Amarelo)
    if (countElement) {
        if (totalItens > 0) {
            countElement.textContent = totalItens;
            countElement.style.display = "flex";
        } else {
            countElement.style.display = "none";
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

function toggleItem(index) {
    if (cart[index]) {
        cart[index].selected = !cart[index].selected;
        updateCart();
    }
}

function aumentarQtd(index) {
    if (cart[index]) {
        cart[index].quantity++;
        cart[index].selected = true; // Seleciona automaticamente ao aumentar
        updateCart();
    }
}

/* ==========================================================================
   FILTROS E BUSCA (INTEGRADOS COM A FUNÇÃO MESTRA)
   ========================================================================= */
function filtrarProdutos() {
    const input = document.getElementById('searchInput');
    if (!input) return;

    const termoBusca = input.value.toLowerCase();
    const timesMarcados = Array.from(document.querySelectorAll('.filtro-conteudo[data-tipo="time"] input:checked')).map(i => i.value);
    const precosMarcados = Array.from(document.querySelectorAll('.filtro-conteudo[data-tipo="preco"] input:checked')).map(i => i.value);

    // Usa a lista global de produtos disponível na página
    const listaOriginal = (typeof produtos !== 'undefined') ? produtos : [];

    const filtrados = listaOriginal.filter(p => {
        const bateNome = p.nome.toLowerCase().includes(termoBusca);
        const bateTime = timesMarcados.length === 0 || timesMarcados.includes(p.time);

        let batePreco = precosMarcados.length === 0;
        precosMarcados.forEach(faixa => {
            const [min, max] = faixa.split('-').map(Number);
            // Ajustado para p.preco (padronizado com a Função Mestra)
            if (p.preco >= min && (max ? p.preco <= max : true)) batePreco = true;
        });

        return bateNome && bateTime && batePreco;
    });

    renderizarListaFiltrada(filtrados);
}

function renderizarListaFiltrada(lista) {
    const container = document.getElementById("product-list");
    if (!container) return;

    container.innerHTML = ""; // Limpa a lista atual

    if (lista.length === 0) {
        container.innerHTML = `<p class="aviso-vazio">Nenhum produto encontrado com esses filtros.</p>`;
        return;
    }

    lista.forEach(p => {
        // 🔥 AQUI ESTÁ O SEGREDO: Usamos a Função Mestra da Parte 1
        container.innerHTML += criarHTMLCard(p);
    });
}

/* ==========================================================================
   CONTROLE DE QUANTIDADE E REMOÇÃO (MODAL CUSTOM)
   ========================================================================== */
function diminuirQtd(index) {
    if (cart[index] && cart[index].quantity > 1) {
        cart[index].quantity--;
        updateCart();
    } else {
        removeItem(index);
    }
}

function removeItem(index) {
    const modal = document.getElementById("custom-confirm");
    if (!modal) {
        // Se não houver modal customizado, remove direto (segurança)
        cart.splice(index, 1);
        updateCart();
        return;
    }

    modal.style.display = "flex";

    document.getElementById("confirm-yes").onclick = (e) => {
        e.stopPropagation();
        cart.splice(index, 1);
        modal.style.display = "none";
        updateCart();
        showToast("Produto removido!");
    };

    document.getElementById("confirm-no").onclick = (e) => {
        e.stopPropagation();
        modal.style.display = "none";
    };
}

/* ==========================================================================
   RENDERIZAÇÃO DINÂMICA (HOME / LOJA)
   ========================================================================== */
function desenharCards(container, lista) {
    if (!container) return;
    container.innerHTML = "";
    lista.forEach(p => {
        container.innerHTML += criarHTMLCard(p);
    });
}

function renderizarLoja() {
    const container = document.getElementById("product-list");
    const containerHome = document.getElementById("produtos-home");
    if (!container && !containerHome) return;

    // Detecta automaticamente qual lista usar baseada no que está carregado
    let lista = [];
    if (typeof produtosFemininos !== 'undefined') {
        lista = produtosFemininos;
    } else if (typeof produtos !== 'undefined') {
        lista = produtos;
    }

    if (containerHome) {
        // Na Home, mostra apenas os primeiros 4 produtos
        desenharCards(containerHome, lista.slice(0, 4));
    } else {
        // Na página da Loja, mostra tudo
        desenharCards(container, lista);
    }
}

// Inicializa a loja ao carregar
document.addEventListener("DOMContentLoaded", renderizarLoja);

/* ==========================================================================
   RENDERIZAÇÃO UNIFICADA (HOME / LOJA)
   ========================================================================== */

function desenharCards(container, lista) {
    if (!container) return;
    
    // 🔥 AGORA CONECTADO: Usa a Função Mestra para garantir o visual padrão e ofertas
    container.innerHTML = lista.map(p => criarHTMLCard(p)).join('');
}

/* ==========================================================================
   UTILITÁRIOS (COPIAR, SCROLL, NAVEGAÇÃO)
   ========================================================================== */

// Função para copiar código PIX ou Cupom
function copiarTexto(id, elemento) {
    const elTexto = document.getElementById(id);
    if (!elTexto) return;
    
    const texto = elTexto.innerText;
    navigator.clipboard.writeText(texto);

    const status = elemento.querySelector(".status");
    if (status) {
        elemento.classList.add("copiado");
        status.innerText = "Copiado ✔";

        setTimeout(() => {
            elemento.classList.remove("copiado");
            status.innerText = "Clique para copiar";
        }, 2000);
    }
}

// 🔥 ANIMAÇÃO DE SCROLL (Intersection Observer)
const observerOptions = { threshold: 0.2 };
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("ativo");
        }
    });
}, observerOptions);

// Aplica o observer em todos os elementos com a classe .animar
document.querySelectorAll(".animar").forEach(el => observer.observe(el));

// 🔥 REDIRECIONAMENTO INTELIGENTE DO CARRINHO
function VerCarrinho() {
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Ajusta o caminho dinamicamente conforme a pasta atual
    const path = window.location.pathname;
    if (path.includes("/pages/")) {
        window.location.href = "carrinho.html";
    } else {
        window.location.href = "pages/carrinho.html";
    }
}

function ContinuarCompra() {
    // Apenas fecha o painel lateral para o usuário continuar navegando
    if (typeof closeCart === "function") closeCart();
}

/* ==========================================================================
   EFEITOS DE INTERFACE (HEADER E DOM)
   ========================================================================== */

// Efeito de sombra/cor no Header ao rolar a página
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Inicialização Final quando tudo carregar
document.addEventListener("DOMContentLoaded", () => {
    if (typeof renderizarLoja === "function") renderizarLoja();
});
