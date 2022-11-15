import axios from 'axios';

const URL = 'https://pixabay.com/api/?key=';
const MY_PIXA_KEY = '31278796-a3a5484ed91accb8b7bce1cf7&';
const perPage = 40;

export default class ApiImagesRequest {
  constructor() {
    this.url = URL;
    this.key = MY_PIXA_KEY;
    this.perPage = perPage;
    this.search = '';
    this.page = 1;
  }

  get searchValue() {
    return this.search;
  }

  set searchValue(value) {
    return (this.search = value);
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  getOptions() {
    const options = new URLSearchParams({
      q: `${this.search}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: `${this.perPage}`,
      page: `${this.page}`,
    });
    return options;
  }

  async getImages() {
    const option = this.getOptions();
    const response = await axios.get(`${URL}${MY_PIXA_KEY}${option}`);
    return response.data;
  }
}
