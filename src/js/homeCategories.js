document.addEventListener('DOMContentLoaded', function () {
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
  const receipt = document.querySelector(`.add-receipt`);

  const categoryHeader = document.getElementById('category-header');
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
          fetchBooksByCategory('All categories');
        } else {
          console.error('Brak dostępnych kategorii.');
        }
      })
      .catch(error => console.error('Błąd podczas pobierania kategorii:', error));
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

    categoryHeader.innerHTML = `
      <span class="category-header-black">${categoryName} </span>
      <span class="category-header-last-word">${lastWord}</span>`;

    allCategoriesVisible = false;
    selectedCategoryHeader.innerHTML = '';

    if (category !== 'All categories') {
      fetchBooksByCategory(category);
    }
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

  function openPopup(book) {
    popupTitle.textContent = book.title;
    popupAuthor.textContent = book.author;
    popupDescription.textContent = book.description;
    popupImg.src = book.book_image;
    amazonLink.href = book.buy_links[0].url;
    barenNobelLink.href = book.buy_links[2].url;

    popup.style.display = 'block';

    var arrBooks = JSON.parse(localStorage.getItem('shoppingList')) || [];

    function addBookToShoppingList() {
      arrBooks.push(selectedBook);
      localStorage.setItem('shoppingList', JSON.stringify(arrBooks));

      receipt.textContent = `Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.`;
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

    const isInArray = arrBooks.includes(JSON.stringify(selectedBook));

    if (!isInArray) {
      shoppingListBtn.textContent = `Add to shopping list`;
      receipt.textContent = ``;
      shoppingListBtn.addEventListener(`click`, addBookToShoppingList);
    }

    if (isInArray) {
      shoppingListBtn.textContent = `Remove from the shopping list`;
      receipt.textContent = `Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.`;
      shoppingListBtn.addEventListener(`click`, removeBookFromShoppingList);
    }

    var selectedBook = {
      id: book._id,
      author: book.author,
      img: book.book_image,
      description: book.description,
      title: book.title,
      amazonLink: book.buy_links[0].url,
      barenNobelLink: book.buy_links[2].url,
    };

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
});
