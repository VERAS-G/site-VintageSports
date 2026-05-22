/* =============================================================
   CARROSSEL AUTOMÁTICO INFINITO
============================================================= */

let indicePonto = 0;

const TOTAL_PONTOS = 13;

let autoplay;


/* =============================================================
   ROLAR MANUAL
============================================================= */

function rolarCarrossel(direcao) {

    const lista =
        document.getElementById('carrossel-lista');

    const pontos =
        document.querySelectorAll('.ponto');

    if (!lista || pontos.length === 0) return;

    indicePonto += direcao;

    // volta pro começo
    if (indicePonto >= TOTAL_PONTOS) {
        indicePonto = 0;
    }

    // impede negativo
    if (indicePonto < 0) {
        indicePonto = TOTAL_PONTOS - 1;
    }

    atualizarCarrossel();
}


/* =============================================================
   ATUALIZA POSIÇÃO
============================================================= */

function atualizarCarrossel() {

    const lista =
        document.getElementById('carrossel-lista');

    const pontos =
        document.querySelectorAll('.ponto');

    if (!lista) return;

    const larguraRolagemTotal =
        lista.scrollWidth - lista.clientWidth;

    const distanciaPorClique =
        larguraRolagemTotal / (TOTAL_PONTOS - 1);

    lista.scrollTo({
        left: indicePonto * distanciaPorClique,
        behavior: 'smooth'
    });

    pontos.forEach((ponto, i) => {

        ponto.classList.toggle(
            'ativo',
            i === indicePonto
        );
    });
}


/* =============================================================
   AUTOPLAY
============================================================= */

function iniciarAutoplay() {

    pararAutoplay();

    autoplay = setInterval(() => {

        indicePonto++;

        // chegou no final → volta pro começo
        if (indicePonto >= TOTAL_PONTOS) {
            indicePonto = 0;
        }

        atualizarCarrossel();

    }, 2500); // MAIS RÁPIDO
}


/* =============================================================
   PARAR AUTOPLAY
============================================================= */

function pararAutoplay() {

    clearInterval(autoplay);
}


/* =============================================================
   DOM READY
============================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const dotsContainer =
        document.getElementById('carrossel-dots');

    const lista =
        document.getElementById('carrossel-lista');

    const botoes =
        document.querySelectorAll('.btn-carrossel');

    if (dotsContainer) {

        dotsContainer.innerHTML = "";

        for (let i = 0; i < TOTAL_PONTOS; i++) {

            const ponto =
                document.createElement('span');

            ponto.classList.add('ponto');

            if (i === 0) {
                ponto.classList.add('ativo');
            }

            dotsContainer.appendChild(ponto);
        }
    }

    /* =========================================================
       PAUSA AO PASSAR O MOUSE NO CARROSSEL
    ========================================================= */

    if (lista) {

        lista.addEventListener(
            "mouseenter",
            pararAutoplay
        );

        lista.addEventListener(
            "mouseleave",
            iniciarAutoplay
        );
    }

    /* =========================================================
       PAUSA AO PASSAR O MOUSE NAS SETAS
    ========================================================= */

    botoes.forEach(botao => {

        botao.addEventListener(
            "mouseenter",
            pararAutoplay
        );

        botao.addEventListener(
            "mouseleave",
            iniciarAutoplay
        );
    });

    // inicia automático
    iniciarAutoplay();
});


window.rolarCarrossel = rolarCarrossel;


/* =============================================================
   FILTRO POR PAÍS
============================================================= */

function filtrarPais(elemento) {

    const pais = elemento.dataset.pais;

    window.location.href =
        `/pages/todos_produtos.html?pais=${pais}`;
}