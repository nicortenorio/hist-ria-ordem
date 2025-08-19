


const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

// === HISTÓRIA COM DOIS CAMINHOS ===
const perguntas = [
    {
        enunciado: "Você acorda em uma mansão abandonada durante a meia-noite. Um vento gélido atravessa as janelas quebradas. O que faz?",
        alternativas: [
            {
                texto: "Explorar a mansão",
                afirmacao: "Você decide enfrentar o desconhecido, passos ecoam pelos corredores.",
                caminho: "coragem"
            },
            {
                texto: "Procurar uma saída",
                afirmacao: "Você escolhe fugir antes que algo pior aconteça.",
                caminho: "medo"
            }
        ]
    },

    // --- Caminho da Coragem ---
    {
        enunciado: "Ao explorar, você encontra um espelho coberto de poeira que reflete algo atrás de você.",
        alternativas: [
            {
                texto: "Olhar no espelho",
                afirmacao: "O reflexo mostra uma versão distorcida de você, sorrindo sinistramente.",
                caminho: "coragem"
            },
            {
                texto: "Virar-se rapidamente",
                afirmacao: "Não há nada... mas você sente uma mão gelada em seu ombro.",
                caminho: "coragem"
            }
        ]
    },
    {
        enunciado: "Uma voz sussurra seu nome pelo corredor escuro.",
        alternativas: [
            {
                texto: "Seguir a voz",
                afirmacao: "Você encontra uma porta secreta e adentra uma biblioteca infinita.",
                caminho: "coragem"
            },
            {
                texto: "Ignorar a voz",
                afirmacao: "As paredes começam a tremer como se a mansão estivesse viva.",
                caminho: "coragem"
            }
        ]
    },

    // --- Caminho do Medo ---
    {
        enunciado: "Você corre para fora do salão principal, mas todas as portas se trancam sozinhas.",
        alternativas: [
            {
                texto: "Forçar uma janela",
                afirmacao: "O vidro quebra, mas uma névoa preta entra e envolve o ambiente.",
                caminho: "medo"
            },
            {
                texto: "Se esconder embaixo da escada",
                afirmacao: "Você escuta passos pesados se aproximando... cada vez mais perto.",
                caminho: "medo"
            }
        ]
    },
    {
        enunciado: "Seu coração dispara. A mansão inteira parece respirar junto com você.",
        alternativas: [
            {
                texto: "Gritar por ajuda",
                afirmacao: "Seu grito ecoa, mas é devolvido por vozes que não são humanas.",
                caminho: "medo"
            },
            {
                texto: "Ficar em silêncio absoluto",
                afirmacao: "O silêncio é cortado por uma risada sombria atrás de você.",
                caminho: "medo"
            }
        ]
    },
];

// Variáveis de controle
let atual = -1;
let perguntaAtual;
let historiaFinal = "";
let caminhoEscolhido = null;

// Mostra o botão "Começar"
function mostraBotaoComecar() {
    caixaPerguntas.textContent = "Prepare-se para enfrentar a Mansão Esquecida...";
    caixaAlternativas.textContent = "";

    const botao = document.createElement("button");
    botao.textContent = "Começar";
    botao.addEventListener("click", () => {
        atual = 0;
        historiaFinal = "";
        caminhoEscolhido = null;
        mostraPergunta();
    });
    caixaAlternativas.appendChild(botao);
}

// Mostra a pergunta atual
function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    perguntaAtual = perguntas[atual];

    // Se a pergunta não pertence ao caminho escolhido, pula
    if (caminhoEscolhido && perguntaAtual.alternativas.every(alt => alt.caminho !== caminhoEscolhido)) {
        atual++;
        mostraPergunta();
        return;
    }

    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

// Cria os botões de alternativas
function mostraAlternativas(){
    for(const alternativa of perguntaAtual.alternativas) {
        if (caminhoEscolhido && alternativa.caminho !== caminhoEscolhido) continue;

        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

// Quando o jogador escolhe uma resposta
function respostaSelecionada(opcaoSelecionada) {
    historiaFinal += opcaoSelecionada.afirmacao + " ";

    if (!caminhoEscolhido) {
        caminhoEscolhido = opcaoSelecionada.caminho;
    }

    atual++;
    mostraPergunta();
}

// Mostra o resultado final + botão de recomeçar
function mostraResultado() {
    caixaPerguntas.textContent = "A história chega ao fim...";
    let finalTexto = "";

    if (caminhoEscolhido === "coragem") {
        finalTexto = "Você encarou o desconhecido até o fim. Talvez tenha sobrevivido... ou talvez tenha se tornado parte da mansão.";
    } else {
        finalTexto = "O medo guiou suas escolhas. Você tentou escapar, mas a Mansão Esquecida nunca deixa suas presas partirem.";
    }

    textoResultado.textContent = historiaFinal + " " + finalTexto;
    caixaAlternativas.textContent = "";

    const botaoRecomecar = document.createElement("button");
    botaoRecomecar.textContent = "Recomeçar";
    botaoRecomecar.addEventListener("click", () => {
        atual = -1;
        historiaFinal = "";
        caminhoEscolhido = null;
        textoResultado.textContent = "";
        mostraBotaoComecar();
    });
    caixaAlternativas.appendChild(botaoRecomecar);
}

// Inicializa
mostraBotaoComecar();


