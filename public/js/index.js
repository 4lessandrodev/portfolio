const TEXTO_BANNER = document.getElementById('text_banner');
const BTN_HIRE = document.getElementById('btn_hire');
const AVATAR_ABOUT = document.getElementById('avatar_about');
const INFORMATIONS_ABOUT = document.getElementById('information_about');
const LINKS = document.querySelectorAll('.about-btn a');
const LEVEL_SKILLS = document.querySelectorAll('#javascript, #mysql, #nodejs');
const NIVEIS = ['75%', '70%', '80%'];
const DIV_SKILLS = document.getElementById('skills');
const CARDS_TITLES = document.querySelectorAll('.card-header h4');
const BTN_NEXT_CARD = document.getElementById('btn-next');
const BTN_PREV_CARD = document.getElementById('btn-prev');
const SLIDES = document.querySelectorAll('#ul-slides li div');
const INCADOR_DE_SLIDE = document.querySelectorAll('#slides-indicadores li');
const NAVBAR_MOBILE = document.getElementById('navbar-mobile');
const NAV_UL = document.getElementById('nav-ul');
const HAMBURGUER_MENU = document.getElementById('hamburguer-menu');
const BTN_CLOSE_NAVBAR = document.getElementById('close-mobile-menu');
  
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

let timeline = gsap.timeline();
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
let timelineNavbar = gsap.timeline();
  
CustomEase.create('efeitoVaiEvolta', 'M0,0 C0,0 0.193,1.499 0.464,1.77 0.689,1.995 1,1 1,1 ');
CustomEase.create("customEffectClick", "M0,0 C0.126,0.382 0.12,0.868 0.504,0.54 0.704,0.369 0.818,1.001 1,1 ");
CustomEase.create("efeitoSlide", "M0,0 C0,0 -0.012,0.461 0.286,0.472 0.549,0.48 0.663,0.353 0.77,0.428 1.001,0.589 1,1.016 1,1.016 ");
  
  function animate() {
    timeline.set([TEXTO_BANNER, INFORMATIONS_ABOUT, AVATAR_ABOUT, BTN_HIRE, LINKS], { autoAlpha: 1 });
    timeline.from(TEXTO_BANNER, { x: -300, duration: 1.2, ease: 'efeitoVaiEvolta' })
    .from([AVATAR_ABOUT, INFORMATIONS_ABOUT], { opacity: 0 })
    .from(BTN_HIRE, { y: 140, opacity: 0, duration: 1 })
    .from(LINKS, {opacity:0, duration:0.5, stagger:0.2});
  }
  
  function animateSkills(){
    timeline.set(LEVEL_SKILLS,{autoAlpha:1});
    timelineSkills.fromTo(LEVEL_SKILLS[0], {width:0}, {width:NIVEIS[0], duration:1 ,ease: 'linear'})
    .fromTo(LEVEL_SKILLS[1], {width:0},{width:NIVEIS[1], duration:1 ,ease: 'linear'})
    .fromTo(LEVEL_SKILLS[2], {width:0},{width:NIVEIS[2], duration:1 ,ease: 'linear'})
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


function abrirMenuMobile() {
  timelineNavbar.set(NAVBAR_MOBILE, { autoAlpha: 1 });
  timelineNavbar.fromTo(NAV_UL, { height: 0 }, { height: '77vh', duration: 0.5, ease:'power4.out(1, 0.3)' });
}

function fecharNavBarMobile() {
  timelineNavbar.to(NAV_UL, { height: '0vh', duration: 0.5, ease: 'power4.out(1, 0.3)'});
  timelineNavbar.set(NAVBAR_MOBILE, { autoAlpha: 0 },'-=0.4');
}

BTN_CLOSE_NAVBAR.addEventListener('click', fecharNavBarMobile);
HAMBURGUER_MENU.addEventListener('click',abrirMenuMobile); 


BTN_NEXT_CARD.addEventListener('click', nextCardOnBtnClick);
BTN_PREV_CARD.addEventListener('click', nextCardOnBtnClick);

window.addEventListener('load', function () {
  animate();
  animateSkills();
  adicionarListenerNosCards();
});
  