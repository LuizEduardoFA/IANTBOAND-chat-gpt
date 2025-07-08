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
    image: "img/artbreeder-image-2025-07-08T01_12_52.541Z.jpeg",
    text: `E Aziel cresceu.\n\nO menino que ninguém reconhecia como seu, agora caminha entre os mundos.\n\nNem anjo, nem demônio.\n\nApenas Aziel — a última esperança ou o último desespero dos céus e do inferno.`
  }
];

const storyText = document.getElementById("story-text");
const sceneImage = document.getElementById("scene-image");

let sceneIndex = 0;

// Função para dividir o texto em frases para exibir lentamente
function splitIntoSentences(text) {
  // Divide por pontos finais, exclamações, interrogações e quebras duplas de linha
  // Mantendo o sinal de pontuação no final
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
    }, 50); // velocidade da letra, aumenta para ficar mais lenta
  });
}

// Função principal para exibir todas frases de uma cena
async function showSceneText(text) {
  const sentences = splitIntoSentences(text);

  for (let i = 0; i < sentences.length; i++) {
    await showSentence(sentences[i]);

    // Pausa entre frases — mais longa se for quebra de parágrafo (\n\n)
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

async function nextScene() {
  if (sceneIndex >= scenes.length) {
    storyText.textContent = "Fim.";
    sceneImage.style.opacity = 0;
    return;
  }

  sceneImage.src = scenes[sceneIndex].image;
  sceneImage.style.opacity = 1;
  storyText.style.opacity = 1;

  await showSceneText(scenes[sceneIndex].text);

  // Pausa maior no fim da última cena
  if (sceneIndex === scenes.length - 1) {
    await new Promise(r => setTimeout(r, 8000));
  } else {
    await new Promise(r => setTimeout(r, 2000));
    await fadeOut();
  }

  sceneIndex++;
  nextScene();
}

nextScene();

