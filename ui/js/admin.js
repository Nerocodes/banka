// Get user details
const admin = JSON.parse(sessionStorage.getItem('admin'));
console.log(location.pathname);

if (!admin) {
  location.replace('/banka/ui');
}

if (location.pathname == '/banka/ui/admin/dashboard.html') {
  const accountsTable = document.querySelector('#accounts');
  get(`${api}accounts`, `${admin.token}`).then((res) => {
    console.log(res);
    if(res.data) {
      const accounts = res.data;
      let sn = 0;
      accounts.map((account) => {
        sn++;
        accountsTable.innerHTML += `<tr>
                                      <td onclick=accountDetails(${account.accountNumber})>${sn}</td>
                                      <td onclick=accountDetails(${account.accountNumber})>${account.accountNumber}</td>
                                      <td onclick=accountDetails(${account.accountNumber})>${account.ownerEmail}</td>
                                      <td onclick=deleteAccount(${account.accountNumber})>
                                          <span class="delete">
                                              <i class="fas fa-trash-alt"></i>
                                          </span>
                                      </td>
                                  </tr>`;
      });
    }
  }).catch(err => console.log(err));
  const selectFilter = document.querySelector('#filter');
  let queryUrl = ``;
  selectFilter.addEventListener('change', () => {
    console.log();
    if (selectFilter.value == 'all') {
      queryUrl = `${api}accounts`;
    } else {
      queryUrl = `${api}accounts?status=${selectFilter.value}`;
    }
    const accountsTable = document.querySelector('#accounts');
    get(queryUrl, `${admin.token}`).then((res) => {
      console.log(res);
      if(res.data) {
        const accounts = res.data;
        let sn = 0;
        accountsTable.innerHTML = ``;
        accounts.map((account) => {
          sn++;
          accountsTable.innerHTML += `<tr>
                                        <td onclick=accountDetails(${account.accountNumber})>${sn}</td>
                                        <td onclick=accountDetails(${account.accountNumber})>${account.accountNumber}</td>
                                        <td onclick=accountDetails(${account.accountNumber})>${account.ownerEmail}</td>
                                        <td onclick=deleteAccount(${account.accountNumber})>
                                            <span class="delete">
                                                <i class="fas fa-trash-alt"></i>
                                            </span>
                                        </td>
                                    </tr>`;
        });
        footerRelative();
      }
    }).catch(err => console.log(err));
  });
}

// Account details
const accountDetails = (accountNumber) => {
  sessionStorage.setItem('accountDetail', accountNumber);
  location.assign('/banka/ui/admin/account-record.html');
};

// Delete account
const deleteAccount = (accountNumber) => {
  console.log('deleting');
  let deleting = new Message(`Deleting..`);
  deleting.alertMessage('error');
  del(`${api}accounts/${accountNumber}`, `${admin.token}`).then((res) => {
    console.log(res);
    if(res.message) {
      deleting = new Message(`${res.message}`);
      deleting.alertMessage('success');
      setTimeout(() => {
        location.reload();
      }, 2000);
    } else {
      deleting = new Message(`${res.error}`);
      deleting.alertMessage('error');
    }
  });
};

const changeStatus = (status, accNo) => {
  patch(`${api}accounts/${accNo}`, `${status}`, `${admin.token}`).then((res) => {
    console.log(res);
    if(res.data) {
      const statusChanged = new Message(`Account is now ${res.data.status}`);
      statusChanged.alertMessage('success');
      setTimeout(() => {
        location.reload();
      }, 2000);
    } else {
      const errMes = new Message(`${res.error}`);
      errMes.alertMessage('error');
    } 
  });
}

