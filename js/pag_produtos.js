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
    PREÇO NORMAL / PROMOÇÃO (VERSÃO PROFISSIONAL)
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
                <div class="preco-info">

                    <span class="preco-antigo">
                        R$ ${precoOriginal.toFixed(2).replace(".", ",")}
                    </span>

                    <span class="preco-desconto">
                        -${descontoPercentual}%
                    </span>

                </div>

                <div class="preco-principal">
                    R$ ${produto.preco.toFixed(2).replace(".", ",")}
                </div>

                <p>ou 12x sem juros</p>
            `;

        } else {

            preco.innerHTML = `
                <div class="preco-principal">
                    R$ ${produto.preco.toFixed(2).replace(".", ",")}
                </div>

                <p>ou 12x sem juros</p>
            `;
        }
    }

    // ================================
    // PARCELAMENTO AUTOMÁTICO
    // ================================

    const precoTexto = document.querySelector(".preco-principal").innerText;

    // Remove R$, espaços e troca vírgula por ponto
    const precoNumero = parseFloat(
        precoTexto
            .replace("R$", "")
            .replace(/\./g, "")
            .replace(",", ".")
            .trim()
    );

    // Calcula 4x
    const parcela = (precoNumero / 4).toFixed(2).replace(".", ",");

    // Mostra na tela
    document.getElementById("parcelamento-info").innerHTML = `
        Em até <strong>4x de R$ ${parcela}</strong> com juros
    `;

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