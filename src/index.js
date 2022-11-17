import ApiImagesRequest from './api-get-gallery';
// import renderHtmlMurkup from './render-markup';
import { refs } from './refs-html-el';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Utils from './render-markup';

const responseApiImg = new ApiImagesRequest();

function handleSubmit(e) {
  e.preventDefault();
  refs.markupEl.innerHTML = '';
  refs.loadMoreBtn.classList.add('btn--disablet');
  responseApiImg.resetPage();
  responseApiImg.searchValue = e.target.elements.searchQuery.value.trim();
  // e.target.elements.searchQuery.value = responseApiImg.searchValue;

  if (responseApiImg.searchValue === '') {
    refs.markupEl.innerHTML = '';
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  async function renderImgMarkup() {
    try {
      const mark = await responseApiImg.getImages();
      // if (!mark.ok) {
      //   throw new Error(mark.status);
      //   return;
      // }

      if (mark.hits.length === 0) {
        Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      if (mark.hits.length >= 1) {
        Notify.success(`Hooray! We found ${mark.totalHits} images.`);
      }

      Utils.renderHtmlMurkup(mark);
      Utils.createLightBox();

      setTimeout(() => {
        refs.loadMoreBtn.classList.remove('btn--disablet');
      }, 1000);
    } catch (error) {
      console.log(error.message);
    }
  }
  renderImgMarkup();
  // Utils.smoothScroll();
}
refs.formSubmitEl.addEventListener('submit', handleSubmit);

function handlePlus(e) {
  e.preventDefault();
  responseApiImg.incrementPage();

  async function renderImgMarkup() {
    try {
      const mark = await responseApiImg.getImages();

      if (
        responseApiImg.page > Math.ceil(mark.totalHits / responseApiImg.perPage)
      ) {
        refs.loadMoreBtn.classList.add('btn--disablet');
        Notify.info(
          `We're sorry, but you've reached the end of search results.`
        );
        return;
      }
      Utils.renderHtmlMurkup(mark);
      Utils.createLightBox();
    } catch (error) {
      console.log(error.message);
    }
  }
  renderImgMarkup();
  // Utils.smoothScroll();
}
refs.loadMoreBtn.addEventListener('click', handlePlus);

function inputSearchClick(e) {
  e.preventDefault();
  const inputValuee = e.target.value.trim();
  if (inputValuee === '') {
    refs.markupEl.innerHTML = '';
    refs.loadMoreBtn.classList.add('btn--disablet');
    return;
  }
}
refs.inputValue.addEventListener('input', debounce(inputSearchClick, 250));
