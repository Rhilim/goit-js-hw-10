
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'api_key=live_qVIX3pve3cDaT0OEOvS7AYCE7mYAILrQlRPd9doijm9Adi6P7vAXPc3SQaY8Qvei';

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';


const fetchBreeds = breed =>
  fetch(`${BASE_URL}`).then(res => {
    return res.json();
  });

  export default fetchBreeds;