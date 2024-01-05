import { trashSvg, amazon, baren } from './charitiesExport';
export const refs = {
  shoppingList: document.querySelector('.shopping-list'),
  emptyList: document.querySelector('.empty-list'),
};
const { shoppingList, emptyList } = refs;
const objShop = {
  Amazon: `<img src="${amazon}" alt="logo Amazon" width="32" height="11">`,
  'Barnes and Noble': `<img src="${baren}" alt="logo Barnes and Noble" width="16" height="16">`,
};
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
  let arrBooks = [];
  Object.keys(localStorage).forEach(key => {
    if (key !== 'theme') {
      let value = JSON.parse(localStorage.getItem(key));
      arrBooks.push(value);
    }
  });
  return arrBooks;
}
function getImages(name) {
  return objShop[name] || '';
}
function markupListOfStore(stores) {
  if (!Array.isArray(stores)) {
    return '';
  }
  return stores
    .map(({ name, url }) => {
      const picture = getImages(name);
      return `<li class="shop-item"><a href="${url}" target="_blank" class="shop-link-image">${picture}</a></li>`;
    })
    .join('\n');
}
function markupShoppingList(arrSelectedBooks) {
  const arrCardsSelectedBooks = arrSelectedBooks.map(
    ({ id, bookName, author, img, description, title, shops }) => {
      const shopsName = markupListOfStore(shops);
      if (img === '') {
        img = `${noImage}`;
      }
      return `<li class="shoplist-item" data-idcard="${id}">
        <button type="button" class="delate-btn" data-id="${id}">
          <svg class="delate-svg" width="16" height="16">
            ${trashSvg}
          </svg>
        </button>
        <img class="img-shoplist-card" src="${img}" alt="${title}" width="100" height="142" />
        <div class="card-shoplist">
          <h2 class="card-title-shoplist">${title}</h2>
          <p class="card-category-shoplist">${bookName}</p>
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
}
export default arrSelectedBooks;
