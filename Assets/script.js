let ApiKey = 'a5f1951d920262d2e977eef2129fc60f';

let nameInputEl = document.querySelector('#search');
let userFormEl = document.querySelector('#user-form');
let cityContainerEl = document.querySelector('#city-container');
let oldCityContainerEl = document.querySelector('#old-cities-container');

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

    // localStorage.setItem(getCity,"value");
    // let getCity = local.localStorage.getItem("key");

  };

  console.log(search)


  let getCity = function (getCity) {
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + getCity + '&appid=' + ApiKey;
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data)

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


let displayRepos = function(data, getCity) {

let dashboardEl = document.createElement("div")

let dashboardTitleEl = document.createElement("h2")
dashboardTitleEl.textContent = data.name;
// let dashboardIconEl = document.createElement("IMG")
// dashboardIconEl = data.weather.icon;
console.log(data.weather.icon)

let dashboardOrderedListEl = document.createElement("ol")
let dashboardList1El = document.createElement("li")
let dashboardList2El = document.createElement("li")
let dashboardList3El = document.createElement("li")
let dashboardList4El = document.createElement("li")




dashboardList1El.textContent = 'Temp: ' + data.main.temp + '°F';
dashboardList2El.textContent = 'Wind: ' + data.wind.gust + ' MPH';
dashboardList3El.textContent = 'Humidity: ' + data.main.humidity + ' %';
dashboardList4El.textContent = 'UV Index: ' + data.main.uvi;




dashboardEl.appendChild(dashboardTitleEl);
// dashboardEl.appendChild(dashboardIconEl);


dashboardOrderedListEl.appendChild(dashboardList1El);
dashboardOrderedListEl.appendChild(dashboardList2El);
dashboardOrderedListEl.appendChild(dashboardList3El);
dashboardOrderedListEl.appendChild(dashboardList4El);


dashboardEl.appendChild(dashboardOrderedListEl);

cityContainerEl.appendChild(dashboardEl);
}




userFormEl.addEventListener('submit', formSubmitHandler);
