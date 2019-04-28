// Get user details
const client = JSON.parse(sessionStorage.getItem('user'));
console.log(location.pathname);

if (!client) {
  location.replace('/');
}

if (location.pathname == '/client/dashboard.html') {
  const welcomeText = document.querySelector('#welcomeText');
  welcomeText.innerHTML = `<i>Welcome <b class='name'>${client.firstName}</b>!
    Create an account to get started.<i>`;

  const firstName = document.querySelector('#firstName');
  const lastName = document.querySelector('#lastName');
  const email = document.querySelector('#email');
  const type = document.querySelector('#type_of_account').value;
  const createAccount = document.querySelector('#createAccount');

  firstName.value = client.firstName;
  lastName.value = client.lastName;
  email.value = client.email;
  console.log(type);

  createAccount.addEventListener('click', () => {
    post(`${api}accounts`, { type }, `${client.token}`)
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          const signedUp = new Message(res.message);
          setTimeout(() => {
            location.assign('/client/dashboard-active.html');
          }, 2000);
          return signedUp.alertMessage('success');
        }
        const signedUp = new Message(res.error);
        return signedUp.alertMessage('error');
      })
      .catch(err => console.log(err));
  });
};

if (location.pathname == '/client/dashboard-active.html') {
  const dashboard = document.querySelector('.dashboard-active');
  const footer = document.querySelector('footer');
  const accNo = document.querySelector('#accNo');
  const accBal = document.querySelector('#accBal');
  const accTyp = document.querySelector('#accTyp');
  const accSta = document.querySelector('#accSta');
  get(`${api}user/${client.email}/accounts`, `${client.token}`).then((res) => {
    console.log(res);
    if (res.data) {
      console.log(res.data);
      const primaryAccount = res.data[0];
      const accounts = JSON.stringify(res.data);
      sessionStorage.setItem('accounts', accounts);
      accNo.innerHTML = primaryAccount.accountNumber;
      accBal.innerHTML = `₦${parseFloat(primaryAccount.balance).toLocaleString('en')}`;
      accTyp.innerHTML = primaryAccount.type;
      accSta.innerHTML = primaryAccount.status;
      dashboard.removeAttribute('style');
    }
  }).catch(err => console.log(err));
}

if (location.pathname == '/client/transactions.html') {
  const accounts = JSON.parse(sessionStorage.getItem('accounts'));
  const currentAccount = accounts[0];
  const accBal = document.querySelector('#accBal');
  accBal.innerHTML = `₦${parseFloat(currentAccount.balance).toLocaleString('en')}`;
  const table = document.querySelector('#transactions');
  get(`${api}accounts/${currentAccount.accountNumber}/transactions`, `${client.token}`)
    .then((res) => {
      console.log(res);
      if (res.data) {
        const transactions = res.data;
        let type = '';
        transactions.map((transaction) => {
          const date = formatDate(transaction.createdOn);
          if (transaction.type == 'debit') {
            type = '-';
          } else {
            type = '';
          };
          table.innerHTML += `<tr onclick=transactionModal(${transaction.transactionId})>
                                  <td>${date}</td>
                                  <td>${type}₦${parseFloat(transaction.amount).toLocaleString('en')}</td>
                              </tr>`;
        });
      } else {
        const noHistory = new Message(`${res.error}`);
        noHistory.displayMessage('error');
      }
    }) 
    .catch(err => console.log(err));
}

// Transaction Modal
const transactionModal = (id) => {
  const modal = document.querySelector('.bg-modal');
  const closeBtn = document.querySelector('.close');
  const tid = document.querySelector('#tid');
  const tdate = document.querySelector('#tdate');
  const ttype = document.querySelector('#ttype');
  const tamount = document.querySelector('#tamount');
  const tobalance = document.querySelector('#tobalance');
  const tnbalance = document.querySelector('#tnbalance');
  get(`${api}transactions/${id}`, `${client.token}`).then((res) => {
    console.log(res);
    if (res.data) {
      const transaction = res.data;
      const date = formatDate(transaction.createdOn);
      tid.innerHTML = transaction.transactionId;
      tdate.innerHTML = date;
      ttype.innerHTML = transaction.type;
      tamount.innerHTML = transaction.amount;
      tobalance.innerHTML = transaction.oldBalance;
      tnbalance.innerHTML = transaction.newBalance;
      modal.classList.remove('hide');
    } else {
      const signedIn = new Message(res.error);
      return signedIn.alertMessage('error');
    }
    if(closeBtn){
      closeBtn.addEventListener('click', () => {
        modal.classList.add('hide');
      });
    }
  }).catch(err => console.log(err));
}
