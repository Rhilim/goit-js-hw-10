// Here's your API key:
// live_qVIX3pve3cDaT0OEOvS7AYCE7mYAILrQlRPd9doijm9Adi6P7vAXPc3SQaY8Qvei
// Use it as the 'x-api-key' header when making any request to the API, or by adding as a query string parameter e.g.
// 'api_key=live_qVIX3pve3cDaT0OEOvS7AYCE7mYAILrQlRPd9doijm9Adi6P7vAXPc3SQaY8Qvei'
// https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=REPLACE_ME
import fetchBreeds from './cat-api';
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'api_key=live_qVIX3pve3cDaT0OEOvS7AYCE7mYAILrQlRPd9doijm9Adi6P7vAXPc3SQaY8Qvei';

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
// console.log(select);
// console.log(catInfo);
 
// fetchBreeds.then(data =>
//  const options = data.map(breed => {
//    const option = document.createElement('option');
//    option.value = obj.id;
//     option.text = obj.name;
//     return option;
//  }
  
//  ))


  // var options = arrayOfObjects.map(function(obj) {
  //   var option = document.createElement('option');
  //   option.value = obj.id;
  //   option.text = obj.name;
  //   return option;
  // })