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
  criarCamisa("Camisa Alemanha 2026", 299.99, "ALEMANHA", "2026 Germany Home Jersey.webp", "seleção alemã", "alemanha", true),
  criarCamisa("Camisa Borussia Dortmund 1988", 249.99, "ALEMANHA", "Retro Dortmund 1988.webp", "Borussia Dortmund", "alemanha"),
  criarCamisa("Camisa Bayern Munique 1998-99", 249.99, "ALEMANHA", "Retro 98-99 Bayern Munich.webp", "Bayern Munique", "alemanha"),
  criarCamisa("Camisa Bayer Leverkusen 2000-01", 249.99, "ALEMANHA", "Camisa Retro Bayer Leverusen - 2000-01.webp", "Bayer Leverkusen", "alemanha"),

  // ARABIA SAUDITA
  criarCamisa("Camisa Arábia Saudita 2026", 299.99, "ARABIA SAUDITA", "2026 Saudi Arabia.webp", "seleção da Arábia Saudita", "arábia saudita", true),
  criarCamisa("Camisa Al Hilal 2023-24", 249.99, "ARABIA SAUDITA", "2023-24 Edition Al-Hilal.webp", "Al Hilal", "arábia saudita"),
  criarCamisa("Camisa Al Nassr 2023-24", 249.99, "ARABIA SAUDITA", "2023-24 Al-Nassr.webp", "Al Nassr", "arábia saudita"),
  criarCamisa("Camisa Al Ittihad 20223-24", 249.99, "ARABIA SAUDITA", "23-24 Ittihad.webp", "Al Ittihad", "arábia saudita"),
  
  // ARGENTINA
  criarCamisa("Camisa Argentina 2026", 299.99, "ARGENTINA", "argentina 2026.webp", "seleção da Argentina", "argentina", true),
  criarCamisa("Camisa River Plate 2023-24", 119.99, "ARGENTINA", "river 200-01.webp", "River Plate", "argentina"),
  criarCamisa("Camisa Boca Juniors 2023-24", 219.99, "ARGENTINA", "boca 2011-12.webp", "Boca Juniors", "argentina"),
  criarCamisa("Camisa Independiente 2023-24", 149.99, "ARGENTINA", "independiente 99-00.webp", "Independiente", "argentina"),

  //AUSTRALIA
  criarCamisa("Camisa Austrália 2026", 299.99, "AUSTRALIA", "2026 Australia.webp", "seleção da Austrália", "australia", true),
  criarCamisa("Camisa Sydney FC 2012-13", 249.99, "AUSTRALIA", "2012-13 Sydney FC Authentic Home.webp", "Sydney FC", "australia"),

  // BELGICA
  criarCamisa("Camisa Bélgica 2026", 299.99, "BELGICA", "2026 belgica.webp", "seleção da Bélgica", "belgica", true),
  criarCamisa("Camisa Brugge 2000-02", 249.99, "BELGICA", "brugge 2000-02.webp", "Club Brugge", "belgica"),

  // BRASIL
  criarCamisa("Camisa Brasil 2026", 299.99, "BRASIL", "camisa brasil 2026.webp", "seleção do Brasil", "brasil", true),
  criarCamisa("Camisa São paulo 1977", 149.99, "BRASIL", "sao paulo 1997.webp", "são paulo", "brasil"),
  criarCamisa("Camisa Santos 1977", 149.99, "BRASIL", "camisa santos.webp", "santos", "brasil"),
  criarCamisa("Camisa Corinthians 1977", 149.99, "BRASIL", "corinthians 1997.webp", "Corinthians", "brasil"),
  
  // CANADÁ
  criarCamisa("Camisa Canadá 2026", 299.99, "CANADA", "canada 2026.webp", "seleção do Canadá", "canada", true),
  criarCamisa("Camisa Toronto FC 2007-08", 129.99, "CANADA", "toronto 2007-08.webp", "Toronto FC", "canada"),

  // COREia DO SUL
  criarCamisa("Camisa Coreia do Sul 2026", 299.99, "COREIA", "2026 South korea.webp", "seleção da Coreia do Sul", "coreia do sul", true),

  // CROACIA
  criarCamisa("Camisa Croácia 2026", 299.99, "CROACIA", "croacia 2026.webp", "seleção da Croácia", "croacia", true),
  criarCamisa("Camisa Dinamo Zagreb 2006-07", 249.99, "CROACIA", "2006-07 dinamo.webp", "Dinamo Zagreb", "croacia"),

  // Egito
  criarCamisa("Camisa Egito 2026", 299.99, "EGITO", "egito 2026.avif", "seleção do Egito", "egito", true),
  criarCamisa("Camisa Al Ahly 2005-06", 249.99, "EGITO", "al ahly 2005-06.png", "Al Ahly", "egito"),

  // ESPANHA
  criarCamisa("Camisa Espanha 2026", 299.99, "ESPANHA", "espanha 2026.webp", "seleção da Espanha", "espanha", true),
  criarCamisa("Camisa Barcelona 1998-99", 249.99, "ESPANHA", "barcelona 2008-09.webp", "Barcelona", "espanha"),
  criarCamisa("Camisa Real Madrid 2000-01", 249.99, "ESPANHA", "real madrid 04-05.jpeg", "Real Madrid", "espanha"),
  criarCamisa("Camisa Atlético de Madrid 2011-12", 249.99, "ESPANHA", "atletico 11-12.webp", "Atlético de Madrid", "espanha"),

  // FRANÇA
  criarCamisa("Camisa França 2026", 299.99, "FRANCA", "2026 franca.webp", "seleção da França", "frança", true),
  criarCamisa("Camisa PSG 2019-20", 249.99, "FRANCA", "psg 12-13.webp", "Paris Saint-Germain", "frança"),
  criarCamisa("Camisa Olympique de Marseille 1998-99", 249.99, "FRANCA", "marseille 98-99.webp", "Olympique de Marseille", "frança"),

  // HOLANDA
  criarCamisa("Camisa Holanda 2026", 299.99, "HOLANDA", "holanda 2026.webp", "seleção da Holanda", "Holanda", true),
  criarCamisa("Camisa Ajax 2008-09", 249.99, "HOLANDA", "ajax 08-09.webp", "Ajax", "Holanda"),

  // INGLATERRA
  criarCamisa("Camisa Inglaterra 2026", 299.99, "INGLATERRA", "2026 inglaterra.webp", "seleção da Inglaterra", "inglaterra", true),
  criarCamisa("Camisa Liverpool 1989-90", 249.99, "INGLATERRA", "liverpool 05-06.webp", "Liverpool", "inglaterra"),
  criarCamisa("Camisa arsenal 2003-04", 249.99, "INGLATERRA", "arsenal 07-08.webp", "Arsenal", "inglaterra"),
  criarCamisa("Camisa Manchester City 1972", 249.99, "INGLATERRA", "city 1972.webp", "Manchester City", "inglaterra"),

  // JAPÃO
  criarCamisa("Camisa Japão 2026", 299.99, "JAPAO", "2026 japan Home.webp", "seleção do Japão", "Japão", true),

  // MARROCOS
  criarCamisa("Camisa Marrocos 2026", 299.99, "MARROCOS", "2026 marocco Home.webp", "seleção de Marrocos", "marrocos", true),
  criarCamisa("Camisa Wydad Casablanca 2007-08", 249.99, "MARROCOS", "wydad 2007-08.webp", "Wydad Casablanca", "marrocos"),
  criarCamisa("Camisa Raja Casablanca 2013-14", 249.99, "MARROCOS", "casablanca.webp", "Raja Casablanca", "marrocos"),

  // MÉXICO
  criarCamisa("Camisa México 2026", 299.99, "MEXICO", "2026 mexico.webp", "seleção do México", "méxico", true),
  criarCamisa("Camisa Club América 2024-25", 249.99, "MEXICO", "24-25 Club America.webp", "Club América", "méxico"),
  criarCamisa("Camisa Chivas Guadalajara 2024-25", 249.99, "MEXICO", "24-25 Chivas Guadalajara.webp", "Chivas Guadalajara", "méxico"),

  // PORTUGAL
  criarCamisa("Camisa Portugal 2026", 299.99, "PORTUGAL", "2026 portugal Home.webp", "seleção de Portugal", "portugal", true),
  criarCamisa("Camisa Benfica 1994-95", 249.99, "PORTUGAL", "Retro 1994-95 Benfica.webp", "Benfica", "portugal"),
  criarCamisa("Camisa Porto 1991-93", 249.99, "PORTUGAL", "Retro Porto 91-93.webp", "Porto", "portugal"),
  criarCamisa("Camisa Sporting 2001-03", 249.99, "PORTUGAL", "Retro Sporting Lisbon 01-03 Home C.webp", "Sporting", "portugal"),

  // URUGUAI
  criarCamisa("Camisa Uruguai 2026", 299.99, "URUGUAI", "2026 uruguay Home.webp", "seleção do Uruguai", "uruguai", true),
  criarCamisa("Camisa Peñarol 2011-12", 249.99, "URUGUAI", "2023-24Penarol black.webp", "Peñarol", "uruguai"),

  //USA
  criarCamisa("Camisa USA 2026", 299.99, "USA", "2026 USA.webp", "seleção dos Estados Unidos", "usa", true),
  criarCamisa("Camisa LA Galaxy 2007-08", 249.99, "USA", "Retro LA Galaxy 07-08.webp", "LA Galaxy", "estados unidos"),
  criarCamisa("Camisa New York City 2024-25", 249.99, "USA", "24-25 New York City.webp", "New York City", "estados unidos"),
  criarCamisa("Camisa Miami 2022-23", 249.99, "USA", "22-23 Miami.webp", "Inter Miami", "estados unidos"),


];

/* ==========================================================================
   PRODUTOS FEMININOS
   ========================================================================== */

const produtosFemininos = [

  criarCamisa("Camisa Alemanha Feminina 2026", 299.99, "ALEMANHA", "alemanha fem 2026.webp", "seleção alemã", "alemanha", true),
  criarCamisa("Camisa Borussia Dortmund Feminina 2023-24", 249.99, "ALEMANHA", "borussia 23-24 fem.webp", "Borussia Dortmund", "alemanha"),
  criarCamisa("Camisa Argentina Feminina 2026", 299.99, "ARGENTINA", "argentina 2026 fem.webp", "seleção argentina", "argentina", true),
  criarCamisa("Camisa Feminina 2026 Brasil", 299.99, "BRASIL", "camisa fem brasil.webp", "seleção brasileira", "brasil", true),
  criarCamisa("Camisa Feminina Brasil 2 2026", 299.99, "BRASIL", "camisa fem brasil 2.webp", "seleção brasileira", "brasil", true),

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
        `Produtos Relacionados à ${nomeFormatado}`;

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