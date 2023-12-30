function openCharityLink(url) {
  window.open(url, '_blank');
}

let currentIndex = 0;

function nextSlide() {
  const slides = document.querySelector('.slider');
  const totalSlides = document.querySelectorAll('.charity-item').length;
  const visibleSlides = 5;

  if (currentIndex < totalSlides - visibleSlides) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }

  const slideHeight = document.querySelector('.charity-item').offsetHeight;

  slides.style.transition = 'transform 0.5s ease-in-out';
  slides.style.transform = `translateY(-${currentIndex * slideHeight}px)`;

  updateArrow();
}
function updateArrow() {
  const arrow = document.querySelector('.arrow');
  const totalSlides = document.querySelectorAll('.charity-item').length;
  const visibleSlides = 5;

  if (currentIndex >= totalSlides - visibleSlides) {
    arrow.classList.add('up');
  } else {
    arrow.classList.remove('up');
  }
}

const charities = [
  {
    title: 'Save the Children',
    url: 'https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis',
    img: '/src/images/save_children.png',
  },
  {
    title: 'Project HOPE',
    url: 'https://www.projecthope.org/country/ukraine/',
    img: './src/images/hope.png',
  },

  {
    title: 'International Medical Corps',
    url: 'https://internationalmedicalcorps.org/country/ukraine/',
    img: 'images/internationalmed.png',
  },
  {
    title: 'RAZOM',
    url: 'https://www.razomforukraine.org/',
    img: 'src/images/razom.png',
  },
  {
    title: 'Action against hunger',
    url: 'https://www.actionagainsthunger.org/location/europe/ukraine/',
    img: 'src/images/actionsagainst.png',
  },
  {
    title: 'Serhiy Prytula Charity Foundation',
    url: 'https://prytulafoundation.org/en',
    img: 'src/images/charityfound.png',
  },
  {
    title: 'Medicins Sans Frontieres',
    url: 'https://www.msf.org/ukraine',
    img: 'src/images/medecins.png',
  },

  {
    title: 'World vision',
    url: 'https://www.wvi.org/emergencies/ukraine',
    img: 'src/images/worldvision.png',
  },

  {
    title: 'UNITED24',
    url: 'https://u24.gov.ua/uk',
    img: 'src/images/united.png',
  },
];

document.addEventListener('DOMContentLoaded', function () {
  const charityContainer = document.getElementById('charity-container');

  charities.forEach((charity, index) => {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const charNum = (index + 1).toString().padStart(2, '0');

    img.src = charity.img;

    img.onclick = () => openCharityLink(charity.url);

    div.className = 'charity-item';

    div.innerText = charNum;

    div.appendChild(img);
    charityContainer.appendChild(div);
  });

  updateArrow();
});
