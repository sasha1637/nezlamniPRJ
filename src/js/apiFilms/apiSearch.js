import { API_KEY } from './apiKey';
import { BASE_URL } from './baseUrl';

import fetchMovies from './fetchMovies';
import markUpGallery from './markUpGallery';
import infiniteScroll from '../infiniteScroll';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const container = document.querySelector('.tui-pagination');


const searchForm = document.querySelector('.js-search__form');
const searchInput = document.querySelector('.search_input');
const filmGallery = document.querySelector('.film-gallery');

searchForm.addEventListener('submit', async (e, page = 1, per_page = 20) => {
  e.preventDefault();
  container.classList.add('hide')
  console.log(container.classList.add('hide'));
  if (!searchInput.value) {
    return;
  }

  filmGallery.innerHTML = '';

  //Place for spinner

  const fetchedMovies = await fetchMovies(searchInput.value, page);
  const genres = await axios(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const total_results = await fetchedMovies.data.total_results;

  if (fetchedMovies.data.total_results === 0) {
    Notify.warning(
      'Sorry, there are no movies matching your search query. Please try again.'
    );
    return;
  }
  Notify.success(
    `Hooray! We found ${fetchedMovies.data.total_results} movies.`
  );

  filmGallery.insertAdjacentHTML(
    'beforeend',
    markUpGallery(fetchedMovies.data.results, genres.data.genres)
  );

  if (per_page * page >= total_results) {
    return;
  }

  infiniteScroll(page, per_page);
});
