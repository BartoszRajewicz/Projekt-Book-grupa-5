import {
  saveChildrenImg,
  projectHopeImg,
  internationalMedImg,
  razomImg,
  actionsAgainstImg,
  charityFoundImg,
  medecinsImg,
  worldVisionImg,
  unitedImg,
} from './charitiesExport';

function openCharityLink(url) {
  window.open(url, '_blank');
}

let currentIndex = 0;
const visibleSlides = 5;

function nextSlide() {
  const slides = document.querySelector('.slider');
  const totalSlides = document.querySelectorAll('.charity-item').length;

  currentIndex = (currentIndex + 1) % (totalSlides - visibleSlides + 1);

  const slideHeight = document.querySelector('.charity-item').offsetHeight;

  slides.style.transition = 'transform 0.5s ease-in-out';
  slides.style.transform = `translateY(-${currentIndex * slideHeight}px)`;

  updateArrow();
}

function updateArrow() {
  const arrow = document.querySelector('.arrow');
  const totalSlides = document.querySelectorAll('.charity-item').length;

  arrow.classList.toggle('up', currentIndex >= totalSlides - visibleSlides);
}

import {
  saveChildrenImg,
  projectHopeImg,
  internationalMedImg,
  razomImg,
  actionsAgainstImg,
  charityFoundImg,
  medecinsImg,
  worldVisionImg,
  unitedImg,
} from './charitiesExport';

const charities = [
  {
    title: 'Save the Children',
    url: 'https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis',
    img: saveChildrenImg,
  },
  {
    title: 'Project HOPE',
    url: 'https://www.projecthope.org/country/ukraine/',
    img: projectHopeImg,
  },
  {
    title: 'International Medical Corps',
    url: 'https://internationalmedicalcorps.org/country/ukraine/',
    img: internationalMedImg,
  },
  {
    title: 'RAZOM',
    url: 'https://www.razomforukraine.org/',
    img: razomImg,
  },
  {
    title: 'Action against hunger',
    url: 'https://www.actionagainsthunger.org/location/europe/ukraine/',
    img: actionsAgainstImg,
  },
  {
    title: 'Serhiy Prytula Charity Foundation',
    url: 'https://prytulafoundation.org/en',
    img: charityFoundImg,
  },
  {
    title: 'Medicins Sans Frontieres',
    url: 'https://www.msf.org/ukraine',
    img: medecinsImg,
  },
  {
    title: 'World vision',
    url: 'https://www.wvi.org/emergencies/ukraine',
    img: worldVisionImg,
  },
  {
    title: 'UNITED24',
    url: 'https://u24.gov.ua/uk',
    img: unitedImg,
  },
];

document.addEventListener('DOMContentLoaded', function () {
  const charityContainer = document.getElementById('charity-container');

  charities.forEach((charity, index) => {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const charNum = (index + 1).toString().padStart(2, '0');

    img.src = charity.img;
    img.alt = charNum;
    img.title = charity.title;

    img.onclick = () => openCharityLink(charity.url);

    div.className = 'charity-item';
    div.innerText = charNum;

    div.appendChild(img);
    charityContainer.appendChild(div);
  });

  updateArrow();
});
