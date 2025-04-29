

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
  { question: "Pergunta 1?", options: ["Opção A", "Opção B", "Opção C", "Opção D"], correct: 0 },
  { question: "Pergunta 2?", options: ["Opção A", "Opção B", "Opção C", "Opção D"], correct: 1 },
  { question: "Pergunta 3?", options: ["Opção A", "Opção B", "Opção C", "Opção D"], correct: 2 },
  { question: "Pergunta 4?", options: ["Opção A", "Opção B", "Opção C", "Opção D"], correct: 3 },
  { question: "Pergunta 5?", options: ["Opção A", "Opção B", "Opção C", "Opção D"], correct: 0 },
  { question: "Pergunta 6?", options: ["Opção A", "Opção B", "Opção C", "Opção D"], correct: 1 },
  { question: "Pergunta 7?", options: ["Opção A", "Opção B", "Opção C", "Opção D"], correct: 2 },
  { question: "Pergunta 8?", options: ["Opção A", "Opção B", "Opção C", "Opção D"], correct: 3 },
  { question: "Pergunta 9?", options: ["Opção A", "Opção B", "Opção C", "Opção D"], correct: 0 },
  { question: "Pergunta 10?", options: ["Opção A", "Opção B", "Opção C", "Opção D"], correct: 1 },
  { question: "Pergunta 11?", options: ["Opção A", "Opção B", "Opção C", "Opção D"], correct: 2 },
  { question: "Pergunta 12?", options: ["Opção A", "Opção B", "Opção C", "Opção D"], correct: 3 },
  { question: "Pergunta 13?", options: ["Opção A", "Opção B", "Opção C", "Opção D"], correct: 0 },
  { question: "Pergunta 14?", options: ["Opção A", "Opção B", "Opção C", "Opção D"], correct: 1 },
  { question: "Pergunta 15?", options: ["Opção A", "Opção B", "Opção C", "Opção D"], correct: 2 },
  { question: "Pergunta 16?", options: ["Opção A", "Opção B", "Opção C", "Opção D"], correct: 3 },
  { question: "Pergunta 17?", options: ["Opção A", "Opção B", "Opção C", "Opção D"], correct: 0 },
  { question: "Pergunta 18?", options: ["Opção A", "Opção B", "Opção C", "Opção D"], correct: 1 },
  { question: "Pergunta 19?", options: ["Opção A", "Opção B", "Opção C", "Opção D"], correct: 2 },
  { question: "Pergunta 20?", options: ["Opção A", "Opção B", "Opção C", "Opção D"], correct: 3 },
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
  const status = score >= 14 ? "FOI APROVADO ✅ Você Já PODE ESTAR SOLICITANDO O Prático" : "FOI REPROVADO ❌ Você tem que fazer mais de 14 pontos para passar";

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
  const webhookUrl = "SUA_WEBHOOK_AQUI";

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


