const buttonScrollUp = document.querySelector('#buttonScrollUp');

buttonScrollUp.addEventListener("click", function () {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth"});
})