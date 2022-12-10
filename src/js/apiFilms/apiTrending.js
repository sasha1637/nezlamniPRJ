import { API_KEY } from "./API_KEY";
import axios from 'axios';
import { BASE_URL } from "./baseUrl";

export class TrendingFilmsApiService{
    constructor(){
        this.page = 1;
        this.genres = this.fetchGenres();
    }

    async fetchFilms() {
        try {
       const options = {params: {api_key: API_KEY}}
            const url = `${BASE_URL}/trending/movie/week?`
          const response = await axios.get(url, options);
          return response.data;
        } catch (error) {
          throw new Error(`Oops, something went wrong`)
        }
      }

      async fetchGenres(){
        try {
            const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
            const gentesList = await axios.get(url)
            return gentesList.data.genres;
        }catch(error){
            throw new Error(`Oops, something went wrong`)
        }
    }

}