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


function startQuiz() {

  let nomeValue = nome.value;
  let idvalue = id.value;

  if (nomeValue === "" || idvalue === "" || isNaN(idvalue)) {
    
    if (nomeValue === "" && idvalue !== "") {
      nome.style.border = "1px solid red";
      id.style.border = 'transparent'
      console.log("O campo deve ser preenchido!");
    } else if (idvalue === "" && nomeValue !== "" ){
      nome.style.border = "transparent";
      id.style.border = "1px solid red";
      console.log("O campo deve ser preenchido ou o campo ID nao e numero!");
    } else {
      nome.style.border = "1px solid red";
      id.style.border = "1px solid red";
    }
    
    
  } else {
    btnInit.style.display = "none";
    container.style.opacity = "1"
    dados.style.display = "none";
    a1.removeAttribute("disabled");
    a2.removeAttribute("disabled");
    a3.removeAttribute("disabled");
    a4.removeAttribute("disabled");
    previus.textContent = "Reset";
    previus.style.opacity = 1;
    console.log(`O Nome: ${nomeValue} #ID: ${idvalue} comecou o teste!`)
  }
}

function previusFunction() {
  if (previus.textContent = "Reset") {
    window.location.reload()
  }
}


