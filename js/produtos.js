/* ==========================================================================
   BANCO DE DADOS: PRODUTOS MASCULINOS
   ========================================================================== */

// Função auxiliar para organizar os dados
function criarCamisa(nome, preco, pasta, foto, time, pais, isPromo = false) {
  return {
    nome: nome,
    preco: preco,
    imagem: `/assets/img/${pasta}/${foto}`,
    time: time,
    pais: pais,
    isPromo: isPromo // Permite ativar o selo verde de oferta individualmente
  };
}

const produtos = [
  // ALEMANHA
  criarCamisa("Camisa Bayern Munich 1989-90", 299.90, "ALEMANHA", "BAYERN MUNICH 1989 1990.jpg", "bayern","alemanha", true),
  criarCamisa("Camisa Bayer Leverkusen 1996-97", 199.90, "ALEMANHA", "Camisa Bayer Leverkusen 1996-97.webp", "bayern","alemanha"),
  criarCamisa("Borussia Dortmund 1989-90", 200.00, "ALEMANHA", "Camisa Retro Borussia Dortmund Home 89-90 Amarelo.webp", "borussia","alemanha"),

  // ARABIA SAUDITA
  criarCamisa("Camisa Al-Hilal 2010-11", 200.00, "ARABIA SAUDITA", "Al-Hilal home camisa de futebol 2010 - 2011.jpg", "al-hilal","arabia", true),
  criarCamisa("Camisa Al-Nassr 2014-2015", 250.00, "ARABIA SAUDITA", "Al-Nassr Home camisa de futebol 2014 - 2015.jpg", "al-nassr", "arabia",),
  criarCamisa("Al-Ittihad Kalba 1980", 150.00, "ARABIA SAUDITA", "Camisa Al-Ittihad Kalba Anos 80 - Emirados Arabes.webp", "al-ittihad", "arabia",),

  // ARGENTINA
  criarCamisa("Boca Juniors 1990-91", 235.00, "ARGENTINA", "Camisa Boca juniors 1 Retro 1990  1991.webp", "boca", "argentina", true),
  criarCamisa("River Plate 1995-96", 235.00, "ARGENTINA", "camisa retro river Plate 1995 1996.webp", "river plate", "argentina"),
  criarCamisa("Independiente 1990", 235.00, "ARGENTINA", "Camiseta Independiente 1990 titular.webp", "independiente", "argentina")
];

/* ==========================================================================
   RENDERIZAÇÃO UNIFICADA
   ========================================================================== */

function renderProdutos() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  productList.innerHTML = "";

  produtos.forEach(produto => {
    // 🔥 AQUI ESTÁ A MUDANÇA: Chamamos a função global do script.js
    // Isso garante que o visual seja idêntico em todo o site
    productList.innerHTML += criarHTMLCard(produto);
  });
}

// Inicia a renderização ao carregar a página
document.addEventListener("DOMContentLoaded", renderProdutos);
