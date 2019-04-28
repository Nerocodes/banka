// Add label to form when user starts typing
const formLabel = (id) => {
  const input = document.querySelector(`#${id}`);
  if(input == null) return;
  const label = document.querySelector(`#${id}`).previousElementSibling;
  input.addEventListener('input', () => {
    label.classList.remove('hide');
    label.classList.add('fade-in');
    if( input.value == '') {
      label.classList.add('hide');
    }
  });
  
}

// Form fields
formLabel('firstName');
formLabel('lastName');
formLabel('email');
formLabel('password');

// dropdown 
const dropdown = document.querySelector('.dropdown');
const dropdownLinks = document.querySelector('.dropdown-links');
if(dropdown) {
  dropdown.addEventListener('click', () => {
    dropdownLinks.classList.toggle('hide');
  });
}

// Flexible footer
footerRelative = () => {
  const footer = document.querySelector('footer');
  const windowHeight = window.innerHeight;
  const documentHeight = document.body.clientHeight + 100;

  if( documentHeight > windowHeight) {
    footer.classList.add('fr');
  } else {
    footer.classList.remove('fr');
  }
}

window.onload = footerRelative();

// Transaction modal
const trs = document.querySelectorAll('.transactions tbody tr');
const modal = document.querySelector('.bg-modal');
const closeBtn = document.querySelector('.close');
if(trs){
  for( tr of trs) {
    tr.addEventListener('click', () => {
      modal.classList.remove('hide');
    });
  }
}

if(closeBtn){
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hide');
  });
}

// User Modal
const addUserBtn = document.querySelector('.add-btn');
const userModal = document.querySelector('.bg-modal');
const userCloseBtn = document.querySelector('.user-modal .close');
if(addUserBtn){
  addUserBtn.addEventListener('click', () => {
    userModal.classList.remove('hide');
  });
}

if(userCloseBtn){
  userCloseBtn.addEventListener('click', () => {
    userModal.classList.add('hide');
  });
}

// Accounts table
const accountTrs = document.querySelectorAll('.bank-accounts .table1 tbody tr');
if(accountTrs){
  for( tr of accountTrs) {
    tr.addEventListener('click', () => {
      window.location.href = 'account-record.html';
    });
  }
}

// Global variables
// Api URL
const api = 'http://localhost:9000/api/v1/';

// Post function
const post = (url = ``, data = {}, token = ``) => {
  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token':  `${token}`,
    },
    body: JSON.stringify(data),

  })
  .then(res => res.json());
};

// Alert message
class Message {
  constructor(message) {
    this.message = message
  }

  alertMessage(status) {
    const displayMessage = document.querySelector('#displayMessage');
    displayMessage.setAttribute('style', 'display: block;');
    displayMessage.innerHTML = this.message;
    displayMessage.removeAttribute('class');
    displayMessage.classList.add(`${status}`);
    displayMessage.classList.add('fade-out-delay');
    setTimeout(() => {
      displayMessage.setAttribute('style', 'display: none;');
    }, 4000);
  }
}