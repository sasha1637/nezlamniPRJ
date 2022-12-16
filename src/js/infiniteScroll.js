import { API_KEY } from './apiFilms/apiKey';
import { BASE_URL } from './apiFilms/baseUrl';

import fetchMovies from './apiFilms/fetchMovies';

import markUpGallery  from './apiFilms/markUpGallery';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import throttle from 'lodash.throttle';

const searchInput = document.querySelector('.search_input');
const filmGallery = document.querySelector('.film-gallery');

export default function infiniteScroll(page, per_page = 20) {
  let triggered = false;

  window.addEventListener(
    'scroll',
    throttle(async () => {
      const height = document.body.offsetHeight;
      const screenHeight = window.innerHeight;
      const scrolled = window.scrollY;
      const threshold = height - screenHeight / 3;
      const position = scrolled + screenHeight;

      if (position < threshold || triggered) {
        return;
      }

      triggered = true;
      page += 1;

      //Place for spinner

      const fetchedMovies = await fetchMovies(searchInput.value, page);
      const genres = await axios(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
      );

      const total_results = await fetchedMovies.data.total_results;

      filmGallery.insertAdjacentHTML(
        'beforeend',
        markUpGallery(fetchedMovies.data.results, genres.data.genres)
      );
      
      

      if (per_page * page >= total_results) {
        Notify.info('You have reached the end of search results.');

        triggered = true;
        return;
      }

      triggered = false;
    }, 300)
  );
}


// async function fetchFilms (page) {
//   try {
//     const response = await axios.get(`${BASE_URL}/trending/movie/week?page=${page}&api_key=${API_KEY}`);
//     return response.data.results;
//   } catch (error) {
//     throw new Error(`Oops, something went wrong`);
//   }
// }