if (location.pathname == '/banka/ui/admin/account-record.html') {
  const accountNumber = sessionStorage.getItem('accountDetail');
  const accNo = document.querySelector('#accNo');
  const email = document.querySelector('#email');
  const accBal = document.querySelector('#accBal');
  const accStatus = document.querySelector('#status');
  get(`${api}accounts/${accountNumber}`, `${admin.token}`).then((res) => {
    console.log(res);
    if(res.data) {
      const account = res.data;
      accNo.innerHTML = account.accountNumber;
      email.innerHTML = account.ownerEmail;
      accBal.innerHTML = `₦${parseFloat(account.balance).toLocaleString('en')}`;
      const table = document.querySelector('#transactions');
      if (account.status == 'active') {
        accStatus.innerHTML = `
                              <p>This account is active</p>
                              <button class="status-btn error-btn" onclick="changeStatus('dormant', ${account.accountNumber})">Deactivate Account</button>
        `;
      }
      else if (account.status == 'dormant') {
        accStatus.innerHTML = `
                              <p>This account is dormant</p>
                              <button class="status-btn success-btn" onclick="changeStatus('active', ${account.accountNumber})">Activate Account</button>
        `;
      }
      else if (account.status == 'draft'){
        accStatus.innerHTML = `
                              <p>This account is in drafts</p>
                              <button class="status-btn success-btn" onclick="changeStatus('active', ${account.accountNumber})">Activate Account</button>
        `;
      }
      get(`${api}accounts/${account.accountNumber}/transactions`, `${admin.token}`)
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
  });
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
  get(`${api}transactions/${id}`, `${admin.token}`).then((res) => {
    console.log(res);
    if (res.data) {
      const transaction = res.data;
      const date = formatDate(transaction.createdOn);
      tid.innerHTML = transaction.transactionId;
      tdate.innerHTML = date;
      ttype.innerHTML = transaction.type;
      tamount.innerHTML = `₦${formatNumber(transaction.amount)}`;
      tobalance.innerHTML = `₦${formatNumber(transaction.oldBalance)}`;
      tnbalance.innerHTML = `₦${formatNumber(transaction.newBalance)}`;
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

if (location.pathname == '/banka/ui/admin/users.html') {
  const usersTable = document.querySelector('#users');
  let role = '';
  get(`${api}users`, `${admin.token}`).then((res) => {
    console.log(res);
    if(res.data) {
      const users = res.data;
      users.map((user) => {
        console.log(user);
        if (user.type == 'client') {
          role = 'Client';
        }
        else if (user.type == 'staff' && user.isAdmin == false) {
          role = 'Staff';
        } 
        else {
          role = 'Admin';
        }
        console.log(role);

        usersTable.innerHTML += `<td>${user.id}</td>
                                <td>${user.firstName}</td>
                                <td>${user.lastName}</td>
                                <td>${user.email}</td>
                                <td>${role}</td>`;

      });
    } else {
      const noUsers = new Message(res.error);
      return noUsers.displayMessage('error');
    }
  });
}

// Add User
const addUser = (e) => {
  console.log('Register');
  e.preventDefault();
  const firstName = document.querySelector('#firstName').value;
  const lastName = document.querySelector('#lastName').value;
  const email = document.querySelector('#email').value;
  const isAdmin = document.querySelector('#isAdmin').value;
  const password = document.querySelector('#password').value;
  const type = 'staff';
  console.log(firstName, lastName, email, password);
  post(`${api}auth/signup`, {
    firstName,
    lastName,
    email,
    type,
    isAdmin,
    password
  }).then((res) => {
    console.log(res);
    if (res.status == 200) {
      const user = JSON.stringify(res.data);
      sessionStorage.setItem('user', user);
      const newUser = new Message(res.message);
      setTimeout(() => {
        location.reload();
      }, 2000);
      return newUser.alertMessage('success');
    }
    const signedUp = new Message(res.error);
    return signedUp.alertMessage('error');
  })
  .catch(err => console.log(err));
};
const addUserForm = document.querySelector('#addUserForm');
if(addUserForm) {
  addUserForm.addEventListener('submit', addUser);
}