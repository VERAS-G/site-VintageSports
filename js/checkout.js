/* ==========================================================================
   CONFIGURAÇÃO INICIAL
   ========================================================================== */
// Busca os valores salvos no navegador. Se não existirem, começa em 0.
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let frete = parseFloat(localStorage.getItem("frete_valor")) || 0;
let descontoPercentual = parseFloat(localStorage.getItem("desconto_percentual")) || 0;
let toastTimeout;


/* ==========================================================================
   RENDERIZAÇÃO DO CARRINHO (COM PREÇO DE OFERTA LADO A LADO)
   ========================================================================== */
function render() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  container.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, i) => {
    const totalItem = item.price * item.quantity;
    
    if (item.selected !== false) {
      subtotal += totalItem;
    }

    // 🔥 LÓGICA DE PREÇO: Calcula o valor antigo se for promoção
    let htmlPreco = "";
    if (item.isPromo) {
      const precoAntigoTotal = (item.price * 1.15) * item.quantity;
      htmlPreco = `
        <div class="checkout-price-row">
          <span class="price-old">R$ ${precoAntigoTotal.toFixed(2).replace(".", ",")}</span>
          <span class="price-new">R$ ${totalItem.toFixed(2).replace(".", ",")}</span>
        </div>
      `;
    } else {
      htmlPreco = `<div class="checkout-price">R$ ${totalItem.toFixed(2).replace(".", ",")}</div>`;
    }

    const statusClasse = item.selected === false ? "item-morto" : "";
    const div = document.createElement("div");
    div.className = `checkout-product ${statusClasse}`;
    
    div.innerHTML = `
      <div class="product-main-info">
        <input type="checkbox" ${item.selected !== false ? "checked" : ""} 
               onchange="alternarSelecao(${i})" class="cart-check">
        <img src="${item.image}" class="checkout-img">
        <div class="checkout-details">
          <h4>${item.name}</h4>
          <p class="checkout-category">Camisa retrô</p>
          <div class="checkout-actions">
            <div class="qtd">
              <button onclick="menos(${i})">−</button>
              <span>${item.quantity}</span>
              <button onclick="mais(${i})">+</button>
            </div>
            <button class="remove" onclick="remover(${i})">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
      <!-- Injeta o HTML do preço (Normal ou Oferta) -->
      ${htmlPreco}
    `;
    container.appendChild(div);
  });

  // 2. Lógica de Desconto (Mantida conforme seu original)
  let valorDesconto = 0;
  if (typeof descontoPercentual !== 'undefined' && descontoPercentual > 0) {
      valorDesconto = subtotal * (descontoPercentual / 100);
      localStorage.setItem("desconto_percentual", descontoPercentual);
  } else {
      localStorage.removeItem("desconto_percentual");
      localStorage.removeItem("cupom_ativo");
  }

  // 3. Lógica de Frete (Mantida conforme seu original)
  const vFrete = (typeof frete !== 'undefined' && frete > 0) ? frete : 0;
  if (vFrete > 0) localStorage.setItem("frete_valor", vFrete);

  let totalFinal = subtotal - valorDesconto + vFrete;

  // 4. Atualiza Interface e Salva
  atualizarResumoInterface(subtotal, valorDesconto, totalFinal);
  localStorage.setItem("cart", JSON.stringify(cart));
  if (typeof verificarEstadoCarrinho === "function") verificarEstadoCarrinho();
}




// --- FUNÇÕES DE APOIO ---

function verificarEstadoCarrinho() {
  const telaConteudo = document.getElementById("checkout-content");
  const telaVazio = document.getElementById("carrinho-vazio");

  if (!telaConteudo || !telaVazio) return;

  if (cart.length === 0) {
    telaConteudo.classList.add("hidden");
    telaVazio.classList.remove("hidden");
  } else {
    telaConteudo.classList.remove("hidden");
    telaVazio.classList.add("hidden");
  }
}

function alternarSelecao(index) {
  cart[index].selected = !cart[index].selected;
  render();
}

function mais(i) {
  cart[i].quantity++;
  render();
}

function menos(i) {
  if (cart[i].quantity > 1) {
    cart[i].quantity--;
  } else {
    remover(i);
  }
  render();
}

