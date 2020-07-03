const TEXTO_BANNER = document.getElementById('text_banner');
const BTN_HIRE = document.getElementById('btn_hire');
const AVATAR_ABOUT = document.getElementById('avatar_about');
const INFORMATIONS_ABOUT = document.getElementById('information_about');
const LINKS = document.querySelectorAll('.about-btn a');

gsap.registerPlugin(CustomEase);
let timeline = gsap.timeline();
CustomEase.create('efeitoVaiEvolta', 'M0,0 C0,0 0.193,1.499 0.464,1.77 0.689,1.995 1,1 1,1 ');

function animate() {
  timeline.set([TEXTO_BANNER, INFORMATIONS_ABOUT, AVATAR_ABOUT, BTN_HIRE, LINKS], { autoAlpha: 1 });
  timeline.from(TEXTO_BANNER, { x: -300, duration: 1.2, ease: 'efeitoVaiEvolta' })
    .from([AVATAR_ABOUT, INFORMATIONS_ABOUT], { opacity: 0 })
    .from(BTN_HIRE, { y: 140, opacity: 0, duration: 1 })
    .from(LINKS, {opacity:0, duration:0.5, stagger:0.2});
}

window.addEventListener('load', animate);