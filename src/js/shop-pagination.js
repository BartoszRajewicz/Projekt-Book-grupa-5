let link = document.getElementsByClassName('link');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const doubleArrowLeft = document.querySelector('.arrow-double-left');
const doubleArrowRight = document.querySelector('.arrow-double-right');
let currentValue = 1;

doubleArrowLeft.addEventListener('click', function doubleBackArrow() {
  if (currentValue > 1) {
    for (l of link) {
      l.classList.remove('active');
    }
    currentValue--;
    link[currentValue - 1].classList.add('active');
  }
});

doubleArrowRight.addEventListener('click', function doubleNextArrow() {
  if (currentValue < 3) {
    for (l of link) {
      l.classList.remove('active');
    }
    currentValue++;
    link[currentValue - 1].classList.add('active');
  }
});

function activeLink() {
  for (l of link) {
    l.classList.remove('active');
  }
  event.target.classList.add('active');
  currentValue = event.target.value;
}

arrowLeft.addEventListener('click', function backArrow() {
  if (currentValue > 1) {
    for (l of link) {
      l.classList.remove('active');
    }
    currentValue--;
    link[currentValue - 1].classList.add('active');
  }
});

arrowRight.addEventListener('click', function nextArrow() {
  if (currentValue < 3) {
    for (l of link) {
      l.classList.remove('active');
    }
    currentValue++;
    link[currentValue - 1].classList.add('active');
  }
});
