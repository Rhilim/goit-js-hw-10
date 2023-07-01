import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
// new SlimSelect({
//   select: '#select',
// });

axios.defaults.headers.common['x-api-key'] =
  'live_6oipNaEf4MhA3t1QKH9rU8tuRomBydjiP5ZsBkmsecdwgBpHv8VKGluJCVsYRtAH';
import {
  loader,
  fetchCatByBreed,
  fetchBreeds,
  breedSelect,
} from './cat-api.js';

fetchBreeds();

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
      <img class="img-cat" src="${imgUrl}" width="440" height="400" loading="lazy">
      </td>
      <td class="text-cell">
      <div class="text-desc">
      <h1 class="cat-title" style='font-family: Helvetica; font-size: 60px;
  background: -webkit-linear-gradient(#eee, #333);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;'>${catName}</h1>
        <p class="cat-info" style='font-family: Helvetica; color: #606470'><b>Description: </b>${catDesc}</p>
        <p class="cat-info" style='font-family: Helvetica; color: #606470'><b>Temperament: </b>${catTemp}</p>
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
  'background-image: linear-gradient(to right, #FFEFBA,  #FFFFFF); text-align: center';

breedSelect.style.cssText =
  'text-align: center; background-color: #FFEFBA; font-weight: 600; font-family: Helvetica'; 

catContainer.style.cssText = 'text-align: left; border: 1px solid #FFEFBA';

loader.style.cssText = `width: 96px; box-sizing: content-box; height: 48px; background: #FFF; border-color: #de3500; border-style: solid; border-width: 2px 2px 50px 2px; border-radius: 100%; position: relative; animation: 3s yinYang linear infinite`;
loader.style.cssText = `:before:  content: ""; position: absolute; top: 50%; left: 0; background: #FFF; border: 18px solid #de3500; border-radius: 100%; width: 12px; height: 12px; box-sizing: content-box`;
loader.style.cssText = `:after: content: ""position: absolute-top: 50%left: 50%background: #de3500border: 18px solid #FFF; border-radius: 100%; width: 12px; height: 12px box-sizing: content-box`;
loader.style.cssText = `@keyframes yinYang {
  100%{transform: rotate(360deg)}
}`