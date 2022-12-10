import { API_KEY } from "./API_KEY";
import axios from 'axios';
import { BASE_URL } from "./baseUrl";

export class TrendingFilmsApiService{
    constructor(){
        this.page = 1;
<<<<<<< HEAD
        this.genres = this.fetchGenres();
=======
>>>>>>> 73ba0387242b39979eb9e6ffe8dca3ae55083b29
    }

    async fetchFilms() {
        try {
<<<<<<< HEAD
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
=======
            const options = {params:{"api_key": API_KEY}}
            const url = `${BASE_URL}/trending/movie/week?`
          const response = await axios.get('/user?ID=12345', options);
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
>>>>>>> 73ba0387242b39979eb9e6ffe8dca3ae55083b29
}