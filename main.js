const numeroSenha = document.querySelector(".parametro-senha__texto");
const botoes = document.querySelectorAll(".parametro-senha__botao");
const checkbox = document.querySelectorAll(".checkbox");
const campoSenha = document.querySelector("#campo-senha");
const forcaSenha = document.querySelector(".forca");
const valorEntropia = document.querySelector(".entropia");

let tamanhoSenha = 12;

numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%&*?";

botoes[0].addEventListener("click", diminuirTamanho);
botoes[1].addEventListener("click", aumentarTamanho);

checkbox.forEach(item => {
    item.addEventListener("click", geraSenha);
});

geraSenha();

function diminuirTamanho() {

    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }

    numeroSenha.textContent = tamanhoSenha;
    geraSenha();

}

function aumentarTamanho() {

    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }

    numeroSenha.textContent = tamanhoSenha;
    geraSenha();

}

function geraSenha() {

    let alfabeto = "";

    if (checkbox[0].checked) {
        alfabeto += letrasMaiusculas;
    }

    if (checkbox[1].checked) {
        alfabeto += letrasMinusculas;
    }

    if (checkbox[2].checked) {
        alfabeto += numeros;
    }

    if (checkbox[3].checked) {
        alfabeto += simbolos;
    }

    if (alfabeto.length === 0) {

        campoSenha.value = "";
        valorEntropia.textContent = "Selecione pelo menos uma opção.";

        forcaSenha.classList.remove("fraca", "media", "forte");

        return;
    }

    let senha = "";

    for (let i = 0; i < tamanhoSenha; i++) {

        const indice = Math.floor(Math.random() * alfabeto.length);

        senha += alfabeto[indice];

    }

    campoSenha.value = senha;

    classificaSenha(alfabeto.length);

}

function classificaSenha(tamanhoAlfabeto) {

    const entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);

    forcaSenha.classList.remove("fraca", "media", "forte");

    if (entropia < 35) {

        forcaSenha.classList.add("fraca");

    } else if (entropia < 57) {

        forcaSenha.classList.add("media");

    } else {

        forcaSenha.classList.add("forte");

    }

    const dias = Math.floor((2 ** entropia) / (100e6 * 60 * 60 * 24));

    valorEntropia.textContent =
        "Um computador pode levar até " +
        dias.toLocaleString("pt-BR") +
        " dias para descobrir essa senha.";

}