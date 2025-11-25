let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("#caixa-busca");
let dados = [];

// Adiciona os listeners quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const botaoBusca = document.getElementById('botao-busca');
    botaoBusca.addEventListener('click', iniciarBusca);
    campoBusca.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            iniciarBusca();
        }
    });
});

async function iniciarBusca() {
    // Se os dados ainda não foram carregados, busca do JSON.
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (error) {
            console.error("Falha ao buscar dados:", error);
            return; // Interrompe a execução se houver erro
        }
    }

    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado =>
        dado.nome_universidade.toLowerCase().includes(termoBusca) ||
        dado.areas_destaque.some(area => area.toLowerCase().includes(termoBusca))
    );

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; 
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome_universidade}</h2>
            <p><strong>Fundada em:</strong> ${dado.ano_fundacao}</p>
            <p><strong>Localização:</strong> ${dado.localizacao_principal}</p>
            <p><strong>Áreas de destaque:</strong> ${dado.areas_destaque.join(", ")}</p>
            <a href="${dado.link_website}" target="_blank">Visitar site</a>
        `;
        cardContainer.appendChild(article);
    }
}
