import axios from 'axios';

const MY_PIXA_KEY = '31278796-a3a5484ed91accb8b7bce1cf7';

const URL = 'https://pixabay.com/api/?key=';

const refs = {
  //   searchel: document.querySelector('.searchbtn'),
  markupEl: document.querySelector('.gallery'),
  formSubmitEl: document.querySelector('#search-form'),
};

async function getImage(searh) {
  try {
    const result = await axios.get(
      URL +
        MY_PIXA_KEY +
        `&q=${searh}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

function handleSubmit(e) {
  e.preventDefault();
  let text = e.target.elements.searchQuery.value;
  // let textt = e.currentTarget.elements.searchQuery.value;
  console.log(text);

    // getImage(text).then(res => {
    //   renderImgMurkup(res);
    // //   console.log(res);
    // }).catch(er => console.log(er.message));

  const markup = async () => {
    try {
      const mark = await getImage(text);
      renderImgMurkup(mark);
    } catch (error) {
      console.log(error.message);
    }
  };
  markup();
}

refs.formSubmitEl.addEventListener('submit', handleSubmit);

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
