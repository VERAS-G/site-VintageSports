/* ==========================================================================
   LÓGICA DO MODAL DE PRODUTO (VERSÃO UNIFICADA E INTEGRADA)
   ========================================================================== */
let produtoTemporario = null;
let modoCompraImediata = false;
let tamanhoSelecionado = null;

/**
 * Abre o modal preenchendo os dados dinamicamente.
 * Agora suporta visual de oferta (preço riscado e tag verde).
 */
/* ==========================================================================
   MODAL DE PRODUTO: CAPTURA E EXIBIÇÃO DE OFERTAS
   ========================================================================== */
function abrirModal(nome, preco, img, direto, btn) {
    const modal = document.getElementById('modal-selecao');
    if (!modal) return;

    // 1. Identifica se o produto é uma oferta (procura o selo verde no card)
    const cardPai = btn ? btn.closest('.card') : null;
    const ehOferta = cardPai ? cardPai.querySelector('.badge-oferta') !== null : false;

    // 2. Armazena os dados (isPromo é essencial para o Checkout funcionar depois)
    produtoTemporario = { 
        nome, 
        preco, 
        img, 
        isPromo: ehOferta // 🔥 Salva o status para levar ao carrinho
    };
    modoCompraImediata = direto;
    tamanhoSelecionado = null;

    // 3. Preenche Nome e Imagem
    document.getElementById('modal-img').src = img;
    document.getElementById('modal-titulo').innerText = nome;

    // 4. Lógica de Preço (Igual ao estilo do Card)
    const precoElement = document.getElementById('modal-preco');
    if (precoElement) {
        if (ehOferta) {
            const precoOriginal = preco * 1.15;
            const desconto = 15;
            precoElement.innerHTML = `
                <div class="price-container" style="justify-content: flex-start; margin: 0; gap: 10px; display: flex; align-items: center;">
                    <span class="price-main" style="font-size: 22px; font-weight: 800;">R$ ${preco.toFixed(2).replace(".", ",")} <small style="font-size: 14px;">no Pix</small></span>
                    <span class="price-old" style="font-size: 15px; color: #888; text-decoration: line-through;">R$ ${precoOriginal.toFixed(2).replace(".", ",")}</span>
                    <span class="discount-percent" style="font-size: 15px; color: #28a745; font-weight: 700;">${desconto}% off</span>
                </div>`;
        } else {
            // Preço Normal
            precoElement.innerHTML = `<span class="price-main" style="font-size: 22px; font-weight: 800;">R$ ${preco.toFixed(2).replace(".", ",")}</span>`;
        }
    }

    // 5. Feedback visual (Números de realismo)
    const numAvaliacoes = Math.floor(Math.random() * (300 - 50) + 50);
    const numVendidos = Math.floor(Math.random() * (700 - 100) + 100);
    const avaliacaoTxt = document.querySelector('.stars span');
    const vendidosTxt = document.querySelector('.sold-count');
    
    if (avaliacaoTxt) avaliacaoTxt.innerText = `(${numAvaliacoes} avaliações)`;
    if (vendidosTxt) vendidosTxt.innerText = `| ${numVendidos} vendidos`;

    // 6. Reseta interface de tamanhos
    const btnConfirmar = document.getElementById('btn-confirmar');
    if (btnConfirmar) btnConfirmar.style.display = 'none';

    document.querySelectorAll('.tamanhos-grid button').forEach(b => {
        b.classList.remove('selecionado');
    });

    // 7. Exibe o modal com animação
    modal.style.display = 'flex'; 
    setTimeout(() => modal.classList.add('active'), 10); 
}


/**
 * Seleciona o tamanho
 */
function selecionarTamanho(tamanho, btn) {
    tamanhoSelecionado = tamanho;
    document.querySelectorAll('.tamanhos-grid button').forEach(b => b.classList.remove('selecionado'));
    btn.classList.add('selecionado');

    const btnConfirmar = document.getElementById('btn-confirmar');
    if (btnConfirmar) btnConfirmar.style.display = 'inline-block';
}

/**
 * Fecha o modal
 */
function fecharModal() {
    const modal = document.getElementById('modal-selecao');
    if (!modal) return;
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        tamanhoSelecionado = null;
        produtoTemporario = null;
    }, 400); 
}

/**
 * Finaliza seleção e envia para o carrinho global (script.js)
 * Agora transporta o status de oferta para o checkout.
 */
function finalizarSelecao() {
    if (!tamanhoSelecionado || !produtoTemporario) return;

    const nomeComTamanho = `${produtoTemporario.nome} (${tamanhoSelecionado})`;
    
    // Se for compra imediata ("Comprar"), desmarca os outros itens para focar neste
    if (modoCompraImediata) {
        cart.forEach(item => item.selected = false);
    }

    const itemExistente = cart.find(item => item.name === nomeComTamanho);

    if (itemExistente) {
        itemExistente.quantity++;
        if (modoCompraImediata) itemExistente.selected = true;
    } else {
        // 🔥 Adicionado isPromo: garante que o preço riscado apareça no checkout
        cart.push({
            name: nomeComTamanho,
            price: produtoTemporario.preco,
            image: produtoTemporario.img,
            quantity: 1,
            selected: true,
            isPromo: produtoTemporario.isPromo 
        });
    }

    // Salva no LocalStorage e atualiza a interface global
    localStorage.setItem("cart", JSON.stringify(cart));
    
    if (typeof updateCart === "function") {
        updateCart();
    }

    // Fecha o modal com a animação que já configuramos
    fecharModal();

    // Feedback visual (Toast) e abertura do mini-carrinho se necessário
    const msg = modoCompraImediata ? "Indo para o pagamento..." : "Adicionado ao carrinho!";
    if (typeof showToast === "function") showToast(msg);

    if (modoCompraImediata && typeof openCart === "function") {
        setTimeout(openCart, 500);
    }

    // Limpa as variáveis para a próxima seleção
    produtoTemporario = null;
    tamanhoSelecionado = null;
}


// Fechar ao clicar fora
window.addEventListener("click", (e) => {
    const modal = document.getElementById('modal-selecao');
    if (e.target === modal) fecharModal();
});
