/* ==========================================================================
   VARIÁVEIS GLOBAIS E FUNÇÃO MESTRA
   ========================================================================== */

// 🔥 FUNÇÃO MESTRA: Unifica o visual de todos os produtos do site
function abrirProduto(nomeProduto) {

    window.location.href =
        `/pages/pag_produtos.html?produto=${encodeURIComponent(nomeProduto)}`;
}

function criarHTMLCard(produto) {

    const precoOriginal = produto.preco * 1.15;
    const descontoPercentual = 15;

    const imagemCaminho = produto.imagem.toLowerCase();

    const mostrarOferta =
        imagemCaminho.includes("ofertas") ||
        produto.isPromo === true;

    let blocoPreco = "";

    if (mostrarOferta) {

        blocoPreco = `
            <div class="price-container">

                <span class="price-main">
                    R$ ${produto.preco.toFixed(2).replace(".", ",")}
                    <small>no Pix</small>
                </span>

                <span class="price-old">
                    R$ ${precoOriginal.toFixed(2).replace(".", ",")}
                </span>

                <span class="discount-percent">
                    ${descontoPercentual}% off
                </span>

            </div>
        `;

    } else {

        blocoPreco = `
            <p class="price">
                R$ ${produto.preco.toFixed(2).replace(".", ",")}
            </p>
        `;
    }

    return `
        <div class="card" data-nome="${produto.nome}">

            ${mostrarOferta ? '<span class="badge-oferta">OFERTA</span>' : ''}

            <div class="card-image">
                <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
            </div>

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

                <!-- 🔥 AGORA ABRE O CARRINHO -->
                <button
                    class="btn-adicionar"
                    onclick="abrirCarrinho({
                        nome: '${produto.nome}',
                        preco: ${produto.preco},
                        imagem: '${produto.imagem}'
                    })">

                    🛒 Adicionar

                </button>

                <button
                    class="buy-btn"
                    onclick="comprarProduto(this, '${produto.nome}')">

                    Comprar

                </button>

            </div>

        </div>
    `;
}

function comprarProduto(btn, nomeProduto) {

    const overlay = document.getElementById("overlay-loading");

    // segurança: evita quebra do sistema
    if (!overlay) {
        console.error("Elemento #overlay-loading não encontrado no HTML");
        abrirProduto(nomeProduto);
        return;
    }

    btn.disabled = true;

    overlay.classList.remove("hidden");

    setTimeout(() => {

        setTimeout(() => {

            overlay.classList.add("hidden");

            btn.disabled = false;

            abrirProduto(nomeProduto);

        }, 400);

    }, 1500);
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
   FUNÇÕES DO CARRINHO
========================================================================== */

function openCart() {

    if (!cartPanel || !overlay) return;

    /* trava scroll */
    document.body.classList.add("no-scroll");

    /* abre carrinho */
    cartPanel.classList.add("active");
    overlay.classList.add("active");
}

/* ========================================================================== */

function closeCart() {

    if (!cartPanel || !overlay) return;

    /* libera scroll */
    document.body.classList.remove("no-scroll");

    /* fecha carrinho */
    cartPanel.classList.remove("active");
    overlay.classList.remove("active");
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
   FILTROS MODERNOS
========================================================================== */

/* ==========================================================
   ABRIR / FECHAR FILTROS
========================================================== */

const filtroBtns = document.querySelectorAll(".filtro-btn");

filtroBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        const content = btn.nextElementSibling;

        btn.classList.toggle("active");

        content.classList.toggle("active");
    });
});

/* ==========================================================================
   FILTRAR PRODUTOS
========================================================================== */

