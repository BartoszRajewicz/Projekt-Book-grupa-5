import { trashSvg } from './charitiesExport';

const objShop = {
  Amazon: 'https://www.amazon.com',
  'Barnes and Noble': 'https://www.barnesandnoble.com',
  Trash: trashSvg,
};

const refs = {
  shoppingList: document.querySelector('.shopping-list'),
  emptyList: document.querySelector('.empty-list'),
};

let arrSelectedBooks = checkLocalStorage() || [];
const itemsPerPage = 4;
let currentPage = 1;

document.addEventListener('DOMContentLoaded', function () {
  showPage(arrSelectedBooks);
  updatePaginationButtons();

  document.querySelector('.pagination').addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
      const direction = event.target.dataset.direction;
      navigateTo(direction);
    }
  });
});

function showPage(arrSelectedBooks) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = arrSelectedBooks.slice(startIndex, endIndex);

  markupShoppingList(itemsToShow);
  updatePaginationButtons();

  const emptyList = document.querySelector('.empty-list');
  emptyList.style.display = arrSelectedBooks.length === 0 ? 'block' : 'none';
}

function markupShoppingList(arrSelectedBooks) {
  const { shoppingList, emptyList } = refs;

  let listMarkup = '';
  if (arrSelectedBooks.length > 0) {
    listMarkup = arrSelectedBooks
      .map(({ id, title, author, img, description, amazonLink, barenNobelLink }) => {
        return `
        <li class="shoplist-item" data-idcard="${id}" data-amazon-link="${amazonLink}" data-baren-link="${barenNobelLink}">
        <div class="delete-container" data-id="${id}">
              <div class="delate-btn" data-id="${id}">
                ${getImages('trash').outerHTML}
              </div>
            </div>
            <div class="shop-container">
              <div class="card-shoplist">
                <div class="img-list">${
                  img ? createImageElement(img, title, 100, 142).outerHTML : ''
                }</div>
                <div class="card-descrip">
                  <h2 class="card-title-shoplist">${title}</h2>
                  <p class="card-category-shoplist">${title || 'No Title'}</p>
                  <p class="card-description-shoplist">${description}</p>
                  <div class="wrapper-card-shoplist-footer">
                    <p class="card-author-shoplist">${author}</p>
                    <div class="trading-platform-icons" id="trading-platform-icons-${id}">
                      <a href="#" class="icon-amazon" data-url="${amazonLink}"></a>
                      <a href="#" class="icon-barenNobel" data-url="${barenNobelLink}"></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>`;
      })
      .join('');
  } else {
    const emptyMessage = document.createElement('p');
    emptyMessage.classList.add('empty-message');
    emptyMessage.textContent = 'Ta strona jest pusta, dodaj kilka książek i przejdź do zamówienia.';
    emptyList.appendChild(emptyMessage);
  }

  shoppingList.innerHTML = listMarkup;

  arrSelectedBooks.forEach(({ id, amazonLink, barenNobelLink }) => {
    const delateButton = document.querySelector(`.delate-btn[data-id="${id}"]`);
    delateButton.addEventListener('click', onClickDelate);

    const amazonIcon = document.querySelector(`#trading-platform-icons-${id} .icon-amazon`);
    const barenNobelIcon = document.querySelector(`#trading-platform-icons-${id} .icon-barenNobel`);

    amazonIcon.addEventListener('click', createShopIconClickListener(amazonLink, barenNobelLink));
    barenNobelIcon.addEventListener(
      'click',
      createShopIconClickListener(amazonLink, barenNobelLink),
    );
  });
}

function createShopIconClickListener(amazonLink, barenNobelLink) {
  return event => handleShopItemClick(event, amazonLink, barenNobelLink);
}
function handleShopItemClick(event, amazonLink, barenNobelLink) {
  event.preventDefault();

  if (amazonLink) {
    window.open(amazonLink, '_blank');
  } else if (barenNobelLink) {
    window.open(barenNobelLink, '_blank');
  }
}

