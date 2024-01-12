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
  const arrowContainer = document.querySelector('.arrow-container');

  const totalCharities = charities.length;
  const charitiesPerPage = 6;
  let currentPage = 0;

  function updateCharities() {
    const startIdx = currentPage * charitiesPerPage;
    const endIdx = startIdx + charitiesPerPage;

    const visibleCharities = charities.slice(startIdx, endIdx);

    charityContainer.innerHTML = '';

    visibleCharities.forEach((charity, index) => {
      const div = document.createElement('div');
      const img = document.createElement('img');
      const charNum = (startIdx + index + 1).toString().padStart(2, '0');

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
  }

  function nextSlide() {
    currentPage = (currentPage + 1) % Math.ceil(totalCharities / charitiesPerPage);
    updateCharities();
  }

  function prevSlide() {
    currentPage =
      (currentPage - 1 + Math.ceil(totalCharities / charitiesPerPage)) %
      Math.ceil(totalCharities / charitiesPerPage);
    updateCharities();
  }

  arrowContainer.addEventListener('click', nextSlide);
  arrowContainer.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    prevSlide();
  });

  function updateArrow() {
    const arrow = document.querySelector('.arrow');
    arrow.classList.toggle('up', currentPage >= Math.ceil(totalCharities / charitiesPerPage) - 1);
    arrow.classList.toggle('down', currentPage <= 0); // Dodane
  }

  updateCharities();
});
