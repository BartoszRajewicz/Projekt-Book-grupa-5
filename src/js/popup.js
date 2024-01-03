// import axios from 'axios';

document.addEventListener(`DOMContentLoaded`, init);

const openBtn = document.querySelector(`.book-card`);
const popup = document.querySelector(`.popup`);
const closeBtn = document.querySelector(`.popup__close`);
const bookInfo = document.querySelector(`.book`);

// async function getInfoAbouBook(bookId) {
//   try {
//     const response = await axios.get('https://books-backend.p.goit.global/books/${bookId}');
//     return response.data;
//   } catch (err) {
//     console.log(err);
//   }
// }

export default function init() {
  openBtn.addEventListener(`click`, () => {
    // let src = event.target.src;
    // let bookId = src.substring(src.length - 24);
    // getInfoAbouBook(response.data._id)
    //   .then(response => {
    //     bookInfo.innerHTML = `<div class="popup__flex book-info book">
    // //         <img
    // //           class="book__img"
    // //           src="${response.data.book_image}"
    // //           alt="${response.data.title}"
    // //         />
    // //         <div class="book-info__flex">
    // //           <h4 class="book__title">${response.data.title}</h4>
    // //           <p class="book__author">${response.data.author}</p>
    // //           <p class="book__description">
    // //             ${response.data.description}
    // //           </p>
    // //           <div class="trading-platform-icons">Miejsce na ikonki</div>
    // //         </div>
    // //       </div>`;
    //   })
    //   .catch(err => console.log(err));
    popup.style.display = `block`;
  });
  closeBtn.addEventListener(`click`, () => {
    popup.style.display = `none`;
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
}
