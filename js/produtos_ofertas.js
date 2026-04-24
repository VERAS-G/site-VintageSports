// 1. Redefinimos a função auxiliar aqui dentro para não depender de outros arquivos
function criarCamisaOferta(nome, preco, pasta, foto, time) {
  return {
    nome: nome,
    preco: preco,
    imagem: `/assets/img/${pasta}/${foto}`,
    time: time
  };
}

// 2. Banco de Dados de Ofertas
const produtosOfertas = [
  criarCamisaOferta("Camisa Bayern Munich 1989", 299.90, "ALEMANHA", "BAYERN MUNICH 1989 1990.jpg", "bayern"),
  criarCamisaOferta("Camisa Boca Juniors 1990", 199.90, "ARGENTINA", "Camisa Boca Juniors 1 Retrô 1990  1991.webp", "boca"),
  criarCamisaOferta("Manchester United 1990-92", 249.90, "INGLATERRA", "Camisa Manchester United Away Azul 1990-92 Masculina.webp", "manchester"),
  criarCamisaOferta("Atlético de Madrid 1989", 249.90, "ESPANHA", "CAMISA ATLETICO DE MADRI 1989-1990.jpg", "atletico"),
  criarCamisaOferta("Atlético de Madrid 1989", 249.90, "ESPANHA", "CAMISA ATLETICO DE MADRI 1989-1990.jpg", "atletico"),
  criarCamisaOferta("Atlético de Madrid 1989", 249.90, "ESPANHA", "CAMISA ATLETICO DE MADRI 1989-1990.jpg", "atletico"),
  criarCamisaOferta("Atlético de Madrid 1989", 249.90, "ESPANHA", "CAMISA ATLETICO DE MADRI 1989-1990.jpg", "atletico"),
  criarCamisaOferta("Atlético de Madrid 1989", 249.90, "ESPANHA", "CAMISA ATLETICO DE MADRI 1989-1990.jpg", "atletico"),
  criarCamisaOferta("Atlético de Madrid 1989", 249.90, "ESPANHA", "CAMISA ATLETICO DE MADRI 1989-1990.jpg", "atletico"),
  criarCamisaOferta("Atlético de Madrid 1989", 249.90, "ESPANHA", "CAMISA ATLETICO DE MADRI 1989-1990.jpg", "atletico"),
  criarCamisaOferta("Atlético de Madrid 1989", 249.90, "ESPANHA", "CAMISA ATLETICO DE MADRI 1989-1990.jpg", "atletico"),
  criarCamisaOferta("Atlético de Madrid 1989", 249.90, "ESPANHA", "CAMISA ATLETICO DE MADRI 1989-1990.jpg", "atletico"),
  criarCamisaOferta("Atlético de Madrid 1989", 249.90, "ESPANHA", "CAMISA ATLETICO DE MADRI 1989-1990.jpg", "atletico"),
  criarCamisaOferta("Atlético de Madrid 1989", 249.90, "ESPANHA", "CAMISA ATLETICO DE MADRI 1989-1990.jpg", "atletico"),
  criarCamisaOferta("Atlético de Madrid 1989", 249.90, "ESPANHA", "CAMISA ATLETICO DE MADRI 1989-1990.jpg", "atletico"),
  criarCamisaOferta("Atlético de Madrid 1989", 249.90, "ESPANHA", "CAMISA ATLETICO DE MADRI 1989-1990.jpg", "atletico"),
  criarCamisaOferta("Atlético de Madrid 1989", 249.90, "ESPANHA", "CAMISA ATLETICO DE MADRI 1989-1990.jpg", "atletico"),
  criarCamisaOferta("Atlético de Madrid 1989", 249.90, "ESPANHA", "CAMISA ATLETICO DE MADRI 1989-1990.jpg", "atletico"),
  criarCamisaOferta("Atlético de Madrid 1989", 249.90, "ESPANHA", "CAMISA ATLETICO DE MADRI 1989-1990.jpg", "atletico"),
  criarCamisaOferta("Atlético de Madrid 1989", 249.90, "ESPANHA", "CAMISA ATLETICO DE MADRI 1989-1990.jpg", "atletico"),
  criarCamisaOferta("Atlético de Madrid 1989", 249.90, "ESPANHA", "CAMISA ATLETICO DE MADRI 1989-1990.jpg", "atletico"),
  criarCamisaOferta("Atlético de Madrid 1989", 249.90, "ESPANHA", "CAMISA ATLETICO DE MADRI 1989-1990.jpg", "atletico"),
  criarCamisaOferta("Atlético de Madrid 1989", 249.90, "ESPANHA", "CAMISA ATLETICO DE MADRI 1989-1990.jpg", "atletico"),
];

// 3. Função para renderizar
function renderizarOfertas() {
  const l1 = document.getElementById("linha-1");
  const l2 = document.getElementById("linha-2");

  if (!l1 || !l2) return;

  l1.innerHTML = "";
  l2.innerHTML = "";

  produtosOfertas.forEach((produto, index) => {
    const cardHTML = `
      <div class="card" data-nome="${produto.nome}">
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <div class="stars">★★★★★</div>
        <p class="price">R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>
        <div class="buttons">
          <button onclick="abrirModal('${produto.nome}', ${produto.preco}, '${produto.imagem}', false, this)">
            🛒 Adicionar
          </button>
          <button class="buy-btn" onclick="abrirModal('${produto.nome}', ${produto.preco}, '${produto.imagem}', true, this)">
            Comprar
          </button>
        </div>
      </div>
    `;

    if (index % 2 === 0) {
      l1.innerHTML += cardHTML;
    } else {
      l2.innerHTML += cardHTML;
    }
  });
}

// 4. Função das setas
window.rolarLinha = function(id, distancia) {
  const el = document.getElementById(id);
  if (el) el.scrollBy({ left: distancia, behavior: 'smooth' });
};

// 5. Inicializa
document.addEventListener("DOMContentLoaded", renderizarOfertas);
