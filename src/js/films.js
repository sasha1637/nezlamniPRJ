import { TrendingFilmsApiService } from './apiFilms/apiTrending';
import  markUpGallery from "./apiFilms/markUpGallery"
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
const trending = new TrendingFilmsApiService();
const container = document.getElementById('pagination');
const options = {
  totalItems: 100,
  itemsPerPage: 20,
  visiblePages: 5,
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

filmer();
// pagination.on('afterMove', async (event) => {
//   const currentPage = event.page
// trending.page=currentPage;
// startFilmsLoader()
// })

// function filmer() {
//   startFilmsLoader().then(data=>{
//     const total_results = data.total_results;
//     pagination.setTotalItems(total_results);
//     pagination.reset();
//   }) 
//     }
// async function startFilmsLoader(){
//   try {
//     const films = await trending.fetchFilms();
//     const genres = await trending.fetchGenres();
//     trending.genres = genres;
//     // filmGallery.innerHTML = markUpGallery(films.results,genres)
//     filmGallery.insertAdjacentHTML('beforeend', markUpGallery(films.results, genres));
//     return films
//   }catch (err) {
//     console.log(err)
//   }
// }







async function filmer() {
  try {
    const films = await trending.fetchFilms();
    const genres = await trending.fetchGenres();
    const total_results = await films.total_results;
    pagination.setTotalItems(total_results);
    pagination.reset();
    trending.genres = genres;
    filmGallery.innerHTML = markUpGallery(films.results,genres)
    // filmGallery.insertAdjacentHTML('beforeend', markUpGallery(films.results, genres));
  } catch (err) {
    console.log(err);
  }
}

pagination.on('afterMove', async (event) => {
  const currentPage = event.page
trending.page=currentPage;
window.scrollTo({
  top: scroll,
});
  try {
    const films = await trending.fetchFilms();
    const genres = await trending.fetchGenres();
    trending.genres = genres;
    filmGallery.innerHTML = markUpGallery(films.results,genres)
    // filmGallery.insertAdjacentHTML('beforeend', markUpGallery(films.results, genres));

  } catch (err) {
    console.log(err);
  }

})