import ApiImagesRequest from './api-get-gallery';
import renderHtmlMurkup from './render-markup';
import { refs } from './refs-html-el';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Notify.success('');
// Notify.warning('Sorry, there are no images matching your search query. Please try again.');

const responseApiImg = new ApiImagesRequest();

function handleSubmit(e) {
  e.preventDefault();
  refs.markupEl.innerHTML = '';
  refs.loadMoreBtn.classList.add('disablet');
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

      if (mark.hits.length === 0) {
        refs.loadMoreBtn.classList.add('disablet');
        Notify.info(
          `We're sorry, but you've reached the end of search results.`
        );
      }
      console.log(mark);
      renderHtmlMurkup(mark);
    } catch (error) {
      console.log(error.message);
    }
  }

  renderImgMarkup();
  responseApiImg.incrementPage();

  setTimeout(() => {
    refs.loadMoreBtn.classList.remove('disablet');
  }, 1000);
}
refs.formSubmitEl.addEventListener('submit', handleSubmit);

function handlePlus(e) {
  e.preventDefault();

  async function renderImgMarkup() {
    try {
      const mark = await responseApiImg.getImages();
      renderHtmlMurkup(mark);
      // console.log(mark);
    } catch (error) {
      console.log(error.message);
    }
  }
  renderImgMarkup();
  responseApiImg.incrementPage();
}
refs.loadMoreBtn.addEventListener('click', handlePlus);

function inputSearchClick(e) {
  e.preventDefault();
  const inputValuee = e.target.value.trim();
  if (inputValuee === '') {
    refs.markupEl.innerHTML = '';
    refs.loadMoreBtn.classList.add('disablet');
    return;
  }
}
refs.inputValue.addEventListener('input', debounce(inputSearchClick, 250));
