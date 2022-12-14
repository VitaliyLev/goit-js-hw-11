import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './js/refs-html-el';
import ApiImagesRequest from './js/api-get-gallery';
import renderHtmlMurkup from './js/render-markup';
import Utils from './js/utils.js';

const responseApiImg = new ApiImagesRequest();

function handleSubmit(e) {
  e.preventDefault();
  refs.markupEl.innerHTML = '';
  refs.loadMoreBtn.classList.add('btn--disabled');
  responseApiImg.resetPage();
  responseApiImg.searchValue = e.target.elements.searchQuery.value.trim();

  if (responseApiImg.searchValue === '') {
    refs.markupEl.innerHTML = '';
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  temp = false;
  renderImgBtnSearch();
}

function handleBtnLoadMore(e) {
  e.preventDefault();
  responseApiImg.incrementPage();
  renderImgBtnLoadMore();
}

function handleInputSearchClick(e) {
  e.preventDefault();
  const inputValuee = e.target.value.trim();
  if (inputValuee === '') {
    refs.markupEl.innerHTML = '';
    refs.loadMoreBtn.classList.add('btn--disabled');
    return;
  }
}

async function renderImgBtnSearch() {
  try {
    const mark = await responseApiImg.getImages();

    if (mark.hits.length === 0) {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    if (mark.hits.length >= 1) {
      Notify.success(`Hooray! We found ${mark.totalHits} images.`);
    }

    renderHtmlMurkup(mark);
    Utils.createLightBox();

    setTimeout(() => {
      refs.loadMoreBtn.classList.remove('btn--disabled');
    }, 1000);
  } catch (error) {
    console.log(error.message);
  }
}

async function renderImgBtnLoadMore() {
  try {
    const mark = await responseApiImg.getImages();

    if (
      responseApiImg.page > Math.ceil(mark.totalHits / responseApiImg.perPage)
    ) {
      refs.loadMoreBtn.classList.add('btn--disabled');
      Notify.info(`We're sorry, but you've reached the end of search results.`);
      return;
    }
    renderHtmlMurkup(mark);
    Utils.createLightBox();
    Utils.smoothScroll();
  } catch (error) {
    console.log(error.message);
  }
}

refs.formSubmitEl.addEventListener('submit', handleSubmit);
refs.loadMoreBtn.addEventListener('click', handleBtnLoadMore);
refs.inputValue.addEventListener(
  'input',
  debounce(handleInputSearchClick, 250)
);

// infinity scroll
//?????? ???????????? load-more
document.addEventListener('scroll', debounce(handleScroll, 150));

let temp = false;

function handleScroll(e) {
  const heigth =
    e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop;
  refs.loadMoreBtn.classList.add('btn--disabled');

  if (heigth < 1000 && !temp) {
    renderScrollGallery();
    responseApiImg.incrementPage();
  }
}

async function renderScrollGallery() {
  try {
    const mark = await responseApiImg.getImages();

    if (
      responseApiImg.page > Math.ceil(mark.totalHits / responseApiImg.perPage)
    ) {
      Notify.info(`We're sorry, but you've reached the end of search results.`);
      temp = true;
      return;
    }
    renderHtmlMurkup(mark);
    Utils.createLightBox();
  } catch (error) {
    console.log(error.message);
  }
}