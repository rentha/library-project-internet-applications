const bookList = document.querySelector('#book-list tbody');
const form = document.querySelector('#book-form');
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const descInput = document.querySelector('#description-input');
const logoutButton = document.querySelector('#logout-button');
const returnButton = document.querySelector('#return-button');

// Display all books
// Display all books
function displayBooks() {
  let books = JSON.parse(localStorage.getItem('books')) || [];

  // Add example books if no books exist
  if (books.length === 0) {
    books = [
      { title: 'Book 1', author: 'Author 1', description: 'Description 1', status: 'Free' },
      { title: 'Book 2', author: 'Author 2', description: 'Description 2', status: 'Borrowed' },
      { title: 'Book 3', author: 'Author 3', description: 'Description 3', status: 'Free' },
      { title: 'Book 4', author: 'Author 4', description: 'Description 4', status: 'Reserved' },
      { title: 'Book 5', author: 'Author 5', description: 'Description 5', status: 'Free' },
    ];
    localStorage.setItem('books', JSON.stringify(books));
  }

  const html = books.map(book => `
    <tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.description}</td>
      <td>${book.status}</td>
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
  const status = 'Free'; // New books are always free

  const books = JSON.parse(localStorage.getItem('books')) || [];

  books.push({ title, author, description, status });

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

// Return
returnButton.addEventListener('click', function() {
  window.location.href = 'adminPanel.html';
});

displayBooks();