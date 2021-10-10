let ApiKey = 'a5f1951d920262d2e977eef2129fc60f';

let nameInputEl = document.querySelector('#search');
let userFormEl = document.querySelector('#user-form');
var cityContainerEl = document.querySelector('#city-container');


let formSubmitHandler = function (event) {
    event.preventDefault();
  
    let search = nameInputEl.value.trim();
  
    if (search) {
      getCity(search);
  
      cityContainerEl.textContent = '';
      nameInputEl.value = '';
    } else {
      alert('Please enter a valid city name');
    }
  };


  let getCity = function (getCity) {
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + getCity + '&appid=' + ApiKey;
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayRepos(data, getCity);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to Weather App');
      });
  };







// fetch(queryURL)
// .then(function(response) {
//     return response.json();
// }).then(function(data) {
// console.log(data)
// })


// API call by city
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


userFormEl.addEventListener('submit', formSubmitHandler);
