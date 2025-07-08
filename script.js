const scenes = [
  {
    image: "img/fundo.jpeg",
    text: `Os anjos vigiavam, os demônios corrompiam, e os humanos decidiam.\n\nMas algo mudou.`
  },
  {
    image: "img/Pixel Art Depiction Of An Angel Walking In The Sky.png",
    text: `\n\nNo ano de 2025, os céus se abriram. Pela primeira vez em eras, os arcanjos desceram à Terra, não como mensageiros, mas como guerreiros.\n\nA missão era clara: purgar o mundo da influência demoníaca que se espalhava como peste.\n\nMas ao chegar, não encontraram as criaturas infernais nas cavernas ou nas sombras. Encontraram-nas no alto dos púlpitos, adornadas em ouro, vestidas com sedas, clamando o nome de Deus... em vão.`
  },
  {
    image: "img/Angel Descending Over Chaotic Urban Landscape In Pixel Art.png",
    text: `Eram os pregadores — os auto-proclamados santos — que lideravam multidões com palavras doces e intenções podres. Vendiam milagres como se fossem mercadoria. Julgavam, exploravam, enriqueciam-se com a fé alheia. O sofrimento dos fiéis era lucro. As orações eram apenas moeda.\n\nOs anjos, primeiro, observaram. Esperavam encontrar aliados.\n\nMas viram homens que diziam pregar o amor enquanto erguiam impérios sobre a dor. Viram templos erguidos não para Deus, mas para o ego. Viram o nome do Altíssimo usado como escudo para orgulho, ganância e luxúria.\n\nGabriel chorou.\n\nUriel rugiu de raiva.\n\nE Michael, com olhos de justiça eterna, falou:\n\n— "Os verdadeiros demônios não rastejam. Eles pregam."`
  },
  {
    image: "img/artbreeder-image-2025-07-08T00_57_06.917Z.jpeg",
    text: `Quando os céus amaldiçoaram os falsos pregadores, transformando-os em demônios, algo inesperado aconteceu.\n\nNo meio do caos que se seguiu — fogo consumindo altares, asas negras nascendo de ombros humanos, e preces virando gritos — uma criança apareceu.\n\nEla não chorava.\n\nEra um menino de pele pálida como neve, cabelos brancos como a luz dos primeiros céus, e dois pequenos chifres curvados brotando da testa. Sobre sua cabeça, flutuava uma auréola fraca, trêmula, como se recusasse a apagar, mas também incapaz de brilhar como antes.\n\nFoi deixado em uma cesta, descendo um rio envenenado pelas lágrimas da guerra. Os demônios o viram, mas não ousaram tocá-lo. Os anjos o sentiram, mas o ignoraram. Nenhum lado o reconhecia como seu.\n\nEra uma aberração. Um erro. Ou um sinal.\n\nEle cresceu nas bordas da guerra, longe dos homens e longe dos céus. Sem pai, sem mãe, sem palavras. Aprendeu a sobreviver por instinto. Caçava como besta. Dormia entre cinzas. Chorava de raiva, não de tristeza. Mas mesmo sem falar, ele compreendia tudo.\n\nSabia quando um demônio mentia, mesmo sem ouvir.\n\nSabia quando um anjo duvidava, mesmo sem ver.\n\nSeu nome era um som que ninguém ensinou, mas que o mundo parecia sussurrar: Aziel.`
  },
  {
    image: "img/artbreeder-image-2025-07-08T01_00_47.725Z.jpeg",
    text: `Enquanto isso, as trevas cresciam.\n\nOs demônios dançavam no fogo da corrupção, entre as almas perdidas e corrompidas.\n\nEles não estavam escondidos. Estavam no controle, infiltrados, esperando o momento de dominar tudo.`
  },
  {
    image: "img/artbreeder-image-2025-07-08T01_12_52.541.jpeg",
    text: `E Aziel cresceu.\n\nO menino que ninguém reconhecia como seu, agora caminha entre os mundos.\n\nNem anjo, nem demônio.\n\nApenas Aziel — a última esperança ou o último desespero dos céus e do inferno.`
  }
];

// Elementos da página
const storyText = document.getElementById("story-text");
const sceneImage = document.getElementById("scene-image");
const choicesContainer = document.getElementById("choices"); // div para mostrar as escolhas

let sceneIndex = 0;

// Guardar escolhas feitas para definir final
const playerChoices = {
  primeiraEscolha: null,
  segundaEscolha: null,
  terceiraEscolha: null,
  quartaEscolha: null
};

// Função para dividir o texto em frases para exibir lentamente
function splitIntoSentences(text) {
  return text.match(/[^.!?\n]+[.!?\n]+|\n\n|[^.!?\n]+$/g).map(s => s.trim()).filter(s => s.length > 0);
}

// Exibe uma frase devagar, letra por letra
function showSentence(sentence) {
  return new Promise(resolve => {
    storyText.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
      storyText.textContent += sentence.charAt(i);
      i++;
      if (i >= sentence.length) {
        clearInterval(interval);
        resolve();
      }
    }, 50);
  });
}

// Exibe todas frases de uma cena
async function showSceneText(text) {
  const sentences = splitIntoSentences(text);

  for (let i = 0; i < sentences.length; i++) {
    await showSentence(sentences[i]);

    if (sentences[i] === "") {
      await new Promise(r => setTimeout(r, 1200));
    } else {
      await new Promise(r => setTimeout(r, 1100));
    }
  }
}

