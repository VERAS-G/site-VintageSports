/* ==========================================================================
   BANCO DE DADOS: PRODUTOS
   ========================================================================== */

// Função auxiliar padrão
function criarCamisa(nome, preco, pasta, foto, time, pais, categoria, isPromo = false) {
  return {
    nome,
    preco,
    imagem: `/assets/img/${pasta}/${foto}`,
    time,
    pais,
    categoria,
    isPromo
  };
}

/* ==========================================================================
   PRODUTOS MASCULINOS
   ========================================================================== */

const produtos = [

  // ALEMANHA
  criarCamisa(
    "Camisa Bayern Munich 1989-90",
    299.90,
    "ALEMANHA",
    "BAYERN MUNICH 1989 1990.jpg",
    "bayern",
    "alemanha",
    "masculino",
    true
  ),

  criarCamisa(
    "Paris Saint-Germain 1989 - 1990",
    289.99,
    "FRANCA",
    "Paris Saint-Germain 1989-1990 Home Jersey PSG.jpg",
    "psg",
    "franca",
    "masculino",
    true
  ),
  
  criarCamisa(
    "sport Club Corinthians 1990",
    239.90,
    "BRASIL",
    "Camisa Corinthians Brasileirao 1990.webp",
    "corinthians",
    "brasil",
    "masculino"
  ),

  criarCamisa(
    "Camisa Bayer Leverkusen 1996-97",
    199.90,
    "ALEMANHA",
    "Camisa Bayer Leverkusen 1996-97.webp",
    "bayern",
    "alemanha",
    "masculino"
  ),

  criarCamisa(
    "Borussia Dortmund 1989-90",
    200.00,
    "ALEMANHA",
    "Camisa Retro Borussia Dortmund Home 89-90 Amarelo.webp",
    "borussia",
    "alemanha",
    "masculino"
  ),

  // ARABIA SAUDITA
  criarCamisa(
    "Camisa Al-Hilal 2010-11",
    200.00,
    "ARABIA SAUDITA",
    "Al-Hilal home camisa de futebol 2010 - 2011.jpg",
    "al-hilal",
    "arabia",
    "masculino",
    true
  ),

  criarCamisa(
    "Camisa Al-Nassr 2014-2015",
    250.00,
    "ARABIA SAUDITA",
    "Al-Nassr Home camisa de futebol 2014 - 2015.jpg",
    "al-nassr",
    "arabia",
    "masculino"
  ),

  criarCamisa(
    "Al-Ittihad Kalba 1980",
    150.00,
    "ARABIA SAUDITA",
    "Camisa Al-Ittihad Kalba Anos 80 - Emirados Arabes.webp",
    "al-ittihad",
    "arabia",
    "masculino"
  ),

  criarCamisa(
    "Camisa Santos FC 1991-92",
    235.00,
    "BRASIL",
    "Santos  10  Umbro  1991 1992.webp",
    "santos",
    "brasil",
    "masculino"
  ),

  // ARGENTINA
  criarCamisa(
    "Boca Juniors 1990-91",
    235.00,
    "ARGENTINA",
    "Camisa Boca juniors 1 Retro 1990  1991.webp",
    "boca",
    "argentina",
    "masculino",
    true
  ),

  criarCamisa(
    "River Plate 1995-96",
    235.00,
    "ARGENTINA",
    "camisa retro river Plate 1995 1996.webp",
    "river plate",
    "argentina",
    "masculino"
  ),

  criarCamisa(
    "Independiente 1990",
    235.00,
    "ARGENTINA",
    "Camiseta Independiente 1990 titular.webp",
    "independiente",
    "argentina",
    "masculino"
  ),

  criarCamisa(
    "Camisa são Paulo 1990-91",
    235.00,
    "BRASIL",
    "Camisa Sao Paulo Adidas 1990.jpg",
    "sao-paulo",
    "brasil",
    "masculino"
  )

];

