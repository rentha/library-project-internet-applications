const userList = document.querySelector('#user-list');
const form = document.querySelector('form');
const newUsernameInput = document.querySelector('#new-username');
const newPasswordInput = document.querySelector('#new-password');
const newRoleInput = document.querySelector('#new-role'); // new
const logoutButton = document.querySelector('#logout-button');
const returnButton = document.querySelector('#return-button');

// Display all users
function displayUsers() {
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const html = users.map(user => `
    <tr>
      <td>${user.username}</td>
      <td>${user.password}</td>
      <td>${user.role}</td> <!-- new -->
      <td><button class="btn btn-danger btn-sm" data-username="${user.username}">Delete</button></td>
    </tr>
  `).join('');

  userList.innerHTML = html;

  // Add event listeners to delete buttons
  const deleteButtons = document.querySelectorAll('[data-username]');
  for (const button of deleteButtons) {
    button.addEventListener('click', function() {
      const username = this.dataset.username;

      const users = JSON.parse(localStorage.getItem('users')) || [];

      const filteredUsers = users.filter(user => user.username !== username);

      localStorage.setItem('users', JSON.stringify(filteredUsers));

      displayUsers();
    });
  }
}

// Add new user
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const username = newUsernameInput.value;
  const password = newPasswordInput.value;
  const role = newRoleInput.value; // new

  const users = JSON.parse(localStorage.getItem('users')) || [];

  users.push({ username, password, role }); // new

  localStorage.setItem('users', JSON.stringify(users));

  newUsernameInput.value = '';
  newPasswordInput.value = '';
  newRoleInput.value = ''; // new

  displayUsers();
});

// Logout
logoutButton.addEventListener('click', function() {
  window.location.href = 'index.html';
  });
// Return
returnButton.addEventListener('click', function() {
  window.location.href = 'adminPanel.html';
});

displayUsers();