/* ==========================================================================
   VARIÁVEIS GLOBAIS
   ========================================================================== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let overlay, cartPanel;

document.addEventListener("DOMContentLoaded", () => {
    // Seletores Principais
    overlay = document.getElementById("overlay");
    cartPanel = document.getElementById("cart");
    const input = document.getElementById("searchInput");
    const cartBtn = document.getElementById("cart-btn");
    const searchIcon = document.querySelector(".search-icon");
    const searchBox = document.querySelector(".search-box");

    // Inicializa o carrinho com dados salvos
    updateCart();

    // 🔥 ACORDEÃO DE FILTROS (Simplicado)
    document.querySelectorAll(".filtro button").forEach(btn => {
        btn.onclick = () => {
            const conteudo = btn.nextElementSibling;
            conteudo.style.display = conteudo.style.display === "block" ? "none" : "block";
        };
    });

    // 🔥 BUSCA EM TEMPO REAL
    if (searchIcon) {
        searchIcon.onclick = () => {
            searchBox.classList.toggle("active");
            input.focus();
        };
    }

    input.oninput = () => {
        const val = input.value.toLowerCase();
        document.querySelectorAll(".card").forEach(card => {
            const title = card.querySelector("h3").innerText.toLowerCase();
            card.style.display = title.includes(val) ? "block" : "none";
        });
    };

    // 🔥 CONTROLE DO CARRINHO (Abrir/Fechar)
    cartBtn.onclick = (e) => {
        e.stopPropagation();
        cartPanel.classList.contains("active") ? closeCart() : openCart();
    };

    overlay.onclick = closeCart;
    cartPanel.onclick = (e) => e.stopPropagation();

    document.onclick = (e) => {
        if (!cartPanel.contains(e.target) && !cartBtn.contains(e.target)) closeCart();
    };

});

/* ==========================================================================
   FUNÇÕES DE AÇÃO
   ========================================================================== */

