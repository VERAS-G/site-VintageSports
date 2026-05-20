        /* ==========================================================================
    VARIÁVEIS GLOBAIS E FUNÇÃO MESTRA
    ========================================================================== */

    // 🔥 FUNÇÃO MESTRA: Unifica o visual de todos os produtos do site
    function abrirProduto(produto) {

        sessionStorage.setItem(
            "produtoAtual",
            JSON.stringify(produto)
        );

        const atual = window.location.pathname;
        const overlay = document.getElementById("overlay-loading");

        // mostra loading
        if (overlay) {
            overlay.classList.remove("hidden");
        }

        setTimeout(() => {

            try {

                // 🔥 se NÃO estiver na página de produto → redireciona
                if (!atual.includes("pag_produtos.html")) {

                    window.location.href = "/pages/pag_produtos.html";
                    return;
                }

                // 🔥 se já estiver na página → atualiza produto
                if (typeof carregarProduto === "function") {
                    carregarProduto();
                }

            } catch (erro) {
                console.error("Erro ao carregar produto:", erro);
            }

            // 🔥 SEMPRE esconde o loading (independente de erro)
            if (overlay) {
                overlay.classList.add("hidden");
            }

        }, 700);
    }

    function criarHTMLCard(produto) {

    const descontoPercentual = 15;

    const precoOriginal =
        produto.preco / (1 - descontoPercentual / 100);

    const imagemCaminho =
        produto.imagem.toLowerCase();

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
        <div class="card"
            onclick='abrirProduto(${JSON.stringify(produto)})'>

            ${mostrarOferta
                ? '<span class="badge-oferta">OFERTA</span>'
                : ''
            }

            <div class="card-image">
                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                    loading="lazy">
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

                <button
                    class="btn-adicionar"
                    onclick='event.stopPropagation(); abrirCarrinho(${JSON.stringify(produto)})'>

                    🛒 Adicionar
                </button>

                <button
                    class="buy-btn"
                    onclick='event.stopPropagation(); comprarProduto(${JSON.stringify(produto)}, this)'>

                    Comprar
                </button>

            </div>

        </div>
    `;
}

    function comprarProduto(produto, btn) {

        const overlay =
            document.getElementById("overlay-loading");

        if (!produto) {
            console.error("Produto inválido");
            return;
        }

        sessionStorage.setItem(
            "produtoAtual",
            JSON.stringify(produto)
        );

        if (btn) {
            btn.disabled = true;
        }

        if (overlay) {
            overlay.classList.remove("hidden");
        }

        setTimeout(() => {

            window.location.href =
                "/pages/pag_produtos.html";

        }, 700);
    }

    // =============================================================
    // SISTEMA GLOBAL - VINTAGE SPORTS
    // =============================================================

    let cart = [];

    try {

        const cartSalvo =
            localStorage.getItem("cart");

        cart = cartSalvo
            ? JSON.parse(cartSalvo)
            : [];

    } catch (erro) {

        console.error(
            "Erro ao carregar carrinho",
            erro
        );

        cart = [];
    }
    let overlay, cartPanel;

        // --- FUNÇÕES COMPLEMENTARES DO CARRINHO (AJUSTADAS) ---
    function openCart() {
        if (!cartPanel || !overlay) return;

        // Apenas adiciona a classe que congela o scroll do body
        document.body.classList.add("no-scroll");

        // Ativa o painel e o fundo escuro
        cartPanel.classList.add("active");
        overlay.classList.add("active");
    }

    function closeCart() {
        if (!cartPanel || !overlay) return;

        // Remove as classes de ativação para iniciar a animação de saída
        cartPanel.classList.remove("active");
        overlay.classList.remove("active");

        // Espera o tempo da animação acabar (ex: 300ms) para descongelar o scroll da página
        setTimeout(() => {
            document.body.classList.remove("no-scroll");
        }, 300); // Esse tempo deve ser o mesmo do transition no CSS abaixo
    }


        function updateCart() {
            const cartCountElement = document.getElementById("cart-count");
            if (cartCountElement) {
                // Calcula o total de itens no carrinho
                const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
                cartCountElement.innerText = totalItems;
            }
        }

    // --- CONTROLE DE INTERAÇÕES (DOM carregado) ---
    document.addEventListener("DOMContentLoaded", () => {
        // Seletores Principais (com verificação de existência)
        overlay = document.getElementById("overlay");
        cartPanel = document.getElementById("cart");
        const input = document.getElementById("searchInput");
        const cartBtn = document.getElementById("cart-btn");
        const searchIcon = document.querySelector(".search-icon");
        const searchBox = document.querySelector(".search-box");

        // Inicializa o contador do carrinho com dados salvos
        updateCart();

        // 🔥 ACORDEÃO DE FILTROS (Não quebra em páginas sem filtros)
        document.querySelectorAll(".filtro-btn").forEach(btn => {

            btn.addEventListener("click", () => {

                const item = btn.closest(".filtro-item");
                const content = btn.nextElementSibling;

                btn.classList.toggle("active");

                if (content) {
                    content.classList.toggle("active");
                }

                if (item) {
                    item.classList.toggle("open");
                }

            });

        });

        // 🔥 BUSCA EM TEMPO REAL (Não quebra em páginas sem o box de busca)
        if (searchIcon && searchBox) {
            searchIcon.onclick = (e) => {
                e.stopPropagation();
                searchBox.classList.toggle("active");
                if (input) input.focus();
            };
        }

        if (input) {
            input.oninput = () => {
                const val = input.value.toLowerCase();
                const cards = document.querySelectorAll(".card");
                
                // Só executa o filtro se existirem cards de produtos na página atual (Ex: Home/Categorias)
                if (cards.length > 0) {
                    cards.forEach(card => {
                        const titleElement = card.querySelector("h3");
                        if (titleElement) {
                            const title = titleElement.innerText.toLowerCase();
                            card.style.display = title.includes(val) ? "block" : "none";
                        }
                    });
                }
            };
        }

        // 🔥 CONTROLE DE CLIQUE DO CARRINHO (Protegido contra ausência de HTML)
        if (cartBtn) {
            cartBtn.onclick = (e) => {
                e.stopPropagation();
                // Só tenta abrir se o painel do carrinho existir no HTML da página atual
                if (cartPanel && overlay) {
                    cartPanel.classList.contains("active") ? closeCart() : openCart();
                } else {
                    console.warn("Aviso: As tags <div id='cart'> ou <div id='overlay'> não foram encontradas no HTML desta página.");
                }
            };
        }

        // Fecha o carrinho ao clicar no fundo escuro
        if (overlay) {
            overlay.onclick = closeCart;
        }

        // Impede o carrinho de fechar se o usuário clicar dentro dele
        if (cartPanel) {
            cartPanel.onclick = (e) => e.stopPropagation();
        }

        // Fecha o carrinho se o usuário clicar em qualquer outra área vazia da página
        document.onclick = (e) => {
            if (cartPanel && cartBtn) {
                if (!cartPanel.contains(e.target) && !cartBtn.contains(e.target)) {
                    closeCart();
                }
            }
        };
        const filters = document.querySelector(".filters");
        const productsContainer = document.querySelector(".shop-container");

        if (filters && productsContainer) {

            const filterInitialTop =
                filters.getBoundingClientRect().top + window.scrollY;

            window.addEventListener("scroll", () => {

                const scrollY = window.scrollY;

                // fim real da lista de produtos
                const containerBottom =
                    productsContainer.offsetTop +
                    productsContainer.offsetHeight;

                const filterHeight = filters.offsetHeight;

                // ponto onde o filtro deve parar
                const stopPoint = containerBottom - filterHeight - 24;

                if (scrollY + filterInitialTop > stopPoint) {

                    const overlap =
                        (scrollY + filterInitialTop) - stopPoint;

                    filters.style.transform = `translateY(-${overlap}px)`;

                } else {

                    filters.style.transform = "translateY(0)";
                }
            });
        }

    });


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

        /* ==========================================================
        CARRINHO VAZIO
        ========================================================== */

        if (cart.length === 0) {

            cartItems.innerHTML = `
                <div class="cart-empty">

                    <i class="fa-solid fa-cart-shopping"></i>

                    <p>Seu carrinho está vazio</p>

                </div>
            `;

            if (totalElement) {
                totalElement.textContent = "0,00";
            }

            if (countElement) {
                countElement.style.display = "none";
            }

            return;
        }

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

        else if (typeof produtosOfertas !== "undefined") {

            listaOriginal = produtosOfertas;
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

        const modal =
            document.getElementById("custom-confirm");

        // sem modal -> remove direto
        if (!modal) {

            cart.splice(index, 1);

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            updateCart();

            return;
        }

        modal.style.display = "flex";

        const btnYes =
            document.getElementById("confirm-yes");

        const btnNo =
            document.getElementById("confirm-no");

        if (btnYes) {

            btnYes.onclick = function (e) {

                e.stopPropagation();

                cart.splice(index, 1);

                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );

                modal.style.display = "none";

                updateCart();

                showToast(
                    "Produto removido!"
                );
            };
        }

        if (btnNo) {

            btnNo.onclick = function (e) {

                e.stopPropagation();

                modal.style.display = "none";
            };
        }
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

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        const overlay =
            document.getElementById("overlay-loading");

        // mostra loading
        if (overlay) {
            overlay.classList.remove("hidden");
        }

        setTimeout(() => {

            const path =
                window.location.pathname;

            // se já estiver dentro de /pages/
            if (path.includes("/pages/")) {

                window.location.href =
                    "carrinho.html";

            } else {

                window.location.href =
                    "pages/carrinho.html";
            }

        }, 700);
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
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            nextSlide();
            resetAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            prevSlide();
            resetAutoSlide();
        });
    }

    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                mostrarSlide(index);
                resetAutoSlide();
            });
        });
    }

    if (slides.length > 0) {
        mostrarSlide(0);
        startAutoSlide();
    }



    let produtoSelecionado = null;

    document.addEventListener("DOMContentLoaded", () => {

        const overlay = document.getElementById("cart-overlay");

        if (overlay) {
            overlay.addEventListener("click", fecharCarrinho);
        }

    });

    function abrirCarrinho(produto) {

        const modal = document.getElementById("cart-notification");
        const overlay = document.getElementById("cart-overlay");

        const title = document.getElementById("cart-title");
        const desc = document.getElementById("cart-desc");
        const image = document.getElementById("cart-image");

        if (!modal || !produto) return;

        produtoSelecionado = produto;

        if (title) {
            title.innerText = produto.nome || "Produto";
        }

        if (desc) {
            desc.innerText = `Preço: R$ ${Number(produto.preco || 0)
                .toFixed(2)
                .replace(".", ",")}`;
        }

        if (image) {
            image.src = produto.imagem || "";
            image.alt = produto.nome || "Produto";
        }

        modal.classList.remove("hidden");

        if (overlay) {
            overlay.classList.remove("hidden");
        }
    }

    function fecharCarrinho() {

        const modal = document.getElementById("cart-notification");
        const overlay = document.getElementById("cart-overlay");

        if (modal) {
            modal.classList.add("hidden");
        }

        if (overlay) {
            overlay.classList.add("hidden");
        }

        setTimeout(() => {
            produtoSelecionado = null;
        }, 300);
    }
    function confirmarCarrinho(abrirImediato = false) {

        if (!tamanhoSelecionado) {

            showToast(
                "Selecione um tamanho"
            );

            return;
        }

        if (!produtoSelecionado) return;

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


        if (typeof showToast === "function") {
            showToast(
                abrirImediato
                    ? "Pronto para comprar!"
                    : "Adicionado ao carrinho ✓"
            );
        }



        if (typeof abrirMiniCarrinho === "function") {
            abrirMiniCarrinho();
        }

        fecharCarrinho();
    }

    function verProdutoCompleto() {

        if (!produtoSelecionado) return;

        const modal =
            document.getElementById("cart-notification");

        if (modal) {
            modal.classList.add("hidden");
        }

        const overlay =
            document.getElementById("overlay-loading") ||
            document.getElementById("page-loading");

        sessionStorage.setItem(
            "produtoAtual",
            JSON.stringify(produtoSelecionado)
        );

        if (overlay) {
            overlay.classList.remove("hidden");
        }

        setTimeout(() => {
            window.location.href = "/pages/pag_produtos.html";
        }, 700);
    }

    function verDepois() {
        if (!produtoSelecionado) return;
        fecharCarrinho();
    }

    function desmarcarTodosItens() {
    if (!Array.isArray(cart)) return;

    cart.forEach(item => {
        item.selected = false;
    });
}

    function selecionarApenasItem(nomeItem) {
        if (!Array.isArray(cart)) return;

        cart.forEach(item => {
            item.selected = (item.name === nomeItem);
        });

        localStorage.setItem("cart", JSON.stringify(cart));

        if (typeof updateCart === "function") {
            updateCart();
        }
}