function remover(i) {
  const modal = document.getElementById("custom-confirm");
  if (!modal) return;
  
  modal.style.display = "flex";

  document.getElementById("confirm-yes").onclick = function() {
    cart.splice(i, 1);
    modal.style.display = "none";
    render(); // Isso já vai disparar a verificação de carrinho vazio
  };

  document.getElementById("confirm-no").onclick = () => modal.style.display = "none";
}

// Inicializa a página
document.addEventListener("DOMContentLoaded", render);


function atualizarResumoInterface(subtotal) {
  const subtotalEl = document.getElementById("subtotal");
  const freteEl = document.getElementById("frete");
  const descontoEl = document.getElementById("desconto");
  const totalEl = document.getElementById("total");

  // 1. Pega o valor do frete (se não existir, usa 0)
  const vFrete = typeof frete !== 'undefined' ? frete : 0;

  // 2. Lógica de Desconto por Porcentagem (VINTAGE10 = 5%)
  let vDesconto = 0;
  if (typeof descontoPercentual !== 'undefined' && descontoPercentual > 0) {
      // Calcula quanto é X% do subtotal
      vDesconto = subtotal * (descontoPercentual / 100);
  }

  // 3. Cálculo do Total Final
  const vTotal = subtotal + vFrete - vDesconto;

  // 4. Injeta os valores formatados no HTML
  if (subtotalEl) subtotalEl.innerText = subtotal.toFixed(2).replace(".", ",");
  if (freteEl)    freteEl.innerText    = vFrete.toFixed(2).replace(".", ",");
  if (descontoEl) descontoEl.innerText = vDesconto.toFixed(2).replace(".", ",");
  if (totalEl)    totalEl.innerText    = vTotal.toFixed(2).replace(".", ",");
}

/* ==========================================================================
   FUNÇÕES DE AÇÃO
   ========================================================================== */


/* ==========================================================================
   NOTIFICAÇÕES (TOAST & ALERTA)
   ========================================================================== */
/* 🔥 NOTIFICAÇÃO ESTILO NIKE DINÂMICA */
function showToast(message, type = "success") {
    let container = document.querySelector(".toast-container");
    if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `nike-toast ${type === "warning" ? "warning" : ""}`;

    toast.innerHTML = `
        <div class="toast-content">
            <i class="fa-solid fa-circle-check toast-icon"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close" onclick="fecharToastManual(this)">✕</button>
        <div class="toast-progress"></div>
    `;

    container.appendChild(toast);

    // Entrada suave
    setTimeout(() => toast.classList.add("show"), 50);

    // Saída automática suave
    setTimeout(() => {
        if (toast) {
            toast.classList.remove("show"); // Inicia animação de saída
            setTimeout(() => {
                if (toast.parentNode) toast.remove(); // Remove do HTML após a animação
            }, 600); // Tempo igual ao 'transition' do CSS
        }
    }, 3000);
}

function fecharToastManual(btn) {
    const toast = btn.parentElement;
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 600);
}

/* 🔔 MODAL DE ALERTA */
function mostrarAlerta(mensagem) {
  const modal = document.getElementById("custom-alert");
  const texto = document.getElementById("alert-message");
  if (modal && texto) {
    texto.innerText = mensagem;
    modal.style.display = "flex";
  }
}

function fecharModalAlerta() {
  const modal = document.getElementById("custom-alert");
  if (modal) modal.style.display = "none";
}

/* ==========================================================================
   CUPOM E DESCONTO
   ========================================================================== */

// 1. ADICIONE ESTA FUNÇÃO: Ela monitora o campo e remove o cupom se o usuário apagar o texto
function monitorarCupom(input) {
  const msgCupom = document.getElementById("mensagem-cupom");

  // Se o campo ficar vazio
  if (input.value.trim() === "") {
    // 1. Zera a porcentagem para permitir aplicar novos cupons
    descontoPercentual = 0;
    
    // 2. Limpa o rastro no navegador para o F5 não bugar
    localStorage.removeItem("cupom_ativo");
    localStorage.removeItem("desconto_percentual");

    // 3. Limpa as mensagens de erro/sucesso e a borda vermelha
    if (msgCupom) msgCupom.innerHTML = "";
    input.classList.remove("input-error");
    
    // 4. Atualiza o resumo lateral para o desconto sumir na hora
    render();
  }
}

