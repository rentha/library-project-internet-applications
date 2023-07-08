const bookList = document.querySelector('#book-list tbody');
const form = document.querySelector('#book-form');
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const descInput = document.querySelector('#description-input');
const logoutButton = document.querySelector('#logout-button');
const returnButton = document.querySelector('#return-button');
const searchInput = document.querySelector('#search-input');
const searchForm = document.querySelector('#search-form');

function displayBooks() {
  const searchQuery = searchInput.value.toLowerCase();
  let books = JSON.parse(localStorage.getItem('books')) || [];

  let filteredBooks;

  if (searchQuery === '') {
    // Display all books if there's no search query
    filteredBooks = books;
  } else {
    // Filter books by the search query
    filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(searchQuery) ||
      book.author.toLowerCase().includes(searchQuery) ||
      book.description.toLowerCase().includes(searchQuery)
    );
  }

  const html = filteredBooks.map(book => `
    <tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.description}</td>
      <td>${book.status}</td>
      <td><button class="btn btn-danger btn-sm" data-title="${book.title}">Delete</button></td>
    </tr>
  `).join('');

  bookList.innerHTML = html;

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

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const title = titleInput.value;
  const author = authorInput.value;
  const description = descInput.value;
  const status = 'Free';

  const books = JSON.parse(localStorage.getItem('books')) || [];
  books.push({ title, author, description, status });
  localStorage.setItem('books', JSON.stringify(books));

  titleInput.value = '';
  authorInput.value = '';
  descInput.value = '';

  displayBooks();
});

logoutButton.addEventListener('click', function() {
  window.location.href = 'index.html';
});

returnButton.addEventListener('click', function() {
  window.location.href = 'adminPanel.html';
});

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  displayBooks();
});

displayBooks();