const form = document.querySelector('form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');

// Check username and password and redirect to admin.html if they are correct
function login(event) {
  event.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    window.location.href = 'admin.html';
  } else {
    alert('Incorrect username or password');
  }
}

form.addEventListener('submit', login);