const TEXTO_BANNER = document.getElementById('text_banner');
const NAVBAR_MOBILE = document.getElementById('navbar-mobile');
const NAV_UL = document.getElementById('nav-ul');
const HAMBURGUER_MENU = document.getElementById('hamburguer-menu');
const BTN_CLOSE_NAVBAR = document.getElementById('close-mobile-menu');
const screenSize = window.innerWidth;

gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

let timelineHeader = gsap.timeline();
let timelineNavbar = gsap.timeline();
CustomEase.create('efeitoVaiEvolta', 'M0,0 C0,0 0.193,1.499 0.464,1.77 0.689,1.995 1,1 1,1 ');

function animateHeader() {
  timelineHeader.set(TEXTO_BANNER, { autoAlpha: 1 });
  timelineHeader.from(TEXTO_BANNER, { x: -300, duration: 1.2, ease: 'efeitoVaiEvolta' });
}

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
window.addEventListener('load', function () {
  animateHeader();
}); 


NAV_UL.addEventListener('click', function (event) {
  let tag = event.target.tagName;
  let paginaAtual = location.pathname;
  if (tag == 'A' && screenSize < 800 && paginaAtual == '/portfolio') {
    fecharNavBarMobile();
  }
});