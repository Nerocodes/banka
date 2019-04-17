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

// Handle login
const loginBtn = document.querySelector('#login');
if(loginBtn){
  loginBtn.addEventListener('click', () => {
    const user = document.querySelector('#user').value;
    window.location.href = `${user}/dashboard.html`;
  });
}

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
  const documentHeight = document.body.clientHeight + 50;

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