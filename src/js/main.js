import { TrendingFilmsApiService } from "./apiFilms/apiTrending";
import axios from 'axios';
const trendingFilmsApiService = new TrendingFilmsApiService()
trendingFilmsApiService.fetchFilms().then(response => console.log(response))