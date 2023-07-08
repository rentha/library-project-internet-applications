const bookList = document.querySelector('#book-list tbody');
const logoutButton = document.querySelector('#logout-button');

// Get the current user from local storage
let currentUser = localStorage.getItem('currentUser');

function displayBooks() {
  const books = JSON.parse(localStorage.getItem('books')) || [];

  const html = books.map((book, index) => `
    <tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.description}</td>
      <td>${book.status}</td>
      <td>
        ${book.status === 'Free' ? `<button onclick="reserveBook(${index})">Reserve</button>` : ''}
        ${book.status === 'Reserved' && book.reservedBy === currentUser ? `<button onclick="borrowBook(${index})">Borrow</button> <button onclick="unreserveBook(${index})">Unreserve</button>` : ''}
        ${book.status === 'Borrowed' && book.reservedBy === currentUser ? `<button onclick="returnBook(${index})">Return</button>` : ''}
      </td>
    </tr>
  `).join('');

  bookList.innerHTML = html;
}

function reserveBook(index) {
  const books = JSON.parse(localStorage.getItem('books'));
  books[index].status = 'Reserved';
  books[index].reservedBy = currentUser; // Record who reserved the book
  localStorage.setItem('books', JSON.stringify(books));
  displayBooks();
}

function unreserveBook(index) {
  const books = JSON.parse(localStorage.getItem('books'));
  if (books[index].reservedBy === currentUser) {
    books[index].status = 'Free';
    books[index].reservedBy = null; // Remove the reservedBy field
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
  } else {
    alert('This book is not reserved by you.');
  }
}

function borrowBook(index) {
  const books = JSON.parse(localStorage.getItem('books'));
  if (books[index].reservedBy === currentUser) {
    books[index].status = 'Borrowed';
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
  } else {
    alert('This book is not reserved by you.');
  }
}

function returnBook(index) {
  const books = JSON.parse(localStorage.getItem('books'));
  if (books[index].reservedBy === currentUser) {
    books[index].status = 'Free';
    books[index].reservedBy = null; // Remove the reservedBy field
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
  } else {
    alert('This book is not borrowed by you.');
  }
}

logoutButton.addEventListener('click', function() {
  // Remove currentUser from local storage upon logout
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
});

displayBooks();