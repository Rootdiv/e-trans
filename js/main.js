'use strict';
const init = () => {
  const myMap = new ymaps.Map(
    'map', {
      center: [55.7718, 37.6316],
      zoom: 16,
      controls: ['smallMapDefaultSet'],
    }, {},
  );

  const myPlaceMark = new ymaps.Placemark(
    [55.7724, 37.6252], {}, {
      iconLayout: 'default#image',
      iconImageHref: './img/mark.svg',
      iconImageSize: [70, 70],
      iconImageOffset: [-35, -70],
    },
  );
  myMap.geoObjects.add(myPlaceMark);

  window.addEventListener('resize', () => {
    if (window.innerWidth < 1240) {
      myMap.setCenter([55.7718, 37.6256]);
      myPlaceMark.options.set('iconImageSize', [50, 50]);
    } else {
      myMap.setCenter([55.7718, 37.6316]);
      myPlaceMark.options.set('iconImageSize', [70, 70]);
    }
  });
};
ymaps.ready(init);

// const map = L.map('map').setView([55.7726, 37.63], 17);
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
// L.marker([55.7724, 37.6252]).addTo(map).bindPopup('E-trans').openPopup();

window.disableScroll = () => {
  const widthScroll = window.innerWidth - document.body.offsetWidth;
  document.body.scrollPosition = window.scrollY;
  document.body.style.cssText = `
		position: fixed;
		top: ${-window.scrollY}px;
		left: 0;
		width: 100vw;
		height: 100vh;
		padding-right: ${widthScroll}px;
	`;
  document.querySelector('html').style.scrollBehavior = 'unset';
};

window.enableScroll = () => {
  document.body.removeAttribute('style');
  window.scroll({ top: document.body.scrollPosition });
  document.querySelector('html').removeAttribute('style');
};

const createElem = (tag, attr) => {
  const elem = document.createElement(tag);

  return Object.assign(elem, { ...attr });
};

const createModal = (title, description) => {
  const overlayElem = createElem('div', { className: 'modal' });
  const modalElem = createElem('div', { className: 'modal__block' });
  const modalContainer = createElem('div', { className: 'modal__container' });

  const titleElem = createElem('h2', {
    className: 'modal__title',
    textContent: `Заказать ${title}`,
  });
  const descriptionElem = createElem('p', {
    className: 'modal__description',
    textContent: description,
  });

  const formElem = createElem('form', {
    className: 'modal__form',
    method: 'POST',
    action: 'https://jsonplaceholder.typicode.com/posts',
    id: 'order',
  });
  const nameLabelElem = createElem('label', { className: 'modal__label' });
  const nameSpanElem = createElem('span', { className: 'modal__text', textContent: 'Имя' });
  const nameInputElem = createElem('input', {
    className: 'modal__input',
    placeholder: 'Введите ваше имя',
    name: 'name',
    required: true,
  });
  const phoneLabelElem = createElem('label', { className: 'modal__label' });
  const phoneSpanElem = createElem('span', { className: 'modal__text', textContent: 'Телефон' });
  const phoneInputElem = createElem('input', {
    className: 'modal__input',
    placeholder: 'Введите ваш телефон',
    name: 'phone',
    required: true,
  });
  const hideInput = createElem('input', { type: 'hidden', name: 'product', value: title });

  const btnSubmit = createElem('button', {
    className: 'btn modal__btn',
    textContent: 'Заказать',
    type: 'submit',
  });
  btnSubmit.setAttribute('form', 'order');

  const closeModalBtn = createElem('button', {
    className: 'modal__close',
    innerHTML: `
      <svg width="30" height="30" viewBox="0 0 30 30">
        <use href="./img/sprite.svg#close" />
      </svg>
    `,
    ariaLabel: 'Закрыть модальное окно.',
  });

  overlayElem.addEventListener('click', event => {
    const target = event.target;
    if (target === overlayElem || target.closest('.modal__close')) {
      overlayElem.remove();
      enableScroll();
    };
  });

  nameLabelElem.append(nameSpanElem, nameInputElem);
  phoneLabelElem.append(phoneSpanElem, phoneInputElem);
  formElem.append(nameLabelElem, phoneLabelElem, hideInput);

  modalContainer.append(titleElem, descriptionElem, formElem, btnSubmit, closeModalBtn);
  modalElem.append(modalContainer);
  overlayElem.append(modalElem);
  disableScroll();
  document.body.append(overlayElem);
};

const productTitle = document.querySelectorAll('.product__title');
const productDescription = document.querySelectorAll('.product__description');
const productBtn = document.querySelectorAll('.product__btn');

for (let i = 0; i < productBtn.length; i++) {
  productBtn[i].addEventListener('click', () => {
    const title = productTitle[i].textContent;
    const description = productDescription[i].textContent;
    createModal(title, description);
  });
}
