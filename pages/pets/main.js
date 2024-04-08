import pets from '../../assets/pets.js';

const menuBtn = document.querySelector('.menu-gam');
const menuBtnActive = document.querySelector('.menu-gam__menu');
const logo = document.querySelector('.header__logo');
const bg = document.querySelector('.menu-bg');
const header = document.querySelector('.header');
const navLink = document.querySelectorAll('.nav__link');
const gamLink = document.querySelectorAll('.menu-gam__link');
const linkActive = document.querySelector('.active');
const linkActiveGam = document.querySelector('.active-gam');
const body = document.querySelector('body');

linkActive.addEventListener('click', () => {
  body.style.overflow = 'auto';
  menuBtnActive.classList.toggle("menu-gam__active");
  menuBtn.classList.toggle("change");
  bg.classList.toggle("modBg");
  logo.style.opacity = '1';
  header.style.background = '#fff';
  window.scroll(0, 0);
});
linkActiveGam.addEventListener('click', () => {  
  body.style.overflow = 'auto';
  menuBtnActive.classList.toggle("menu-gam__active");
  bg.classList.toggle("modBg");
  menuBtn.classList.toggle("change");
  logo.style.opacity = '1';
  header.style.background = '#fff';
  window.scroll(0, 0);
});


header.style.background = '#fff';

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle("change");
  menuBtnActive.classList.toggle("menu-gam__active");
  bg.classList.toggle("modBg");
  if (logo.style.opacity == '0') {
    logo.style.opacity = '1';
    header.style.background = '#fff';
    body.style.overflow = 'auto';
  } else {
    logo.style.opacity = '0';
    header.style.background = 'rgba(41, 41, 41, 0.1)';
    body.style.overflow = 'hidden';
  }
});

bg.addEventListener('click', (e) => {
  if (e.target.classList[1] == 'modBg') {
    menuBtn.classList.toggle("change");
    menuBtnActive.classList.toggle("menu-gam__active");
    bg.classList.toggle("modBg");
    if (logo.style.opacity == '0') {
      logo.style.opacity = '1';
      header.style.background = '#fff';
      body.style.overflow = 'auto';
    } else {
      logo.style.opacity = '0';
      header.style.background = 'rgba(41, 41, 41, 0.1)';
      body.style.overflow = 'hidden';
    }
  }
});

navLink.forEach((item, index) => {
  if (index != 0) {
    item.addEventListener('click', (e) => e.preventDefault());
  }
});

gamLink.forEach((item, index) => {
  if (index != 0) {
    item.addEventListener('click', (e) => e.preventDefault());
  }
});

//-------------------------------формирование массива из 48 элементов

let dataArr = []; let fullPetsList = []; // 48

fullPetsList = (() => {
  let tempArr = [];

  for (let i = 0; i < 6; i++) {
    const newPets = pets;

    for (let j = pets.length; j > 0; j--) {
      let randInd = Math.floor(Math.random() * j);
      const randElem = newPets.splice(randInd, 1)[0];
      newPets.push(randElem);
    }

    tempArr = [...tempArr, ...newPets];
  }
  return tempArr;
})();

const sort6recursively = (list) => {
  const length = list.length;

  for (let i = 0; i < (length / 6); i++) {
    const stepList = list.slice(i * 6, (i * 6) + 6);

    for (let j = 0; j < 6; j++) {
      const duplicatedItem = stepList.find((item, ind) => {
        return item.name === stepList[j].name && (ind !== j);
      });

      if (duplicatedItem !== undefined) {
        const ind = (i * 6) + j;
        const which8OfList = Math.trunc(ind / 8);

        list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

        sort6recursively(list);
      }
    }
  }

  return list;
}

const sort863 = (list) => {
  let unique8List = [];
  let length = list.length;
  for (let i = 0; i < length / 8; i++) {
    const uniqueStepList = [];
    for (let j = 0; j < list.length; j++) {
      if (uniqueStepList.length >= 8) {
        break;
      }
      const isUnique = !uniqueStepList.some((item) => {
        return item.name === list[j].name;
      });
      if (isUnique) {
        uniqueStepList.push(list[j]);
        list.splice(j, 1);
        j--;
      }
    }
    unique8List = [...unique8List, ...uniqueStepList];
  }
  list = unique8List;


  list = sort6recursively(list);

  return list;
}

