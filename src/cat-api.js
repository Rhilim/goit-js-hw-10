import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'select-pure';
// new SlimSelect({
//   select: '#select'
// });

export const loader = document.querySelector('.loader');

const breedSelect = document.querySelector('.breed-select');
export { breedSelect };
const errorMsg = document.querySelector('.error');
const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_qVIX3pve3cDaT0OEOvS7AYCE7mYAILrQlRPd9doijm9Adi6P7vAXPc3SQaY8Qvei';

export function fetchBreeds() {
  loader.textContent = '';
  fetch(`${BASE_URL}breeds?api_key=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        Notify.failure(`${errorMsg.textContent}`);
      }
      return response.json();
    })
    .then(data => {
      // console.log(data);
      createAllOptions(data);

      errorMsg.textContent = '';
      loader.style.display = 'none';
    })
    .catch(error => {
      // console.log(error);
      loader.style.display = 'none';
    });
}

function createAllOptions(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    let value = arr[i].id;
    let text = arr[i].name;
    const optionsElements = document.createElement('option');
    optionsElements.value = value;
    optionsElements.textContent = text;
    breedSelect.appendChild(optionsElements);
  }
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${API_KEY}`
  ).then(response => response.json());
}
