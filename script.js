//import * as data from 'palavras.json'

const inputs = [];

document.querySelectorAll('input').forEach(input => inputs.push(input));
inputs.reverse();
let palavra = [];

let tentativa = [];
let letrasEncontradas = [];
let tentativas = [];
let linha = 1;
//Seta foco no primeiro input

const init = () => {
    let sorteada = palavras6D[Math.floor(Math.random() * palavras6D.length)].toUpperCase();
    palavra = sorteada.split("");
    console.log(`Palavra: ${sorteada}`);
    tentativa = [];
    letrasEncontradas = [];
    tentativas = [];
    linha = 1;
    inputs.forEach(input => {
        input.value = "";
        input.classList.remove("valido");
        input.classList.remove("existe");
        if(input.attributes.linha.value == 1){
            input.disabled = false;
        }else{
            input.disabled = true;
        }

        if(input.attributes.linha.value == 1 && input.attributes.posicao.value == 1){
            input.focus();
        }
    });

    let dvSucesso = document.querySelector("#dvSucesso");
    let dvFalha = document.querySelector("#dvFalha");
    
    //Redefini as classes   
    dvSucesso.classList.add("hide");
    dvSucesso.classList.remove("show");
    dvFalha.classList.add("hide");
    dvFalha.classList.remove("show");
}

inputs.forEach(input => input.addEventListener("keyup", (e) => {
    const input = e.target;
    const letra = input.value.toUpperCase();
    if (!isNaN(letra)) {
        input.value = "";
        return;
    }

    input.value = letra;
    input.blur();

    tentativa.push({ input, letra });

    let completos = 0;
    inputs.forEach(ip => {
        if (ip.attributes.linha.value == linha) {
            if (ip.value != "") {
                completos++;
            }
        }
    });

    let linhaIp = input.attributes.linha.value;
    let posicaoIp = input.attributes.posicao.value;

    if (completos == 6) {
        verificaPalavra();
    } else {
        inputs.forEach(input => {
            if(input.attributes.linha.value == linhaIp){
                if(input.value == ""){
                    input.focus();
                }
            }
        })
    }

}))

async function verificaPalavra () {
    let acertou = true;
    for (let i = 0; i < 6; i++) {
        if (tentativa[i].letra != palavra[i]) {
            acertou = false;
        }
    }

    tentativas.push(tentativa);

    if (acertou) {
        inputs.forEach(input => {
            input.disabled = true;
            if (input.attributes.linha.value == tentativas.length) {
                input.classList.add("valido");
            }
        })
        onSucesso();
    } else {
        validaPosicoes();
    }
}

function validaPosicoes() {
    for (let i = 0; i < 6; i++) {
        tentativa[i].input.disabled = true;
        if (tentativa[i].letra == palavra[i]) {
            tentativa[i].input.classList.add("valido");
        } else if (palavra.includes(tentativa[i].letra.toString())) {
            tentativa[i].input.classList.add("existe");
        }
    }

    linha++;
    inputs.forEach(input => {
        if (input.attributes.linha.value < linha) {
            input.disabled = true;
        }else if(input.attributes.linha.value == linha){
            input.disabled = false;
        }
    });

    let finalizado = true;
    inputs.forEach(input => {
        if(input.value == ""){
            finalizado = false;
        }
    });

    if(finalizado){
        onFalha();
    }else{
        document.querySelector(`#l${linha}-1`).focus();
    }

    tentativa = [];
}

function onSucesso(){
    let dvSucesso = document.querySelector("#dvSucesso");
    let dvFalha = document.querySelector("#dvFalha");
    
    //Redefini as classes   
    dvSucesso.classList.add("show");
    dvSucesso.classList.remove("hide");
    dvFalha.classList.add("hide");
    dvFalha.classList.remove("show");

    //Redefini conteúdo
    dvSucesso.innerHTML = "";
    dvFalha.innerHTML = "";

    let texto = document.createElement("p");
    texto.innerText = "Parabéns, você acertou!";
    texto.style.marginTop = "10px";

    let icone = document.createElement("i");
    icone.classList.add("bi", "bi-arrow-clockwise");
    icone.style.marginTop = "10px";
    icone.onclick = () => {init()};

    dvSucesso.appendChild(texto);
    dvSucesso.appendChild(icone);

}

function onFalha(){
    let dvSucesso = document.querySelector("#dvSucesso");
    let dvFalha = document.querySelector("#dvFalha");
    
    //Redefini as classes   
    dvSucesso.classList.add("hide");
    dvSucesso.classList.remove("show");
    dvFalha.classList.add("show");
    dvFalha.classList.remove("hide");

    //Redefini conteúdo
    dvSucesso.innerHTML = "";
    dvFalha.innerHTML = "";

    let texto = document.createElement("p");
    texto.innerText = "Oops, não foi dessa vez. A palavra era:" + palavra.join("");
    texto.style.marginTop = "10px";

    let icone = document.createElement("i");
    icone.classList.add("bi", "bi-arrow-clockwise");
    icone.style.marginTop = "10px";
    icone.onclick = () => {init()};

    dvFalha.appendChild(texto);
    dvFalha.appendChild(icone);

}


init();