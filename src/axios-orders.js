import axios from 'axios';

//An instance that holds the base URL is created to be used within any component that makes requests to the base URL
const instance = axios.create({
  baseURL: 'https://react-burger-6d293.firebaseio.com/'
});

export default instance;