// Certifique-se de ter essa variável no topo do arquivo (fora das funções)
// let descontoPercentual = 0; 

/* ==========================================================================
   FUNÇÃO: APLICAR CUPOM (VINTAGE SPORTS)
   ========================================================================== */
/* ==========================================================================
   FUNÇÃO: APLICAR CUPOM (VINTAGE SPORTS) - AJUSTADA
   ========================================================================== */
function aplicarCupom() {
  const input = document.getElementById("cupom");
  const msgCupom = document.getElementById("mensagem-cupom");
  
  // 🔥 AJUSTE AQUI: Busca o botão que está dentro do mesmo grupo do input de cupom
  // Isso evita que a animação vá para o botão de frete.
  const btn = input.parentElement.querySelector("button");

  if (!input || !msgCupom || !btn) return;
  
  const valor = input.value.trim().toUpperCase();

  // 1. Validação de campo vazio
  if (valor === "") {
    input.classList.add("input-error");
    msgCupom.innerHTML = `<div class="cupom-feedback text-error"><i class="fa-solid fa-circle-exclamation"></i> Digite um código</div>`;
    return;
  }

  // 2. Verifica se já existe um cupom ativo
  if (typeof descontoPercentual !== 'undefined' && descontoPercentual > 0) {
    return showToast("Um cupom já está ativo!", "warning");
  }

  // 3. Animação de Loading (Agora no botão correto)
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = originalText;

    let cupomValido = false;
    let porcentagem = 0;

    // 4. Lógica de Validação dos Cupons
    if (valor === "VINTAGE10") {
      porcentagem = 5; 
      cupomValido = true;
    } else if (valor === "DESCONTO10") {
      porcentagem = 10; 
      cupomValido = true;
    }

    if (cupomValido) {
      descontoPercentual = porcentagem;
      input.classList.remove("input-error");
      
      msgCupom.innerHTML = `
        <div class="cupom-feedback text-success">
          Cupom ativo: ${valor} (${porcentagem}% OFF)
          <i class="fa-solid fa-xmark" onclick="removerCupom()" style="cursor:pointer; margin-left:8px;" title="Remover cupom"></i>
        </div>`;

      showToast(`Cupom de ${porcentagem}% aplicado!`);
      
      // Persistência no LocalStorage
      localStorage.setItem("cupom_ativo", valor);
      localStorage.setItem("desconto_percentual", porcentagem); 
      
      // Atualiza o resumo
      if (typeof render === "function") render(); 

    } else {
      input.classList.add("input-error");
      msgCupom.innerHTML = `<div class="cupom-feedback text-error"><i class="fa-solid fa-circle-exclamation"></i> Cupom inválido</div>`;
      showToast("Cupom inválido.", "warning");
    }
  }, 1000);
}


function removerCupom() {
    // 1. Zera a variável global para o cálculo atual
    descontoPercentual = 0;

    // 2. Limpa o "banco de dados" do navegador (IGUAL OS NOMES DA SUA IMAGEM)
    localStorage.removeItem("cupom_ativo");
    localStorage.removeItem("desconto_percentual");

    // 3. Limpa a parte visual (Input e Mensagem)
    const input = document.getElementById("cupom");
    const msgCupom = document.getElementById("mensagem-cupom");

    if (input) input.value = "";
    if (msgCupom) msgCupom.innerHTML = "";

    // 4. 🔥 O PASSO MAIS IMPORTANTE: Avisa o resumo para recalcular com ZERO
    render(); 
    
    showToast("Cupom removido!");
}



/* ==========================================================================
   PERSISTÊNCIA (DOMContentLoaded) - Adicione/Ajuste no seu arquivo
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const cupomSalvo = localStorage.getItem("cupom_ativo");
  const inputCupom = document.getElementById("cupom");
  const msgCupom = document.getElementById("mensagem-cupom");

  if (cupomSalvo && inputCupom) {
    inputCupom.value = cupomSalvo;
    desconto = 10; // Valor fixo baseado na sua regra

    if (msgCupom) {
      msgCupom.innerHTML = `
        <div class="cupom-feedback text-success">
          Cupom ativo: ${cupomSalvo}
          <i class="fa-solid fa-xmark" onclick="removerCupom()" style="cursor:pointer; margin-left:8px;"></i>
        </div>`;
    }
  }

  render();
});


/* ==========================================================================
   LÓGICA DE FRETE (CEP)
   ========================================================================== */

