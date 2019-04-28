// Handle sign up
const signUp = () => {
  console.log('Register');
  const firstName = document.querySelector('#firstName').value;
  const lastName = document.querySelector('#lastName').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  console.log(firstName, lastName, email, password);
  post(`${api}auth/signup`, {
    firstName,
    lastName,
    email,
    password
  }).then((res) => {
    console.log(res);
    if (res.status == 200) {
      const user = JSON.stringify(res.data);
      sessionStorage.setItem('user', user);
      const signedUp = new Message(res.message);
      setTimeout(() => {
        location.assign('/client/dashboard.html');
      }, 2000);
      return signedUp.alertMessage('success');
    }
    const signedUp = new Message(res.error);
    return signedUp.alertMessage('error');
  })
  .catch(err => console.log(err));
};
const registerBtn = document.querySelector('#register');
if(registerBtn) {
  registerBtn.addEventListener('click', signUp);
}

// Handle signIn
const login = () => {
  console.log('Login');
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  console.log(email, password);
  post(`${api}auth/signin`, {
    email,
    password
  }).then((res) => {
    console.log(res);
    if (res.status == 200) {
      const user = JSON.stringify(res.data);
      const signedIn = new Message(res.message);
      if (res.data.type == 'client') {
        sessionStorage.setItem('user', user);
        setTimeout(() => {
          location.assign('/client/dashboard.html');
        }, 2000);
      }
      else if(res.data.type == 'staff' && res.data.isAdmin == false) {
        sessionStorage.setItem('staff', user);
        setTimeout(() => {
          location.assign('/staff/dashboard.html');
        }, 2000);
      }
      else if(res.data.type == 'staff' && res.data.isAdmin == true) {
        sessionStorage.setItem('admin', user);
        setTimeout(() => {
          location.assign('/admin/dashboard.html');
        }, 2000);
      }
      return signedIn.alertMessage('success');
    }
    const signedIn = new Message(res.error);
    return signedIn.alertMessage('error');
  })
  .catch(err => console.log(err));
};
const loginBtn = document.querySelector('#login');
if(loginBtn) {
  loginBtn.addEventListener('click', login);
}