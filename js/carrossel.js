/* =============================================================
   CARROSSEL: 13 CLIQUES = 13 PONTOS (SEM CORTES)
   ============================================================= */

let indicePonto = 0;
const TOTAL_PONTOS = 13;

function rolarCarrossel(direcao) {
    const lista = document.getElementById('carrossel-lista');
    const pontos = document.querySelectorAll('.ponto');
    
    if (!lista || pontos.length === 0) return;

    // 1. Atualiza o índice do ponto (0 a 12)
    indicePonto += direcao;
    
    if (indicePonto < 0) indicePonto = 0;
    if (indicePonto >= TOTAL_PONTOS) indicePonto = TOTAL_PONTOS - 1;

    // 2. CÁLCULO PARA NÃO CORTAR:
    // Dividimos o espaço total de rolagem pelo número de "pulos" (12 pulos para 13 pontos)
    const larguraRolagemTotal = lista.scrollWidth - lista.clientWidth;
    const distanciaPorClique = larguraRolagemTotal / (TOTAL_PONTOS - 1);

    lista.scrollTo({
        left: indicePonto * distanciaPorClique,
        behavior: 'smooth'
    });

    // 3. Atualiza a bolinha ativa
    pontos.forEach((ponto, i) => {
        ponto.classList.toggle('ativo', i === indicePonto);
    });
}

window.rolarCarrossel = rolarCarrossel;

document.addEventListener("DOMContentLoaded", () => {
    const dotsContainer = document.getElementById('carrossel-dots');
    
    if (dotsContainer) {
        dotsContainer.innerHTML = "";
        // Cria exatamente 13 pontos
        for (let i = 0; i < TOTAL_PONTOS; i++) {
            const ponto = document.createElement('span');
            ponto.classList.add('ponto');
            if (i === 0) ponto.classList.add('ativo');
            dotsContainer.appendChild(ponto);
        }
    }
});


/* =============================================================
   FILTRO POR PAÍS
   ============================================================= */

function filtrarPais(elemento) {
    const pais = elemento.dataset.pais;

    // Redireciona para a página de produtos
    window.location.href = `/pages/todos_produtos.html?pais=${pais}`;
}