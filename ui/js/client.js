// Get user details
const client = JSON.parse(sessionStorage.getItem('user'));
console.log(location.pathname);

if (location.pathname == '/client/dashboard.html') {
  const welcomeText = document.querySelector('#welcomeText');
  welcomeText.innerHTML = `<i>Welcome <b>${client.firstName}</b>!
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