// Fade out do texto para próxima cena
function fadeOut() {
  return new Promise(resolve => {
    storyText.style.opacity = 0;
    setTimeout(() => {
      resolve();
    }, 800);
  });
}

// Função para mostrar escolhas na tela
function showChoices(choices, onChoiceSelected) {
  choicesContainer.innerHTML = ""; // limpa escolhas antigas
  choicesContainer.style.display = "block";

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.onclick = () => {
      choicesContainer.style.display = "none";
      onChoiceSelected(choice.value);
    };
    choicesContainer.appendChild(btn);
  });
}

// Função para decidir o final baseado nas escolhas
function getFinal() {
  const c = playerChoices;

  if (c.quartaEscolha === "A") {
    return "Final do Senhor Absoluto: Aziel se torna um governante poderoso, mas luta contra sua própria natureza e pode sucumbir ao poder.";
  } else if (c.quartaEscolha === "B") {
    return "Final do Libertador: O mundo fica livre de entidades sobrenaturais, mas a humanidade se vê sem proteção, entrando em caos.";
  } else if (c.quartaEscolha === "C") {
    return "Final do Mediador: A paz é conquistada com grandes custos, unindo lados antes inimigos, mas com uma esperança verdadeira.";
  } else if (c.quartaEscolha === "D") {
    return "Final do Exilado: Aziel some, e a guerra continua, mas com uma lenda viva que inspira futuros heróis.";
  } else {
    return "Fim não definido.";
  }
}

async function nextScene() {
  if (sceneIndex < scenes.length) {
    sceneImage.src = scenes[sceneIndex].image;
    sceneImage.style.opacity = 1;
    storyText.style.opacity = 1;

    await showSceneText(scenes[sceneIndex].text);

    sceneIndex++;

    // A partir daqui, insira as escolhas em pontos específicos
    if (sceneIndex === 6) { // depois da cena 6 (última narrativa), começa a primeira escolha
      // Primeira escolha
      showChoices([
        { text: "A) Aproximar-se dos anjos para aprender mais sobre a guerra.", value: "A" },
        { text: "B) Aproximar-se dos demônios para obter poder sombrio.", value: "B" },
        { text: "C) Permanecer solitário e confiar apenas nos próprios instintos.", value: "C" }
      ], async (choice) => {
        playerChoices.primeiraEscolha = choice;
        await fadeOut();
        await showChoice2();
      });
    } else {
      await fadeOut();
      nextScene();
    }
  } else {
    // Se acabou as cenas, exibir final com base nas escolhas
    storyText.style.opacity = 1;
    sceneImage.style.opacity = 0;
    storyText.textContent = getFinal();
  }
}

// Segunda escolha
async function showChoice2() {
  sceneImage.src = "img/fundo.jpeg"; // Imagem neutra para escolha
  sceneImage.style.opacity = 1;
  storyText.style.opacity = 1;

  storyText.textContent = "Durante suas jornadas, Aziel encontra vestígios de sua origem: a cesta no rio, a maldição e a profecia.\n\nO que fazer?";
  showChoices([
    { text: "A) Buscar respostas nos céus e enfrentar os arcanjos.", value: "A" },
    { text: "B) Buscar respostas no Inferno e enfrentar os senhores demoníacos.", value: "B" },
    { text: "C) Rejeitar a busca e focar em proteger os humanos.", value: "C" }
  ], async (choice) => {
    playerChoices.segundaEscolha = choice;
    await fadeOut();
    await showChoice3();
  });
}

// Terceira escolha
async function showChoice3() {
  sceneImage.src = "img/fundo.jpeg";
  sceneImage.style.opacity = 1;
  storyText.style.opacity = 1;

  storyText.textContent = "Aziel encontra um antigo pregador transformado em demônio, manipulando humanos.\n\nO que fazer?";
  showChoices([
    { text: "A) Tentar purificar o pregador e salvar sua alma.", value: "A" },
    { text: "B) Destruir o pregador para acabar com sua influência.", value: "B" },
    { text: "C) Ignorar o pregador e focar em derrubar as forças maiores da guerra.", value: "C" }
  ], async (choice) => {
    playerChoices.terceiraEscolha = choice;
    await fadeOut();
    await showChoice4();
  });
}

// Quarta escolha
async function showChoice4() {
  sceneImage.src = "img/fundo.jpeg";
  sceneImage.style.opacity = 1;
  storyText.style.opacity = 1;

  storyText.textContent = "Aziel tem a chance de encerrar o conflito de várias formas.\n\nQual é a sua decisão final?";
  showChoices([
    { text: "A) Aceitar o trono vazio e governar como um novo senhor.", value: "A" },
    { text: "B) Destruir tanto o céu quanto o inferno.", value: "B" },
    { text: "C) Reconciliar anjos, demônios e humanos criando uma nova aliança.", value: "C" },
    { text: "D) Abandonar tudo e desaparecer.", value: "D" }
  ], async (choice) => {
    playerChoices.quartaEscolha = choice;
    await fadeOut();

    // Exibe o final baseado na escolha
    storyText.style.opacity = 1;
    sceneImage.style.opacity = 0;
    storyText.textContent = getFinal();
  });
}

nextScene();
