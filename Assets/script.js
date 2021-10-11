let ApiKey = 'a5f1951d920262d2e977eef2129fc60f';
let fiveDayApiKey = '2b5c6242956ebaa4aa9ab9ed8dec6cbb';
let nameInputEl = document.querySelector('#search');
let userFormEl = document.querySelector('#user-form');
let oldCityContainerEl = document.querySelector('#old-cities-container');
let cityContainerEl = document.querySelector('#city-container');
let fiveCityContainerEl = document.querySelector('#city-container-2');
let fiveDayTitleEl = document.querySelector('#five-day-forecast');

let day1 = document.querySelector("#day1");
let day2 = document.querySelector("#day2");
let day3 = document.querySelector("#day3");
let day4 = document.querySelector("#day4");
let day5 = document.querySelector("#day5");


let formSubmitHandler = function (event) {
  event.preventDefault();

  let search = nameInputEl.value.trim();

  let oldCityBtn = document.createElement("button")
  // making the button clickable
  oldCityBtn.addEventListener("click", function() {
 getCity(search);
  })

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

        fiveDayApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&units=imperial&exclude=minutely,hourly,alerts&appid=' + ApiKey;
        fetchFiveDayCity(fiveDayApiUrl,getCity);

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

// Next 5 days Weather Forecast
let fetchFiveDayCity = function (fiveDayApiUrl,getCity) {

fetch(fiveDayApiUrl)
.then(function (response) {
  if (response.ok) {
    response.json().then(function (data1) {
      console.log("data1", data1)
      console.log(data1.lat)
      console.log(data1.lon)
      fiveDayDisplayRepos(data1, getCity);
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

}






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

  let dashboardIconEl = document.createElement("img")
  // dashboardIconEl.textContent = data.weather."0".icon;

// clear previous info
cityContainerEl.innerHTML = "";

  dashboardEl.appendChild(dashboardTitleEl);
  dashboardEl.appendChild(dashboardIconEl);
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


let fiveDayDisplayRepos = function (data1, getCity) {
 // Converts the UNIX timestamp to required date & time
 let todaysDate = (data1.current.dt);
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

// Next 5 days weather
// 5 day title
fiveDayTitleEl.textContent = "5-Day Forecast:";
fiveCityContainerEl.innerHTML = "";

// Forecast Day 1
let forecastOrderedListEl = document.createElement("ol");
let forecastList1El = document.createElement("h3");
let forecastList2El = document.createElement("li");
let forecastList3El = document.createElement("li");
let forecastList4El = document.createElement("li");
let forecastList5El = document.createElement("li");


console.log('http://openweathermap.org/img/wn/' + data1.daily[0].weather[0].icon + '@2x.png')
console.log(data1.daily[0].dt)
console.log(convertDate(data1.daily[0].dt))


forecastList1El.textContent = 'day 1';
forecastList2El.textContent = data1.daily[0].weather[0].icon;
forecastList3El.textContent = 'Temp: ' + data1.daily[0].temp.day + '°F';
forecastList4El.textContent = 'Wind: ' + data1.daily[0].wind_speed + ' MPH';
forecastList5El.textContent = 'Humidity: ' + data1.daily[0].humidity + ' %';

forecastOrderedListEl.appendChild(forecastList1El);
forecastOrderedListEl.appendChild(forecastList2El);
forecastOrderedListEl.appendChild(forecastList3El);
forecastOrderedListEl.appendChild(forecastList4El);
forecastOrderedListEl.appendChild(forecastList5El);

day1.appendChild(forecastOrderedListEl);
fiveCityContainerEl.appendChild(day1);


// Forecast Day 2
let forecastOrderedListEl2 = document.createElement("ol");
let forecastList1El2 = document.createElement("h3");
let forecastList2El2 = document.createElement("li");
let forecastList3El2 = document.createElement("li");
let forecastList4El2 = document.createElement("li");
let forecastList5El2 = document.createElement("li");

forecastList1El2.textContent = 'day 2';
forecastList2El2.textContent = data1.daily[1].weather[0].icon;
forecastList3El2.textContent = 'Temp: ' + data1.daily[1].temp.day + '°F';
forecastList4El2.textContent = 'Wind: ' + data1.daily[1].wind_speed + ' MPH';
forecastList5El2.textContent = 'Humidity: ' + data1.daily[1].humidity + ' %';

forecastOrderedListEl2.appendChild(forecastList1El2);
forecastOrderedListEl2.appendChild(forecastList2El2);
forecastOrderedListEl2.appendChild(forecastList3El2);
forecastOrderedListEl2.appendChild(forecastList4El2);
forecastOrderedListEl2.appendChild(forecastList5El2);

day2.appendChild(forecastOrderedListEl2);
fiveCityContainerEl.appendChild(day2);

// Forecast Day 3
let forecastOrderedListEl3 = document.createElement("ol");
let forecastList1El3 = document.createElement("h3");
let forecastList2El3 = document.createElement("li");
let forecastList3El3 = document.createElement("li");
let forecastList4El3 = document.createElement("li");
let forecastList5El3 = document.createElement("li");

forecastList1El3.textContent = 'day 3';
forecastList2El3.textContent = data1.daily[2].weather[0].icon;
forecastList3El3.textContent = 'Temp: ' + data1.daily[2].temp.day + '°F';
forecastList4El3.textContent = 'Wind: ' + data1.daily[2].wind_speed + ' MPH';
forecastList5El3.textContent = 'Humidity: ' + data1.daily[2].humidity + ' %';

forecastOrderedListEl3.appendChild(forecastList1El2);
forecastOrderedListEl3.appendChild(forecastList2El2);
forecastOrderedListEl3.appendChild(forecastList3El2);
forecastOrderedListEl3.appendChild(forecastList4El2);
forecastOrderedListEl3.appendChild(forecastList5El2);

day3.appendChild(forecastOrderedListEl3);
fiveCityContainerEl.appendChild(day3);

// Forecast Day 4
let forecastOrderedListEl4 = document.createElement("ol");
let forecastList1El4 = document.createElement("h3");
let forecastList2El4 = document.createElement("li");
let forecastList3El4 = document.createElement("li");
let forecastList4El4 = document.createElement("li");
let forecastList5El4 = document.createElement("li");

forecastList1El4.textContent = 'day 4';
forecastList2El4.textContent = data1.daily[3].weather[0].icon;
forecastList3El4.textContent = 'Temp: ' + data1.daily[3].temp.day + '°F';
forecastList4El4.textContent = 'Wind: ' + data1.daily[3].wind_speed + ' MPH';
forecastList5El4.textContent = 'Humidity: ' + data1.daily[3].humidity + ' %';

forecastOrderedListEl4.appendChild(forecastList1El2);
forecastOrderedListEl4.appendChild(forecastList2El2);
forecastOrderedListEl4.appendChild(forecastList3El2);
forecastOrderedListEl4.appendChild(forecastList4El2);
forecastOrderedListEl4.appendChild(forecastList5El2);

day4.appendChild(forecastOrderedListEl4);
fiveCityContainerEl.appendChild(day4);

// Forecast Day 5
let forecastOrderedListEl5 = document.createElement("ol");
let forecastList1El5 = document.createElement("h3");
let forecastList2El5 = document.createElement("li");
let forecastList3El5 = document.createElement("li");
let forecastList4El5 = document.createElement("li");
let forecastList5El5 = document.createElement("li");

forecastList1El5.textContent = 'day 5';
forecastList2El5.textContent = data1.daily[4].weather[0].icon;
forecastList3El5.textContent = 'Temp: ' + data1.daily[4].temp.day + '°F';
forecastList4El5.textContent = 'Wind: ' + data1.daily[4].wind_speed + ' MPH';
forecastList5El5.textContent = 'Humidity: ' + data1.daily[4].humidity + ' %';

forecastOrderedListEl5.appendChild(forecastList1El2);
forecastOrderedListEl5.appendChild(forecastList2El2);
forecastOrderedListEl5.appendChild(forecastList3El2);
forecastOrderedListEl5.appendChild(forecastList4El2);
forecastOrderedListEl5.appendChild(forecastList5El2);

day5.appendChild(forecastOrderedListEl5);
fiveCityContainerEl.appendChild(day5);
}





userFormEl.addEventListener('submit', formSubmitHandler);



// ----------------------------------------------------------------
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

// fiveCityContainerEl
// }

// ----------------------------------------------------------------
// ----------------------------------------------------------------