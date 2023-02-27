import imagesApiService from './imagesApiService';
import renderImagesCards from './renderCards';
import SimpleLightbox from 'simplelightbox';
import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../css/style.css';

const form = document.getElementById('search-form');
const container = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
loadMore.classList.add('is-hidden');

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  fadeSpeed: 250,
});
let currentPage = 1;
let searchQuery = '';

form.addEventListener('submit', onSearch);
loadMore.addEventListener('click', onLoadMoreBtn);

async function onSearch(e) {
  e.preventDefault();
  resetRenderGallery();
  resetPage();

  searchQuery = e.currentTarget.searchQuery.value.trim();

  if (searchQuery === '') {
    return Notify.failure(`Please enter the text request`);
  }
  const response = await imagesApiService(searchQuery, currentPage);
  const hits = await response.hits;

  if (hits.length < 1) {
    return (
      Notify.warning(
        `Sorry, there are no images matching your search query. Please try again.`
      ),
      loadMore.classList.add('is-hidden')
    );
  } else {
    renderImagesCards(hits);
    Notify.success(`Hooray! We found ${response.totalHits} images.`);
    gallery.refresh();
  }

  if (hits.length >= 40) {
    loadMore.classList.remove('is-hidden');
  }
}

async function onLoadMoreBtn() {
  currentPage += 1;

  const response = await imagesApiService(searchQuery, currentPage);
  const hits = await response.hits;

  renderImagesCards(hits);
  gallery.refresh();

  const page = Number.parseFloat(response.totalHits / 40);
  if (currentPage >= page) {
    loadMore.classList.add('is-hidden');
    Notify.info(`We're sorry, but you've reached the end of search results.`);
  }
}

function resetRenderGallery() {
  container.innerHTML = '';
}
function resetPage() {
  currentPage = 1;
}
