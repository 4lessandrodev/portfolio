const BTN_HIRE = document.getElementById('btn_hire');
const AVATAR_ABOUT = document.getElementById('avatar_about');
const AVATAR_IMG = document.querySelector('#avatar_about img');
const INFORMATIONS_ABOUT = document.getElementById('information_about');
const LINKS = document.querySelectorAll('.about-btn a');
const LEVEL_SKILLS = document.querySelectorAll('#javascript, #mysql, #nodejs, #testes, #restapi, #scrum, #git, #html, #css, #mongo, #sequelize, #bootstrap, #react');
const NIVEIS = ['75%', '70%', '80%', '30%', '50%', '60%', '70%', '80%', '60%', '40%', '60%', '70%', '15%'];
const DIV_SKILLS = document.getElementById('skills');
const CARDS_TITLES = document.querySelectorAll('.card-header h4');
const BTN_NEXT_CARD = document.getElementById('btn-next');
const BTN_PREV_CARD = document.getElementById('btn-prev');
const SLIDES = document.querySelectorAll('#ul-slides li div');
const INCADOR_DE_SLIDE = document.querySelectorAll('#slides-indicadores li');
  
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

let timelineAbout = gsap.timeline();
let timelineSkills = gsap.timeline({
  scrollTrigger: {
    trigger: DIV_SKILLS,
    markers: false,
    start: "top 75%", //Inicio da linha de gatilho  RANGE
    end: "bottom 25%", //Fim da linha de gatilho RANGE
    //events: onEnter onLeave onEnterBack onLeaveBack
    toggleActions: 'restart complete restart complete'
    //options: play, pause, resume, reset, restart, complete, reverse, none 
  }});
let timelineTitleCard = gsap.timeline();
  
CustomEase.create("customEffectClick", "M0,0 C0.126,0.382 0.12,0.868 0.504,0.54 0.704,0.369 0.818,1.001 1,1 ");
CustomEase.create("efeitoSlide", "M0,0 C0,0 -0.012,0.461 0.286,0.472 0.549,0.48 0.663,0.353 0.77,0.428 1.001,0.589 1,1.016 1,1.016 ");
  
  function animate() {
    timelineAbout.set([INFORMATIONS_ABOUT, AVATAR_ABOUT, BTN_HIRE, LINKS], { autoAlpha: 1 });
    timelineAbout.from([AVATAR_ABOUT, INFORMATIONS_ABOUT], { opacity: 0 })
    .from(BTN_HIRE, { y: 140, opacity: 0, duration: 1 })
    .from(LINKS, {opacity:0, duration:0.5, stagger:0.2});
  }
  
  function animateSkills(){
    timelineSkills.set(LEVEL_SKILLS,{autoAlpha:1});
    timelineSkills.fromTo(LEVEL_SKILLS[0], { width: 0 }, { width: NIVEIS[0], duration: 1, ease: 'linear' })
      .fromTo(LEVEL_SKILLS[1], { width: 0 }, { width: NIVEIS[1], duration: 1, ease: 'linear' })
      .fromTo(LEVEL_SKILLS[2], { width: 0 }, { width: NIVEIS[2], duration: 1, ease: 'linear' })
      .fromTo(LEVEL_SKILLS[3], { width: 0 }, { width: NIVEIS[3], duration: 1, ease: 'linear' })
      .fromTo(LEVEL_SKILLS[4], { width: 0 }, { width: NIVEIS[4], duration: 1, ease: 'linear' })
      .fromTo(LEVEL_SKILLS[5], { width: 0 }, { width: NIVEIS[5], duration: 1, ease: 'linear' })
      .fromTo(LEVEL_SKILLS[6], { width: 0 }, { width: NIVEIS[6], duration: 1, ease: 'linear' })
      .fromTo(LEVEL_SKILLS[7], { width: 0 }, { width: NIVEIS[7], duration: 1, ease: 'linear' })
      .fromTo(LEVEL_SKILLS[8], { width: 0 }, { width: NIVEIS[8], duration: 1, ease: 'linear' })
      .fromTo(LEVEL_SKILLS[9], { width: 0 }, { width: NIVEIS[9], duration: 1, ease: 'linear' })
      .fromTo(LEVEL_SKILLS[10], { width: 0 }, { width: NIVEIS[10], duration: 1, ease: 'linear' })
      .fromTo(LEVEL_SKILLS[11], { width: 0 }, { width: NIVEIS[11], duration: 1, ease: 'linear' })
      .fromTo(LEVEL_SKILLS[12], { width: 0 }, { width: NIVEIS[12], duration: 1, ease: 'linear' });
  }
  
  function animateTitleCard(card) {
    let titulo = card.querySelector('h4');
    timelineTitleCard.fromTo(card, {opacity:0, scale:0 }, {opacity:1, scale:1})
    .from(titulo, { text: 'PROJETO', duration: 1, delay: 0.5 });
  }
  
  const screenSize = window.innerWidth;
  const CARDS = document.querySelectorAll('#session-cards .card');
  
  
  function next(indice) {
    hiddenOrShowCard(CARDS[parseInt(indice) + 1]);
    animateTitleCard((CARDS[parseInt(indice) + 1]));
  }
  
  function previous(index) {
    hiddenOrShowCard(CARDS[parseInt(index) - 1]);
    animateTitleCard((CARDS[parseInt(index) - 1]));
  }
  
  function restart() {
    hiddenOrShowCard(CARDS[0]);
    animateTitleCard((CARDS[0]));
  }
  
  function back() {
    hiddenOrShowCard(CARDS[parseInt(CARDS.length) - 1]);
    animateTitleCard((CARDS[parseInt(CARDS.length) - 1]));
  }
  
  function hiddenOrShowCard(card) {
    card.classList.toggle('hidden');
    card.classList.toggle('active');
  }
  
  function nextCard(event) {
    let currentCard = event.target;
    
    hiddenOrShowCard(currentCard);
    
    let currentIndex = currentCard.dataset.index;
    if ((screenSize / 2) > (event.x)) {
      if (currentIndex == 0) {
        back();
      } else {
        previous(currentIndex);
      }
    } else {
      if (currentIndex == (CARDS.length - 1)) {
        restart();
      } else {
        next(currentIndex);
      }
    }
  }
  
