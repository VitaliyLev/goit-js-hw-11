import {refs} from './refs-html-el'

//рендер розмітки html
export default function renderHtmlMurkup({ hits }) {
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
                  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="220" height="240"/>
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