/* ==========================================================================
   LÓGICA DO MODAL DE PRODUTO (VINTAGE SPORTS - VERSÃO AJUSTADA)
   ========================================================================== */
let produtoTemporario = null;
let modoCompraImediata = false;
let tamanhoSelecionado = null;

/**
 * Abre o modal gigante para seleção de tamanho.
 */
/**
 * Abre o modal preenchendo os dados dinamicamente com base no produto clicado.
 */
function abrirModal(nome, preco, img, direto) {
    const modal = document.getElementById('modal-selecao');
    if (!modal) return;

    // 1. Armazena os dados para uso posterior (finalizar seleção)
    produtoTemporario = { nome, preco, img };
    modoCompraImediata = direto;
    tamanhoSelecionado = null;

    // 2. Preenche Nome e Imagem
    document.getElementById('modal-img').src = img;
    document.getElementById('modal-titulo').innerText = nome;

    // 3. Formata e Injeta o PREÇO dinâmico
    // Transforma o número (ex: 123.49) em string formatada (R$ 123,49)
    const precoFormatado = preco.toLocaleString('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
    });
    const precoElement = document.getElementById('modal-preco');
    if (precoElement) precoElement.innerText = precoFormatado;

    // 4. (Opcional) Atualiza números de feedback para parecer mais real
    // Se você não quiser números aleatórios, pode deixar fixo no HTML
    const numAvaliacoes = Math.floor(Math.random() * (300 - 50) + 50); // Gera entre 50 e 300
    const numVendidos = Math.floor(Math.random() * (700 - 100) + 100);  // Gera entre 100 e 700
    
    const avaliacaoTxt = document.querySelector('.stars span');
    const vendidosTxt = document.querySelector('.sold-count');
    
    if (avaliacaoTxt) avaliacaoTxt.innerText = `(${numAvaliacoes} avaliações)`;
    if (vendidosTxt) vendidosTxt.innerText = `| ${numVendidos} vendidos`;

    // 5. Reseta a interface (Botão confirmar e seleção de tamanhos)
    const btnConfirmar = document.getElementById('btn-confirmar');
    if (btnConfirmar) btnConfirmar.style.display = 'none';

    document.querySelectorAll('.tamanhos-grid button').forEach(b => {
        b.classList.remove('selecionado');
    });

    // 6. Lógica de abertura com animação suave
    modal.style.display = 'flex'; 
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 10); 
}

/**
 * Seleciona o tamanho e mostra o botão "Confirmar" (Pílula Preta)
 */
function selecionarTamanho(tamanho, btn) {
    tamanhoSelecionado = tamanho;
    
    // Feedback visual nos botões
    document.querySelectorAll('.tamanhos-grid button').forEach(b => b.classList.remove('selecionado'));
    btn.classList.add('selecionado');

    // Mostra o botão de confirmação
    const btnConfirmar = document.getElementById('btn-confirmar');
    if (btnConfirmar) {
        btnConfirmar.style.display = 'inline-block'; // inline-block para respeitar o padding centralizado
    }
}

/**
 * Fecha o modal com transição suave
 */
function fecharModal() {
    const modal = document.getElementById('modal-selecao');
    if (!modal) return;

    modal.classList.remove('active'); // Primeiro remove a animação suave

    // Aguarda o tempo da transição do CSS (0.4s) antes de sumir com o display
    setTimeout(() => {
        modal.style.display = 'none';
        tamanhoSelecionado = null;
        produtoTemporario = null;
    }, 400); 
}

/**
 * Finaliza a seleção, adiciona ao carrinho e limpa estados.
 */
function finalizarSelecao() {
    if (!tamanhoSelecionado || !produtoTemporario) return;

    const nomeComTamanho = `${produtoTemporario.nome} (${tamanhoSelecionado})`;
    const modal = document.getElementById('modal-selecao');

    // Inicia fechamento do modal
    if (modal) modal.classList.remove('active');

    setTimeout(() => {
        if (modal) modal.style.display = 'none';

        // 1. Lógica de Compra Direta: Desmarca outros itens se for "Compre Agora"
        if (modoCompraImediata) {
            cart.forEach(item => item.selected = false);
        }

        // 2. Adiciona ou Incrementa no Carrinho
        const itemExistente = cart.find(item => item.name === nomeComTamanho);
        if (itemExistente) {
            itemExistente.quantity++;
            if (modoCompraImediata) itemExistente.selected = true;
        } else {
            cart.push({
                name: nomeComTamanho,
                price: produtoTemporario.preco,
                image: produtoTemporario.img,
                quantity: 1,
                selected: true
            });
        }

        // 3. Atualiza o LocalStorage e a Interface
        if (typeof updateCart === "function") {
            updateCart();
        } else {
            // Caso sua função de salvar tenha outro nome (como no checkout)
            localStorage.setItem("cart", JSON.stringify(cart));
            if (typeof render === "function") render();
        }

        // 4. Feedback visual (Toast)
        const mensagem = modoCompraImediata ? "Pronto para finalizar!" : "Produto adicionado!";
        if (typeof showToast === "function") showToast(mensagem);

        // 5. Se for compra imediata, abre o carrinho/checkout
        if (modoCompraImediata && typeof openCart === "function") {
            openCart();
        }

        // Limpeza final
        produtoTemporario = null;
        tamanhoSelecionado = null;
    }, 400);
}

/**
 * Fecha ao clicar fora do conteúdo branco
 */
window.addEventListener("click", (e) => {
    const modal = document.getElementById('modal-selecao');
    // Verifica se clicou exatamente no fundo (overlay) e não no conteúdo
    if (e.target === modal) fecharModal();
});
