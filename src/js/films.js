
import { BASE_URL } from "./apiFilms/baseUrl";


import { TrendingFilmsApiService } from "./apiFilms/apiTrending";
import axios from 'axios';
const trending  = new TrendingFilmsApiService()




const filmGallery = document.querySelector('.film-gallery')

trending.fetchFilms().then(response => 
    // console.log(response.results)
    filmGallery.innerHTML = markUpGallery(response.results)
    )
trending.fetchGenres().then(response =>console.log(response))




 async function filmer(){
    try{
const genres = await trending.fetchGenres()
trending.genres = genres;
    } catch(err){
console.log(err)
    }
 }

 console.log('trending.genres', trending.genres)
 
function markUpGallery(filmsArr) {
        return filmsArr
      .map(
        ({id, title, release_date, poster_path, genre_ids}) =>{
            const imgPath = `https://image.tmdb.org/t/p/w500${poster_path}`
            const releaseDate = new Date(`${release_date}`);
const releaseYear = releaseDate.getFullYear()
// const genres = await trending.fetchGenres();
// console
            // const genresList = genres.filter(genre => genre_ids.includes(genre.id))
          return `<li class = "gallery-item">
           <img class="gallery-image" src="${imgPath}" alt="${title}" loading="lazy"/>
           <div class="info">
            <p class="info-item">${title.toUpperCase()}</p>
            <p class="info-item">${genre_ids} | ${releaseYear}</p>
          </div>
          </li>`}
      )
      .join('');
      
  }