const BTNS_LIKE = document.querySelectorAll('.btn-like');

async function likeProject() {
  
  let Element = this;
  let Like = parseInt(Element.textContent);
  console.log(Like, Element.dataset.id);
  
  await fetch(`${location.origin}/api/likes/${Element.dataset.id}`, {
    body: JSON.stringify({}),
    headers: { "Content-Type": "application/json" },
    method:'PATCH'
  })
    .then(result => result.json())
    .then(result => {
      if (!result.ok) {
        throw new Error('Erro');
      }
    })
    .then(this.innerHTML = `<div class="btn-like" data-id="${Element.dataset.id}">
  <span><i class="fas fa-heart quantidade-de-like"></i>${Like + 1}</span>
  </div>`)
  .catch(e => console.log(e));
}

for (let BTN of BTNS_LIKE) {
  BTN.addEventListener('click', likeProject);
}