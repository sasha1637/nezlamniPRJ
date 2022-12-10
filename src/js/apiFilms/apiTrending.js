import { API_KEY } from "./API_KEY";
import axios from 'axios';
import { BASE_URL } from './baseUrl';

export class TrendingFilmsApiService{
    constructor(){
        this.page = 1;
    }

    async fetchFilms() {
        try {
            const options = {params:{"api_key": API_KEY}}
            const url = `${BASE_URL}/trending/movie/week?`
          const response = await axios.get('/user?ID=12345', options);
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
}