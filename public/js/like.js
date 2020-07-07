const BTNS_LIKE = document.querySelectorAll('.btn-like');
let Like;
let Element;
async function likeProject() {
  
  let promise = await fetch(`${location.origin}/api/likes/${Element.dataset.id}`, {
    body: JSON.stringify({'like':'Ok'}),
    headers: { "Content-Type": "application/json" },
    method: 'PATCH'
  });
  
  return await promise;
  
}

async function tryLike() {

  Element = this;
  Like = parseInt(Element.textContent);

  let result = await likeProject();

  if (!result.ok) {
    console.log('Erro');
  } else {
    Element.innerHTML = `<div class="btn-like" data-id="${Element.dataset.id}">
    <span><i class="fas fa-heart quantidade-de-like"></i> ${Like + 1}</span>
    </div>`;
  }
}

for (let BTN of BTNS_LIKE) {
  BTN.addEventListener('click', tryLike);
}