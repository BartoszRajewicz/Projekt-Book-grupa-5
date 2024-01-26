import { seeMoreButtonClick } from './seeMore';

const categoriesContainer = document.getElementById('categories');
const booksContainer = document.getElementById('books-container');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const popupTitle = document.querySelector('.book__title');
const popupAuthor = document.querySelector('.book__author');
const popupDescription = document.querySelector('.book__description');
const popupImg = document.querySelector('.book__img');
const amazonLink = document.querySelector('.icon-amazon');
const barenNobelLink = document.querySelector('.icon-barenNobel');
const shoppingListBtn = document.querySelector('.shopping-list-btn');
const receipt = document.querySelector('.add-receipt');
const selectedCategoryHeader = document.getElementById('selected-category-header');

let allCategoriesVisible = true;

fetchBookCategories();

function fetchBookCategories() {
  fetch('https://books-backend.p.goit.global/books/category-list')
    .then(response => response.json())
    .then(categories => {
      if (categories && categories.length > 0) {
        categories.forEach(category => {
          const categoryItem = document.createElement('div');
          categoryItem.classList.add('category-item');
          categoryItem.textContent = category.list_name;
          categoryItem.setAttribute('data-category', category.list_name);
          categoryItem.addEventListener('click', () =>
            handleCategoryClick(category.list_name, categoryItem),
          );
          categoriesContainer.appendChild(categoryItem);
        });
        fetchTopCategories();
      } else {
        console.error('Brak dostępnych kategorii.');
      }
    })
    .catch(error => console.error('Błąd podczas pobierania kategorii:', error));
}

const allCategoriesElement = document.querySelector('[data-category="All categories"]');

const handleAllCategoriesClick = () => {
  handleCategoryClick('All categories', allCategoriesElement);
};

allCategoriesElement.addEventListener('click', handleAllCategoriesClick);

function fetchTopCategories() {
  const topCategoriesEndpoint = 'https://books-backend.p.goit.global/books/top-books';

  fetch(topCategoriesEndpoint)
    .then(response => response.json())
    .then(topCategoriesData => {
      if (topCategoriesData && topCategoriesData.length > 0) {
        booksContainer.innerHTML = '';
        const categoriesList = document.createElement('div');
        categoriesList.classList.add('home_gallery');
        const bestSellersHeader = document.createElement('h2');
        bestSellersHeader.innerHTML = `
          <span class="category-header-black">Best Sellers</span>
          <span class="category-header-last-word">Books</span>
        `;
        bestSellersHeader.classList.add('best-sellers-header');
        categoriesList.appendChild(bestSellersHeader);
        topCategoriesData.slice(0, 4).forEach(category => {
          const categoryContainer = document.createElement('div');
          categoryContainer.classList.add('book-category', 'card');
          categoryContainer.setAttribute('data-category', category.list_name);

          const categoryName = category.list_name.split(' ');
          const lastWord = categoryName.pop();
          const categoryNameWithoutLastWord = categoryName.join(' ');

          const categoryHeader = document.createElement('h2');
          categoryHeader.innerHTML = `
            <span style="
              font-size: 14px;
              line-height: 24px;
              font-family: 'DM Sans', sans-serif;
              font-weight: 400;
              color: #B4AFAF;
              letter-spacing: 0.42px;
              text-transform: uppercase;">
              ${categoryNameWithoutLastWord}
            </span>
          `;
          categoryContainer.appendChild(categoryHeader);

          const booksList = document.createElement('div');
          booksList.classList.add('books-list', 'home_gallery');
          booksList.setAttribute('data-category', category.list_name);

          category.books.slice(0, 4).forEach(book => {
            const card = document.createElement('div');
            card.classList.add('book-card');
            card.innerHTML = `
              <div class="image-container">
                <img src="${book.book_image}" alt="${book.title}">
                <div class="quick-view-overlay">Quick View</div>
              </div>
              <div class="book-details">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
              </div>`;
            card.addEventListener('click', () => openPopup(book));

            card.addEventListener('mouseover', () => {
              const quickViewOverlay = card.querySelector('.quick-view-overlay');
              quickViewOverlay.style.opacity = 1;
              quickViewOverlay.style.transform = 'translateY(0)';
            });

            card.addEventListener('mouseout', () => {
              const quickViewOverlay = card.querySelector('.quick-view-overlay');
              quickViewOverlay.style.opacity = 0;
              quickViewOverlay.style.transform = 'translateY(100%)';
            });

            booksList.appendChild(card);
          });
          const seeMoreButton = document.createElement('button');
          seeMoreButton.textContent = 'See More';
          seeMoreButton.classList.add('see-more-button');
          seeMoreButton.addEventListener('click', () => seeMoreButtonClick(category.list_name));
          categoryContainer.appendChild(booksList);
          categoryContainer.appendChild(seeMoreButton);

          categoriesList.appendChild(categoryContainer);
        });

        booksContainer.appendChild(categoriesList);

        document.querySelectorAll('.book-category').forEach(category => {
          category.addEventListener('click', function () {
            const categoryName = this.getAttribute('data-category');
            const categoryBooksList = this.querySelector('.books-list');
            updateBooksList(categoryName, categoryBooksList);
            this.classList.add('quick-view-overlay');
          });
        });
      } else {
        console.error('Brak danych o najlepszych kategoriach.');
      }
    })
    .catch(error => console.error('Błąd podczas pobierania najlepszych kategorii:', error));
}

