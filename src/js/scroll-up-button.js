const buttonScrollUp = document.querySelector('#buttonScrollUp');

buttonScrollUp.addEventListener("click", function () {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth"});
})

  window.addEventListener('scroll', function () {
    var backToTopButton = document.getElementById('buttonScrollUp');
    if (window.scrollY > 400) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  window.addEventListener('DOMContentLoaded', function () {
    var backToTopButton = document.getElementById('buttonScrollUp');
    backToTopButton.addEventListener('click', function (e) {
      e.preventDefault();
      var header = document.querySelector('#page-header');
      header.scrollIntoView({ behavior: 'smooth' });
    });
  });