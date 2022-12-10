import { TrendingFilmsApiService } from "./apiFilms/apiTrending";
import axios from 'axios';
<<<<<<< HEAD
console.log('from main.js')
const trending  = new TrendingFilmsApiService()
trending.fetchFilms().then(response => console.log(response.results))
trending.fetchGenres().then(response =>console.log(response))

function markUpGallery(filmsArr, genres) {
    return filmsArr
      .map(
        ({id, title, release_date, poster_path, genre_ids}) =>{
            const genresList = genres.filter(genre => genre_ids.includes(genre.id))
          `<div class = "gallery-item">
          <a href="${item.largeImageURL}">
          <img class="gallery-image" src="${item.webformatURL}" alt="${item.tags}" loading="lazy"/>
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>${item.likes}
            </p>
            <p class="info-item">
              <b>Views</b>${item.views}
            </p>
            <p class="info-item">
              <b>Comments</b>${item.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>${item.downloads}
            </p>
          </div>
          </div>`}
      )
      .join('');
  }
  
=======
const trendingFilmsApiService = new TrendingFilmsApiService()
trendingFilmsApiService.fetchFilms().then(response => console.log(response))
>>>>>>> 73ba0387242b39979eb9e6ffe8dca3ae55083b29
