// export default function createImagesCards({
//   webformatURL,
//   largeImageURL,
//   tags,
//   likes,
//   views,
//   comments,
//   downloads,
// }) {
//   return `<div class="photo-card">
//             <a class="gallery__item" href="${largeImageURL}">
//               <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//             </a>
//             <div class="info">
//               <p class="info-item">
//                 <b>${likes}</b>
//               </p>
//               <p class="info-item">
//                 <b>${views}</b>
//               </p>
//               <p class="info-item">
//                 <b>${comments}</b>
//               </p>
//               <p class="info-item">
//                 <b>${downloads}</b>
//               </p>
//             </div>
//           </div>
//         `;
// }
export default async function renderImagesCards(images) {
  const container = document.querySelector('.gallery');
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
            <a class="photo-card__item" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" class="photo" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>`;
      }
    )
    .join('');
  container.insertAdjacentHTML('beforeend', markup);
}
