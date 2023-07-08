const form = document.querySelector('form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const clearStorageButton = document.querySelector('#clear-storage');

// Check username and password and redirect to admin.html if they are correct
function login(event) {
  event.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    // Save the current user to local storage
    localStorage.setItem('currentUser', username);

    if (user.role === 'admin') {
      window.location.href = 'adminPanel.html';
    } else {
      window.location.href = 'userPanel.html';
    }
  } else {
    alert('Incorrect username or password');
  }
}

form.addEventListener('submit', login);

// Add admin only if it doesn't already exist
const staticAdmin = { username: 'Andrzej Nowak', password: 'password123', role: 'admin' };

const users = JSON.parse(localStorage.getItem('users')) || [];

let userExists = users.some(user => user.username === staticAdmin.username);
if (!userExists) {
  users.push(staticAdmin);
  localStorage.setItem('users', JSON.stringify(users));
}

// Add user/reader only if it doesn't already exist
const staticReader = { username: 'Jan Kowaliński', password: 'password123', role: 'reader' };

userExists = users.some(user => user.username === staticReader.username);
if (!userExists) {
  users.push(staticReader);
  localStorage.setItem('users', JSON.stringify(users));
}

clearStorageButton.addEventListener('click', function() {
  localStorage.clear();
  alert('Local storage cleared!');
});