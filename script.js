//import * as data from 'palavras.json'

const inputs = document.querySelectorAll('input');

const palavra = ["W", "O", "R", "D", "L", "E"];

let inputFocus = 0;
let tentativa = [];
let letrasEncontradas = [];
let tentativas = [];
let linha = 1;
//Seta foco no primeiro input
inputs[0].focus();

inputs.forEach(input => input.addEventListener("keyup", (e) => {
    const input = e.target;
    const letra = input.value.toUpperCase();
    if(!isNaN(letra)){
        input.value = "";
        return;
    }
    
    input.value = letra;
    input.blur();

    tentativa.push({input, letra});

    let completos = 0;
    inputs.forEach(ip => {
        if(ip.attributes.linha.value == linha){
            if(ip.value != ""){
                completos++;
            }
        }
    });

    inputFocus++;
    if(completos == 6){
        verificaPalavra();
    }else{
        inputs[inputFocus].focus();
    }

}))

function verificaPalavra(){
    let acertou = true;
    for(let i = 0; i < 6; i++){
        if(tentativa[i].letra != palavra[i]){
            acertou = false;
        }
    }

    tentativas.push(tentativa);

    if(acertou){
        inputs.forEach(input => {
            input.disabled = true;
            if(input.attributes.linha.value == tentativas.length){
                input.classList.add("valido");
            }
        })
    }else{
        validaPosicoes();
    }
}

function validaPosicoes(){
    for(let i = 0; i < 6; i++){
        tentativa[i].input.disabled = true;
        if(tentativa[i].letra == palavra[i]){
            tentativa[i].input.classList.add("valido");
        }else if(palavra.includes(tentativa[i].letra.toString())){
            tentativa[i].input.classList.add("existe");
        }
    }
    linha++;
    document.querySelector(`#l${linha}-1`).focus();
    tentativa = []
}


