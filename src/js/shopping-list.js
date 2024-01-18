import { trashSvg, amazon, baren } from './charitiesExport';

const objShop = {
  Amazon: amazon,
  'Barnes and Noble': baren,
  Trash: trashSvg,
};

export const refs = {
  shoppingList: document.querySelector('.shopping-list'),
  emptyList: document.querySelector('.empty-list'),
  shoppingListBtn: document.querySelector('.shopping-list-btn'),
};

function createImageElement(src, alt, width, height) {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.width = width;
  img.height = height;
  return img;
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

const { shoppingList, emptyList } = refs;

let arrSelectedBooks = checkLocalStorage() || [];

if (arrSelectedBooks.length !== 0) {
  hiddenOrVisual('none', 'flex');
  markupShoppingList(arrSelectedBooks);
} else {
  hiddenOrVisual('block', 'none');
}

export function hiddenOrVisual(statusForEmptyList, statusForShoppingList) {
  emptyList.style.display = statusForEmptyList;
  shoppingList.style.display = statusForShoppingList;
}

function checkLocalStorage() {
  let arrBooks = JSON.parse(localStorage.getItem('shoppingList'));
  return arrBooks;
}
function createBookCard(book) {
  return document.createElement('div');
}
function markupListOfStore(stores) {
  if (!Array.isArray(stores)) {
    return '';
  }

  return stores
    .map(({ name, url }) => {
      if (name === 'amazon' || name === 'baren') {
        const picture = getImages(name);
        return `<li class="shop-item"><a href="${url}" target="_blank" class="shop-link-image">${picture}</a></li>`;
      }
      return '';
    })
    .join('\n');
}

export function markupShoppingList(arrSelectedBooks) {
  const arrCardsSelectedBooks = arrSelectedBooks.map(
    ({ id, title, author, img, description, shops }) => {
      const shopsName = markupListOfStore(shops);
      if (img === '') {
        img = `${noImage}`;
      }

      const imgElement = createImageElement(img, title, 100, 142);

      return `
        <li class="shoplist-item" data-idcard="${id}">
          <div class="delete-container" data-id="${id}">
            <div class="delete-img-container" data-id="${id}">
              ${objShop.Trash}
            </div>
          </div>
          ${imgElement.outerHTML}
          <div class="card-shoplist">
            <h2 class="card-title-shoplist">${title}</h2>
            <p class="card-category-shoplist">${title || 'No Title'}</p>
            <p class="card-description-shoplist">${description}</p>
            <div class="wrapper-card-shoplist-footer">
              <p class="card-author-shoplist">${author}</p>
              <ul class="shops-list">${shopsName}</ul>
            </div>
          </div>
        </li>`;
    },
  );

  shoppingList.innerHTML = arrCardsSelectedBooks.join('');

  document.querySelectorAll('.delete-container').forEach(deleteContainer => {
    deleteContainer.addEventListener('click', onClickDelete);
  });
}

function onClickDelete(event) {
  const id = event.currentTarget.dataset.id;

  let arrSelectedBooks = checkLocalStorage() || [];
  arrSelectedBooks = arrSelectedBooks.filter(book => book.id !== id);
  localStorage.setItem('shoppingList', JSON.stringify(arrSelectedBooks));

  const liRef = event.currentTarget.parentNode;
  liRef.remove();

  if (shoppingList.innerHTML === '') {
    hiddenOrVisual('block', 'none');
  } else {
    hiddenOrVisual('none', 'flex');
  }
}