function updatePaginationButtons() {
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  if (arrSelectedBooks.length === 0) {
    pagination.style.display = 'none';
    return;
  }

  pagination.style.display = 'block';

  const totalPages = Math.ceil(arrSelectedBooks.length / itemsPerPage);

  const buttonFirst = createPaginationButton('«', 'first');
  const buttonPrev = createPaginationButton('‹', 'prev');

  pagination.appendChild(buttonFirst);
  pagination.appendChild(buttonPrev);

  if (window.innerWidth < 768) {
    const dotsButton = createPaginationButton('...', null, true);

    if (totalPages > 2) {
      if (currentPage === 1) {
        pagination.appendChild(createPaginationButton(1, 1));
        pagination.appendChild(createPaginationButton(2, 2));
        pagination.appendChild(dotsButton);
      } else if (currentPage === totalPages) {
        pagination.appendChild(dotsButton);
        pagination.appendChild(createPaginationButton(currentPage - 1, currentPage - 1));
        pagination.appendChild(createPaginationButton(currentPage, currentPage));
      } else {
        pagination.appendChild(dotsButton);
        pagination.appendChild(createPaginationButton(currentPage, currentPage));
        pagination.appendChild(createPaginationButton(currentPage + 1, currentPage + 1));
        pagination.appendChild(dotsButton);
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        const button = createPaginationButton(i, i);
        pagination.appendChild(button);
      }
    }
  } else {
    const dotsButton = createPaginationButton('...', null, true);

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        const button = createPaginationButton(i, i);
        pagination.appendChild(button);
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= 3; i++) {
          const button = createPaginationButton(i, i);
          pagination.appendChild(button);
        }
        pagination.appendChild(dotsButton);
      } else if (currentPage >= totalPages - 1) {
        pagination.appendChild(dotsButton);
        for (let i = totalPages - 2; i <= totalPages; i++) {
          const button = createPaginationButton(i, i);
          pagination.appendChild(button);
        }
      } else {
        pagination.appendChild(dotsButton);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          const button = createPaginationButton(i, i);
          pagination.appendChild(button);
        }
        pagination.appendChild(dotsButton);
      }
    }
  }

  const buttonNext = createPaginationButton('›', 'next');
  const buttonLast = createPaginationButton('»', 'last');

  pagination.appendChild(buttonNext);
  pagination.appendChild(buttonLast);

  buttonNext.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      updatePaginationButtons();
    }
  });

  buttonLast.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage = totalPages;
      updatePaginationButtons();
    }
  });

  buttonPrev.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      updatePaginationButtons();
    }
  });

  buttonFirst.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage = 1;
      updatePaginationButtons();
    }
  });
}

window.addEventListener('resize', updatePaginationButtons);

updatePaginationButtons();

function createPaginationButton(label, direction, disabled = false) {
  const button = document.createElement('button');
  button.textContent = label;
  button.dataset.direction = direction;
  if (disabled) {
    button.disabled = true;
  } else {
    button.onclick = () => {
      navigateTo(direction);
      updatePaginationButtons();
    };
  }

  if (label === currentPage) {
    button.classList.add('active');
  }

  return button;
}

function navigateTo(direction) {
  switch (direction) {
    case 'first':
      currentPage = 1;
      break;
    case 'prev':
      if (currentPage > 1) {
        currentPage--;
      }
      break;
    case 'next':
      const totalPages = Math.ceil(arrSelectedBooks.length / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
      }
      break;
    case 'last':
      const totalPagesLast = Math.ceil(arrSelectedBooks.length / itemsPerPage);
      currentPage = totalPagesLast;
      break;
    default:
      currentPage = parseInt(direction);
  }

  showPage(arrSelectedBooks);
  updatePaginationButtons();
}

function onClickDelate(event) {
  const id = event.currentTarget.dataset.id;

  arrSelectedBooks = arrSelectedBooks.filter(book => book.id !== id);

  localStorage.setItem('shoppingList', JSON.stringify(arrSelectedBooks));

  const liRef = event.currentTarget.parentNode.parentNode;
  liRef.remove();

  if (arrSelectedBooks.length === 0) {
    refs.emptyList.style.display = 'block';
    refs.shoppingList.style.display = 'none';
  } else {
    refs.emptyList.style.display = 'none';
    refs.shoppingList.style.display = 'flex';
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const remainingItemsOnPage = arrSelectedBooks.slice(startIndex, endIndex);

  if (remainingItemsOnPage.length === 0 && currentPage > 1) {
    currentPage--;
  }

  showPage(arrSelectedBooks);
}

function getImages(name) {
  switch (name) {
    case 'trash':
      return createImageElement(objShop.Trash, 'Delete Icon', 16, 16);
    case 'amazon':
      return createImageElement(objShop.Amazon, 'Amazon Logo', 32, 11);
    case 'baren':
      return createImageElement(objShop['Barnes and Noble'], 'Barnes and Noble Logo', 16, 16);
    default:
      return '';
  }
}

function createImageElement(src, alt, width, height, amazonLink, barenNobelLink) {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.width = width;
  img.height = height;

  img.dataset.amazonLink = amazonLink;
  img.dataset.barenNobelLink = barenNobelLink;

  img.addEventListener('click', handleImageClick);

  return img;
}

function handleImageClick(event) {
  const amazonLink = event.target.dataset.amazonLink;
  const barenNobelLink = event.target.dataset.barenNobelLink;

  if (amazonLink) {
    window.open(amazonLink, '_blank');
  } else if (barenNobelLink) {
    window.open(barenNobelLink, '_blank');
  }
}

function checkLocalStorage() {
  let arrBooks = JSON.parse(localStorage.getItem('shoppingList')) || [];
  arrBooks = arrBooks.map(book => ({
    ...book,
    amazonLink: book.amazonLink || objShop.Amazon,
    barenNobelLink: book.barenNobelLink || objShop['Barnes and Noble'],
  }));
  return arrBooks;
}
