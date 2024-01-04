document.addEventListener('DOMContentLoaded', function () {
  const allCategoriesHeader = document.getElementById('all-categories-header');
  const categoriesContainer = document.getElementById('categories');
  const popularCategoriesContainer = document.getElementById('popular-categories-container');
  const booksContainer = document.getElementById('books-container');
  const popup = document.querySelector('.popup');
  const popupClose = document.querySelector('.popup__close');
  const popupTitle = document.querySelector('.book__title');
  const popupAuthor = document.querySelector('.book__author');
  const popupDescription = document.querySelector('.book__description');
  const popupImg = document.querySelector('.book__img');
  const amazonLink = document.querySelector(`.trading-platform-amazon`);
  const barenNobelLink = document.querySelector(`.trading-platform-barenNobel`);
  const shoppingListBtn = document.querySelector('.shopping-list-btn');
  const shoppingList = document.querySelector(`.shopping-list`);

  fetchBookCategories();

  if (window.location.pathname.includes('index.html')) {
    allCategoriesHeader.classList.add('active');
    allCategoriesHeader.style.color = '#4f2ee8';
  }

  allCategoriesHeader.addEventListener('click', () => {
    allCategoriesHeader.classList.add('active');
    allCategoriesHeader.style.color = '#4f2ee8';
    document.querySelectorAll('.category-item').forEach(el => {
      if (el !== allCategoriesHeader) {
        el.classList.remove('active');
        el.style.color = '';
      }
    });

    window.location.href = './index.html';
  });

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
      el.style.color = '';
    });

    clickedElement.classList.add('active');
    clickedElement.style.color = '#4f2ee8';

    const categoryLink =
      category === 'Wszystkie kategorie'
        ? 'https://books-backend.p.goit.global/books/top-books'
        : `https://books-backend.p.goit.global/books/category?category=${category}`;

    fetchBooksByCategory(categoryLink);
  }

  function fetchBooksByCategory(category) {
    booksContainer.innerHTML = '';

    fetch(category)
      .then(response => response.json())
      .then(books => {
        if (!books || books.length === 0) {
          alert('Nie znaleziono książek dla wybranej kategorii.');
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
            card.addEventListener('click', () => openBookModal(book));
            booksContainer.appendChild(card);
          });
        }
      })
      .catch(error => console.error('Błąd podczas pobierania książek:', error));
  }

  function openBookModal(book) {
    popupTitle.textContent = book.title;
    popupAuthor.textContent = book.author;
    popupDescription.textContent = book.description;
    popupImg.src = book.book_image;
    amazonLink.href = book.buy_links[0].url;
    barenNobelLink.href = book.buy_links[2].url;
    popup.style.display = 'block';
  }

  popupClose.addEventListener('click', () => {
    popup.style.display = 'none';
  });
  document.addEventListener(`keydown`, event => {
    if (event.key === `Escape`) {
      popup.style.display = `none`;
    }
  });
  window.addEventListener(`click`, event => {
    if (event.target == popup) {
      popup.style.display = `none`;
    }
  });

  function addAndRemove(book) {
    const receipt = document.querySelector(`.add-receipt`);

    if (shoppingListBtn.textContent === 'Add to shopping list') {
      shoppingListBtn.textContent = 'Remove from the shopping list';
      receipt.textContent =
        'Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.';
    } else {
      shoppingListBtn.textContent = 'Add to shopping list';
      receipt.textContent = '';
    }
  }
  shoppingListBtn.addEventListener(`click`, addAndRemove);
});
