document.addEventListener('DOMContentLoaded', function () {
  const allCategoriesHeader = document.getElementById('all-categories-header');
  const categoriesContainer = document.getElementById('categories');
  const popularCategoriesContainer = document.getElementById('popular-categories-container');
  const booksContainer = document.getElementById('books-container');

  fetchBookCategories();

  allCategoriesHeader.addEventListener('click', () => {
    booksContainer.style.display =
      booksContainer.style.display === 'none' || booksContainer.style.display === ''
        ? 'grid'
        : 'none';
    popularCategoriesContainer.style.display =
      popularCategoriesContainer.style.display === 'none' ||
      popularCategoriesContainer.style.display === ''
        ? 'block'
        : 'none';
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

      .catch(error => console.error('Error fetching categories:', error));
  }

  function handleCategoryClick(category, clickedElement) {
    document.querySelectorAll('.category-item').forEach(el => {
      el.classList.remove('active');
    });

    clickedElement.classList.add('active');

    fetchBooksByCategory(category);
  }

  function fetchBooksByCategory(category) {
    booksContainer.innerHTML = '';

    fetch(`https://books-backend.p.goit.global/books/category?category=${category}`)
      .then(response => response.json())
      .then(books => {
        if (!books || books.length === 0) {
          alert('No books found for the selected category.');
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
            booksContainer.appendChild(card);
          });
        }
      })
      .catch(error => console.error('Error fetching books:', error));
    booksContainer.style.display = 'grid';
    popularCategoriesContainer.style.display = 'none';
  }
});
