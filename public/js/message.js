const BTN_SEND = document.getElementById('btn-send-message');
const INPUT_MESSAGE = document.getElementById('message');
const INPUT_EMAIL = document.getElementById('email');
const INPUT_SUBJECT = document.getElementById('subject');
const INPUT_NAME = document.getElementById('name');
const NAME_ERROR = document.getElementById('name-erro');
const SUBJECT_ERROR = document.getElementById('subject-erro');
const MESSAGE_ERROR = document.getElementById('message-erro');
const EMAIL_ERROR = document.getElementById('email-erro');
const FORM_MESSAGE = document.getElementById('message-form');



async function sendMessage() {
  
  let promise = await fetch(`${location.origin}/api/messages`, {
    body: JSON.stringify({ message: INPUT_MESSAGE.value, email: INPUT_EMAIL.value, subject: INPUT_SUBJECT.value, name: INPUT_NAME.value }),
    headers: { "Content-Type": "application/json" },
    method: 'POST'
  });
  
  return await promise.json();
  
}


function validateInputs() {
  return (
    INPUT_MESSAGE.value.trim() == '' ||
    INPUT_EMAIL.value.trim() == '' ||
    INPUT_SUBJECT.value.trim() == '' ||
    INPUT_NAME.value.trim() == ''
    );
  }
  
  function clearInputs() {
    FORM_MESSAGE.reset();
  }
  
  
  async function trySendMessage(e) {
    
    e.preventDefault();
    
    let emptyInput = validateInputs();
    if (emptyInput) {
      
      alert('Preencher os campos');
      return;
    }
    
    let result = await sendMessage();
    if (!result.message) {  
      
      for (let err of result.errors) {
        
        switch (err.param) {
          case 'name':
          NAME_ERROR.textContent = err.msg;
          break;
          case 'subject':
          SUBJECT_ERROR.textContent = err.msg;
          break;
          case 'message':
          MESSAGE_ERROR.textContent = err.msg;
          break;
          case 'email':
          EMAIL_ERROR.textContent = err.msg;
          break;
          default:
          alert('Não foi possível enviar mensagem');
          break;
        }
      }
    } else {
      clearInputs();
    }
  }
  
  
  BTN_SEND.addEventListener('click', trySendMessage);
  