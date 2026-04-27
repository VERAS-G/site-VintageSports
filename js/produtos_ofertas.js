/* ==========================================================================
   BANCO DE DADOS: PRODUTOS EM OFERTA
   ========================================================================== */

function criarCamisaOferta(nome, preco, pasta, foto, time) {
  return {
    nome: nome,
    preco: preco,
    imagem: `/assets/img/${pasta}/${foto}`,
    time: time,
    isPromo: true // 🔥 Ativa automaticamente o visual de oferta da Função Mestra
  };
}

const produtosOfertas = [
  criarCamisaOferta("Camisa Bayern Munich 1989", 299.90, "ALEMANHA", "BAYERN MUNICH 1989 1990.jpg", "bayern"),
  criarCamisaOferta("Camisa Boca Juniors 1990", 199.90, "ARGENTINA", "Camisa Boca Juniors 1 Retro 1990  1991.webp", "boca"),
  criarCamisaOferta("Manchester United 1990-92", 249.90, "INGLATERRA", "Camisa Manchester United Away Azul 1990-92 Masculina.webp", "manchester"),
  criarCamisaOferta("Atlético de Madrid 1989", 249.90, "ESPANHA", "CAMISA ATLETICO DE MADRI 1989-1990.jpg", "atletico"),
  criarCamisaOferta("AL-Hilal 2010 - 2011", 200.00, "ARABIA SAUDITA", "Al-Hilal Home camisa de futebol 2010 - 2011.jpg", "al-hilal"),
  criarCamisaOferta("Sydney FC 2012 - 2013", 170.90, "AUSTRALIA", "2012-13 Sydney FC.webp", "Sydney"),
  criarCamisaOferta("Club Brugge 1998 - 1999", 190.99, "BELGICA", "1998-99 Club Brugge Vintage adidas.webp", "brugge"),
  criarCamisaOferta("Sport Club Corinthians 1990", 239.90, "BRASIL", "Camisa Corinthians Brasileirao 1990.webp", "corinthians"),
  criarCamisaOferta("Camisa Toronto FC 2012", 199.90, "CANADA", "camisa toronto fc 2012.jpg", "toronto"),
  criarCamisaOferta("Jeonbuk Hyundai Motors 2014", 230.90, "COREIA DO SUL", "jeonbuk Hyundai Motors Home camisa de futebol 2014.jpg"),
  criarCamisaOferta("Camisa GNK Dinamo Zagreb 1990", 200.90, "CROACIA", "GNK Dinamo Zagreb 1990 Retro.webp", "dinamo" ),
  criarCamisaOferta("Camisa Al-Ahly SC 1980s", 220.00, "EGITO", "Al Ahly SC 1980s.webp", "al ahly"),
  criarCamisaOferta("Paris Saint-Germain 1989 - 1990", 289.99, "FRANCA", "Paris Saint-Germain 1989-1990 Home Jersey PSG.jpg"),
];

/* ==========================================================================
   RENDERIZAÇÃO EM DUAS LINHAS (CARROSSEL)
   ========================================================================== */

function renderizarOfertas() {
  const l1 = document.getElementById("linha-1");
  const l2 = document.getElementById("linha-2");

  if (!l1 || !l2) return;

  l1.innerHTML = "";
  l2.innerHTML = "";

  produtosOfertas.forEach((produto, index) => {
    // 🔥 Chamamos a função global para gerar o card padronizado
    const cardHTML = criarHTMLCard(produto);

    // Distribui entre as duas linhas do carrossel
    if (index % 2 === 0) {
      l1.innerHTML += cardHTML;
    } else {
      l2.innerHTML += cardHTML;
    }
  });
}

// Controle das setas lateralmente
window.rolarLinha = function(id, distancia) {
  const el = document.getElementById(id);
  if (el) el.scrollBy({ left: distancia, behavior: 'smooth' });
};

document.addEventListener("DOMContentLoaded", renderizarOfertas);
