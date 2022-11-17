import { refs } from './refs-html-el';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

//рендер розмітки html
function renderHtmlMurkup({ hits }) {
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<a class="gallery__link" href="${largeImageURL}">
              <div class="photo-card">
                  <img class="imgsize" src="${webformatURL}" alt="${tags}" loading="lazy" height="200"/>
                  <div class="info">
                      <p class="info-item"><b>Likes</b>${likes}</p>
                      <p class="info-item"><b>Views</b>${views}</p>
                      <p class="info-item"><b>Comments</b>${comments}</p>
                      <p class="info-item"><b>Downloads</b>${downloads}</p>
                  </div>
              </div>
          </a>`
    )
    .join('');
  refs.markupEl.insertAdjacentHTML('beforeend', markup);
}
// width="220" height="240"

let gallery = null;

const galleryAllImages = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  animationSpeed: 300,
  fadeSpeed: 350,
});

function createLightBox() {
  if (!gallery) {
    gallery = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
      animationSpeed: 300,
      fadeSpeed: 350,
      close: false,
    });
  }
  gallery.refresh();
}

// const handClick = e.target.nodeName;
// if (handClick !== 'IMG') {
//   return;
// }

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

export default { renderHtmlMurkup, createLightBox, smoothScroll };