function filtrarProdutos() {

    const input = document.getElementById("searchInput");

    const termoBusca = input
        ? input.value.toLowerCase().trim()
        : "";

    /* ======================================================
       FILTRO TIME
    ====================================================== */

    const timesMarcados = Array.from(

        document.querySelectorAll(
            '.filtro-conteudo[data-tipo="time"] input:checked'
        )

    ).map(i => i.value);

    /* ======================================================
       FILTRO PAÍS
    ====================================================== */

    const paisesMarcados = Array.from(

        document.querySelectorAll(
            '.filtro-conteudo[data-tipo="pais"] input:checked'
        )

    ).map(i => i.value);

    /* ======================================================
       FILTRO PREÇO
    ====================================================== */

    const precosMarcados = Array.from(

        document.querySelectorAll(
            '.filtro-conteudo[data-tipo="preco"] input:checked'
        )

    ).map(i => i.value);

    /* ======================================================
    IDENTIFICA A LISTA DA PÁGINA
    ====================================================== */

    let listaOriginal = [];

    if (typeof produtos !== "undefined") {

        listaOriginal = produtos;

    }

    else if (typeof produtosFemininos !== "undefined") {

        listaOriginal = produtosFemininos;

    }

    else if (typeof produtosOferta !== "undefined") {

        listaOriginal = produtosOferta;
    }

    /* ======================================================
       FILTRO PRINCIPAL
    ====================================================== */

    const filtrados = listaOriginal.filter(p => {

        /* ==============================================
           BUSCA NOME
        ============================================== */

        const bateNome =
            p.nome.toLowerCase().includes(termoBusca);

        /* ==============================================
           TIME
        ============================================== */

        const bateTime =

            timesMarcados.length === 0 ||

            timesMarcados.includes(
                p.time?.toLowerCase()
            );

        /* ==============================================
           PAÍS
        ============================================== */

        const batePais =

            paisesMarcados.length === 0 ||

            paisesMarcados.includes(
                p.pais?.toLowerCase()
            );

        /* ==============================================
           PREÇO
        ============================================== */

        let batePreco =
            precosMarcados.length === 0;

        precosMarcados.forEach(faixa => {

            if (faixa === "300+") {

                if (p.preco >= 300) {
                    batePreco = true;
                }

                return;
            }

            const [min, max] =
                faixa.split("-").map(Number);

            if (
                p.preco >= min &&
                p.preco <= max
            ) {
                batePreco = true;
            }
        });

        /* ==============================================
           RESULTADO FINAL
        ============================================== */

        return (
            bateNome &&
            bateTime &&
            batePais &&
            batePreco
        );
    });

    renderizarListaFiltrada(filtrados);
}

/* ==========================================================================
   RENDERIZAR PRODUTOS FILTRADOS
========================================================================== */

function renderizarListaFiltrada(lista) {

    const container =
        document.getElementById("product-list");

    if (!container) return;

    /* limpa */

    container.innerHTML = "";

    /* ======================================================
       VAZIO
    ====================================================== */

    if (lista.length === 0) {

        container.innerHTML = `
            <p class="aviso-vazio">
                Nenhum produto encontrado com esses filtros.
            </p>
        `;

        return;
    }

    /* ======================================================
       RENDERIZA
    ====================================================== */

    lista.forEach(p => {

        container.innerHTML += criarHTMLCard(p);
    });
}

/* ==========================================================================
   EVENTOS DOS FILTROS
========================================================================== */

document
    .querySelectorAll(
        '.filters input[type="checkbox"]'
    )
    .forEach(input => {

        input.addEventListener(
            "change",
            filtrarProdutos
        );
    });

/* ==========================================================================
   EVENTO DA BUSCA
========================================================================== */

const searchInput =
    document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filtrarProdutos
    );
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

/* ==========================================================
   NAVBAR MODERNA
========================================================== */

const header = document.querySelector("header");

let lastScroll = 0;

/* verifica se é página interna */

const isInternalPage =
    document.body.classList.contains("internal-page");

window.addEventListener("scroll", () => {

    const currentScroll = window.pageYOffset;

    /* ======================================================
       EFEITO BACKGROUND
    ====================================================== */

    if (currentScroll > 20) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");
    }

    /* ======================================================
       HOME
       navbar some descendo
    ====================================================== */

    if (!isInternalPage) {

        if (
            currentScroll > lastScroll &&
            currentScroll > 100
        ) {

            header.style.transform =
                "translateY(-100%)";

        } else {

            header.style.transform =
                "translateY(0)";
        }
    }

    /* ======================================================
       PÁGINAS INTERNAS
       navbar sempre visível
    ====================================================== */

    else {

        header.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
});

/* ==========================================================
   HERO SLIDER PREMIUM
========================================================== */

const slides =
    document.querySelectorAll(".hero-slide");

const dots =
    document.querySelectorAll(".hero-dot");

const prevBtn =
    document.querySelector(".hero-prev");

const nextBtn =
    document.querySelector(".hero-next");

/* ==========================================================
   CONTEÚDOS
========================================================== */

