const IMAGENS_DO_PROJETO = document.querySelectorAll('#slides img');
const SLIDE_ATUAL = document.getElementById('slide-atual');
const QUANTIDADE_IMAGENS = parseInt(IMAGENS_DO_PROJETO.length) - 1;
const BTN_ANTERIOR = document.getElementById('btn-anterior');
const BTN_PROXIMO = document.getElementById('btn-proximo');
let indiceAtual = parseInt(SLIDE_ATUAL.dataset.index);


function slideProximo() {
  if (indiceAtual == QUANTIDADE_IMAGENS) {
    indiceAtual = 0;
  } else {
    indiceAtual++;
  }
  atribuirImagem(indiceAtual);
}

function slideAnterior() {
  if (indiceAtual == 0) {
    indiceAtual = QUANTIDADE_IMAGENS;
  } else {
    indiceAtual--;
  }
  atribuirImagem(indiceAtual);
}

function atribuirImagem(index) {
  gsap.fromTo(SLIDE_ATUAL, {scale:0}, {scale:1, duration:0.5, ease:'back'});
  SLIDE_ATUAL.src = `${IMAGENS_DO_PROJETO[index].src}`;
}

BTN_ANTERIOR.addEventListener('click', slideAnterior);
BTN_PROXIMO.addEventListener('click', slideProximo);

SLIDE_ATUAL.addEventListener('click', function () {
  window.open(SLIDE_ATUAL.src);
});