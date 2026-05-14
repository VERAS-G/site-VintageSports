window.addEventListener("DOMContentLoaded", () => {

    console.log("🔥 Produto page carregou");

    const params = new URLSearchParams(window.location.search);

    const nome = params.get("nome");
    const preco = params.get("preco");
    const img = params.get("img");

    console.log("DADOS:", { nome, preco, img });

    const imgEl = document.getElementById("produto-imagem");
    const tituloEl = document.getElementById("produto-titulo");
    const precoEl = document.getElementById("produto-preco");
    const descEl = document.getElementById("produto-descricao");

    if (imgEl && img) {
        imgEl.src = img;
        imgEl.alt = nome;
    }

    if (tituloEl) {
        tituloEl.innerText = nome || "Produto";
    }

    if (precoEl && preco) {
        precoEl.innerText =
            `R$ ${Number(preco).toFixed(2).replace(".", ",")}`;
    }

    if (descEl) {
        descEl.innerText = `Camisa oficial: ${nome || ""}`;
    }

});