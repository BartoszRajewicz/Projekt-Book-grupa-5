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

const noImage = 'ścieżka/do/braku/obrazu.jpg'; // Dodaj deklarację noImage

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
  let arrBooks = JSON.parse(localStorage.getItem('shoppingList')) || [];
  arrBooks = arrBooks.map(book => ({
    ...book,
    amazonLink: objShop.Amazon,
    barenNobelLink: objShop['Barnes and Noble'],
  }));
  return arrBooks;
}

function openBookstore(url) {
  console.log('Opening bookstore:', url);
  window.open(url, '_blank');
}

function markupListOfStore(stores) {
  if (!Array.isArray(stores)) {
    return '';
  }

  const validStores = stores.filter(({ name }) => name === 'amazon' || name === 'baren');

  const shopItems = validStores.map(({ name, url }) => {
    const picture = getImages(name);
    const shopItem = document.createElement('div');
    shopItem.classList.add('shop-item');
    shopItem.appendChild(picture);
    picture.dataset.url = url;
    picture.addEventListener('click', () => handleShopItemClick(url, name));

    return shopItem;
  });

  return shopItems.map(item => item.outerHTML).join('\n');
}

function handleShopItemClick(url, platform) {
  openBookstore(url);
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
            <div class="delate-btn" data-id="${id}">
              ${getImages('trash').outerHTML}
            </div>
          </div>
          <div class="shop-container">
            <div class="card-shoplist">
              <div class="img-list">${imgElement.outerHTML}</div>
              <div class="card-descrip">
                <h2 class="card-title-shoplist">${title}</h2>
                <p class="card-category-shoplist">${title || 'No Title'}</p>
                <p class="card-description-shoplist">${description}</p>
                <div class="wrapper-card-shoplist-footer">
                  <p class="card-author-shoplist">${author}</p>
                  <div class="trading-platform-icons">
                    <a href="${objShop.Amazon}" class="icon-amazon" target="_blank"></a>
                    <a href="${
                      objShop['Barnes and Noble']
                    }" class="icon-barenNobel" target="_blank"></a>
                  </div>
                </div>
              </div>
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