const heroContent = [

    {
        tag: "Nova Coleção",

        title:
            "Vista a história.<br>Viva o jogo.",

        text:
            "A nova camisa II da seleção brasileira marca uma nova era: Joga Sinistro.",

        button:
            "Comprar agora",

        link:
            "/pages/ofertas.html"
    },

    {
        tag: "Nova Coleção",

        title:
            "Carregue sua nação.<br>Vista a paixão.",

        text:
            "A nova camisa I da seleção brasileira. Alegria que apavora.",

        button:
            "Ver coleção",

        link:
            "/pages/masculino.html"
    },

    {
        tag: "Vintage Sports",

        title:
            "Mais que camisas.<br>Memórias eternas.",

        text:
            "Camisas que carregam história, estilo e paixão pelo futebol.",

        button:
            "Explorar",

        link:
            "/pages/femenino.html"
    }
];

/* ==========================================================
   ELEMENTOS
========================================================== */

const heroTag =
    document.getElementById("hero-tag");

const heroTitle =
    document.getElementById("hero-title");

const heroText =
    document.getElementById("hero-text");

const heroBtn =
    document.getElementById("hero-btn");

let currentSlide = 0;

let autoSlide;

/* ==========================================================
   AUTOPLAY CONTROLADO
========================================================== */

function startAutoSlide() {
    autoSlide = setInterval(() => {
        nextSlide();
    }, 6000); // mais lento e estável
}

function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}

/* ==========================================================
   TROCAR SLIDE
========================================================== */

function mostrarSlide(index) {

    slides.forEach(slide =>
        slide.classList.remove("active")
    );

    dots.forEach(dot =>
        dot.classList.remove("active")
    );

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    heroTag.innerHTML = heroContent[index].tag;
    heroTitle.innerHTML = heroContent[index].title;
    heroText.innerHTML = heroContent[index].text;
    heroBtn.innerHTML = heroContent[index].button;
    heroBtn.href = heroContent[index].link;

    currentSlide = index;
}

/* ==========================================================
   PRÓXIMO
========================================================== */

function nextSlide() {
    let next = currentSlide + 1;

    if (next >= slides.length) {
        next = 0;
    }

    mostrarSlide(next);
}

/* ==========================================================
   ANTERIOR
========================================================== */

function prevSlide() {
    let prev = currentSlide - 1;

    if (prev < 0) {
        prev = slides.length - 1;
    }

    mostrarSlide(prev);
}

/* ==========================================================
   BOTÕES
========================================================== */

nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide(); // 🔥 evita bug de aceleração/pulo
});

prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
});

/* ==========================================================
   DOTS
========================================================== */

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        mostrarSlide(index);
        resetAutoSlide(); // mantém sincronizado
    });
});

/* ==========================================================
   INICIAR
========================================================== */

mostrarSlide(0);
startAutoSlide();



let produtoSelecionado = null;

function abrirCarrinho(produto) {

    const modal = document.getElementById("cart-notification");
    if (!modal || !produto) return;

    produtoSelecionado = produto;

    document.getElementById("cart-title").innerText = produto.nome;

    document.getElementById("cart-desc").innerText =
        `Preço: R$ ${Number(produto.preco).toFixed(2).replace(".", ",")}`;

    modal.classList.remove("hidden");
}

function fecharCarrinho() {

    const modal = document.getElementById("cart-notification");
    if (!modal) return;

    modal.classList.add("hidden");

    setTimeout(() => {
        produtoSelecionado = null;
    }, 300);
}

function confirmarCarrinho(abrirImediato = false) {

    if (!produtoSelecionado) return;

    if (!Array.isArray(cart)) {
        console.error("cart não existe ou não é um array");
        return;
    }

    const item = {
        name: produtoSelecionado.nome,
        price: Number(produtoSelecionado.preco),
        image: produtoSelecionado.imagem,
        quantity: 1,
        selected: true
    };

    const existente = cart.find(i => i.name === item.name);

    if (existente) {
        existente.quantity += 1;
    } else {
        cart.push(item);
    }

    updateCart();

    // 🔥 NOTIFICAÇÃO (usa seu sistema existente)
    if (typeof showToast === "function") {
        showToast(
            abrirImediato
                ? "Pronto para comprar!"
                : "Adicionado ao carrinho ✓"
        );
    }

    // 🔥 abre carrinho automaticamente
    if (typeof abrirMiniCarrinho === "function") {
        abrirMiniCarrinho();
    }

    fecharCarrinho();
}

function verDepois() {
    if (!produtoSelecionado) return;
    fecharCarrinho();
}