// Função para colocar o hífen (00000-000) automaticamente
function mascaraCEP(input) {
  let v = input.value.replace(/\D/g, ""); // Remove tudo que não é número
  if (v.length > 5) v = v.replace(/^(\d{5})(\d)/, "$1-$2");
  input.value = v;

  // Se apagar o CEP, esconde o resultado e limpa o storage
  if (v === "") {
    const resultadoFrete = document.getElementById("resultado-frete");
    if (resultadoFrete) resultadoFrete.style.display = "none";
    localStorage.removeItem("frete_valor");
    localStorage.removeItem("cep_salvo");
    frete = 0;
    render();
  }
}

function calcularFrete() {
  const btn = event.target;
  const cepInput = document.getElementById("cep-input");
  const msgCep = document.getElementById("mensagem-cep"); // Onde a mensagem de texto aparece
  const resultadoFrete = document.getElementById("resultado-frete");
  const cepNumeros = cepInput.value.replace(/\D/g, "");

  // 1. LIMPAR ESTADOS ANTERIORES
  cepInput.classList.remove("input-error");
  if (msgCep) msgCep.innerHTML = "";

  // 2. VALIDAÇÃO: Se estiver vazio ou incompleto
  if (cepNumeros.length !== 8) {
    // Efeito visual igual ao do cupom
    cepInput.classList.add("input-error");
    if (msgCep) {
      msgCep.innerHTML = `<div class="cupom-feedback text-error">
        <i class="fa-solid fa-circle-exclamation"></i> Verifique os dados inseridos
      </div>`;
    }

    // Mostra também o Modal de Alerta que você já tem
    if (typeof mostrarAlerta === "function") {
      mostrarAlerta("Por favor, digite um CEP válido.");
    }
    return;
  }

  // 3. SE ESTIVER TUDO CERTO, SEGUE O LOADING...
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = originalText;

    frete = 9.99;
    if (resultadoFrete) resultadoFrete.style.display = "block";

    // Notificação de sucesso
    if (typeof mostrarToastSucesso === "function") {
      mostrarToastSucesso("Frete calculado com sucesso! 🚚");
    }

    localStorage.setItem("frete_valor", frete);
    localStorage.setItem("cep_salvo", cepInput.value);
    render();
  }, 1200);
}


/* ==========================================================================
   PERSISTÊNCIA AO CARREGAR A PÁGINA
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const cepSalvo = localStorage.getItem("cep_salvo");
  const freteSalvo = localStorage.getItem("frete_valor");
  const cepInput = document.getElementById("cep-input");
  const resultadoFrete = document.getElementById("resultado-frete");

  // Se existia um CEP, coloca de volta no input
  if (cepSalvo && cepInput) {
    cepInput.value = cepSalvo;
  }

  // Se existia um frete, mostra o card e define o valor
  if (freteSalvo) {
    frete = parseFloat(freteSalvo);
    if (resultadoFrete) resultadoFrete.style.display = "block";
  }
});


function verificarEstadoCarrinho() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const telaConteudo = document.getElementById("checkout-content");
    const telaVazio = document.getElementById("carrinho-vazio");

    if (cart.length === 0) {
        telaConteudo.classList.add("hidden");
        telaVazio.classList.remove("hidden");
    } else {
        telaConteudo.classList.remove("hidden");
        telaVazio.classList.add("hidden");
    }
}

// Chame a função assim que carregar
document.addEventListener("DOMContentLoaded", verificarEstadoCarrinho);

/* ==========================================================================
   INICIALIZAÇÃO E EVENTOS
   ========================================================================== */
document.addEventListener("DOMContentLoaded", render);

function fecharAlerta() {
  document.getElementById("estoque-alert").style.display = "none";
}

window.onclick = function(e) {
  if (e.target.id === "custom-alert") e.target.style.display = "none";
  if (e.target.id === "custom-confirm") e.target.style.display = "none";
};
