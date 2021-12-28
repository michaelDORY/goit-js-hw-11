const axios = require('axios').default;

export default class APIService {
  BASE_URL = "https://pixabay.com/api/";
  KEY = "23451376-97a3607790a431b70572031d3";

  constructor() {
    this.page = 1;
    this.perPage = 40;
  }

  async fetchPhotos() {
    const response = await axios.get(`${this.BASE_URL}?key=${this.KEY}&q=${this.searchQuery}&image-type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`);
    const data = response.data;
    this.page += 1;
    this.totalHits = data.totalHits;
    return data.hits;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get query() {
    return this.searchQuery;
  }
}