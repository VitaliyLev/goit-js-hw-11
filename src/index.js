import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Notify.success('');
// Notify.warning('Sorry, there are no images matching your search query. Please try again.');

const refs = {
  markupEl: document.querySelector('.gallery'),
  formSubmitEl: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.searchbtns'),
};

const URL = 'https://pixabay.com/api/?key=';
const MY_PIXA_KEY = '31278796-a3a5484ed91accb8b7bce1cf7&';
const perPage = 40;

class ApiImagesRequest {
  constructor() {
    this.url = URL;
    this.key = MY_PIXA_KEY;
    this.perPage = perPage;
    this.search = '';
    this.page = 1;
  }

  get searchValue() {
    return this.search;
  }

  set searchValue(value) {
    return (this.search = value);
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  getOptions() {
    const options = new URLSearchParams({
      q: `${this.search}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: `${this.perPage}`,
      page: `${this.page}`,
    });
    return options;
  }

  async getImages() {
    const option = this.getOptions();
    const response = await axios.get(`${URL}${MY_PIXA_KEY}${option}`);
    return response.data;
  }
}

const responseApiImg = new ApiImagesRequest();

function handleSubmit(e) {
  e.preventDefault();
  refs.markupEl.innerHTML = '';
  responseApiImg.resetPage();
  responseApiImg.searchValue = e.target.elements.searchQuery.value.trim();
  // e.target.elements.searchQuery.value = responseApiImg.searchValue;

  if (responseApiImg.searchValue === '') {
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  renderImgMarkup();
  loadMore ();
  responseApiImg.incrementPage();
}

refs.formSubmitEl.addEventListener('submit', handleSubmit);

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

function handlePlus(e) {
  e.preventDefault();
  renderImgMarkup();
  responseApiImg.incrementPage();
}

refs.loadMoreBtn.addEventListener('click', handlePlus);

//функція обробки відповіді з сервера
async function renderImgMarkup() {
  try {
    const mark = await responseApiImg.getImages();

    if (mark.hits.length === 0) {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    // return renderImgMurkup(mark);
    renderHtmlMurkup(mark);
  } catch (error) {
    console.log(error.message);
  }
}


function loadMore () {
  // .disablet

  refs.loadMoreBtn.classList.remove('disablet')
  // refs.loadMoreBtn.classList.toggle('disablet')
  // refs.markupEl.insertAdjacentHTML();
  // refs.markupEl.insertAdjacentHTML('beforeend', '<button type="button" class="searchbtns disablet">load-more</button>');
}