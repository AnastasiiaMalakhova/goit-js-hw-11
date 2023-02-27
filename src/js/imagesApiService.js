import axios from 'axios';

export default async function imagesApiService(searchQuery, page) {
  try {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '33962833-bf1bb582d3660d3ed3c62dca4';
    const URL = `${BASE_URL}?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
    const response = await axios.get(URL);
    const data = await response.data;
    console.log(data.hits);
    return data;
  } catch (error) {
    console.error(error);
  }
}