fullPetsList = sort863(fullPetsList);
dataArr = fullPetsList;



//------------------------------------------------------------------------------

const catalogLists = document.querySelector('.catalog__lists');
const paginationNextOne = document.querySelector('.pagination__next');
const paginationNextEnd = document.querySelector('.pagination__next2');
const paginationItem = document.querySelector('.pagination__item');

const paginationPrevOne = document.querySelector('.pagination__prev2');
const paginationPrevEnd = document.querySelector('.pagination__prev');

let countCard = 8; //количество карточек на странице
let endCount = 0; //номер последней страницы
if (catalogLists.offsetWidth > 1199) {
  countCard = 8;
  endCount = dataArr.length / countCard;
} else if (catalogLists.offsetWidth > 767) {
  countCard = 6;
  endCount = dataArr.length / countCard;
} else {
  countCard = 3;
  endCount = dataArr.length / countCard;
}

const cardView = (countCard, carditems) => {
  for (let i = 0; i < countCard; i++) {
    let cardPoligation = `
      <article class="pets__item"  data-index=${carditems[i].name}>
      <img src=${carditems[i].img} class="pets__img" alt=${carditems[i].name}>
      <span class="pets__name">${carditems[i].name}</span>
      <a href="#" class="btn-link btn-link--pets btn-link--js">Learn more</a>
      </article>
    `;
    catalogLists.insertAdjacentHTML('afterbegin', cardPoligation);
  }
}

let carditems = dataArr.slice((+paginationItem.textContent - 1) * countCard, ((+paginationItem.textContent - 1) * countCard) + countCard);
cardView(countCard, carditems);

