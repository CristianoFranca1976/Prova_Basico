

const btnInit = document.getElementById("btn-init");
const body = document.querySelector('body');
const dados = document.querySelector(".dados");
const container = document.getElementById("container");
const previus = document.getElementById("previus");
const next = document.getElementById("next");
const nome = document.getElementById("nome");
const id = document.getElementById('id');
const btn = document.querySelector('.btns');
let mensagem = document.querySelector('.mensagem');
let spanScore = document.querySelector("span");

let currentQuestion = 0;
let score = 0;

const questions = [
  { question: "Qual viatura foi usada no vídeo para a abordagem?", options: ["Speed", "Corolla", "Trail Brazer", "Spin"], correct: 0 },
  { question: "Qual o valor da multa do prisioneiro com o ID: 79817?", options: ["R$ 400.000,00", "R$ 300.000,00", "R$ 200.000,00", "R$ 250.000,00"], correct: 3 },
  { question: "Qual é o nome do cidadão abordado com um chapéu?", options: ["Carlos", "Augusto", "Daniel", "Danilo"], correct: 2 },
  { question: "Quantas unidades GTMS estavam patrulhando no vídeo?", options: ["Três", "Quatro", "Uma", "Duaas"], correct: 0 },
  { question: "No vídeo, quantos segundos a lei de Miranda foi lida?", options: ["30 Segundos", "25 Segundos", "20 Segundos", "24 Segundos"], correct: 3 },
  { question: "Qual é o número do passaporte do cidadão que atirou contra guarnição?", options: ["38756", "38757", "38755", "38777"], correct: 1 },
  { question: "Qual é a cor da camisa do advogado falso?", options: ["Azul", "Branca", "Preta", "Vermelha"], correct: 0 },
  { question: "Qual os artigos que o cidadão foi preso?", options: ["Artigos: 74, 40, 44", "Artigos: 73, 44, 44", "Artigos: 74, 40, 43", "Artigos: 74, 39, 44"], correct: 3 },
  { question: "Quando eu pego o cidadão em H?", options: ["Sempre que eu quiser.", "Somente se necessário.", "Nunca.", "Todas as três opções."], correct: 1 },
  { question: "Qual o comando para verificar se o Advogado possui a carteira da OAB?", options: ["VER OAB", "OAB", "VEROAB", "Todas as opções estão corretas."], correct: 2 },
  { question: "Quantos códigos Q aparecem no vídeo?", options: ["15", "17", "13", "11"], correct: 2 },
  { question: "Quando devo dar ao réu principal no atenuantes?", options: ["Somente na presença de um advogado.", "Depois de ter olhado no MDT", "Se ele não tem desacato.", "Quando o cidadão fala."], correct: 0 },
  { question: "Eu posso patrulhar sozinho?", options: ["Apenas se nao tiver ninguém na DP", "Sempre", "Nunca", "Todas as opções estão corretas."], correct: 2 },
  { question: "Qual a cor do bermuda do cidadão preso?", options: ["Preta", "Amarela", "Verde", "Branca"], correct: 3 },
  { question: "Quando a lei de Miranda é proferida?", options: ["Após colocar o cidadão na viatura.", "Na DP.", "Na frente de um Advogado", "Todas as três opções estão erradas."], correct: 0 },
  { question: "O que o suspeito tinha dentro da Van?", options: ["Armas", "Cordas", "Medicamentos", "Muni"], correct: 2 },
  { question: "Ao abordar os suspeitos, quantos policiais estavam no viatura?", options: ["3 Policiais", "2 Policiais", "5 Policias", "4 Policiais"], correct: 3 },
  { question: "Qual é a cor da letra do código 7 de patrulha ?", options: ["Verde", "Vermelha", "Branca", "Amarelo"], correct: 3 },
  { question: "O que o P1 deve verificar antes de começar o código zero?", options: ["Todos já está na viatura.", "Se todos estiverem usando cinto e o veículo trancado.", "Tenho uma arma em minhas mãos.", "Já bati o ponto."], correct: 1 },
  { question: "Qual o curso dado antes do curso de modulação?", options: ["Prisional", "Codigo Q", "Acompanhamento", "Abordagem"], correct: 2 },
];

