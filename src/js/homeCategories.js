document.addEventListener('DOMContentLoaded', function () {
  const categoriesContainer = document.getElementById('categories');
  const booksContainer = document.getElementById('books-container');
  const popup = document.getElementById('popup');
  const popupBookInfo = document.getElementById('popupBookInfo');
  const popupClose = document.getElementById('popupClose');
  const addToShoppingListBtn = document.getElementById('addToShoppingListBtn');
  const categoryHeader = document.getElementById('category-header');

  fetchBookCategories();

  function fetchBookCategories() {
    fetch('https://books-backend.p.goit.global/books/category-list')
      .then(response => response.json())
      .then(categories => {
        categories.forEach(category => {
          const categoryItem = document.createElement('div');
          categoryItem.classList.add('category-item');
          categoryItem.textContent = category.list_name;
          categoryItem.addEventListener('click', () =>
            handleCategoryClick(category.list_name, categoryItem),
          );
          categoriesContainer.appendChild(categoryItem);
        });
        if (categories.length > 0) {
          handleCategoryClick(categories[0].list_name, categoriesContainer.children[0]);
        }
      })
      .catch(error => console.error('Błąd podczas pobierania kategorii:', error));
  }

  function handleCategoryClick(category, clickedElement) {
    document.querySelectorAll('.category-item').forEach(el => {
      el.classList.remove('active');
    });

    clickedElement.classList.add('active');

    // Ustawienie tytułu kategorii w nagłówku
    const words = category.split(' ');
    const lastWord = words.pop();
    const categoryName = words.join(' ');

    categoryHeader.innerHTML = `
      <span class="category-header-black">${categoryName}</span>
      <span class="category-header-last-word">${lastWord}</span>`;

    fetchBooksByCategory(category);
  }

  function fetchBooksByCategory(category) {
    booksContainer.innerHTML = '';

    fetch(`https://books-backend.p.goit.global/books/category?category=${category}`)
      .then(response => response.json())
      .then(books => {
        if (!books || books.length === 0) {
          alert('Brak książek dla wybranej kategorii.');
        } else {
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
        }
      })
      .catch(error => console.error('Błąd podczas pobierania książek:', error));
    booksContainer.style.display = 'grid';
  }

  function openPopup(book) {
    popupBookInfo.innerHTML = `
          <img class="book__img" src="${book.book_image}" alt="${book.title}">
          <div class="book-info__flex">
              <h4 class="book__title">${book.title}</h4>
              <p class="book__author">${book.author}</p>
              <p class="book__description">${book.description}</p>
              <div class="trading-platform-icons">
                  <div></div>
                  <div></div>
              </div>
          </div>`;

    popup.style.display = 'block';
    popupClose.addEventListener('click', closePopup);
  }

  function closePopup() {
    popup.style.display = 'none';
    popupClose.removeEventListener('click', closePopup);
    addToShoppingListBtn.removeEventListener('click', addToShoppingList);
  }
});