/* ==========================================================================
   PRODUTOS FEMININOS
   ========================================================================== */

const produtosFemininos = [

  criarCamisa(
    "Camisa Feminina Bayern 1989",
    299.90,
    "ALEMANHA",
    "BAYERN MUNICH 1989 1990.jpg",
    "bayern",
    "alemanha",
    "feminino",
    true
  ),

  criarCamisa(
    "Camisa Feminina Boca Juniors 1990",
    199.90,
    "ARGENTINA",
    "Camisa Boca juniors 1 Retro 1990  1991.webp",
    "boca",
    "argentina",
    "feminino",
    true
  ),

  criarCamisa(
    "Camisa Feminina Manchester Utd 90",
    249.90,
    "INGLATERRA",
    "Camisa Manchester United Away Azul 1990-92 Masculina.webp",
    "manchester",
    "inglaterra",
    "feminino",
    true
  ),

  criarCamisa(
    "Camisa Feminina Atlético Madrid 89",
    249.90,
    "ESPANHA",
    "CAMISA ATLETICO DE MADRI 1989-1990.jpg",
    "atletico",
    "espanha",
    "feminino",
    true
  )

];

/* ==========================================================================
   RENDERIZAÇÃO ÚNICA
   ========================================================================== */

function renderizarColecao() {

  const container = document.getElementById("product-list");

  if (!container) return;

  // pega o país da URL
  const params = new URLSearchParams(window.location.search);

  const paisSelecionado = params.get("pais");

  if (paisSelecionado) {

    const checkboxPais =
      document.querySelector(
        `input[value="${paisSelecionado}"]`
      );

    if (checkboxPais) {

      checkboxPais.checked = true;

      // abre o filtro
      checkboxPais
        .closest(".filtro-conteudo")
        .classList.add("active");

    }

  }

// ativa filtros
document
  .querySelectorAll('.filters input')
  .forEach(input => {

    input.addEventListener(
      'change',
      aplicarFiltros
    );

  });

  // junta todos os produtos
  const todosProdutos = [
    ...produtos,
    ...produtosFemininos
  ];

  // filtra apenas se tiver país
  let produtosFiltrados = todosProdutos;

  if (paisSelecionado) {

    produtosFiltrados = todosProdutos.filter(produto =>
      produto.pais === paisSelecionado
    );

  }

  // limpa container
  container.innerHTML = "";

  atualizarFiltroTimes(produtosFiltrados);

  // altera título
  const titulo = document.querySelector(".products h2");

  if (titulo) {

    if (paisSelecionado) {

      const nomeFormatado =
        paisSelecionado.charAt(0).toUpperCase() +
        paisSelecionado.slice(1);

      titulo.innerText =
        `Produtos de ${nomeFormatado}`;

    } else {

      titulo.innerText =
        "Todos os Produtos";

    }

  }

  // sem produtos
  if (produtosFiltrados.length === 0) {

    container.innerHTML = `
      <p class="sem-produtos">
        Nenhum produto encontrado.
      </p>
    `;

    return;
  }

  // renderiza produtos
  produtosFiltrados.forEach(produto => {

    container.innerHTML += criarHTMLCard(produto);

  });

}

function atualizarFiltroTimes(produtosFiltrados) {

  const container =
    document.querySelector(
      '[data-tipo="time"]'
    );

  if (!container) return;

  // salva os times marcados
  const timesMarcados = [
    ...container.querySelectorAll(
      'input:checked'
    )
  ].map(input => input.value);

  // pega times únicos
  const times = [
    ...new Set(
      produtosFiltrados.map(
        produto => produto.time
      )
    )
  ];

  // limpa
  container.innerHTML = "";

  // recria checkboxes
  times.forEach(time => {

    const checked =
      timesMarcados.includes(time)
      ? "checked"
      : "";

    container.innerHTML += `
      <label>
        <input
          type="checkbox"
          value="${time}"
          ${checked}
        >
        ${time}
      </label>
    `;

  });

  // reativa eventos
  container
    .querySelectorAll('input')
    .forEach(input => {

      input.addEventListener(
        "change",
        aplicarFiltros
      );

    });

}

