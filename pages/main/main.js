import data from '../../assets/pets.js';

const logo = document.querySelector('.header__logo');
const gamLink = document.querySelectorAll('.menu-gam__link');
const menuBtn = document.querySelector('.menu-gam');
const activeGamLink = document.querySelector('.active-gam');
const menuBtnActive = document.querySelector('.menu-gam__menu');
const petsList = document.querySelector('.pets__list');
const pets = document.querySelector('.pets');
const bg = document.querySelector('.menu-bg');
const arrowPrev = document.querySelector('.pets__arrow--prev');
const arrowNext = document.querySelector('.pets__arrow--next');
const navLink = document.querySelectorAll('.nav__link');

const body = document.querySelector('body');
let cardArrSlider = [];
let countCard = 3;
let marginCard = 90;

/*----------------------------------------------------меню */
logo.addEventListener('click', (e) => e.preventDefault());
navLink.forEach((item, index) => {
  if (index != 1) {
    item.addEventListener('click', (e) => e.preventDefault());
  }
});
gamLink.forEach((item, index) => {
  if (index != 1) {
    item.addEventListener('click', (e) => e.preventDefault());
  }
});

activeGamLink.addEventListener('click', (e) => {
  menuBtn.classList.toggle("change");
    menuBtnActive.classList.toggle("menu-gam__active");
    bg.classList.toggle("modBg");
    logo.style.opacity = '1';
    window.scroll(0, 0);
    body.style.overflow = 'auto';
});

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle("change");
  menuBtnActive.classList.toggle("menu-gam__active");
  bg.classList.toggle("modBg");
  if (logo.style.opacity == '0') {
    logo.style.opacity = '1';
    body.style.overflow = 'auto';
  } else {
    logo.style.opacity = '0';
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
      body.style.overflow = 'auto';
    } else {
      logo.style.opacity = '0';
      body.style.overflow = 'hidden';
    }
  }
});
/*----------------------------------------------------меню */

const cardView = (insert, itemPx) => {
  for (let i = 0; i < countCard; i++) {
    let count = Math.floor(Math.random() * data.length);
    do {
      count = Math.floor(Math.random() * data.length);
    } while (cardArrSlider.indexOf(count) != -1)
    cardArrSlider.push(count);
    let card_slider = `
      <article class="pets__item" data-index=${count} style="margin-left: ${itemPx}px;">
      <img src=${data[count].img} class="pets__img" alt=${data[count].name}>
      <span class="pets__name">${data[count].name}</span>
      <a href="#" class="btn-link btn-link--js">Подробнее</a>
      </article>
    `;
    petsList.insertAdjacentHTML(insert, card_slider);
  }
}

cardView('afterbegin', 0);

if (pets.offsetWidth > 1279) {
  countCard = 3;
  marginCard = 90;
}
else if (pets.offsetWidth > 768) {
  countCard = 2;
  marginCard = 40;
}
else {
  countCard = 1;
  marginCard = 40;
}

window.addEventListener('resize', () => { 
  if (pets.offsetWidth > 1279) {
    marginCard = 90;
    countCard = 3;
  } 
  else if (pets.offsetWidth > 768) {
    countCard = 2;
    marginCard = 40;
  }
  else {
    marginCard = 40;
    countCard = 1;
  } 
});

//--------------------------модальное окно для показа питомца
petsList.addEventListener('click', popupView);

function popupView(e) {
  if (e.target.parentElement.classList == 'pets__item' || e.target.classList == 'pets__item') {
    e.preventDefault();
    let card = '';
    if (e.target.parentElement.classList == 'pets__item') {
      card = e.target.parentElement;
    } else card = e.target;
    const index = card.dataset.index;
    const modal = `
      <div class="modal">
      <div class="modal__blog">
        <button class="modal__btn-close">X</button>
        <div class="modal__img"><img src=${data[index].img} alt=${data[index].name}></div>
        <div class="modal__info">
          <h2 class="modal__info-title">${data[index].name}</h2>
          <p class="modal__info-rase">${data[index].type} - ${data[index].breed}</p>
          <p class="modal__info-description">${data[index].description}</p>
          <ul class="modal__info-skill">
            <li><span class="modal__info-skill-dots">•</span><b>Age:</b> ${data[index].age}</li>
            <li><span class="modal__info-skill-dots">•</span><b>Inoculations:</b> ${data[index].inoculations.join(', ')}</li>
            <li><span class="modal__info-skill-dots">•</span><b>Diseases:</b> ${data[index].diseases.join(', ')}</li>
            <li><span class="modal__info-skill-dots">•</span><b>Parasites:</b> ${data[index].parasites.join(', ')}</li>
          </ul>
        </div>
      </div>
    </div>
    `;
    petsList.insertAdjacentHTML('afterbegin', modal);
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
//--------------------------------------------------модальное окно для показа питомца

/*-----------------------------------------------------------------------сдвиг слайдера влево */
arrowPrev.addEventListener('click', () => {
  cardView('beforeend', 0);
  cardArrSlider = cardArrSlider.slice(countCard);
  const cardsv = document.querySelectorAll('.pets__item');
  setTimeout(() => {
    cardsv[0].style.marginLeft = -(270+marginCard) + 'px';
    closeCardPrev(cardsv);
  }, 0);
});

function closeCardPrev(cardsv) {
  let i = 1;
  let timerId = setInterval(() => {
    if (i <= countCard - 1) {
      cardsv[i].style.marginLeft = -(270+marginCard) + 'px';
      i++;
    }
    else {
      clearTimeout(timerId);
      for (let i = 0; i < countCard; i++) cardsv[i].remove();
    }
  }, 1800);
}
/*-------------------------------------------сдвиг слайдера влево */

/*------------------------------------------------сдвиг слайдера вправо */
arrowNext.addEventListener('click', () => {
  cardView('afterbegin', -(270 + marginCard));
  cardArrSlider = cardArrSlider.slice(countCard);
  const cardsv = document.querySelectorAll('.pets__item');
  setTimeout(() => {
    cardsv[countCard - 1].style.marginLeft = 0 + 'px';
    closeCardNext(cardsv);
  }, 0);
});

function closeCardNext(cardsv) {
  let i = countCard - 2;
  let timerId = setInterval(() => {
    if (i >= 0) {
      cardsv[i].style.marginLeft = 0 + 'px';
      i--;
    }
    else {
      clearTimeout(timerId);
      for (let i = 0; i < countCard; i++) cardsv[cardsv.length - (i + 1)].remove();
    }
  }, 1800);
}
/*------------------------------------------------------------сдвиг слайда вправо */
