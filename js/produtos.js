// ==========================================================================
// FUNÇÃO AUXILIAR: Cria o objeto do produto com menos digitação
// ==========================================================================
function criarCamisa(nome, preco, pasta, foto, time) {
  return {
    nome: nome,
    preco: preco,
    imagem: `/assets/img/${pasta}/${foto}`,
    time: time
  };
}

// ==========================================================================
// LISTA DE PRODUTOS (SIMPLIFICADA)
// ==========================================================================
const produtos = [
  // ALEMANHA
  criarCamisa("Camisa Bayern Munich 1989-90", 299.90, "ALEMANHA", "BAYERN MUNICH 1989 1990.jpg", "bayern"),
  criarCamisa("Camisa Bayer Leverkusen 1996-97", 199.90, "ALEMANHA", "Camisa Bayer Leverkusen 1996-97.webp", "bayern"),
  criarCamisa("Borussia Dortmund 1989-90", 200.00, "ALEMANHA", "Camisa Retro Borussia Dortmund Home 89-90 Amarelo.webp", "borussia"),

  // ARABIA SAUDITA
  criarCamisa("Camisa Al-Hilal 2010-11", 200.00, "ARABIA SAUDITA", "Al-Hilal home camisa de futebol 2010 - 2011.jpg", "al-hilal"),
  criarCamisa("Camisa Al-Nassr 2014-2015", 250.00, "ARABIA SAUDITA", "Al-Nassr Home camisa de futebol 2014 - 2015.jpg", "al-nassr"),
  criarCamisa("Al-Ittihad Kalba 1980", 150.00, "ARABIA SAUDITA", "Camisa Al-Ittihad Kalba Anos 80 - Emirados Arabes.webp", "al-ittihad"),

  // ARGENTINA
  criarCamisa("Boca Juniors 1990-91", 235.00, "ARGENTINA", "Camisa Boca juniors 1 Retro 1990  1991.webp", "boca"),
  criarCamisa("River Plate 1995-96", 235.00, "ARGENTINA", "camisa retro river Plate 1995 1996.webp", "river plate"),
  criarCamisa("Independiente 1990", 235.00, "ARGENTINA", "Camiseta Independiente 1990 titular.webp", "independiente")
];

// ==========================================================================
// RENDERIZAÇÃO NA TELA
// ==========================================================================
const productList = document.getElementById("product-list");

function renderProdutos() {
  if (!productList) return;
  productList.innerHTML = "";

  produtos.forEach(produto => {
    // Criamos o HTML já conectando com a função de abrirModal que criamos antes
    productList.innerHTML += `
      <div class="card" data-nome="${produto.nome}" data-preco="${produto.preco}" data-time="${produto.time}">
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <div class="stars">★★★★★</div>
        <p class="price">R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>

        <div class="buttons">
          <button onclick="abrirModal('${produto.nome}', ${produto.preco}, '${produto.imagem}', false)">
            🛒 Adicionar
          </button>
          <button class="buy-btn" onclick="abrirModal('${produto.nome}', ${produto.preco}, '${produto.imagem}', true)">
            Comprar
          </button>
        </div>
      </div>
    `;
  });
}

// Inicia a renderização
document.addEventListener("DOMContentLoaded", renderProdutos);
