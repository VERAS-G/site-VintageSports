/* ==========================================================================
   BANCO DE DADOS: PRODUTOS EM OFERTA
========================================================================== */

function criarCamisaOferta(nome, preco, pasta, foto, time) {
  return {
    nome,
    preco,
    imagem: `/assets/img/${pasta}/${foto}`,
    time,
    isPromo: true
  };
}

const produtosOfertas = [
  criarCamisaOferta("Camisa Alemanha 2026", 229.99, "ALEMANHA", "2026 Germany Home Jersey.webp", "seleção alemã", "Alemanha", true),
  criarCamisaOferta("Camisa Arábia Saudita 2026", 219.99, "ARABIA SAUDITA", "2026 Saudi Arabia.webp", "seleção da Arábia Saudita", "Arábia Saudita", true),
  criarCamisaOferta("Camisa Brugge 2000-02", 129.99, "BELGICA", "brugge 2000-02.webp", "Club Brugge", "Bélgica" ,true),
  criarCamisaOferta("Camisa Sydney FC 2012-13", 149.99, "AUSTRALIA", "2012-13 Sydney FC Authentic Home.webp", "Sydney FC", "Austrália", true),
  criarCamisaOferta("Camisa Toronto FC 2007-08", 89.99, "CANADA", "toronto 2007-08.webp", "Toronto FC", "Canadá", true),
  criarCamisaOferta("Camisa Dinamo Zagreb 2006-07", 149.99, "CROACIA", "2006-07 dinamo.webp", "Dinamo Zagreb", "Croácia", true),
  criarCamisaOferta("camisa Santos 1977", 89.99, "BRASIL", "camisa santos.webp", "santos", "Brasil", true),
  criarCamisaOferta("Camisa Independiente 2023-24", 119.99, "ARGENTINA", "independiente 99-00.webp", "Independiente", "Argentina", true),
  criarCamisaOferta("Camisa Al Hilal 2023-24", 149.99, "ARABIA SAUDITA", "2023-24 Edition Al-Hilal.webp", "Al Hilal", "Arábia Saudita", true),
  criarCamisaOferta("Camisa Atletico Madrid 2011-12", 199.99, "ESPANHA", "atletico 11-12.webp", "Atletico Madrid", "Espanha", true),
  criarCamisaOferta("Camisa River Plate 2023-24", 89.99, "ARGENTINA", "river 200-01.webp", "River Plate", "Argentina", true),
  criarCamisaOferta("Camisa Paris Saint-Germain 2013-14", 199.99, "FRANCA", "psg 12-13.webp", "Paris Saint-Germain", "França", true),
];

/* ============================
   PRODUTOS PARTICIPANTES
============================ */

const produtosParticipantes = [

  criarCamisaOferta("Camisa Alemanha Feminina 2026", 299.99, "ALEMANHA", "alemanha fem 2026.webp", "seleção alemã feminina", "alemanha", true),
  criarCamisaOferta("Camisa Borussia Dortmund Feminina 2023-24", 249.99, "ALEMANHA", "borussia 23-24 fem.webp", "Borussia Dortmund feminino", "alemanha", true),
  criarCamisaOferta("Camisa Argentina Feminina 2026", 299.99, "ARGENTINA", "argentina 2026 fem.webp", "seleção argentina feminina", "argentina", true),
  criarCamisaOferta("Camisa Atletico Madrid 2011-12", 199.99, "ESPANHA", "atletico 11-12.webp", "Atletico Madrid", "Espanha", true),
  criarCamisaOferta("Camisa River Plate 2023-24", 89.99, "ARGENTINA", "river 200-01.webp", "River Plate", "Argentina", true),
  criarCamisaOferta("Camisa Paris Saint-Germain 2013-14", 199.99, "FRANCA", "psg 12-13.webp", "Paris Saint-Germain", "França", true),

];

/* ============================
   DUPLICAÇÃO PROFISSIONAL
============================ */

function duplicarCarrossel(el) {

  if (!el.dataset.duplicado) {

    el.innerHTML += el.innerHTML;

    el.dataset.duplicado = "true";
  }
}

/* ============================
   RENDER OFERTAS
============================ */

function renderizarOfertas() {

  const l1 = document.getElementById("linha-1");
  const l2 = document.getElementById("linha-2");

  if (!l1 || !l2) return;

  l1.innerHTML = "";
  l2.innerHTML = "";

  produtosOfertas.forEach((produto, i) => {

    const card = criarHTMLCard(produto);

    const container = (i % 2 === 0 ? l1 : l2);

    container.insertAdjacentHTML("beforeend", card);

  });
}

/* ============================
   RENDER PRODUTOS PARTICIPANTES
============================ */

function renderizarProdutosParticipantes() {

  const container = document.querySelector(".produtos");

  if (!container) return;

  container.innerHTML = "";

  produtosParticipantes.forEach(produto => {

    const card = criarHTMLCard(produto);

    container.insertAdjacentHTML("beforeend", card);

  });
}

/* ============================
   SETAS
============================ */

window.rolarLinha = function(id, distancia) {

  const el = document.getElementById(id);

  if (!el) return;

  el.scrollBy({
    left: distancia,
    behavior: "smooth"
  });
};

/* ============================
   AUTO SCROLL INFINITO
============================ */

function autoScroll(el, speed) {

  let paused = false;
  let hoverArrow = false;

  const getHalf = () => el.scrollWidth / 2;

  el.addEventListener("mouseenter", () => paused = true);

  el.addEventListener("mouseleave", () => paused = false);

  const arrows = el.parentElement.querySelectorAll(".nav-arrow");

  arrows.forEach(arrow => {

    arrow.addEventListener("mouseenter", () => hoverArrow = true);

    arrow.addEventListener("mouseleave", () => hoverArrow = false);

  });

  function loop() {

    if (!paused && !hoverArrow) {

      el.scrollLeft += speed;

      // 🔥 RESET LIMPO E ESTÁVEL
      if (el.scrollLeft >= getHalf()) {

        el.scrollLeft = el.scrollLeft - getHalf();

      }
    }

    requestAnimationFrame(loop);
  }

  loop();
}

/* ============================
   VER MAIS
============================ */

window.toggleSegundaLinha = function () {

  const container = document.getElementById("carrossel-2");

  const btn = document.getElementById("btn-ver-mais");

  if (!container) return;

  const isHidden = container.classList.contains("hidden");

  if (isHidden) {

    container.classList.remove("hidden");

    btn.innerText = "Ver menos ofertas";

  } else {

    container.classList.add("hidden");

    btn.innerText = "Ver mais ofertas";
  }
};

/* ============================
   INIT FINAL
============================ */

document.addEventListener("DOMContentLoaded", () => {

  renderizarOfertas();

  renderizarProdutosParticipantes();

  requestAnimationFrame(() => {

    const l1 = document.getElementById("linha-1");

    const l2 = document.getElementById("linha-2");

    const container2 = document.getElementById("carrossel-2");

    if (l1) {

      duplicarCarrossel(l1);

      autoScroll(l1, 0.35);
    }

    if (l2 && container2 && !container2.classList.contains("hidden")) {

      duplicarCarrossel(l2);

      autoScroll(l2, 0.18);
    }
  });

});