function openCart() {
    cartPanel.classList.add("active");
    overlay.classList.add("active");
    const sw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${sw}px`;
    document.body.classList.add("no-scroll");
}

function closeCart() {
    cartPanel.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
    document.body.style.paddingRight = "0px";
}

function addToCart(name, price, image, btn, abrirImediato = false) {
    // 1. ANIMAÇÃO: Captura a imagem do card e dispara o "Fly to Cart"
    if (btn) {
        try {
            const card = btn.closest('.card'); // Acha o container do produto
            if (card) {
                const imgParaAnimar = card.querySelector('img');
                // 🔥 Ajustado para chamar o nome exato da sua função: animateToCart
                if (imgParaAnimar && typeof animateToCart === "function") {
                    animateToCart(imgParaAnimar);
                }
            }
        } catch (err) {
            console.error("Erro na animação:", err);
        }
    }

    // 2. LÓGICA DO CARRINHO
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

    // 3. ATUALIZAÇÃO DA INTERFACE E NOTIFICAÇÕES
    if (typeof updateCart === "function") updateCart();
    
    if (typeof showToast === "function") {
        // Removido emojis para manter o padrão limpo da notificação preta
        showToast(abrirImediato ? "Pronto para comprar!" : "Adicionado ao carrinho");
    }

    // 4. ABERTURA DO CARRINHO (COMPRA IMEDIATA)
    if (abrirImediato && typeof openCart === "function") {
        setTimeout(openCart, 100);
    }
}



function animateToCart(img) {
    const cartBtn = document.getElementById("cart-btn");
    
    // Verificação de erro no console
    if (!cartBtn) return console.error("ERRO: O botão com ID 'cart-btn' não existe!");
    if (!img) return console.error("ERRO: A imagem do produto não foi encontrada!");

    console.log("🚀 Voo iniciado!");

    const rect = img.getBoundingClientRect();
    const cartRect = cartBtn.getBoundingClientRect();
    const clone = img.cloneNode(true);

    // Estilo inicial do clone (exatamente sobre a imagem real)
    Object.assign(clone.style, {
        position: "fixed",
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        zIndex: "999999",
        transition: "all 0.8s cubic-bezier(0.65, 0, 0.35, 1)",
        pointerEvents: "none",
        borderRadius: "10px",
        opacity: "0.8"
    });

    document.body.appendChild(clone);

    // Inicia o movimento para o carrinho
    setTimeout(() => {
        Object.assign(clone.style, {
            top: `${cartRect.top}px`,
            left: `${cartRect.left}px`,
            width: "30px",
            height: "30px",
            opacity: "0",
            transform: "rotate(360deg)"
        });
    }, 50);

    // Remove do HTML e dá efeito de "pulso" no carrinho
    setTimeout(() => {
        clone.remove();
        cartBtn.style.transform = "scale(1.2)";
        setTimeout(() => cartBtn.style.transform = "scale(1)", 200);
    }, 850);
}

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

    // Aqui fixamos apenas o ícone de CHECK (símbolo de certo)
    toast.innerHTML = `
        <div class="toast-main-content">
            <i class="fa-solid fa-circle-check toast-icon"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close-btn" onclick="this.parentElement.classList.remove('show'); setTimeout(()=>this.parentElement.remove(), 500)">✕</button>
        <div class="toast-timer-bar"></div>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);

    setTimeout(() => {
        if (toast) {
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
        
        // Soma quantidade total de itens para o contador da Navbar
        totalItens += item.quantity;

        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
            <input type="checkbox" ${item.selected ? "checked" : ""} onchange="toggleItem(${index})">
            <img src="${item.image}" class="cart-img">
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

    // Atualiza o valor total no rodapé do carrinho
    if (totalElement) totalElement.textContent = total.toFixed(2).replace(".", ",");

    // 🔥 LÓGICA DO CONTADOR DINÂMICO
    if (countElement) {
        if (totalItens > 0) {
            countElement.textContent = totalItens;
            countElement.style.display = "flex"; // Mostra o círculo amarelo se houver itens
        } else {
            countElement.style.display = "none"; // Esconde se estiver vazio
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}


function toggleItem(index) {
    cart[index].selected = !cart[index].selected;
    updateCart();
}

function aumentarQtd(index) {
    cart[index].quantity++;
    updateCart();
}

/* ==========================================================================
   FILTROS E BUSCA
   ========================================================================== */
function filtrarProdutos() {
    const input = document.getElementById('searchInput');
    if (!input) return;

    const termoBusca = input.value.toLowerCase();
    const timesMarcados = Array.from(document.querySelectorAll('.filtro-conteudo[data-tipo="time"] input:checked')).map(i => i.value);
    const precosMarcados = Array.from(document.querySelectorAll('.filtro-conteudo[data-tipo="preco"] input:checked')).map(i => i.value);

    const filtrados = produtos.filter(p => {
        const bateNome = p.nome.toLowerCase().includes(termoBusca);
        const bateTime = timesMarcados.length === 0 || timesMarcados.includes(p.time);

        let batePreco = precosMarcados.length === 0;
        precosMarcados.forEach(faixa => {
            const [min, max] = faixa.split('-').map(Number);
            if (p.price >= min && (max ? p.price <= max : true)) batePreco = true;
        });

        return bateNome && bateTime && batePreco;
    });

    renderizarListaFiltrada(filtrados);
}


function renderizarListaFiltrada(lista) {
    const container = document.getElementById("product-list");
    if (!container) return;

    // Dentro da sua função renderizar...
    container.innerHTML += `
      <div class="card">
        <!-- ... imagem e titulo ... -->
        <div class="buttons">
          <!-- Botão Adicionar: PASSA FALSE NO FINAL -->
          <button onclick="abrirModal('${p.nome}', ${p.preco}, '${p.imagem}', false)">
            Adicionar
          </button>

          <!-- Botão Comprar: PASSA TRUE NO FINAL -->
          <button class="buy-btn" onclick="abrirModal('${p.nome}', ${p.preco}, '${p.imagem}', true)">
            Comprar
          </button>
        </div>
      </div>
    `;

}

/* ==========================================================================
   CONTROLE DE QUANTIDADE E REMOÇÃO
   ========================================================================== */
function diminuirQtd(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        updateCart();
    } else {
        removeItem(index);
    }
}

function removeItem(index) {
    const modal = document.getElementById("custom-confirm");
    if (!modal) return;

    modal.style.display = "flex";

    // Configura botões do modal
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

// Fechar modal de remoção ao clicar fora (sem fechar o carrinho)
window.addEventListener("click", (e) => {
    const modal = document.getElementById("custom-confirm");
    if (e.target === modal) {
        e.stopPropagation();
        modal.style.display = "none";
    }
});

/* ==========================================================================
   RENDERIZAÇÃO DINÂMICA (HOME / LOJA)
   ========================================================================== */
function renderizarLoja() {
    const container = document.getElementById("product-list");
    const containerHome = document.getElementById("produtos-home");
    if (!container && !containerHome) return;

    // Decide qual lista usar
    let lista = (typeof produtosFemininos !== 'undefined') ? produtosFemininos : (typeof produtos !== 'undefined' ? produtos : []);

    // Se for a Home, pega apenas os 4 primeiros
    if (containerHome) {
        lista = lista.slice(0, 4);
        desenharCards(containerHome, lista);
    } else {
        desenharCards(container, lista);
    }
}

function desenharCards(container, lista) {
    container.innerHTML = lista.map(p => `
      <div class="card" data-nome="${p.nome}" data-preco="${p.preco}" data-time="${p.time}">
        <img src="${p.imagem}" alt="${p.nome}">
        <h3>${p.nome}</h3>
        <div class="stars">★★★★★</div>
        <p class="price">R$ ${p.preco.toFixed(2).replace(".", ",")}</p>
        <div class="buttons">
          <button onclick="abrirModal('${p.nome}', ${p.preco}, '${p.imagem}', false)">🛒 Adicionar</button>
          <button class="buy-btn" onclick="abrirModal('${p.nome}', ${p.preco}, '${p.imagem}', true)">⚡ Comprar</button>
        </div>
      </div>`).join('');
}

/* ==========================================================================
   UTILITÁRIOS (COPIAR, SCROLL, NAVEGAÇÃO)
   ========================================================================== */
function copiarTexto(id, elemento) {
    const texto = document.getElementById(id).innerText;
    navigator.clipboard.writeText(texto);

    const status = elemento.querySelector(".status");
    elemento.classList.add("copiado");
    status.innerText = "Copiado ✔";

    setTimeout(() => {
        elemento.classList.remove("copiado");
        status.innerText = "Clique para copiar";
    }, 2000);
}

// Animação de Scroll
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("ativo");
    });
}, { threshold: 0.2 });

document.querySelectorAll(".animar").forEach(el => observer.observe(el));

function VerCarrinho() {
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Verifica se você já está dentro da pasta pages
    if (window.location.pathname.includes("/pages/")) {
        // Se já está em pages, vai direto para o arquivo
        window.location.href = "carrinho.html";
    } else {
        // Se está na raiz (index.html), entra na pasta pages
        window.location.href = "pages/carrinho.html";
    }
}


// Inicialização Final
document.addEventListener("DOMContentLoaded", renderizarLoja);

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    // Adiciona a classe assim que rolar apenas 10px
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