let flag = 8;
window.addEventListener('resize', () => { 
  if (catalogLists.offsetWidth > 1159) {
    if (flag != 8) {
      catalogLists.textContent = '';
      flag = 8;
      countCard = 8;
      endCount = dataArr.length / countCard;

      if (paginationItem.textContent > endCount) { //если перед этим страница была открыта дальше, то открываем последнюю
        paginationItem.textContent = endCount;
        carditems = dataArr.slice((+paginationItem.textContent - 1) * countCard, ((+paginationItem.textContent - 1) * countCard) + countCard);
        cardView(countCard, carditems);
        if(paginationNextOne.classList.contains("pagination__active")) {
          paginationNextOne.classList.remove("pagination__active");
          paginationNextEnd.classList.remove("pagination__active");
        }
        paginationNextEnd.setAttribute("disabled", "true");
        paginationNextOne.setAttribute("disabled", "true");
      }
      else {
        carditems = dataArr.slice((+paginationItem.textContent - 1) * countCard, ((+paginationItem.textContent - 1) * countCard) + countCard);
        cardView(countCard, carditems);
        if(!paginationNextOne.classList.contains("pagination__active")) {
          paginationNextOne.classList.add("pagination__active");
          paginationNextEnd.classList.add("pagination__active");
          paginationNextEnd.removeAttribute("disabled");
          paginationNextOne.removeAttribute("disabled");
        }
      }
    }
    countCard = 8;
    endCount = dataArr.length / countCard;
  } 
  else if (catalogLists.offsetWidth > 640) {
    if (flag != 6) {
      catalogLists.textContent = '';
      flag = 6;
      countCard = 6;
      endCount = dataArr.length / countCard;
      
      if (paginationItem.textContent > endCount) { //если перед этим страница была открыта дальше, то открываем последнюю
        paginationItem.textContent = endCount;
        carditems = dataArr.slice((+paginationItem.textContent - 1) * countCard, ((+paginationItem.textContent - 1) * countCard) + countCard);
        cardView(countCard, carditems);
        if(paginationNextOne.classList.contains("pagination__active")) {
          paginationNextOne.classList.remove("pagination__active");
          paginationNextEnd.classList.remove("pagination__active");
        }
        paginationNextEnd.setAttribute("disabled", "true");
        paginationNextOne.setAttribute("disabled", "true");
      }
      else {
        carditems = dataArr.slice((+paginationItem.textContent - 1) * countCard, ((+paginationItem.textContent - 1) * countCard) + countCard);
        cardView(countCard, carditems);
        if(!paginationNextOne.classList.contains("pagination__active")) {
          paginationNextOne.classList.add("pagination__active");
          paginationNextEnd.classList.add("pagination__active");
          paginationNextEnd.removeAttribute("disabled");
          paginationNextOne.removeAttribute("disabled");
        }
      }
    }
    countCard = 6;
    endCount = dataArr.length / countCard;
  }
  else {
    if (flag != 3) {
      catalogLists.textContent = '';
      flag = 3;
      countCard = 3;
      endCount = dataArr.length / countCard;
      
      if (paginationItem.textContent > endCount) { //если перед этим страница была открыта дальше, то открываем последнюю
        paginationItem.textContent = endCount;
        carditems = dataArr.slice((+paginationItem.textContent - 1) * countCard, ((+paginationItem.textContent - 1) * countCard) + countCard);
        cardView(countCard, carditems);
        if(paginationNextOne.classList.contains("pagination__active")) {
          paginationNextOne.classList.remove("pagination__active");
          paginationNextEnd.classList.remove("pagination__active");
        }
        paginationNextEnd.setAttribute("disabled", "true");
        paginationNextOne.setAttribute("disabled", "true");
        if(!paginationNextOne.classList.contains("pagination__active")) {
          paginationNextOne.classList.add("pagination__active");
          paginationNextEnd.classList.add("pagination__active");
          paginationNextEnd.removeAttribute("disabled");
          paginationNextOne.removeAttribute("disabled");
        }
      }
      else {
        carditems = dataArr.slice((+paginationItem.textContent - 1) * countCard, ((+paginationItem.textContent - 1) * countCard) + countCard);
        cardView(countCard, carditems);
        if(!paginationNextOne.classList.contains("pagination__active")) {
          paginationNextOne.classList.add("pagination__active");
          paginationNextEnd.classList.add("pagination__active");
          paginationNextEnd.removeAttribute("disabled");
          paginationNextOne.removeAttribute("disabled");
        }
      }
    }
    countCard = 3;
    endCount = dataArr.length / countCard;
  } 
});

paginationNextOne.addEventListener('click', () => {
  if (paginationItem.textContent != endCount) {
    catalogLists.textContent = '';
    if ( paginationItem.textContent == 1) {
      paginationPrevOne.classList.toggle("pagination__active");
      paginationPrevOne.removeAttribute("disabled");
      paginationPrevEnd.classList.toggle("pagination__active");
      paginationPrevEnd.removeAttribute("disabled");
    }
    paginationItem.textContent = +paginationItem.textContent + 1;
    carditems = dataArr.slice((+paginationItem.textContent - 1) * countCard, ((+paginationItem.textContent - 1) * countCard) + countCard);
    cardView(countCard, carditems);
    if (paginationItem.textContent == endCount) {
      paginationNextOne.classList.toggle("pagination__active");
      paginationNextEnd.classList.toggle("pagination__active");
      paginationNextEnd.setAttribute("disabled", "true");
      paginationNextOne.setAttribute("disabled", "true");
    }
  }
});

paginationNextEnd.addEventListener('click', () => {
  catalogLists.textContent = '';
  paginationItem.textContent = endCount;
  carditems = dataArr.slice((+paginationItem.textContent - 1) * countCard, ((+paginationItem.textContent - 1) * countCard) + countCard);
  cardView(countCard, carditems);
  paginationNextOne.classList.toggle("pagination__active");
  paginationNextEnd.classList.toggle("pagination__active");
  paginationNextEnd.setAttribute("disabled", "true");
  paginationNextOne.setAttribute("disabled", "true");

  if(!paginationPrevOne.classList.contains("pagination__active")) {
    paginationPrevOne.classList.add("pagination__active");
    paginationPrevEnd.classList.add("pagination__active");
    paginationPrevOne.removeAttribute("disabled");
    paginationPrevEnd.removeAttribute("disabled");
  }
})

