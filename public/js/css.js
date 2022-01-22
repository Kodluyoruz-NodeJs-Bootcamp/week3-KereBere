const toggleClicks = document.querySelectorAll('.bar-toggle');
const formCon = document.querySelector('.container');
let isRegFormEnabled = localStorage.getItem('registerForm');

const enabeRegisterForm = () => {
  formCon.classList.add('active');
  localStorage.setItem('registerForm', 'enabled');
};
const disableRegisterForm = () => {
  formCon.classList.remove('active');
  localStorage.setItem('registerForm', 'disabled');
};

if (isRegFormEnabled === 'enabled') {
  enabeRegisterForm(); // Set state on load
}
toggleClicks.forEach((item) => {
  item.addEventListener('click', (e) => {
    isRegFormEnabled = localStorage.getItem('registerForm');
    if (isRegFormEnabled === 'disabled' || !isRegFormEnabled) {
      enabeRegisterForm();
    } else {
      disableRegisterForm();
    }
  });
});

const toggleLogin = document.querySelector('.toggle-login');
const toggleRegister = document.querySelector('.toggle-register');

toggleRegister.addEventListener('click', function () {
  formCon.classList.add('active');
  localStorage.setItem('registerForm', 'enabled');
});
toggleLogin.addEventListener('click', function () {
  formCon.classList.remove('active');
  localStorage.setItem('registerForm', 'disabled');
});