function findActiveCard() {
  for (let card of CARDS) {
    if (card.classList.value == 'card active') {
      return card;
    }
  }
  }
  
  function nextCardOnBtnClick(event) {
    let activeCard = findActiveCard();
    let currentIndex = parseInt(activeCard.dataset.index);
    let limitOfCards = CARDS.length - 1;
  
    hiddenOrShowCard(activeCard);
    if (event.target.id == 'btn-next') {
      if (currentIndex == limitOfCards) {
        restart();
      } else {
        next(currentIndex);
      }
    } else {
      if (currentIndex == 0) {
        back();
      } else {
        previous(currentIndex);
      }
    }
}
  

function likeAProject(event) {
  gsap.fromTo(event.target, { scale: 2 }, { scale: 1, ease: 'customEffectClick', duration: 0.5 });
}
  
function adicionarListenerNosCards() {
  for (let card of CARDS) {
    card.querySelector('.btn-like').addEventListener('click', likeAProject);
    card.addEventListener('dragstart', nextCard);
  }
}

function pintarIndicadorDeSlide(index) {
  let elemento = INCADOR_DE_SLIDE[index].querySelector("i");
  elemento.classList.toggle('fas');
  elemento.classList.toggle('far');
}

let current = 0; 
setInterval(function () {
  let limit = parseInt(SLIDES.length) - 1;
  hiddenOrShowCard(SLIDES[current]);
  pintarIndicadorDeSlide(current);
  if (current == limit) {
    //exibir o primeiro slide
    current = 0;
    hiddenOrShowCard(SLIDES[0]);
    pintarIndicadorDeSlide(current);
  } else {
    //passar para o proximo
    current++;
    hiddenOrShowCard(SLIDES[current]);
    pintarIndicadorDeSlide(current);
  }
}, 5000);




function animarAvatarAoPassarMouse() {
  gsap.to(AVATAR_IMG, { scale: 1.3, duration:1, ease:'back', yoyo:true, repeat:1});
}

AVATAR_IMG.addEventListener('mouseover', animarAvatarAoPassarMouse);


BTN_NEXT_CARD.addEventListener('click', nextCardOnBtnClick);
BTN_PREV_CARD.addEventListener('click', nextCardOnBtnClick);

window.addEventListener('load', function () {
  animate();
  animateSkills();
  adicionarListenerNosCards();
});
  