function handleCategoryClick(category, clickedElement) {
  const categoryHeader = document.getElementById('category-header');

  if (!categoryHeader) {
    console.error('Nie można odnaleźć elementu o identyfikatorze "category-header".');
    return;
  }

  document.querySelectorAll('.category-item').forEach(el => {
    el.classList.remove('active');
  });

  clickedElement.classList.add('active');

  const words = category.split(' ');
  const lastWord = words.pop();
  const categoryName = words.join(' ');
  const sanitizedCategory = category.replace(/\s+/g, '');

  if (category === 'All categories') {
    categoryHeader.innerHTML = '';
  } else {
    categoryHeader.innerHTML = `
      <span class="category-header-black">${categoryName}</span>
      <span class="category-header-last-word">${lastWord}</span>`;
  }

  allCategoriesVisible = false;
  selectedCategoryHeader.innerHTML = '';

  if (category === 'All categories') {
    fetchTopCategories();
  } else {
    fetchBooksByCategory(category);
  }
}

async function updateBooksList(category, booksListContainer) {
  try {
    const response = await fetch(
      `https://books-backend.p.goit.global/books/category?category=${category}`,
    );
    const books = await response.json();

    if (books && books.length > 0) {
      booksListContainer.innerHTML = '';

      books.slice(0, 4).forEach(book => {
        const card = createBookCard(book);
        card.addEventListener('click', () => openPopup(book));
        booksListContainer.appendChild(card);
      });
    } else {
      console.warn('Brak książek dla wybranej kategorii.');
    }
  } catch (error) {
    console.error('Błąd podczas pobierania książek:', error);
  }
}

function createBookCard(book) {
  const card = document.createElement('div');
  card.classList.add('book-card');

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container');
  const image = document.createElement('img');
  image.src = book.book_image;
  image.alt = book.title;
  imageContainer.appendChild(image);
  card.appendChild(imageContainer);

  const bookDetails = document.createElement('div');
  bookDetails.classList.add('book-details');
  const title = document.createElement('h3');
  title.textContent = book.title;
  const author = document.createElement('p');
  author.textContent = book.author;
  bookDetails.appendChild(title);
  bookDetails.appendChild(author);
  card.appendChild(bookDetails);

  return card;
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

    // booksContainer.style.display = 'grid';
  }
}

document.querySelectorAll('.book-category').forEach(category => {
  category.addEventListener('click', function () {
    const categoryName = this.getAttribute('data-category');
    const categoryBooksList = this.querySelector('.books-list');
    updateBooksList(categoryName, categoryBooksList);
  });
});

export function openPopup(book) {
  var arrBooks = JSON.parse(localStorage.getItem('shoppingList')) || [];

  var selectedBook = {
    id: book._id,
    author: book.author,
    img: book.book_image,
    description: book.description,
    title: book.title,
    amazonLink: book.buy_links[0].url,
    barenNobelLink: book.buy_links[2].url,
  };

  const isInArray = arrBooks.some(item => item.id === selectedBook.id);

  if (!isInArray) {
    shoppingListBtn.textContent = `Add to shopping list`;
    receipt.textContent = ``;
    shoppingListBtn.addEventListener(`click`, addBookToShoppingList);
  } else {
    shoppingListBtn.textContent = `Remove from the shopping list`;
    receipt.textContent = `Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.`;
    shoppingListBtn.addEventListener(`click`, removeBookFromShoppingList);
  }

  popupTitle.textContent = book.title;
  popupAuthor.textContent = book.author;
  popupDescription.textContent = book.description;
  popupImg.src = book.book_image;
  amazonLink.href = book.buy_links[0].url;
  barenNobelLink.href = book.buy_links[2].url;

  popup.style.display = 'block';

  function addBookToShoppingList() {
    arrBooks.push(selectedBook);
    localStorage.setItem('shoppingList', JSON.stringify(arrBooks));

    receipt.textContent = `Congratulations! You have added the book to the shopping list. To delete, press the button "Remove from the shopping list".`;
    shoppingListBtn.textContent = `Remove from the shopping list`;

    shoppingListBtn.addEventListener(`click`, removeBookFromShoppingList);
    shoppingListBtn.removeEventListener(`click`, addBookToShoppingList);
  }

  function removeBookFromShoppingList() {
    var newArrBooks = arrBooks.filter(obiekt => obiekt !== selectedBook);
    arrBooks = newArrBooks;
    localStorage.setItem('shoppingList', JSON.stringify(arrBooks));

    shoppingListBtn.textContent = `Add to shopping list`;
    receipt.textContent = ``;

    shoppingListBtn.addEventListener(`click`, addBookToShoppingList);
    shoppingListBtn.removeEventListener(`click`, removeBookFromShoppingList);
  }

  popupClose.addEventListener(`click`, closePopup);
  window.addEventListener(`click`, event => {
    if (event.target == popup) {
      closePopup();
    }
  });
  document.addEventListener(`keydown`, event => {
    if (event.key === `Escape`) {
      closePopup();
    }
  });
}

function closePopup() {
  popup.style.display = `none`;

  popupClose.removeEventListener(`click`, closePopup);
  window.removeEventListener(`click`, event => {
    if (event.target == popup) {
      closePopup();
    }
  });
  document.removeEventListener(`keydown`, event => {
    if (event.key === `Escape`) {
      closePopup();
    }
  });
}
