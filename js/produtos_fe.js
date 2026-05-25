/* ==========================================================================
   BANCO DE DADOS: PRODUTOS FEMININOS
   ========================================================================== */

// Função auxiliar padronizada
function criarCamisaFem(nome, preco, pasta, foto, time, pais, isPromo = false) {
  return {
    nome: nome,
    preco: preco,
    imagem: `/assets/img/${pasta}/${foto}`,
    time: time,
    pais: pais,
    isPromo: isPromo
  };
}

// Lista de produtos femininos
const produtosFemininos = [
  criarCamisaFem("Camisa Alemanha Feminina 2026", 299.99, "ALEMANHA", "alemanha fem 2026.webp", "seleção alemã feminina", "alemanha", true),
  criarCamisaFem("Camisa Borussia Dortmund Feminina 2023-24", 249.99, "ALEMANHA", "borussia 23-24 fem.webp", "Borussia Dortmund feminino", "alemanha"),
  criarCamisaFem("Camisa Argentina Feminina 2026", 299.99, "ARGENTINA", "argentina 2026 fem.webp", "seleção argentina feminina", "argentina", true),
  criarCamisaFem("Camisa Feminina 2026 Brasil", 299.99, "BRASIL", "camisa fem brasil.webp", "seleção brasileira feminina", "brasil", true),
  criarCamisaFem("Camisa Feminina Brasil 2 2026", 299.99, "BRASIL", "camisa fem brasil 2.webp", "seleção brasileira feminina", "brasil", true),

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