paginationPrevOne.addEventListener('click', () => {
  if (paginationItem.textContent ==  endCount) {
    paginationNextOne.classList.toggle("pagination__active");
    paginationNextEnd.classList.toggle("pagination__active");
    paginationNextEnd.removeAttribute("disabled");
    paginationNextOne.removeAttribute("disabled");
  }
  if (paginationItem.textContent != 1) {
    catalogLists.textContent = '';
    paginationItem.textContent = +paginationItem.textContent -1;
    carditems = dataArr.slice((+paginationItem.textContent - 1) * countCard, ((+paginationItem.textContent - 1) * countCard) + countCard);
    cardView(countCard, carditems);
    if (paginationItem.textContent == 1) {
      paginationPrevOne.classList.toggle("pagination__active");
      paginationPrevEnd.classList.toggle("pagination__active");
      paginationPrevEnd.setAttribute("disabled", "true");
      paginationPrevOne.setAttribute("disabled", "true");
    }
  }
})

paginationPrevEnd.addEventListener('click', () => {
  paginationNextOne.classList.add("pagination__active");
  paginationNextEnd.classList.add("pagination__active");
  paginationNextOne.removeAttribute("disabled");
  paginationNextEnd.removeAttribute("disabled");

  catalogLists.textContent = '';
  paginationItem.textContent = 1;
  carditems = dataArr.slice((+paginationItem.textContent - 1) * countCard, ((+paginationItem.textContent - 1) * countCard) + countCard);
  cardView(countCard, carditems);
  paginationPrevOne.classList.toggle("pagination__active");
  paginationPrevEnd.classList.toggle("pagination__active");
  paginationPrevEnd.setAttribute("disabled", "true");
  paginationPrevOne.setAttribute("disabled", "true");
})

//-------------------------------------------------открвытие модального окна
catalogLists.addEventListener('click', popupView);

function popupView(e) {
    if (e.target.parentElement.classList == 'pets__item' || e.target.classList == 'pets__item') {
      e.preventDefault();
      let card = '';
      if (e.target.parentElement.classList == 'pets__item') {
        card = e.target.parentElement;
      } else card = e.target;
    const index = dataArr.findIndex(item => item.name == card.dataset.index);
    console.log(index);
    const modal = `
      <div class="modal">
      <div class="modal__blog">
        <button class="modal__btn-close">X</button>
        <div class="modal__img"><img src=${dataArr[index].img} alt=${dataArr[index].name}></div>
        <div class="modal__info">
          <h2 class="modal__info-title">${dataArr[index].name}</h2>
          <p class="modal__info-rase">${dataArr[index].type} - ${dataArr[index].breed}</p>
          <p class="modal__info-description">${dataArr[index].description}</p>
          <ul class="modal__info-skill">
            <li><span class="modal__info-skill-dots">•</span><b>Age:</b> ${dataArr[index].age}</li>
            <li><span class="modal__info-skill-dots">•</span><b>Inoculations:</b> ${dataArr[index].inoculations.join(', ')}</li>
            <li><span class="modal__info-skill-dots">•</span><b>Diseases:</b> ${dataArr[index].diseases.join(', ')}</li>
            <li><span class="modal__info-skill-dots">•</span><b>Parasites:</b> ${dataArr[index].parasites.join(', ')}</li>
          </ul>
        </div>
      </div>
    </div>
    `;
    catalogLists.insertAdjacentHTML('afterbegin', modal);
    body.style.overflow = 'hidden';
    document.addEventListener('click', (e) => {
      if (e.target.classList == 'modal__btn-close' || e.target.classList == 'modal') {
        let modal = document.querySelector('.modal');
        modal.remove();
        body.style.overflow = 'auto';
      }
    });
  }
}
