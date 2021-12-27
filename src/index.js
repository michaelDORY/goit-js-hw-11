import './sass/main.scss';
import Notiflix from 'notiflix';
import API_Service from './APIService';
import LoadMoreBtn from './loadMoreBtn';
const axios = require('axios').default;
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const REFS = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
}

const APIService = new API_Service();
const loadMoreBtn = new LoadMoreBtn({
  selector: ".load-more"
});

REFS.searchForm.addEventListener("submit", onSearch);
loadMoreBtn.button.addEventListener("click", loadMore);

function onSearch(e) {
  e.preventDefault();

  if (e.currentTarget.elements.searchQuery.value != APIService.searchQuery) {
    APIService.searchQuery = e.currentTarget.elements.searchQuery.value;
    clearGallery();
    loadMoreBtn.hide();

    APIService.fetchPhotos().then(result => {
      if (result.length == 0) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      }
      else if (result.length < APIService.perPage && result.length > 0) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        renderPhotos(result)
      }
      else {
        Notiflix.Notify.success(`Hooray! We've found ${APIService.totalHits} images`)
        renderPhotos(result);
        loadMoreBtn.show();
      }
    });
  }
}

function renderPhotos(photos) {
  const listOfPhotosInHTML = photos.map(item => {
    return `
    <a>
      <div class='photo-card'>
        <img src=${item.webformatURL} class='card-photo' alt=${item.tags} loading='lazy' />
        <div class='info'>
          <p class='info-item'>
            <b>Likes</b>
            ${item.likes}
          </p>
          <p class='info-item'>
            <b>Views</b>
            ${item.views}
          </p>
          <p class='info-item'>
            <b>Comments</b>
            ${item.comments}
          </p>
          <p class='info-item'>
            <b>Downloads</b>
            ${item.downloads}
          </p>
        </div>
      </div>
    </a>`
  }).join("");

  REFS.gallery.insertAdjacentHTML("beforeEnd", listOfPhotosInHTML);
}

function clearGallery() {
  REFS.gallery.innerHTML = '';
}

function loadMore() {
  APIService.page += 1;
  APIService.fetchPhotos().then(result => {
    if (APIService.perPage * (APIService.page + 1) >= APIService.totalHits) {
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      loadMoreBtn.hide();
    }
    else {
      renderPhotos(result)
    }
  });
}
