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
      <td>${book.borrowedBy || ''}</td>
      <td>
        ${book.status === 'Free' ? `<button onclick="reserveBook(${index})">Reserve</button>` : ''}
        ${book.status === 'Reserved' && book.reservedBy === currentUser ? `<button onclick="borrowBook(${index})">Borrow</button> <button onclick="unreserveBook(${index})">Unreserve</button>` : ''}
        ${book.status === 'Borrowed' && book.borrowedBy === currentUser ? `<button onclick="returnBook(${index})">Return</button>` : ''}
        <button onclick="viewBookHistory(${index})">View History</button>
      </td>
    </tr>
  `).join('');

  bookList.innerHTML = html;
}

function reserveBook(index) {
  const books = JSON.parse(localStorage.getItem('books'));
  const book = books[index];
  const history = book.history || [];
  history.push({ status: book.status, date: new Date().toLocaleString() });
  book.status = 'Reserved';
  book.reservedBy = currentUser;
  book.history = history;
  localStorage.setItem('books', JSON.stringify(books));
  displayBooks();
}

function unreserveBook(index) {
  const books = JSON.parse(localStorage.getItem('books'));
  const book = books[index];
  const history = book.history || [];
  if (book.reservedBy === currentUser) {
    history.push({ status: book.status, date: new Date().toLocaleString() });
    book.status = 'Free';
    book.reservedBy = null;
    book.history = history;
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
  } else {
    alert('This book is not reserved by you.');
  }
}

function borrowBook(index) {
  const books = JSON.parse(localStorage.getItem('books'));
  const book = books[index];
  const history = book.history || [];
  if (book.reservedBy === currentUser) {
    history.push({ status: book.status, date: new Date().toLocaleString() });
    book.status = 'Borrowed';
    book.borrowedBy = currentUser;
    book.history = history;
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
  } else {
    alert('This book is not reserved by you.');
  }
}

function returnBook(index) {
  const books = JSON.parse(localStorage.getItem('books'));
  const book = books[index];
  const history = book.history || [];
  if (book.borrowedBy === currentUser) {
    history.push({ status: book.status, date: new Date().toLocaleString() });
    book.status = 'Free';
    book.reservedBy = null;
    book.borrowedBy = null;
    book.history = history;
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
  } else {
    alert('This book is not borrowed by you.');
  }
}

function viewBookHistory(index) {
  const books = JSON.parse(localStorage.getItem('books'));
  const book = books[index];
  const history = book.history || [];

  let html = '<h1>Book History</h1>';

  if (history.length === 0) {
    html += '<p>No history available for this book.</p>';
  } else {
    html += '<ul>';
    history.forEach(item => {
      html += `<li>${item.status} - ${item.date}</li>`;
    });
    html += '</ul>';
  }

  html += '<button onclick="goBack()">Return</button>';

  document.body.innerHTML = html;
}

function goBack() {
  window.history.back();
}

logoutButton.addEventListener('click', function() {
  // Remove currentUser from local storage upon logout
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
});

displayBooks();