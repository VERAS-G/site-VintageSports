// Função auxiliar para criar as camisas (mesma do masculino para manter o padrão)
function criarCamisaFem(nome, preco, pasta, foto, time) {
  return {
    nome: nome,
    preco: preco,
    imagem: `/assets/img/${pasta}/${foto}`,
    time: time
  };
}

// Lista de produtos femininos
const produtosFemininos = [
  criarCamisaFem("Camisa Feminina Bayern 1989", 299.90, "ALEMANHA", "BAYERN MUNICH 1989 1990.jpg", "bayern"),
  criarCamisaFem("Camisa Feminina Boca Juniors 1990", 199.90, "ARGENTINA", "Camisa Boca juniors 1 Retro 1990  1991.webp", "boca"),
  criarCamisaFem("Camisa Feminina Manchester Utd 90", 249.90, "INGLATERRA", "Camisa Manchester United Away Azul 1990-92 Masculina.webp", "manchester"),
  criarCamisaFem("Camisa Feminina Atlético Madrid 89", 249.90, "ESPANHA", "CAMISA ATLETICO DE MADRI 1989-1990.jpg", "atletico")
];
