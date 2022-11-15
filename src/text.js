// function renderMarkup({ hits }) {
//     const markup = hits
//       .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
//         return `
//         <a class="gallery__link" href="${largeImageURL}">
//           <div class="photo-card">
//               <img src="${webformatURL}" width="305" height="205" alt="${tags}" loading="lazy" />
//               <div class="info">
//                 <p class="info-item">
//                   <b>Likes</b>
//                   ${likes}
//                 </p>
//                 <p class="info-item">
//                   <b>Views</b>
//                   ${views}
//                 </p>
//                 <p class="info-item">
//                   <b>Comments</b>
//                   ${comments}
//                 </p>
//                 <p class="info-item">
//                   <b>Downloads</b>
//                   ${downloads}
//                 </p>
//               </div>
//           </div>
//           </a>
//           `;
//       })
//       .join('');
//     refs.markupEl.insertAdjacentHTML('beforeend', markup);
//   }

// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads


// ========================

import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//+, - : повідомлення від нотіфікс
// use
// notifix
// Notiflix.Notify.success('');
// Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');

// ключі і силка на сервер картинок
const MY_PIXA_KEY = '31278796-a3a5484ed91accb8b7bce1cf7';
const URL = 'https://pixabay.com/api/?key=';

// силки на дом
const refs = {
  //   searchel: document.querySelector('.searchbtn'),
  markupEl: document.querySelector('.gallery'),
  formSubmitEl: document.querySelector('#search-form'),
};

//запит на сервер
async function getImage(searh) {
  try {
    const result = await axios.get(
      URL +
        MY_PIXA_KEY +
        `&q=${searh}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=2`
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

//подія на кнопку сьорч хедл клік сабміт
function handleSubmit(e) {
  e.preventDefault();
  refs.markupEl.innerHTML = '';
  const inputSearchValue = e.target.elements.searchQuery.value.trim();

  // getImage(text).then(res => {
  //   renderImgMurkup(res);
  // //   console.log(res);
  // }).catch(er => console.log(er.message));

  const markup = async () => {
    try {
      const mark = await getImage(inputSearchValue);
      renderImgMurkup(mark);
    } catch (error) {
      console.log(error.message);
    }
  };

  markup();
}

refs.formSubmitEl.addEventListener('submit', handleSubmit);

//рендер розмітки картинок
function renderImgMurkup({ hits }) {
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






// //напиешмо клас для створення запиту на сервер і
// // щоб він реалізував створення сторінок нових запитів
// import axios from 'axios';

// const refs = {
//   //   searchel: document.querySelector('.searchbtn'),
//   markupEl: document.querySelector('.gallery'),
//   formSubmitEl: document.querySelector('#search-form'),
//   imgPlus: document.querySelector('.searchbtns'),
// };

// // ключі і силка на сервер картинок
// const MY_PIXA_KEY = '31278796-a3a5484ed91accb8b7bce1cf7';
// const URL = 'https://pixabay.com/api/?key=';

// // const URL = 'https://pixabay.com/api/?key=';
// // const MY_PIXA_KEY = '31278796-a3a5484ed91accb8b7bce1cf7';

// // class ApiImagesRequest {
// //   constructor() {
// //     // this.url = URL;
// //     // this.key = MY_PIXA_KEY;
// //     this.search = '';
// //     // this.imgType = 'image_type=photo';
// //     // this.orientation = 'orientation=horizontal';
// //     // this.safesearch = 'safesearch=true';
// //     // this.perPage = 'per_page=40';
// //     this.page = 1;
// //   }

// //   incrementPage() {
// //     this.page += 1;
// //   }

// //   //запит на сервер
// //   async getImages() {
// //     try {
// //       const result = await axios.get(
// //         `https://pixabay.com/api/?key=31278796-a3a5484ed91accb8b7bce1cf7&q=${this.searh}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`

// //         // this.url +
// //         //   this.key +
// //           // `&q=${this.searh}&${this.imgType}&${this.orientation}&${this.safesearch}&${this.perPage}&${this.page}`

// //           // `&q=${this.searh}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=2`
// //       );
// //       return result.data;
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   }
// // }

// // const imag = new ApiImagesRequest;

// let page = 1;
// inputSearchValue = '';
// async function getImage(searh, page) {
//   try {
//     const result = await axios.get(
//       URL +
//         MY_PIXA_KEY +
//         `&q=${searh}&image_type=photo&orientation=horizontal&safesearch=true&per_page=10&page=${page}`
//     );
//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// }



// function handleSubmit(e) {
//   e.preventDefault();
//   refs.markupEl.innerHTML = '';
//   page = 1;
//   // imag.search = e.target.elements.searchQuery.value.trim();
//   // imag.getImages().then(res => renderImgMurkup(res))

//   const inputSearchValue = e.target.elements.searchQuery.value.trim();
//   // const markup = async () => {
//   //   try {
//   //     const mark = await getImage(inputSearchValue, page);
//   //     renderImgMurkup(mark);
//   //   } catch (error) {
//   //     console.log(error.message);
//   //   }
//   // };

//   markup(inputSearchValue, page);

//   page +=1;
// }

// refs.formSubmitEl.addEventListener('submit', handleSubmit);

// function renderImgMurkup({ hits }) {
//   const markup = hits
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) =>
//         `<a class="gallery__link" href="${largeImageURL}">
//             <div class="photo-card">
//                 <img src="${webformatURL}" alt="${tags}" loading="lazy" width="220" height="240"/>
//                 <div class="info">
//                     <p class="info-item"><b>Likes</b>${likes}</p>
//                     <p class="info-item"><b>Views</b>${views}</p>
//                     <p class="info-item"><b>Comments</b>${comments}</p>
//                     <p class="info-item"><b>Downloads</b>${downloads}</p>
//                 </div>
//             </div>
//         </a>`
//     )
//     .join('');
//   refs.markupEl.insertAdjacentHTML('beforeend', markup);
// }







// function handlePlus(e) {
//   e.preventDefault();
//  page +=1;

//  markup(inputSearchValue, page)


// }

// refs.imgPlus.addEventListener('click', handlePlus)


// async function markup (inputSearchValue, page) {
//   try {
//     const mark = await getImage(inputSearchValue, page);
//     renderImgMurkup(mark);
//   } catch (error) {
//     console.log(error.message);
//   }
// };
