import { openPopup } from './homeCategories';
const booksContainer = document.getElementById('books-container');
const selectedCategoryHeader = document.getElementById('selected-category-header');

export function seeMoreButtonClick(category) {
  const encodedCategory = encodeURIComponent(category);

  selectedCategoryHeader.innerHTML = getFormattedCategoryHeader(category);

  fetchBooksByCategory(category);
}

function fetchBooksByCategory(category) {
  booksContainer.innerHTML = '';

  if (category !== 'All categories') {
    fetch(`https://books-backend.p.goit.global/books/category?category=${category}`)
      .then(response => response.json())
      .then(books => {
        if (books && books.length > 0) {
          books.forEach(book => {
            const card = document.createElement('div');
            card.classList.add('book-card');

            card.innerHTML = `
                <img src="${book.book_image}" alt="${book.title}">
                <div class="book-details">
                  <h3>${book.title}</h3>
                  <p>${book.author}</p>
                </div>`;
            card.addEventListener('click', () => openPopup(book));
            booksContainer.appendChild(card);
          });
        } else {
          console.warn('Brak książek dla wybranej kategorii.');
        }
      })
      .catch(error => console.error('Błąd podczas pobierania książek:', error));
  }
}

function getFormattedCategoryHeader(category) {
  const words = category.split(' ');
  const lastWord = words.pop();
  const categoryName = words.join(' ');
  return `
    <span class="category-header-black">${categoryName}</span>
    <span class="category-header-last-word">${lastWord}</span>`;
}