// ... (todas as variáveis continuam como estavam)

function startQuiz() {
  const nomeValue = nome.value;
  const idValue = id.value;

  if (nomeValue.trim() === "" || idValue.trim() === "" || isNaN(idValue)) {
    mensagem.textContent = "Preencha QRA e ID corretamente!";
    nome.style.border = idValue.trim() === "" ? "1px solid red" : "1px solid transparent";
    id.style.border = nomeValue.trim() === "" ? "1px solid red" : "1px solid transparent";
    return;
  }

  btnInit.style.display = "none";
  container.style.opacity = "1";
  dados.style.display = "none";

  showQuestion();
}

function showQuestion() {
  const section = document.querySelector(".sections");
  section.innerHTML = "";

  const q = questions[currentQuestion];

  const qDiv = document.createElement("div");
  qDiv.className = "questions";
  qDiv.innerHTML = `<h2>${String(currentQuestion + 1).padStart(2, "0")} - ${q.question}</h2>`;

  const aDiv = document.createElement("div");
  aDiv.className = "answers";

  q.options.forEach((option, idx) => {
    const label = document.createElement("label");
    label.innerHTML = `
      ${option}
      <input type="radio" name="question" value="${idx}">
    `;
    aDiv.appendChild(label);
  });

  section.appendChild(qDiv);
  section.appendChild(aDiv);

  // Atualiza a pontuação
  spanScore.textContent = `${score}/${questions.length}`;

  // Atualiza botão "previus"
  if (currentQuestion === 0) {
    previus.textContent = "Reset";
    previus.onclick = previusFunction;
  } else {
    previus.textContent = "Anterior";
    previus.onclick = previousQuestion;
  }
}

function nextQuestion() {
  const selected = document.querySelector('input[name="question"]:checked');
  if (!selected) {
    alert("Selecione uma resposta.");
    return;
  }

  if (parseInt(selected.value) === questions[currentQuestion].correct) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    finishQuiz();
  }
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

function finishQuiz() {
  const nomeValue = nome.value;
  const idValue = id.value;
  const status = score >= 14 ? "FOI APROVADO ✅ Você Já pode estar solicitando o curso Prático" : "FOI REPROVADO ❌ Você tem que fazer mais de 14 pontos para passar";

  alert(`Você ${status}! Pontuação: ${score}/${questions.length}`);

  sendToDiscord(nomeValue, idValue, score, status);

  document.querySelector(".sections").innerHTML = `
    <h2 style="color:white;">Você ${status}!</h2>
    <p style="color:white;">Pontuação: ${score}/${questions.length}</p>
    <button type="button" class="reset" onclick="window.location.reload()">Pagina inicial</button>
    `;
    btn.style.display = "none";
}

function sendToDiscord(nome, id, score, status) {
  const webhookUrl = "https://discord.com/api/webhooks/1370384172924932177/CjhCgjrHkLiSozXMRG-MCZd693boqGfzUBG5BTDtC2Uv5pCxyqKh3YKOC2-_p5YarrUy";

  const data = {
    username: "Resultado da Prova",
    embeds: [
      {
        title: "📋 Resultado da Prova Policial",
        color: status.includes("APROVADO") ? 3066993 : 15158332,
        fields: [
          { name: "👤 QRA", value: nome, inline: true },
          { name: "🆔 ID", value: id, inline: true },
          { name: "🎯 Pontuação", value: `${score}/20`, inline: true },
          { name: "📌 Status", value: status, inline: false },
        ],
        timestamp: new Date(),
      },
    ],
  };

  fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).catch(err => console.error("Erro ao enviar para o Discord", err));
}

function previusFunction() {
  window.location.reload();
}


