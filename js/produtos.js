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
  criarCamisa("Camisa Alemanha 2026", 299.99, "ALEMANHA", "2026 Germany Home Jersey.webp", "seleção alemã", "Alemanha", true),
  criarCamisa("Camisa Borussia Dortmund 1988", 249.99, "ALEMANHA", "Retro Dortmund 1988.webp", "Borussia Dortmund", "Alemanha"),
  criarCamisa("Camisa Bayern Munique 1998-99", 249.99, "ALEMANHA", "Retro 98-99 Bayern Munich.webp", "Bayern Munique", "Alemanha"),
  criarCamisa("Camisa Bayer Leverkusen 2000-01", 249.99, "ALEMANHA", "Camisa Retro Bayer Leverusen - 2000-01.webp", "Bayer Leverkusen", "Alemanha"),

  // ARABIA SAUDITA
  criarCamisa("Camisa Arábia Saudita 2026", 299.99, "ARABIA SAUDITA", "2026 Saudi Arabia.webp", "seleção da Arábia Saudita", "Arábia Saudita", true),
  criarCamisa("Camisa Al Hilal 2023-24", 249.99, "ARABIA SAUDITA", "2023-24 Edition Al-Hilal.webp", "Al Hilal", "Arábia Saudita"),
  criarCamisa("Camisa Al Nassr 2023-24", 249.99, "ARABIA SAUDITA", "2023-24 Al-Nassr.webp", "Al Nassr", "Arábia Saudita"),
  criarCamisa("Camisa Al Ittihad 20223-24", 249.99, "ARABIA SAUDITA", "23-24 Ittihad.webp", "Al Ittihad", "Arábia Saudita"),
  
  // ARGENTINA
  criarCamisa("Camisa Argentina 2026", 299.99, "ARGENTINA", "argentina 2026.webp", "seleção da Argentina", "Argentina", true),
  criarCamisa("Camisa River Plate 2023-24", 119.99, "ARGENTINA", "river 200-01.webp", "River Plate", "Argentina"),
  criarCamisa("Camisa Boca Juniors 2023-24", 219.99, "ARGENTINA", "boca 2011-12.webp", "Boca Juniors", "Argentina"),
  criarCamisa("Camisa Independiente 2023-24", 149.99, "ARGENTINA", "independiente 99-00.webp", "Independiente", "Argentina"),

  //AUSTRALIA
  criarCamisa("Camisa Austrália 2026", 299.99, "AUSTRALIA", "2026 Australia.webp", "seleção da Austrália", "Austrália", true),
  criarCamisa("Camisa Sydney FC 2012-13", 249.99, "AUSTRALIA", "2012-13 Sydney FC Authentic Home.webp", "Sydney FC", "Austrália"),

  // BELGICA
  criarCamisa("Camisa Bélgica 2026", 299.99, "BELGICA", "2026 belgica.webp", "seleção da Bélgica", "Bélgica", true),
  criarCamisa("Camisa Brugge 2000-02", 249.99, "BELGICA", "brugge 2000-02.webp", "Club Brugge", "Bélgica"),

  // BRASIL
  criarCamisa("Camisa Brasil 2026", 299.99, "BRASIL", "camisa brasil 2026.webp", "seleção do Brasil", "Brasil", true),
  criarCamisa("Camisa São paulo 1977", 149.99, "BRASIL", "sao paulo 1997.webp", "são paulo", "Brasil"),
  criarCamisa("Camisa Santos 1977", 149.99, "BRASIL", "camisa santos.webp", "santos", "Brasil"),
  criarCamisa("Camisa Corinthians 1977", 149.99, "BRASIL", "corinthians 1997.webp", "Corinthians", "Brasil"),
  
  // CANADÁ
  criarCamisa("Camisa Canadá 2026", 299.99, "CANADA", "canada 2026.webp", "seleção do Canadá", "Canadá", true),
  criarCamisa("Camisa Toronto FC 2007-08", 129.99, "CANADA", "toronto 2007-08.webp", "Toronto FC", "Canadá"),

  // COREia DO SUL
  criarCamisa("Camisa Coreia do Sul 2026", 299.99, "COREIA", "2026 South korea.webp", "seleção da Coreia do Sul", "Coreia do Sul", true),

  // CROACIA
  criarCamisa("Camisa Croácia 2026", 299.99, "CROACIA", "croacia 2026.webp", "seleção da Croácia", "Croácia", true),
  criarCamisa("Camisa Dinamo Zagreb 2006-07", 249.99, "CROACIA", "2006-07 dinamo.webp", "Dinamo Zagreb", "Croácia"),

  // Egito
  criarCamisa("Camisa Egito 2026", 299.99, "EGITO", "egito 2026.avif", "seleção do Egito", "Egito", true),
  criarCamisa("Camisa Al Ahly 2005-06", 249.99, "EGITO", "al ahly 2005-06.png", "Al Ahly", "Egito"),

  // ESPANHA
  criarCamisa("Camisa Espanha 2026", 299.99, "ESPANHA", "espanha 2026.webp", "seleção da Espanha", "Espanha", true),
  criarCamisa("Camisa Barcelona 1998-99", 249.99, "ESPANHA", "barcelona 2008-09.webp", "Barcelona", "Espanha"),
  criarCamisa("Camisa Real Madrid 2000-01", 249.99, "ESPANHA", "real madrid 04-05.jpeg", "Real Madrid", "Espanha"),
  criarCamisa("Camisa Atlético de Madrid 2011-12", 249.99, "ESPANHA", "atletico 11-12.webp", "Atlético de Madrid", "Espanha"),

  // FRANÇA
  criarCamisa("Camisa França 2026", 299.99, "FRANCA", "2026 franca.webp", "seleção da França", "França", true),
  criarCamisa("Camisa PSG 2019-20", 249.99, "FRANCA", "psg 12-13.webp", "Paris Saint-Germain", "França"),
  criarCamisa("Camisa Olympique de Marseille 1998-99", 249.99, "FRANCA", "marseille 98-99.webp", "Olympique de Marseille", "França"),

  // HOLANDA
  criarCamisa("Camisa Holanda 2026", 299.99, "HOLANDA", "holanda 2026.webp", "seleção da Holanda", "Holanda", true),
  criarCamisa("Camisa Ajax 2008-09", 249.99, "HOLANDA", "ajax 08-09.webp", "Ajax", "Holanda"),

  // INGLATERRA
  criarCamisa("Camisa Inglaterra 2026", 299.99, "INGLATERRA", "2026 inglaterra.webp", "seleção da Inglaterra", "Inglaterra", true),
  criarCamisa("Camisa Liverpool 1989-90", 249.99, "INGLATERRA", "liverpool 05-06.webp", "Liverpool", "Inglaterra"),
  criarCamisa("Camisa arsenal 2003-04", 249.99, "INGLATERRA", "arsenal 07-08.webp", "Arsenal", "Inglaterra"),
  criarCamisa("Camisa Manchester City 1972", 249.99, "INGLATERRA", "city 1972.webp", "Manchester City", "Inglaterra"),

  // JAPÃO
  criarCamisa("Camisa Japão 2026", 299.99, "JAPAO", "2026 japan Home.webp", "seleção do Japão", "Japão", true),

  // MARROCOS
  criarCamisa("Camisa Marrocos 2026", 299.99, "MARROCOS", "2026 marocco Home.webp", "seleção de Marrocos", "Marrocos", true),
  criarCamisa("Camisa Wydad Casablanca 2007-08", 249.99, "MARROCOS", "wydad 2007-08.webp", "Wydad Casablanca", "Marrocos"),
  criarCamisa("Camisa Raja Casablanca 2013-14", 249.99, "MARROCOS", "casablanca.webp", "Raja Casablanca", "Marrocos"),

  // MÉXICO
  criarCamisa("Camisa México 2026", 299.99, "MEXICO", "2026 mexico.webp", "seleção do México", "México", true),
  criarCamisa("Camisa Club América 2024-25", 249.99, "MEXICO", "24-25 Club America.webp", "Club América", "México"),
  criarCamisa("Camisa Chivas Guadalajara 2024-25", 249.99, "MEXICO", "24-25 Chivas Guadalajara.webp", "Chivas Guadalajara", "México"),

  // PORTUGAL
  criarCamisa("Camisa Portugal 2026", 299.99, "PORTUGAL", "2026 portugal Home.webp", "seleção de Portugal", "Portugal", true),
  criarCamisa("Camisa Benfica 1994-95", 249.99, "PORTUGAL", "Retro 1994-95 Benfica.webp", "Benfica", "Portugal"),
  criarCamisa("Camisa Porto 1991-93", 249.99, "PORTUGAL", "Retro Porto 91-93.webp", "Porto", "Portugal"),
  criarCamisa("Camisa Sporting 2001-03", 249.99, "PORTUGAL", "Retro Sporting Lisbon 01-03 Home C.webp", "Sporting", "Portugal"),

  // URUGUAI
  criarCamisa("Camisa Uruguai 2026", 299.99, "URUGUAI", "2026 uruguay Home.webp", "seleção do Uruguai", "Uruguai", true),
  criarCamisa("Camisa Peñarol 2011-12", 249.99, "URUGUAI", "2023-24Penarol black.webp", "Peñarol", "Uruguai"),

  //USA
  criarCamisa("Camisa USA 2026", 299.99, "USA", "2026 USA.webp", "seleção dos Estados Unidos", "USA", true),
  criarCamisa("Camisa LA Galaxy 2007-08", 249.99, "USA", "Retro LA Galaxy 07-08.webp", "LA Galaxy", "Estados Unidos"),
  criarCamisa("Camisa New York City 2024-25", 249.99, "USA", "24-25 New York City.webp", "New York City", "Estados Unidos"),
  criarCamisa("Camisa Miami 2022-23", 249.99, "USA", "22-23 Miami.webp", "Inter Miami", "Estados Unidos"),


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