/* ==========================================================================
   INICIAR
   ========================================================================== */

document.addEventListener(
  "DOMContentLoaded",
  renderizarColecao
);

/* ==========================================================================
   FILTROS DINÂMICOS
   ========================================================================== */

function aplicarFiltros() {

  const container =
    document.getElementById("product-list");

  if (!container) return;

  // junta todos
  let produtosFiltrados = [
    ...produtos,
    ...produtosFemininos
  ];

  /* ==========================================================
     FILTRO PAÍS
     ========================================================== */

  const paisesSelecionados = [
    ...document.querySelectorAll(
      '[data-tipo="pais"] input:checked'
    )
  ].map(input => input.value);

  if (paisesSelecionados.length > 0) {

    produtosFiltrados =
      produtosFiltrados.filter(produto =>
        paisesSelecionados.includes(produto.pais)
      );

  }

  /* ==========================================================
     FILTRO CATEGORIA
     ========================================================== */

  const categoriasSelecionadas = [
    ...document.querySelectorAll(
      '[data-tipo="categoria"] input:checked'
    )
  ].map(input => input.value);

  if (categoriasSelecionadas.length > 0) {

    produtosFiltrados =
      produtosFiltrados.filter(produto =>
        categoriasSelecionadas.includes(
          produto.categoria
        )
      );

  }

  /* ==========================================================
     FILTRO TIMES
     ========================================================== */

  const timesSelecionados = [
    ...document.querySelectorAll(
      '[data-tipo="time"] input:checked'
    )
  ].map(input => input.value);

  if (timesSelecionados.length > 0) {

    produtosFiltrados =
      produtosFiltrados.filter(produto =>
        timesSelecionados.includes(produto.time)
      );

  }

  /* ==========================================================
     FILTRO PREÇO
     ========================================================== */

  const precosSelecionados = [
    ...document.querySelectorAll(
      '[data-tipo="preco"] input:checked'
    )
  ].map(input => input.value);

  if (precosSelecionados.length > 0) {

    produtosFiltrados =
      produtosFiltrados.filter(produto => {

        return precosSelecionados.some(preco => {

          if (preco === "0-150") {
            return produto.preco <= 150;
          }

          if (preco === "150-200") {
            return produto.preco > 150 &&
                   produto.preco <= 200;
          }

          if (preco === "200-300") {
            return produto.preco > 200 &&
                   produto.preco <= 300;
          }

          if (preco === "300+") {
            return produto.preco > 300;
          }

        });

      });

  }

/* ==========================================================
   ATUALIZA TIMES DINÂMICOS
   ========================================================== */

// atualiza times apenas pelo país/categoria
let produtosParaTimes = [
  ...produtos,
  ...produtosFemininos
];

// mantém filtro de país
if (paisesSelecionados.length > 0) {

  produtosParaTimes =
    produtosParaTimes.filter(produto =>
      paisesSelecionados.includes(produto.pais)
    );

}

// mantém categoria
if (categoriasSelecionadas.length > 0) {

  produtosParaTimes =
    produtosParaTimes.filter(produto =>
      categoriasSelecionadas.includes(
        produto.categoria
      )
    );

}

atualizarFiltroTimes(produtosParaTimes);

  /* ==========================================================
     RENDERIZA
     ========================================================== */

  container.innerHTML = "";

  if (produtosFiltrados.length === 0) {

    container.innerHTML = `
      <p class="sem-produtos">
        Nenhum produto encontrado.
      </p>
    `;

    return;

  }

  produtosFiltrados.forEach(produto => {

    container.innerHTML +=
      criarHTMLCard(produto);

  });

}