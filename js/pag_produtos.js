/* ==========================================================================
   PÁGINA DE PRODUTO - VINTAGE SPORTS
========================================================================== */

let tamanhoSelecionado = null;

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================
       PEGA PRODUTO SALVO
    ========================================================== */

    const produto = JSON.parse(
        sessionStorage.getItem("produtoAtual") || "null"
    );

    if (!produto) {
        console.error("Produto não encontrado");
        return;
    }

    /* ==========================================================
       ELEMENTOS
    ========================================================== */

    const imagem = document.getElementById("produto-imagem");
    const titulo = document.getElementById("produto-titulo");
    const preco = document.getElementById("produto-preco");
    const descricao = document.getElementById("produto-descricao");
    const time = document.getElementById("produto-time");

    const estrelas = document.querySelector(
        ".produto-avaliacoes span"
    );

    /* ==========================================================
       PREENCHE DADOS
    ========================================================== */

    if (imagem) {
        imagem.src = produto.imagem;
        imagem.alt = produto.nome;
    }

    if (titulo) titulo.innerText = produto.nome;

    if (descricao) {
        descricao.innerText =
            produto.descricao ||
            "Camisa retrô oficial vintage de alta qualidade.";
    }

    if (time) {
        time.innerText = produto.time || "Vintage Sports";
    }

    /* ==========================================================
       AVALIAÇÕES DINÂMICAS
    ========================================================== */

    function gerarAvaliacoesFixas(nome) {
        let hash = 0;

        for (let i = 0; i < nome.length; i++) {
            hash = nome.charCodeAt(i) + ((hash << 5) - hash);
        }

        return Math.abs(hash % 450) + 80;
    }

    const qtdAvaliacoes = gerarAvaliacoesFixas(produto.nome);

    if (estrelas) {
        estrelas.innerText = `(${qtdAvaliacoes} avaliações)`;
    }

    /* ==========================================================
       PREÇO NORMAL / PROMOÇÃO
    ========================================================== */

    const descontoPercentual = 15;

    const precoOriginal =
        produto.preco / (1 - descontoPercentual / 100);

    const mostrarOferta =
        produto.isPromo === true ||
        produto.imagem.toLowerCase().includes("ofertas");

    if (preco) {

        if (mostrarOferta) {

            preco.innerHTML = `
                <div class="preco-antigo">
                    R$ ${precoOriginal.toFixed(2).replace(".", ",")}
                </div>

                <div class="preco-promocional">
                    <span class="valor-atual">
                        R$ ${produto.preco.toFixed(2).replace(".", ",")}
                    </span>

                    <span class="desconto-percentual">
                        15% OFF
                    </span>
                </div>
            `;

        } else {
            preco.innerHTML =
                `R$ ${produto.preco.toFixed(2).replace(".", ",")}`;
        }
    }

    /* ==========================================================
       TAMANHOS
    ========================================================== */

    const botoesTamanho =
        document.querySelectorAll(".tamanhos-grid button");

    botoesTamanho.forEach(btn => {

        btn.addEventListener("click", () => {

            if (btn.classList.contains("active")) {
                btn.classList.remove("active");
                tamanhoSelecionado = null;
                return;
            }

            botoesTamanho.forEach(b =>
                b.classList.remove("active")
            );

            btn.classList.add("active");
            tamanhoSelecionado = btn.innerText;
        });
    });

    /* ==========================================================
       BOTÃO ADICIONAR AO CARRINHO
    ========================================================== */

    const btnCarrinho =
        document.querySelector(".btn-carrinho");

    if (btnCarrinho) {

        btnCarrinho.addEventListener("click", () => {

            if (!tamanhoSelecionado) {
                showToast("Selecione um tamanho");
                return;
            }

            addToCart(
                produto.nome + ` - Tam ${tamanhoSelecionado}`,
                produto.preco,
                produto.imagem,
                btnCarrinho
            );

            showToast("Produto adicionado ✓");
        });
    }


    /* ==========================================================
    BOTÃO COMPRAR AGORA
    ========================================================== */

    const btnComprar =
        document.querySelector(".btn-comprar");

    if (btnComprar) {

        btnComprar.addEventListener("click", () => {

            const produtoAtual =
                JSON.parse(sessionStorage.getItem("produtoAtual") || "null");

            if (!produtoAtual) return;

            if (!tamanhoSelecionado) {
                showToast("Selecione um tamanho");
                return;
            }

            const nomeItem =
                produtoAtual.nome + ` - Tam ${tamanhoSelecionado}`;

            addToCart(
                nomeItem,
                produtoAtual.preco,
                produtoAtual.imagem,
                btnComprar,
                true
            );

            // 🔥 deixa só esse marcado
            selecionarApenasItem(nomeItem);

            openCart();
        });
    }

    });