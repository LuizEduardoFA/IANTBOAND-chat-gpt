const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const perguntas = [
    {
        enunciado: "Uma sombra se aproxima na floresta. Ela pergunta: 'Você acredita que demônios podem ter um coração puro?'",
        alternativas: [
            {
                texto: "Sim. Todos merecem uma chance.",
                afirmacao: "Você mostrou compaixão por aqueles que foram condenados injustamente.",
                pontoRedencao: 1 // Adiciona ponto para redenção
            },
            {
                texto: "Não. O mal nasce com eles.",
                afirmacao: "Você foi tomado por um julgamento rígido.",
                pontoRedencao: -1 // Subtrai ponto
            }
        ]
    },
    {
        enunciado: "Ao atravessar a ponte de ossos, uma voz ecoa: 'Se tivesse que escolher entre salvar um anjo ou um demônio caído, quem salvaria?'",
        alternativas: [
            {
                texto: "O anjo. Ele é símbolo de esperança.",
                afirmacao: "Você seguiu a luz, mesmo em tempos de dúvida.",
                pontoRedencao: -1
            },
            {
                texto: "O demônio. Ele pode encontrar redenção.",
                afirmacao: "Você acredita que até os perdidos podem se reencontrar.",
                pontoRedencao: 1
            }
        ]
    },
    {
        enunciado: "No campo das cinzas, você encontra um pergaminho antigo: 'Mentiras ou verdades? O que você preferiria ouvir no fim do mundo?'",
        alternativas: [
            {
                texto: "Mentiras que confortam.",
                afirmacao: "Você teme a dor da verdade, mas busca paz.",
                pontoRedencao: -1
            },
            {
                texto: "A verdade, mesmo que doa.",
                afirmacao: "Você encara a realidade com coragem.",
                pontoRedencao: 1
            }
        ]
    },
    {
        enunciado: "Uma criança celestial chora à beira de um rio de sangue. Ela olha para você e pergunta: 'Você me deixaria para trás para cumprir sua missão?'",
        alternativas: [
            {
                texto: "Sim. O mundo depende disso.",
                afirmacao: "Você escolheu o dever acima do sentimento.",
                pontoRedencao: -1
            },
            {
                texto: "Não. Toda vida importa.",
                afirmacao: "Você prefere perder o mundo do que perder uma alma.",
                pontoRedencao: 1
            }
        ]
    },
    {
        enunciado: "Nas escadas do palácio celeste, um velho anjo te encara: 'Você lutaria contra o céu para proteger os condenados da Terra?'",
        alternativas: [
            {
                texto: "Sim. O céu não tem o direito de julgar todos.",
                afirmacao: "Você se tornou a espada dos esquecidos.",
                pontoRedencao: 1
            },
            {
                texto: "Não. Ordem precisa ser mantida.",
                afirmacao: "Você acredita que justiça vem da obediência à autoridade maior.",
                pontoRedencao: -1
            }
        ]
    },
    {
        enunciado: "Diante do trono dourado, a auréola em sua cabeça começa a brilhar intensamente. Uma voz pergunta: 'Você é anjo ou demônio?'",
        alternativas: [
            {
                texto: "Sou ambos. E também nenhum.",
                afirmacao: "Você transcendeu o julgamento dos céus e dos infernos.",
                pontoRedencao: 1 // Esta pode ser neutra ou pendendo para redenção/liberdade
            },
            {
                texto: "Sou aquilo que escolho ser.",
                afirmacao: "Você se libertou dos rótulos e trilhou seu próprio caminho.",
                pontoRedencao: 1 // Esta também
            }
        ]
    }
];

let atual = 0;
let perguntaAtual;
let historiaFinal = "";
let pontuacaoRedencao = 0; // Nova variável para a pontuação

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacoes = opcaoSelecionada.afirmacao;
    historiaFinal += afirmacoes + " ";
    
    // Adiciona a pontuação da escolha
    if (opcaoSelecionada.hasOwnProperty('pontoRedencao')) {
        pontuacaoRedencao += opcaoSelecionada.pontoRedencao;
    }

    atual++;
    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = "O julgamento chegou ao fim...";
    caixaAlternativas.textContent = "";
    caixaResultado.style.display = "block";

    let finalDeterminado = "";

    // Lógica para determinar o final com base na pontuação
    if (pontuacaoRedencao >= 3) { // Se a maioria das escolhas foram para redenção/compaixão
        finalDeterminado = "Seu coração se provou um farol em meio à escuridão. Você trouxe esperança aos esquecidos, e o equilíbrio entre os reinos foi restaurado, não pela força, mas pelo perdão. Seu caminho se entrelaça com a redenção, transformando o destino de muitos.";
    } else if (pontuacaoRedencao <= -3) { // Se a maioria das escolhas foram para ordem/julgamento
        finalDeterminado = "Sua determinação em manter a ordem e a justiça inabaláveis moldou um novo reino. As regras são claras, e as consequências, severas. Você é a personificação da lei, garantindo que nada perturbe a balança, mesmo que isso signifique sacrifícios.";
    } else { // Se as escolhas foram mais equilibradas ou neutras
        finalDeterminado = "O caminho que você trilhou é complexo, uma mistura de luz e sombra. O destino que se desenrola é incerto, pois suas escolhas não penderam para um lado específico, deixando um futuro em aberto, onde sua jornada continua, buscando seu verdadeiro lugar.";
    }

    textoResultado.textContent = historiaFinal + "\n\n" + finalDeterminado;
}

// Initial call to start the quiz
mostraPergunta();