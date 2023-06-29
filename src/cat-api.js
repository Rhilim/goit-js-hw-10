import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'api_key=live_qVIX3pve3cDaT0OEOvS7AYCE7mYAILrQlRPd9doijm9Adi6P7vAXPc3SQaY8Qvei';

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

fetchBreeds()
  .then(addOptionELtoSelect)
  .catch(error => console.log(error));

  export default fetchBreeds;

function fetchBreeds() {
  return fetch(`${BASE_URL}`).then(res => {
    if (!res.ok) {
      throw Error(res.status);
    }
    return res.json();
  });
}

function addOptionELtoSelect(data) {
  data.map(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.text = breed.name;
    //  console.log(option);
    return select.appendChild(option);
  });
}

