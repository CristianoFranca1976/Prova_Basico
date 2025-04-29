// Config btn-init

const btnInit = document.getElementById("btn-init");
const body = document.querySelector('body');
const dados = document.querySelector(".dados");
const container = document.getElementById("container");
const a1 = document.getElementById("A1");
const a2 = document.getElementById("A2");
const a3 = document.getElementById("A3");
const a4 = document.getElementById("A4");
const previus = document.getElementById("previus");
const nome = document.getElementById("nome");
const id = document.getElementById('id');
let mensagem = document.querySelector('.mensagem');
const firstSection = document.querySelector('.first');
const secoundSection = document.querySelector('.secound');

setTimeout(() => {
  mensagem.textContent = "";
}, 5000);

function startQuiz() {

  let nomeValue = nome.value;
  let idvalue = id.value;

  if (nomeValue.trim() === "" || idvalue.trim() === "" || isNaN(idvalue)) {
    // Resetando estilos
    nome.style.border = "1px solid transparent";
    id.style.border = "1px solid transparent";
  
    if (nomeValue.trim() === "" && idvalue.trim() === "") {
      nome.style.border = "1px solid red";
      id.style.border = "1px solid red";
      mensagem.textContent = "Todos os campos devem ser preenchidos!";
      console.log("Todos os campos devem ser preenchidos!");
    } else if (nomeValue.trim() === "") {
      nome.style.border = "1px solid red";
      mensagem.textContent = "O campo QRA deve ser preenchido!";
      console.log("O campo QRA deve ser preenchido!");
    } else if (idvalue.trim() === "" || isNaN(idvalue)) {
      id.style.border = "1px solid red";
      mensagem.textContent = "O campo ID deve ser preenchido com um número válido!";
      console.log("O campo ID deve ser preenchido com um número válido!");
    }
  
  } else {
    // Tudo certo, prosseguir
    btnInit.style.display = "none";
    container.style.opacity = "1";
    dados.style.display = "none";
  
    // Habilita botões
    a1.removeAttribute("disabled");
    a2.removeAttribute("disabled");
    a3.removeAttribute("disabled");
    a4.removeAttribute("disabled");
  
    previus.textContent = "Reset";
    previus.style.opacity = 1;
  
    console.log(`O Nome: ${nomeValue} #ID: ${idvalue} começou o teste!`);
  }
}

function nextQuestion() {
  firstSection.style.display = "none";
  secoundSection.style.display = "flex";
}

function previusFunction() {
  if (previus.textContent = "Reset") {
    window.location.reload()
  }
}


