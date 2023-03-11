const bookList = document.querySelector('#book-list tbody');
const form = document.querySelector('#book-form');
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const descInput = document.querySelector('#description-input');
const logoutButton = document.querySelector('#logout-button');

// Display all books
function displayBooks() {
  const books = JSON.parse(localStorage.getItem('books')) || [];

  const html = books.map(book => `
    <tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.description}</td>
      <td><button class="btn btn-danger btn-sm" data-title="${book.title}">Delete</button></td>
    </tr>
  `).join('');

  bookList.innerHTML = html;

  // Add event listeners to delete buttons
  const deleteButtons = document.querySelectorAll('[data-title]');
  for (const button of deleteButtons) {
    button.addEventListener('click', function() {
      const title = this.dataset.title;

      const books = JSON.parse(localStorage.getItem('books')) || [];

      const filteredBooks = books.filter(book => book.title !== title);

      localStorage.setItem('books', JSON.stringify(filteredBooks));

      displayBooks();
    });
  }
}

// Add new book
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const title = titleInput.value;
  const author = authorInput.value;
  const description = descInput.value;

  const books = JSON.parse(localStorage.getItem('books')) || [];

  books.push({ title, author, description });

  localStorage.setItem('books', JSON.stringify(books));

  titleInput.value = '';
  authorInput.value = '';
  descInput.value = '';

  displayBooks();
});

// Logout
logoutButton.addEventListener('click', function() {
  window.location.href = 'index.html';
});

displayBooks();