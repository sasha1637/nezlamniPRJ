import { BASE_URL } from './apiFilms/baseUrl';
import { TrendingFilmsApiService } from './apiFilms/apiTrending';
import axios from 'axios';
import  markUpGallery from "./apiFilms/markUpGallery"
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
const trending = new TrendingFilmsApiService();
const container = document.getElementById('pagination');
const searchInput = document.querySelector('.search_input');
const options = {
  totalItems: 100,
  itemsPerPage: 20,
  visiblePages: 10,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
      '</a>'
  }
};
const filmGallery = document.querySelector('.film-gallery');
const pagination = new Pagination(container, options);

async function filmer() {
  try {
    const films = await trending.fetchFilms();
    const genres = await trending.fetchGenres();
    const total_results = films.total_results;
    const options = {
      totalItems: `${total_results}`,
      itemsPerPage: 20,
      visiblePages: 10,
      page: 1,
      centerAlign: true,
      firstItemClassName: 'tui-first-child',
      lastItemClassName: 'tui-last-child',
      template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton:
          '<a href="#" class="tui-page-btn tui-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</a>',
        disabledMoveButton:
          '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</span>',
        moreButton:
          '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
            '<span class="tui-ico-ellip">...</span>' +
          '</a>'
      }
    };
    const pagination = new Pagination(container, options);

    trending.genres = genres;
    filmGallery.innerHTML = markUpGallery(films.results,genres)
    filmGallery.insertAdjacentHTML('beforeend', markUpGallery(films.results, genres));
  } catch (err) {
    console.log(err);
  }
}
filmer();


pagination.on('afterMove', async (event) => {
  const currentPage = event.page
trending.page=currentPage;
  filmer()
  
})
