/* ==========================================================================
   BANCO DE DADOS: PRODUTOS FEMININOS
   ========================================================================== */

// Função auxiliar padronizada
function criarCamisaFem(nome, preco, pasta, foto, time, isPromo = false) {
  return {
    nome: nome,
    preco: preco,
    imagem: `/assets/img/${pasta}/${foto}`,
    time: time,
    isPromo: isPromo
  };
}

// Lista de produtos femininos
const produtosFemininos = [
  criarCamisaFem("Camisa Feminina Bayern 1989", 299.90, "ALEMANHA", "BAYERN MUNICH 1989 1990.jpg", "bayern", true),
  criarCamisaFem("Camisa Feminina Boca Juniors 1990", 199.90, "ARGENTINA", "Camisa Boca juniors 1 Retro 1990  1991.webp", "boca", true),
  criarCamisaFem("Camisa Feminina Manchester Utd 90", 249.90, "INGLATERRA", "Camisa Manchester United Away Azul 1990-92 Masculina.webp", "manchester", true),
  criarCamisaFem("Camisa Feminina Atlético Madrid 89", 249.90, "ESPANHA", "CAMISA ATLETICO DE MADRI 1989-1990.jpg", "atletico", true)
];

/* ==========================================================================
   RENDERIZAÇÃO FEMININA
   ========================================================================== */

function renderizarFeminino() {
  const container = document.getElementById("product-list");
  if (!container) return;

  container.innerHTML = "";

  produtosFemininos.forEach(produto => {
    // 🔥 Usa a função global para garantir o visual idêntico ao masculino e ofertas
    container.innerHTML += criarHTMLCard(produto);
  });
}

// Inicia a renderização ao carregar a página
document.addEventListener("DOMContentLoaded", renderizarFeminino);
