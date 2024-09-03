const buttonAdd = window.document.querySelector("#botao-adicionar");
const buttonSub = window.document.querySelector("#botao-subtrair");
const valorQuantidade = window.document.querySelector(".quantidade");

let quantidadeAtual = parseInt(valorQuantidade.innerHTML);
let addPressionado = null;
let subPressionado = null;

buttonAdd.addEventListener("mousedown", iniciarAdicao);
buttonAdd.addEventListener("mouseup", pararAdicao);
buttonAdd.addEventListener("mouseout", pararAdicao);

buttonSub.addEventListener("mousedown", iniciarSubtracao);
buttonSub.addEventListener("mouseup", pararSubtracao);
buttonSub.addEventListener("mouseout", pararSubtracao);

function iniciarAdicao() {
    addPressionado = setInterval(adicionarQuantidade, 100);
}

function pararAdicao() {
    clearInterval(addPressionado);
}

function iniciarSubtracao() {
    subPressionado = setInterval(subtrairQuantidade, 100);
}

function pararSubtracao() {
    clearInterval(subPressionado);
}

function adicionarQuantidade() {
    quantidadeAtual++;
    valorQuantidade.innerHTML = quantidadeAtual;
}

function subtrairQuantidade() {
    if (quantidadeAtual > 1) {
        quantidadeAtual--;
        valorQuantidade.innerHTML = quantidadeAtual;
    }
}