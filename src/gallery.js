'use strict';
import items from "./gallery-items.js";

/* *Создание и рендер разметки по массиву данных и предоставленному шаблону.
*Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
*Открытие модального окна по клику на элементе галереи.
*Подмена значения атрибута src элемента img.lightbox**image.
*Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
*Очистка значения атрибута src элемента img.lightbox**image. Это необходимо для того,
чтобы при следующем открытии модального окна, пока грузится изображение,
мы не видели предыдущее.

Ссылка на оригинальное изображение должна храниться в data-атрибуте
source на элементе img, и указываться в href
ссылки (это необходимо для доступности).

<li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li>
Дополнительно
Следующий функционал не обязателен при сдаче задания, но будет хорошей практикой по работе с событиями.

Закрытие модального окна по клику на div.lightbox\_\_overlay.
Закрытие модального окна по нажатию клавиши ESC.
Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо". */

const galleryRef = document.querySelector('.js-gallery');

const createGaleryItems = (image, index) => {
    galleryRef.insertAdjacentHTML('beforeend',
        `<li class="gallery__item"><a class="gallery__link" href=${image.original}><img class="gallery__image" src=${image.preview} data-source=${image.original} data-index=${index} alt='${image.description}'></a></li>`);
};

items.forEach((image, index) => createGaleryItems(image, index));

const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImageRef = lightboxRef.querySelector('.lightbox__image');
const lightboxButtonRef = lightboxRef.querySelector('[data-action="close-lightbox"]');
const lightboxOverlayRef = lightboxRef.querySelector('.lightbox__overlay');

let originalImgUrl = '';
let alt = '';
let indexModalImg;

const openModal = () => {
  window.addEventListener("keydown", keyEscPress);
  lightboxRef.classList.add('is-open');
  lightboxImageRef.setAttribute('src', `${originalImgUrl}`);
  lightboxImageRef.setAttribute('alt', `${alt}`);
  window.addEventListener("keydown", onRightPress);
  window.addEventListener("keydown", onLeftPress);
};

const closeModal = () => {
  window.removeEventListener("keydown", keyEscPress);
  lightboxRef.classList.remove('is-open');
  lightboxImageRef.setAttribute('src', ``);
  lightboxImageRef.setAttribute('alt', ``);
};

const getBigImgUrl = event => {
  event.preventDefault()
  if (event.target.nodeName !== 'IMG')
  { return }
  
  originalImgUrl = event.target.dataset.source;
  alt = event.target.getAttribute('alt');
  indexModalImg = +event.target.dataset.index;
  console.log(indexModalImg);
  openModal();
}

/* Доп задания */

const closeOverlay = (event) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};

const keyEscPress = (event) => {
  if (event.code === "Escape") {
    closeModal();
  }
};

const onRightPress = (event) => {
  if (event.code === "ArrowRight") {
    window.addEventListener("keydown", onLeftPress);
    indexModalImg++;
    lightboxImageRef.setAttribute("src", `${items[indexModalImg].original}`);
  }
  if (indexModalImg === items.length - 1) {
    window.removeEventListener("keydown", onRightPress);
    window.addEventListener("keydown", onLeftPress);
  }
  if (indexModalImg < items.length - 1) {
    window.addEventListener("keydown", onRightPress);
  }
  console.log(indexModalImg);
};

const onLeftPress = (event) => {
  if (event.code === "ArrowLeft") {
    window.addEventListener("keydown", onRightPress);
    indexModalImg--;
    lightboxImageRef.setAttribute("src", `${items[indexModalImg].original}`);
  }
  if (indexModalImg === 0) {
    window.removeEventListener("keydown", onLeftPress);
    window.addEventListener("keydown", onRightPress);
  }
  if (indexModalImg > 0) {
    window.addEventListener("keydown", onLeftPress);
  }
  console.log(indexModalImg);
};

galleryRef.addEventListener('click', getBigImgUrl);
lightboxButtonRef.addEventListener('click', closeModal);
lightboxOverlayRef.addEventListener('click', closeOverlay);

