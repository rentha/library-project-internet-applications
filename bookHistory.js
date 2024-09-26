const historyText = document.getElementById('history-text');

function displayBookHistory() {
  const books = JSON.parse(localStorage.getItem('books')) || [];

  const bookIndex = new URLSearchParams(window.location.search).get('book');
  if (bookIndex !== null) {
    const book = books[bookIndex];
    const history = book.history || [];

    let text = '';
    history.forEach((entry, index) => {
      text += `Status ${index + 1}: ${entry.status}\n`;
      text += `Date/Time: ${entry.date}\n\n`;
    });

    historyText.textContent = text;
  } else {
    historyText.textContent = 'No book history available.';
  }
}

displayBookHistory();

function backo() {
  window.location.href = 'userPanel.html';
}