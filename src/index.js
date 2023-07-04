import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SlimSelect from 'slim-select';

axios.defaults.headers.common['x-api-key'] =
  'live_6oipNaEf4MhA3t1QKH9rU8tuRomBydjiP5ZsBkmsecdwgBpHv8VKGluJCVsYRtAH';
import {
  loader,
  fetchCatByBreed,
  fetchBreeds,
  breedSelect,
} from './cat-api.js';

fetchBreeds();

// new SlimSelect({
//   select: breedSelect,
// });

const catContainer = document.querySelector('.cat-info');

breedSelect.addEventListener('change', onSelectView);

function onSelectView() {
  const breedId = selectedBreeds();
  const isContent = document.querySelector('.img-cat');

  if (isContent) {
    clearCatContainer();
  }

  showLoadingMessage();

  fetchCatByBreed(breedId)
    .then(markUp)
    .catch(showError)
    .finally(hideLoadingMessage);
}

function selectedBreeds() {
  const selectedValue = breedSelect.options[breedSelect.selectedIndex];
  const selectedText = selectedValue.textContent;
  const selectedId = selectedValue.value;

  return selectedId;
}

function showLoadingMessage() {
  loader.style.display = 'block';
  Notify.success('Here is selected breed!');
}

function markUp(arr) {
  let imgUrl = arr.map(link => link.url);
  let catDesc = arr.map(link => link.breeds[0].description);
  let catTemp = arr.map(link => link.breeds[0].temperament);
  let catName = arr.map(link => link.breeds[0].name);

  const catMarkUp = `
<table class='table'>
      <tr>
      <td>
      <img class="img-cat" src="${imgUrl}" width="440" loading="lazy" style='border: 2px orange solid'>
      </td>
      <td class="text-cell">
      <div class="text-desc" style='margin: 50px'>
      <h1 class="cat-title" style='font-family: Helvetica; font-size: 60px;
  background: -webkit-linear-gradient(#eee, #333);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;'>${catName}</h1>
        <p class="cat-info" style='font-size: 24px; font-family: Helvetica; width: 800px; color: #606470'><b>Description: </b>${catDesc}</p>
        <p class="cat-info" style='font-size: 24px; font-family: Helvetica; width: 800px; color: #606470'><b>Temperament: </b>${catTemp}</p>
      </div>
      </td>
      </tr>
      </table>
    `;

  catContainer.insertAdjacentHTML('beforeend', catMarkUp);
}

function showError() {
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

function hideLoadingMessage() {
  loader.style.display = 'none';
}

function clearCatContainer() {
  const children = Array.from(catContainer.children);

  children.forEach(child => {
    catContainer.removeChild(child);
  });
}

// STYLES

const bodyEl = document.querySelector('body');
bodyEl.style.cssText =
  'background-image: linear-gradient(to right, #ff7e5f, #feb47b); text-align: center';

breedSelect.style.cssText =
  'text-align: center; background-color: #FFEFBA; font-weight: 600; font-family: Helvetica; appearance: none; border-radius: 0; border: 1px solid #000; border-radius: 4px; padding: 1rem 1rem 1rem 1rem';

catContainer.style.cssText = 'text-align: left; margin: 150px';
