let ApiKey = 'a5f1951d920262d2e977eef2129fc60f';
let fiveDayApiKey = '2b5c6242956ebaa4aa9ab9ed8dec6cbb';
let nameInputEl = document.querySelector('#search');
let userFormEl = document.querySelector('#user-form');
let cityContainerEl = document.querySelector('#city-container');
let fiveCityContainerEl = document.querySelector('#city-container-2');
let oldCityContainerEl = document.querySelector('#old-cities-container');

let day1 = document.querySelector("#day1");
let day2 = document.querySelector("#day2");
let day3 = document.querySelector("#day3");
let day4 = document.querySelector("#day4");
let day5 = document.querySelector("#day5");


let formSubmitHandler = function (event) {
  event.preventDefault();

  let search = nameInputEl.value.trim();

  let oldCityBtn = document.createElement("button")
  oldCityBtn.innerHTML = search
  oldCityContainerEl.append(oldCityBtn)
  console.log(search)

  let newData = search;
  if (localStorage.getItem('citySearched') === null) {
    localStorage.setItem('citySearched', '[]');
  }
  let oldData = JSON.parse(localStorage.getItem('citySearched'));
  if (oldData.includes(newData)) {
    console.log('this already exists');
  } else {
    oldData.push(newData);
  }
  localStorage.setItem('citySearched', JSON.stringify(oldData));
  getCity(search)

};



let getCity = function (getCity) {
  cityContainerEl.innerHTML = "";
  let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + getCity + '&units=imperial' + '&appid=' + ApiKey;
  let fiveDayApiUrl = '';
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data)
          console.log(data.coord.lat)
          console.log(data.coord.lon)

        fiveDayApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&units=imperial&appid=' + ApiKey;
          displayRepos(data, getCity);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Weather App');
    });
 // Next 5 days Weather Forecast
    fetch(fiveDayApiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data1) {
          console.log(data1)
          console.log(data1.coord.lat)
          console.log(data1.coord.lon)
          displayRepos(data1, getCity);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Weather App');
    });
 // let getNewCity = function (getNewCity) {
  // console.log(data.coord.lat)
  // console.log(data.coord.lon)
  // let latitude = data.coord.lat
  // let longitude = data.coord.lon
 fiveCityContainerEl.innerHTML = "";
 // data.coords.lat
 // or data.coords.lon
 };






let displayRepos = function (data, getCity) {
  // Converts the UNIX timestamp to required date & time
  let todaysDate = (data.dt);
  let date = new Date(todaysDate * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  console.log(formattedTime);
  function convertDate(date) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    let d = new Date(date)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
  }
  console.log(convertDate(date));

  // Todays Weather
  let dashboardEl = document.createElement("div")
// Title of Dashboard
  let dashboardTitleEl = document.createElement("h2")
  dashboardTitleEl.textContent = data.name + " (" + convertDate(date) + ")";

  dashboardEl.appendChild(dashboardTitleEl);
  cityContainerEl.appendChild(dashboardEl);
// Contents of Dashboard
  let dashboardOrderedListEl = document.createElement("ol")
  let dashboardList1El = document.createElement("li")
  let dashboardList2El = document.createElement("li")
  let dashboardList3El = document.createElement("li")
  let dashboardList4El = document.createElement("li")

  dashboardList1El.textContent = 'Temp: ' + data.main.temp + '°F';
  dashboardList2El.textContent = 'Wind: ' + data.wind.gust + ' MPH';
  dashboardList3El.textContent = 'Humidity: ' + data.main.humidity + ' %';
  dashboardList4El.textContent = 'UV Index: ' + data.main.uvi;

  dashboardOrderedListEl.appendChild(dashboardList1El);
  dashboardOrderedListEl.appendChild(dashboardList2El);
  dashboardOrderedListEl.appendChild(dashboardList3El);
  dashboardOrderedListEl.appendChild(dashboardList4El);

  dashboardEl.appendChild(dashboardOrderedListEl);

}


// let fiveDayDisplayRepos = function (data1, getCity) {
// }





userFormEl.addEventListener('submit', formSubmitHandler);



// ----------------------------------------------------------------
// ----------------------------------------------------------------

// let getNewCity = function (getNewCity) {
  // console.log(data.coord.lat)
  // console.log(data.coord.lon)


  // let latitude = data.coord.lat
  // let longitude = data.coord.lon
  

// data.coords.lat
// or data.coords.lon

// ----------------------------------------------------------------

// let dayAfter = new Date();
// dayAfter.setDate(dayAfter.getDate() + 1);
// console.log(convertDate(dayAfter));

// let fiveDayDashboardEl = document.createElement("div")
// // Title of Cards
// let fiveDayTitleDashboardEl = document.createElement("h2")
// fiveDayTitleDashboardEl.textContent = '5-Day Forecast:';
// fiveDayDashboardEl.appendChild(fiveDayTitleDashboardEl);
// fiveCityContainerEl.appendChild(fiveDayDashboardEl);

// // Day -1 Forecast:
// document.querySelector("#day1");
// day1.innerHTML = "";
// let day1


// console.log(fiveDayTitleDashboardEl)


// fiveCityContainerEl
// }

// ----------------------------------------------------------------
// ----------------------------------------------------------------