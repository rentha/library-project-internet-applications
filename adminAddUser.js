document.addEventListener('DOMContentLoaded', function() {
  const userList = document.querySelector('#user-list');
  const addUserForm = document.querySelector('#add-user-form');
  const newUsernameInput = document.querySelector('#new-username');
  const newPasswordInput = document.querySelector('#new-password');
  const newRoleInput = document.querySelector('#new-role');
  const logoutButton = document.querySelector('#logout-button');
  const returnButton = document.querySelector('#return-button');
  const searchInput = document.querySelector('#search-input');
  const searchForm = document.querySelector('#search-form');

  // Display all users
  function displayUsers(users) {
    const html = users.map(user => `
      <tr>
        <td>${user.username}</td>
        <td>${user.password}</td>
        <td>${user.role}</td>
        <td><button class="btn btn-danger btn-sm" data-username="${user.username}">Delete</button></td>
      </tr>
    `).join('');

    userList.innerHTML = html;

    const deleteButtons = document.querySelectorAll('[data-username]');
    for (const button of deleteButtons) {
      button.addEventListener('click', function() {
        const username = this.dataset.username;
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const filteredUsers = users.filter(user => user.username !== username);
        localStorage.setItem('users', JSON.stringify(filteredUsers));
        displayUsers(filteredUsers);
      });
    }
  }

  function searchUsers(users) {
    const searchQuery = searchInput.value.toLowerCase();

    if (searchQuery === '') {
      displayUsers(users);
      return;
    }

    const filteredUsers = users.filter(user =>
      user.username.toLowerCase().includes(searchQuery) ||
      user.role.toLowerCase().includes(searchQuery)
    );

    displayUsers(filteredUsers);
  }

  function addUser() {
    const username = newUsernameInput.value;
    const password = newPasswordInput.value;
    const role = newRoleInput.value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, password, role });
    localStorage.setItem('users', JSON.stringify(users));

    newUsernameInput.value = '';
    newPasswordInput.value = '';
    newRoleInput.value = '';

    displayUsers(users);
  }

  addUserForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addUser();
  });

  logoutButton.addEventListener('click', function() {
    window.location.href = 'index.html';
  });

  returnButton.addEventListener('click', function() {
    window.location.href = 'adminPanel.html';
  });

  searchForm.addEventListener('input', function(event) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    searchUsers(users);
  });

  const users = JSON.parse(localStorage.getItem('users')) || [];
  displayUsers(users);
});